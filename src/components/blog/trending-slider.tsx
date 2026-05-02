import Link from "next/link";
import type { BlogPost } from "@/lib/types";

export function TrendingSlider({ posts }: { posts: BlogPost[] }) {
  return (
    <section className="space-y-3">
      <h2 className="text-2xl font-semibold">Trending Now</h2>
      <div className="flex snap-x gap-4 overflow-x-auto pb-2">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="min-w-[280px] snap-start rounded-2xl border border-zinc-200 bg-white p-4 transition hover:border-emerald-200 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-emerald-900"
          >
            <p className="text-xs uppercase tracking-wide text-zinc-500">{post.category}</p>
            <h3 className="mt-2 font-semibold">{post.title}</h3>
            <p className="mt-2 line-clamp-2 text-sm leading-snug text-zinc-600 dark:text-zinc-300">{post.description}</p>
            <p className="mt-3 text-sm font-medium text-emerald-700 dark:text-emerald-400">Read more</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
