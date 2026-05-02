import matter from "gray-matter";
import type { AffiliateProduct, BlogPost, PostCategory } from "@/lib/types";
import { slugify } from "@/lib/utils";

export type AffiliateFormRow = {
  title: string;
  description: string;
  ctaLabel: AffiliateProduct["ctaLabel"];
  url: string;
};

export type AdminEditorFormState = {
  slug: string;
  slugAuto: boolean;
  title: string;
  description: string;
  date: string;
  author: string;
  category: PostCategory;
  tagsCsv: string;
  featuredImage: string;
  featured: boolean;
  trending: boolean;
  affiliateProducts: AffiliateFormRow[];
  body: string;
};

export const POST_CATEGORIES: PostCategory[] = [
  "Tech",
  "Earning",
  "Dropshipping",
  "Freelancing",
  "AI",
];

export const AFFILIATE_CTA_OPTIONS: AffiliateProduct["ctaLabel"][] = ["Learn More", "Buy Now"];

const emptyAffiliateRow = (): AffiliateFormRow => ({
  title: "",
  description: "",
  ctaLabel: "Learn More",
  url: "",
});

export function emptyFormState(body = "## Intro\n\nWrite your post…\n"): AdminEditorFormState {
  const d = new Date();
  const date = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
  return {
    slug: "",
    slugAuto: true,
    title: "",
    description: "",
    date,
    author: "Admin",
    category: "Tech",
    tagsCsv: "",
    featuredImage: "",
    featured: false,
    trending: false,
    affiliateProducts: [],
    body,
  };
}

/** YAML-safe double-quoted string (multiline escapes). */
function yamlQuote(value: string): string {
  return `"${value
    .replace(/\\/g, "\\\\")
    .replace(/"/g, '\\"')
    .replace(/\n/g, "\\n")}"`;
}

function parseTags(csv: string): string[] {
  return csv
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);
}

function tagLines(tags: string[]): string {
  if (tags.length === 0) return `tags: []`;
  return `tags:\n${tags.map((t) => `  - ${yamlQuote(t)}`).join("\n")}`;
}

function affiliateLines(rows: AffiliateFormRow[]): string {
  const filled = rows.filter((r) => r.title.trim() || r.description.trim() || r.url.trim());
  if (filled.length === 0) return "";

  const items = filled.map((row) => {
    const ct = AFFILIATE_CTA_OPTIONS.includes(row.ctaLabel) ? row.ctaLabel : "Learn More";
    return [
      `  - title: ${yamlQuote(row.title.trim())}`,
      `    description: ${yamlQuote(row.description.trim())}`,
      `    ctaLabel: ${yamlQuote(ct)}`,
      `    url: ${yamlQuote(row.url.trim())}`,
    ].join("\n");
  });

  return `affiliateProducts:\n${items.join("\n")}\n`;
}

/**
 * Builds full markdown document: YAML frontmatter + body.
 */
export function buildPostMarkdown(form: AdminEditorFormState): string {
  const tags = parseTags(form.tagsCsv);
  const aff = affiliateLines(form.affiliateProducts);

  const frontmatterParts = [
    `title: ${yamlQuote(form.title.trim())}`,
    `description: ${yamlQuote(form.description.trim())}`,
    `date: ${yamlQuote(form.date)}`,
    `author: ${yamlQuote(form.author.trim())}`,
    `category: ${yamlQuote(form.category)}`,
    `${tagLines(tags)}`,
    `featuredImage: ${yamlQuote(form.featuredImage.trim())}`,
    `featured: ${form.featured ? "true" : "false"}`,
    `trending: ${form.trending ? "true" : "false"}`,
    aff.trim(),
  ].filter(Boolean);

  const fmCore = frontmatterParts.join("\n");
  const fm = fmCore.replace(/\n{3,}/g, "\n\n");

  return `---\n${fm}\n---\n\n${form.body.trimStart()}`;
}

/** Effective slug after auto / manual trim. */
export function effectiveSlug(form: AdminEditorFormState): string {
  if (form.slugAuto) return slugify(form.title);
  return form.slug.trim();
}

/** Hydrates form state from saved post metadata + body */
export function formStateFromBlogPost(post: BlogPost): AdminEditorFormState {
  const affiliateProducts =
    post.affiliateProducts?.length ?
      post.affiliateProducts.map((p) => ({
        title: p.title ?? "",
        description: p.description ?? "",
        ctaLabel: AFFILIATE_CTA_OPTIONS.includes(p.ctaLabel) ? p.ctaLabel : "Learn More",
        url: p.url ?? "",
      }))
    : [];

  const dateSlice = typeof post.date === "string" ? post.date.slice(0, 10) : post.date;

  return {
    slug: post.slug,
    slugAuto: false,
    title: post.title,
    description: post.description,
    date: dateSlice,
    author: post.author,
    category: POST_CATEGORIES.includes(post.category as PostCategory) ?
      post.category
    : "Tech",
    tagsCsv: post.tags.join(", "),
    featuredImage: post.featuredImage ?? "",
    featured: Boolean(post.featured),
    trending: Boolean(post.trending),
    affiliateProducts,
    body: post.content ?? "",
  };
}

/** Optional: normalize body from raw markdown (strip frontmatter) if user pastes full file */
export function stripLeadingFrontmatter(markdown: string): { body: string } {
  const { content } = matter(markdown);
  return { body: content.trimStart() };
}

export function newAffiliateRow(): AffiliateFormRow {
  return emptyAffiliateRow();
}
