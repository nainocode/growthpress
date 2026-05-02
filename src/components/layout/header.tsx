import Link from "next/link";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { cn } from "@/lib/utils";

const nav = [
  { href: "/", label: "Home" },
  { href: "/blog", label: "Blog" },
  { href: "/search", label: "Search" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-zinc-200/70 bg-white/90 backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/85">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6">
        <Link href="/" className="text-lg font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
          GrowthPress
        </Link>
        <nav
          className={cn(
            "flex max-w-[min(100%,36rem)] flex-1 flex-wrap items-center justify-end gap-x-5 gap-y-2",
            "text-sm font-medium text-zinc-600 dark:text-zinc-300 md:justify-center",
          )}
          aria-label="Primary"
        >
          {nav.map(({ href, label }) => (
            <Link key={href} href={href} className="transition hover:text-zinc-900 dark:hover:text-white">
              {label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2 sm:ml-auto">
          <Link
            href="/admin"
            className="hidden rounded-lg px-3 py-1.5 text-xs text-zinc-500 hover:bg-zinc-100 hover:text-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-200 sm:inline-block"
          >
            Admin
          </Link>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
