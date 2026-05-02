import Link from "next/link";
import type { BlogPost } from "@/lib/types";

export function RelatedPosts({ posts }: { posts: BlogPost[] }) {
  if (!posts.length) return null;

  return (
    <section className="my-8">
      <h3 className="mb-4 text-xl font-semibold">Related Posts</h3>
      <div className="grid gap-3 md:grid-cols-3">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="rounded-xl border border-zinc-200 p-4 hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-900"
          >
            <p className="text-xs text-zinc-500">{post.category}</p>
            <h4 className="mt-2 font-medium">{post.title}</h4>
          </Link>
        ))}
      </div>
    </section>
  );
}
