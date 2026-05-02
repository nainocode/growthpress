import Link from "next/link";

const primary = [
  { href: "/blog", label: "Blog" },
  { href: "/search", label: "Search" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

const legal = [
  { href: "/privacy", label: "Privacy" },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="space-y-3 md:max-w-sm">
            <p className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">GrowthPress</p>
            <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
              Practical guides on AI workflows, freelancing, dropshipping validation, and online income—optimized for clarity and
              action.
            </p>
          </div>
          <div className="flex flex-wrap gap-10">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-500">Explore</p>
              <ul className="mt-3 space-y-2 text-sm">
                {primary.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="text-zinc-700 hover:text-emerald-700 dark:text-zinc-300 dark:hover:text-emerald-400">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-500">Legal</p>
              <ul className="mt-3 space-y-2 text-sm">
                {legal.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="text-zinc-700 hover:text-emerald-700 dark:text-zinc-300 dark:hover:text-emerald-400">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
              <Link
                href="/admin"
                className="mt-4 inline-block text-xs text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300"
              >
                Editor login →
              </Link>
            </div>
          </div>
        </div>
        <p className="mt-10 border-t border-zinc-200 pt-6 text-center text-xs text-zinc-500 dark:border-zinc-800 dark:text-zinc-500">
          © {year} GrowthPress · Built with Next.js for speed and SEO
        </p>
      </div>
    </footer>
  );
}
