"use client";

import { type ChangeEvent, type FormEvent, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { BlogPost } from "@/lib/types";
import { cn } from "@/lib/utils";
import {
  AFFILIATE_CTA_OPTIONS,
  POST_CATEGORIES,
  type AffiliateFormRow,
  type AdminEditorFormState,
  buildPostMarkdown,
  effectiveSlug,
  emptyFormState,
  formStateFromBlogPost,
  newAffiliateRow,
} from "@/lib/admin-serialize-post";

const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

type Props = {
  existingPosts?: BlogPost[];
};

const inputCls =
  "w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 outline-none placeholder:text-zinc-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:focus:border-emerald-400 dark:focus:ring-emerald-400/20";

const labelCls = "block text-xs font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400";

function FieldSection({
  title,
  description,
  children,
  className,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      className={cn(
        "rounded-2xl border border-zinc-200/90 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-950",
        className,
      )}
    >
      <div className="mb-4 flex flex-wrap items-start justify-between gap-2">
        <div>
          <h2 className="text-base font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">{title}</h2>
          {description ? (
            <p className="mt-1 max-w-xl text-sm text-zinc-500 dark:text-zinc-400">{description}</p>
          ) : null}
        </div>
      </div>
      {children}
    </section>
  );
}

function ToggleRow({
  id,
  label,
  caption,
  checked,
  onChange,
}: {
  id: string;
  label: string;
  caption?: string;
  checked: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-xl border border-zinc-100 px-4 py-3 dark:border-zinc-800">
      <span>
        <span id={`${id}-label`} className="block text-sm font-medium text-zinc-900 dark:text-zinc-50">
          {label}
        </span>
        {caption ? (
          <p id={`${id}-hint`} className="mt-0.5 text-xs text-zinc-500 dark:text-zinc-400">
            {caption}
          </p>
        ) : null}
      </span>
      <button
        type="button"
        id={id}
        role="switch"
        aria-labelledby={`${id}-label`}
        aria-checked={checked}
        aria-describedby={caption ? `${id}-hint` : undefined}
        onClick={() => onChange(!checked)}
        className={cn(
          "relative inline-flex h-9 w-13 shrink-0 rounded-full transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-zinc-950",
          checked ? "bg-emerald-600 dark:bg-emerald-500" : "bg-zinc-300 dark:bg-zinc-700",
        )}
      >
        <span
          aria-hidden="true"
          className={cn(
            "pointer-events-none absolute top-1 h-7 w-7 rounded-full bg-white shadow transition-[left]",
            checked ? "left-[calc(100%-1.75rem)]" : "left-1",
          )}
        />
      </button>
    </div>
  );
}

type Banner = { text: string; variant: "success" | "error" | "info" };

export function AdminEditor({ existingPosts = [] }: Props) {
  const router = useRouter();
  const [form, setForm] = useState<AdminEditorFormState>(() => emptyFormState());
  const [banner, setBanner] = useState<Banner | null>(null);
  const [uploadBusy, setUploadBusy] = useState(false);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(true);

  const slugEffective = effectiveSlug(form);
  const markdownOut = buildPostMarkdown(form);

  const validate = (): string[] => {
    const errors: string[] = [];
    if (!form.title.trim()) errors.push("Title is required.");

    const s = slugEffective.trim();
    if (!s || !slugRegex.test(s)) {
      errors.push("Slug must be lowercase letters and numbers separated by hyphens (e.g. my-new-post).");
    }

    if (!form.featuredImage.trim()) {
      errors.push("Featured image URL is missing — upload an image or paste a path.");
    }

    form.affiliateProducts.forEach((row, index) => {
      const hasAny = Boolean(row.title.trim() || row.description.trim() || row.url.trim());
      if (!hasAny) return;
      if (!row.title.trim()) errors.push(`Affiliate product #${index + 1}: title is required when other fields are set.`);
      if (!row.url.trim()) errors.push(`Affiliate product #${index + 1}: URL is required when a product row is entered.`);
    });

    return errors;
  };

  const errors = validate();

  const loadPostSlug = (slug: string) => {
    if (!slug) {
      setForm(emptyFormState());
      setBanner({ text: "New draft started.", variant: "info" });
      return;
    }
    const post = existingPosts.find((p) => p.slug === slug);
    if (!post) {
      setBanner({ text: "Post not found in the current list. Refresh the page if you just created it.", variant: "error" });
      return;
    }
    setForm(formStateFromBlogPost(post));
    setBanner({ text: `Loaded “${post.title}”.`, variant: "success" });
  };

  const updateField = <K extends keyof AdminEditorFormState>(key: K, value: AdminEditorFormState[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const uploadFeatured = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;

    setUploadBusy(true);
    setBanner({ text: "Uploading image…", variant: "info" });

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        credentials: "include",
        body: formData,
      });

      if (!response.ok) {
        const data = (await response.json().catch(() => ({}))) as { error?: string };
        setBanner({ text: data.error ?? "Image upload failed.", variant: "error" });
        if (response.status === 401) router.push("/admin/login");
        return;
      }

      const data = (await response.json()) as { url: string };
      updateField("featuredImage", data.url);
      setBanner({ text: `Featured image saved: ${data.url}`, variant: "success" });
    } finally {
      setUploadBusy(false);
    }
  };

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    const errs = validate();
    if (errs.length) {
      setBanner({ text: `Fix validation: ${errs[0]}`, variant: "error" });
      return;
    }

    const slugForSave = slugEffective.trim();
    setSaving(true);
    setBanner({ text: "Saving…", variant: "info" });

    try {
      const response = await fetch("/api/posts", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug: slugForSave, markdown: markdownOut }),
      });

      if (!response.ok) {
        const data = (await response.json().catch(() => ({}))) as { error?: string };
        setBanner({ text: data.error ?? "Failed to save.", variant: "error" });
        if (response.status === 401) router.push("/admin/login");
        return;
      }

      setForm((prev) => ({
        ...prev,
        slug: slugForSave,
        slugAuto: false,
      }));
      setBanner({ text: `Post saved as “${slugForSave}”.`, variant: "success" });
      router.refresh();
    } finally {
      setSaving(false);
    }
  };

  const remove = async () => {
    if (!slugEffective.trim()) {
      setBanner({ text: "Set a valid slug before deleting.", variant: "error" });
      return;
    }

    const inList = existingPosts.some((p) => p.slug === slugEffective);
    const warning = inList ? "" : " This slug isn’t in the saved list—the file may not exist.";

    if (!window.confirm(`Delete post “${slugEffective}”? This removes its Markdown file from disk.${warning}`)) return;

    setDeleting(true);
    try {
      const response = await fetch(`/api/posts/${encodeURIComponent(slugEffective)}`, {
        method: "DELETE",
        credentials: "include",
      });

      const data = (await response.json().catch(() => ({}))) as { error?: string };

      if (response.status === 404) {
        setBanner({ text: data.error ?? "No file found for that slug.", variant: "error" });
        return;
      }

      if (!response.ok) {
        setBanner({ text: data.error ?? "Delete failed.", variant: "error" });
        if (response.status === 401) router.push("/admin/login");
        return;
      }

      setForm(emptyFormState());
      setBanner({ text: "Post deleted.", variant: "success" });
      router.refresh();
    } finally {
      setDeleting(false);
    }
  };

  const setAffiliate = (index: number, patch: Partial<AdminEditorFormState["affiliateProducts"][number]>) => {
    setForm((prev) => {
      const next = [...prev.affiliateProducts];
      next[index] = { ...next[index], ...patch };
      return { ...prev, affiliateProducts: next };
    });
  };

  const addAffiliateRow = () => {
    setForm((prev) => ({ ...prev, affiliateProducts: [...prev.affiliateProducts, newAffiliateRow()] }));
  };

  const removeAffiliateRow = (index: number) => {
    setForm((prev) => ({
      ...prev,
      affiliateProducts: prev.affiliateProducts.filter((_, i) => i !== index),
    }));
  };

  return (
    <form className="space-y-8" onSubmit={submit}>
      <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
        <div className="flex flex-wrap items-center gap-2">
          <label htmlFor="load-post" className={cn(labelCls, "mt-2 sm:mt-0")}>
            Open post
          </label>
          <select
            id="load-post"
            value={existingPosts.some((p) => p.slug === slugEffective) ? slugEffective : ""}
            onChange={(e) => loadPostSlug(e.target.value)}
            className={cn(inputCls, "sm:max-w-md")}
          >
            <option value="">New draft</option>
            {existingPosts.map((post) => (
              <option key={post.slug} value={post.slug}>
                {post.title} ({post.slug})
              </option>
            ))}
          </select>
          <button
            type="button"
            onClick={() => loadPostSlug("")}
            className="rounded-lg border border-zinc-200 px-3 py-2 text-sm hover:bg-zinc-50 dark:border-zinc-700 dark:hover:bg-zinc-900"
          >
            Reset form
          </button>
        </div>
        <label htmlFor="admin-preview-pane" className="flex cursor-pointer items-center gap-2 text-sm text-zinc-600 dark:text-zinc-300">
          <input
            id="admin-preview-pane"
            type="checkbox"
            checked={previewOpen}
            onChange={(e) => setPreviewOpen(e.target.checked)}
          />
          Live preview pane
        </label>
      </div>

      <div
        className={cn(
          "grid gap-8",
          previewOpen ? "xl:grid-cols-[minmax(0,1fr)_minmax(0,440px)]" : "grid-cols-1",
        )}
      >
        <div className="space-y-6">
          <FieldSection
            title="Post details"
            description="Titles, taxonomy, visibility — YAML is generated for you."
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label className={labelCls} htmlFor="title">
                  Title <span className="text-red-500">*</span>
                </label>
                <input
                  id="title"
                  className={cn(inputCls, "mt-1")}
                  placeholder="Amazing blog headline"
                  value={form.title}
                  onChange={(e) => updateField("title", e.target.value)}
                  required
                />
                {!form.title.trim() ? (
                  <p className="mt-1 text-xs text-red-500">Title cannot be empty.</p>
                ) : null}
              </div>

              <div className="space-y-2 sm:col-span-2">
                <label htmlFor="slug-auto" className="flex items-center gap-2 text-sm font-medium">
                  <input
                    id="slug-auto"
                    type="checkbox"
                    checked={form.slugAuto}
                    onChange={(e) =>
                      updateField("slugAuto", e.target.checked)
                    }
                  />
                  Auto-generate slug from title
                </label>
                <div>
                  <label className={labelCls} htmlFor="slug-manual">
                    Slug {!form.slugAuto ? <span className="text-red-500">*</span> : null}
                  </label>
                  <input
                    id="slug-manual"
                    className={cn(inputCls, "mt-1", form.slugAuto && "bg-zinc-50 dark:bg-zinc-900")}
                    placeholder="manual-slug-if-needed"
                    disabled={form.slugAuto}
                    value={form.slug}
                    onChange={(e) => updateField("slug", e.target.value)}
                  />
                  <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
                    Saves as:&nbsp;<code className="rounded bg-zinc-100 px-1 py-0.5 dark:bg-zinc-800">{slugEffective || "(set title first)"}</code>
                  </p>
                  {!slugRegex.test(slugEffective) || !slugEffective ? (
                    <p className="mt-1 text-xs text-red-500">Slug must match lowercase dashed format.</p>
                  ) : null}
                </div>
              </div>

              <div className="sm:col-span-2">
                <label className={labelCls} htmlFor="desc">
                  Description
                </label>
                <textarea
                  id="desc"
                  rows={2}
                  className={cn(inputCls, "mt-1 resize-none")}
                  placeholder="Short SEO / card description"
                  value={form.description}
                  onChange={(e) => updateField("description", e.target.value)}
                />
              </div>

              <div>
                <label className={labelCls} htmlFor="date">
                  Published date
                </label>
                <input
                  id="date"
                  type="date"
                  className={cn(inputCls, "mt-1")}
                  value={form.date}
                  onChange={(e) => updateField("date", e.target.value)}
                />
              </div>

              <div>
                <label className={labelCls} htmlFor="author">
                  Author
                </label>
                <input
                  id="author"
                  className={cn(inputCls, "mt-1")}
                  value={form.author}
                  onChange={(e) => updateField("author", e.target.value)}
                />
              </div>

              <div>
                <label className={labelCls} htmlFor="category">
                  Category
                </label>
                <select
                  id="category"
                  className={cn(inputCls, "mt-1")}
                  value={form.category}
                  onChange={(e) =>
                    updateField("category", e.target.value as AdminEditorFormState["category"])
                  }
                >
                  {POST_CATEGORIES.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className={labelCls} htmlFor="tags">
                  Tags (comma-separated)
                </label>
                <input
                  id="tags"
                  className={cn(inputCls, "mt-1")}
                  placeholder="ai, seo, ecommerce"
                  value={form.tagsCsv}
                  onChange={(e) => updateField("tagsCsv", e.target.value)}
                />
              </div>
            </div>
          </FieldSection>

          <FieldSection
            title="Featured image"
            description="Upload a safe image asset (max 3MB, JPEG / PNG / WebP / GIF)."
          >
            <div className="flex flex-col gap-4 lg:flex-row">
              <div className="flex-1 space-y-2">
                <label className={labelCls} htmlFor="feat-url">
                  Image URL /
                  path <span className="text-red-500">*</span>
                </label>
                <input
                  id="feat-url"
                  className={cn(inputCls)}
                  placeholder="/uploads/hero.jpg"
                  value={form.featuredImage}
                  onChange={(e) => updateField("featuredImage", e.target.value)}
                />
                <label
                  htmlFor="feat-upload"
                  className="inline-flex cursor-pointer items-center gap-2"
                >
                  <span className="rounded-lg bg-zinc-900 px-3 py-2 text-sm font-medium text-white dark:bg-emerald-500 dark:text-zinc-950">
                    {uploadBusy ? "Uploading…" : "Upload file"}
                  </span>
                  <input
                    id="feat-upload"
                    type="file"
                    accept="image/*"
                    disabled={uploadBusy}
                    onChange={uploadFeatured}
                    className="sr-only"
                    aria-busy={uploadBusy}
                  />
                </label>
              </div>
              <div className="flex w-full shrink-0 flex-col gap-2 lg:w-56">
                <span className={labelCls}>Preview</span>
                <div className="relative flex aspect-16/10 w-full items-center justify-center overflow-hidden rounded-xl border border-zinc-200 bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900">
                  {form.featuredImage.startsWith("/") ? (
                    <Image
                      src={form.featuredImage}
                      alt=""
                      fill
                      unoptimized={form.featuredImage.endsWith(".svg")}
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 224px"
                      suppressHydrationWarning
                    />
                  ) : form.featuredImage.startsWith("http://") ||
                    form.featuredImage.startsWith("https://") ? (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img
                      src={form.featuredImage}
                      alt=""
                      className="h-full w-full object-cover"
                      loading="lazy"
                    />
                  ) : (
                    <span className="px-4 text-center text-xs text-zinc-500">
                      Paste a `/path` relative image, `https://` URL, or upload to preview.
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-4 grid gap-2 sm:grid-cols-2">
              <ToggleRow
                id="featured-toggle"
                label="Featured"
                caption="Surface on homepage / featured placements."
                checked={form.featured}
                onChange={(value) => updateField("featured", value)}
              />
              <ToggleRow
                id="trending-toggle"
                label="Trending"
                caption="Mark for trending sliders / discovery."
                checked={form.trending}
                onChange={(value) => updateField("trending", value)}
              />
            </div>
          </FieldSection>

          <FieldSection title="Affiliate products" description="Optional — add/remove rows dynamically. Empty rows ignored.">
            <div className="space-y-4">
              {form.affiliateProducts.length === 0 ? (
                <p className="text-sm text-zinc-500 dark:text-zinc-400">
                  No products yet.&nbsp;
                  <button type="button" className="text-emerald-600 underline dark:text-emerald-400" onClick={addAffiliateRow}>
                    Add one
                  </button>
                  .
                </p>
              ) : null}

              {form.affiliateProducts.map((row, index) => (
                <div
                  key={`aff-${index}`}
                  className="space-y-3 rounded-xl border border-zinc-100 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-900/40"
                >
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-sm font-medium text-zinc-800 dark:text-zinc-200">Product #{index + 1}</p>
                    <button
                      type="button"
                      className="text-xs text-red-600 hover:underline dark:text-red-400"
                      onClick={() => removeAffiliateRow(index)}
                    >
                      Remove
                    </button>
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="sm:col-span-2">
                      <label className={labelCls}>Title</label>
                      <input
                        className={cn(inputCls, "mt-1")}
                        value={row.title}
                        onChange={(e) => setAffiliate(index, { title: e.target.value })}
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className={labelCls}>Description</label>
                      <textarea
                        rows={2}
                        className={cn(inputCls, "mt-1 resize-none")}
                        value={row.description}
                        onChange={(e) => setAffiliate(index, { description: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className={labelCls}>Button label</label>
                      <select
                        className={cn(inputCls, "mt-1")}
                        value={row.ctaLabel}
                        onChange={(e) =>
                          setAffiliate(index, {
                            ctaLabel: e.target.value as AffiliateFormRow["ctaLabel"],
                          })
                        }
                      >
                        {AFFILIATE_CTA_OPTIONS.map((label) => (
                          <option key={label} value={label}>
                            {label}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className={labelCls}>Destination URL</label>
                      <input
                        className={cn(inputCls, "mt-1")}
                        placeholder="https://"
                        value={row.url}
                        onChange={(e) => setAffiliate(index, { url: e.target.value })}
                      />
                    </div>
                  </div>
                </div>
              ))}

              {form.affiliateProducts.length > 0 ? (
                <button
                  type="button"
                  onClick={addAffiliateRow}
                  className="w-full rounded-lg border border-dashed border-zinc-300 py-3 text-sm font-medium text-zinc-700 hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-900"
                >
                  + Add product
                </button>
              ) : null}
            </div>
          </FieldSection>

          <FieldSection title="Markdown body" description="Craft the narrative — frontmatter merges on save.">
            <label className={labelCls} htmlFor="markdown-body">
              Body (Markdown)
            </label>
            <textarea
              id="markdown-body"
              rows={16}
              className={cn(inputCls, "mt-2 font-mono text-[13px] leading-relaxed")}
              value={form.body}
              onChange={(e) => updateField("body", e.target.value)}
              spellCheck
            />

            <div className="mt-4 xl:hidden">
              <button
                type="button"
                onClick={() => setPreviewOpen((open) => !open)}
                className="rounded-lg border border-zinc-200 px-3 py-2 text-sm dark:border-zinc-700"
              >
                {previewOpen ? "Hide mobile preview" : "Show preview"}
              </button>
              {previewOpen ? (
                <div className="mt-4 rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
                  <h3 className="text-xs font-semibold uppercase tracking-wide text-zinc-500">Preview</h3>
                  <PostPreviewMarkdown title={form.title} description={form.description} markdown={form.body} />
                </div>
              ) : null}
            </div>
          </FieldSection>

          <div className="flex flex-wrap gap-3">
            <button
              type="submit"
              disabled={errors.length > 0 || saving}
              className="rounded-lg bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white shadow hover:bg-emerald-500 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-emerald-500 dark:text-zinc-950 dark:hover:bg-emerald-400"
            >
              {saving ? "Saving…" : "Save post"}
            </button>
            <button
              type="button"
              onClick={remove}
              disabled={deleting}
              className="rounded-lg border border-zinc-200 px-4 py-2.5 text-sm text-red-700 hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-zinc-700 dark:text-red-300 dark:hover:bg-red-950"
            >
              {deleting ? "Deleting…" : "Delete post"}
            </button>
            {errors.length > 0 ? (
              <span className="self-center text-sm text-red-500">{`${errors.length} validation issue${errors.length > 1 ? "s" : ""}`}</span>
            ) : null}
          </div>

          {errors.length > 1 ? (
            <ul className="list-disc space-y-1 pl-5 text-sm text-red-500">
              {errors.map((msg, index) => (
                <li key={`${index}-${msg}`}>{msg}</li>
              ))}
            </ul>
          ) : null}

          {banner ? (
            <p
              role="status"
              className={cn(
                "text-sm",
                banner.variant === "error" && "text-red-600 dark:text-red-400",
                banner.variant === "success" && "text-emerald-700 dark:text-emerald-300",
                banner.variant === "info" && "text-zinc-600 dark:text-zinc-400",
              )}
            >
              {banner.text}
            </p>
          ) : null}
        </div>

        {previewOpen ? (
          <div className="hidden xl:block xl:sticky xl:top-24 xl:self-start xl:rounded-2xl xl:border xl:border-zinc-200 xl:bg-white xl:p-5 xl:shadow-inner dark:border-zinc-800 dark:bg-zinc-950">
            <p className="text-xs font-semibold uppercase tracking-wide text-emerald-600 dark:text-emerald-400">Live preview</p>
            <PostPreviewMarkdown title={form.title} description={form.description} markdown={form.body} />

            <details className="mt-4 rounded-lg border border-zinc-200 bg-zinc-50 p-3 text-xs dark:border-zinc-800 dark:bg-zinc-900/40">
              <summary className="cursor-pointer font-medium text-zinc-700 dark:text-zinc-200">Combined markdown (inspect)</summary>
              <pre className="mt-2 max-h-48 overflow-auto whitespace-pre-wrap wrap-break-word text-[11px] text-zinc-600 dark:text-zinc-400">
                {markdownOut}
              </pre>
            </details>
          </div>
        ) : null}
      </div>
    </form>
  );
}

function PostPreviewMarkdown({
  title,
  description,
  markdown,
}: {
  title: string;
  description: string;
  markdown: string;
}) {
  return (
    <div className="mt-4">
      <p className="text-xs uppercase tracking-wide text-zinc-400">Draft title</p>
      <p className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">{title || "(untitled)"}</p>
      {description.trim() ? <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">{description}</p> : null}
      <div className="prose prose-sm prose-zinc mt-6 max-h-[min(60vh,640px)] max-w-none overflow-y-auto pb-12 dark:prose-invert prose-headings:scroll-mt-28">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{markdown || "_No body yet._"}</ReactMarkdown>
      </div>
    </div>
  );
}
