import type { HeadingItem } from "@/lib/types";

export function TableOfContents({ headings }: { headings: HeadingItem[] }) {
  if (!headings.length) return null;

  return (
    <aside className="rounded-2xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
      <h3 className="text-sm font-semibold uppercase tracking-wide text-zinc-500">Table of Contents</h3>
      <ul className="mt-3 space-y-2 text-sm">
        {headings.map((heading) => (
          <li key={heading.id} className={heading.level === 3 ? "ml-3" : "ml-0"}>
            <a href={`#${heading.id}`} className="text-zinc-700 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-white">
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </aside>
  );
}
