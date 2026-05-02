"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { BlogPost } from "@/lib/types";

export function SearchPosts({ posts }: { posts: BlogPost[] }) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(
    () =>
      posts.filter((post) =>
        `${post.title} ${post.description} ${post.tags.join(" ")}`
          .toLowerCase()
          .includes(query.toLowerCase()),
      ),
    [posts, query],
  );

  return (
    <section className="space-y-4">
      <input
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 dark:border-zinc-700 dark:bg-zinc-900"
        placeholder="Search by keyword, category, or topic"
      />
      <div className="grid gap-3">
        {filtered.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="rounded-xl border border-zinc-200 p-4 transition hover:border-emerald-200 hover:bg-zinc-50 dark:border-zinc-800 dark:hover:border-emerald-900 dark:hover:bg-zinc-900"
          >
            <h3 className="font-medium">{post.title}</h3>
            <p className="mt-1 line-clamp-2 text-sm leading-snug text-zinc-600 dark:text-zinc-300">{post.description}</p>
            <p className="mt-3 text-sm font-medium text-emerald-700 dark:text-emerald-400">Read more</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
