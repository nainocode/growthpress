"use client"; // State handle karne ke liye mandatory hai Next.js App Router mein

import { useState } from "react";
import Link from "next/link";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react"; // npm i lucide-react (agar installed nahi hai)

const nav = [
  { href: "/", label: "Home" },
  { href: "/blog", label: "Blog" },
  { href: "/search", label: "Search" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;

export function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-zinc-200/70 bg-white/90 backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/85">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        
        {/* Logo */}
        <Link href="/" className="text-lg font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
          GrowthPress
        </Link>

        {/* Desktop Navigation */}
        <nav
          className="hidden md:flex items-center gap-x-6 text-sm font-medium text-zinc-600 dark:text-zinc-300"
          aria-label="Primary"
        >
          {nav.map(({ href, label }) => (
            <Link key={href} href={href} className="transition hover:text-zinc-900 dark:hover:text-white">
              {label}
            </Link>
          ))}
        </nav>

        {/* Right Actions & Mobile Toggle */}
        <div className="flex items-center gap-2">
          {/* Admin Link */}
          <Link
            href="/admin"
            className="hidden rounded-lg px-3 py-1.5 text-xs text-zinc-500 hover:bg-zinc-100 hover:text-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-200 sm:inline-block"
          >
            Admin
          </Link>
          
          <ThemeToggle />

          {/* Hamburger Menu Button (Only Visible on Mobile) */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="rounded-lg p-1.5 text-zinc-600 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800 md:hidden"
            aria-label="Toggle Menu"
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer/Menu Dropdown */}
      <div
        className={cn(
          "md:hidden border-t border-zinc-200/50 dark:border-zinc-800/50 bg-white dark:bg-zinc-950 transition-all duration-200 ease-in-out",
          isOpen ? "block opacity-100 max-h-screen" : "hidden opacity-0 max-h-0 overflow-hidden"
        )}
      >
        <nav className="flex flex-col space-y-3 p-4 text-sm font-medium text-zinc-600 dark:text-zinc-300">
          {nav.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setIsOpen(false)} // Click karne par menu close ho jaye
              className="block rounded-md p-2 hover:bg-zinc-50 hover:text-zinc-900 dark:hover:bg-zinc-900 dark:hover:text-white"
            >
              {label}
            </Link>
          ))}
          {/* Admin Link inside Mobile Menu for smaller screens */}
          <Link
            href="/admin"
            onClick={() => setIsOpen(false)}
            className="block sm:hidden rounded-md p-2 text-zinc-500 hover:bg-zinc-50 dark:hover:bg-zinc-900"
          >
            Admin Dashboard
          </Link>
        </nav>
      </div>
    </header>
  );
}