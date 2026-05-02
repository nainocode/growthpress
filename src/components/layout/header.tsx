import Link from "next/link";
import { ThemeToggle } from "@/components/layout/theme-toggle";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-zinc-200/70 bg-white/90 backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/85">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <Link href="/" className="text-lg font-semibold tracking-tight">
          GrowthPress
        </Link>
        <nav className="hidden gap-5 text-sm text-zinc-600 dark:text-zinc-300 md:flex">
          <Link href="/">Home</Link>
          <Link href="/search">Search</Link>
          <Link href="/admin">Admin</Link>
        </nav>
        <ThemeToggle />
      </div>
    </header>
  );
}
