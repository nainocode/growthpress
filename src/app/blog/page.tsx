import type { Metadata } from "next";
import { PostCard } from "@/components/blog/post-card";
import { getAllPosts } from "@/lib/posts";
import { siteConfig } from "@/lib/seo";

export const metadata: Metadata = {
  title: "All Articles",
  description: `Browse every playbook, guide, and essay published on ${siteConfig.name}.`,
  alternates: { canonical: "/blog" },
  openGraph: {
    title: `All Articles | ${siteConfig.name}`,
    description: `Browse every playbook, guide, and essay published on ${siteConfig.name}.`, 
    url: `${siteConfig.url}/blog`,
  },
};

export default function BlogIndexPage() {
  const posts = getAllPosts();

  return (
    <section className="space-y-10">
      <header className="space-y-3">
        <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700 dark:text-emerald-400">GrowthPress archive</p>
        <h1 className="text-4xl font-bold tracking-tight">All articles</h1>
        <p className="max-w-2xl text-zinc-600 dark:text-zinc-400">
          Original frameworks covering AI-assisted workflows, freelancing offers, ecommerce validation, and sustainable online
          income habits.
        </p>
        <p className="text-sm text-zinc-500">{posts.length} published pieces · Updated automatically from content.</p>
      </header>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
    </section>
  );
}
