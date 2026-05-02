import Link from "next/link";
import type { AffiliateProduct } from "@/lib/types";

export function AffiliateProducts({ items }: { items: AffiliateProduct[] }) {
  if (!items.length) return null;

  return (
    <section className="my-8 rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
      <h3 className="text-lg font-semibold">Recommended Tools</h3>
      <div className="mt-4 grid gap-3">
        {items.map((item) => (
          <article key={item.title} className="rounded-xl border border-zinc-200 p-4 dark:border-zinc-700">
            <h4 className="font-medium">{item.title}</h4>
            <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-300">{item.description}</p>
            <Link
              href={item.url}
              target="_blank"
              rel="noreferrer"
              className="mt-3 inline-flex rounded-lg bg-zinc-900 px-3 py-2 text-sm font-medium text-white hover:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-900"
            >
              {item.ctaLabel}
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
