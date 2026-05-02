import Link from "next/link";
import { PostCard } from "@/components/blog/post-card";
import { TrendingSlider } from "@/components/blog/trending-slider";
import { AdSlot } from "@/components/marketing/ad-slot";
import { NewsletterSignup } from "@/components/marketing/newsletter-signup";
import { getCategories, getFeaturedPosts, getTrendingPosts } from "@/lib/posts";

export default function Home() {
  const featuredPosts = getFeaturedPosts();
  const trendingPosts = getTrendingPosts();
  const categories = getCategories();

  return (
    <div className="space-y-12">
      <section className="grid gap-6 rounded-3xl border border-zinc-200 bg-white p-8 dark:border-zinc-800 dark:bg-zinc-900 md:grid-cols-[1.8fr_1fr]">
        <div>
          <p className="text-sm uppercase tracking-wide text-zinc-500">Monetized Content Engine</p>
          <h1 className="mt-3 text-4xl font-bold leading-tight">Build authority and revenue through high-intent blog content.</h1>
          <p className="mt-4 max-w-xl text-zinc-600 dark:text-zinc-300">
            GrowthPress publishes original, practical guides on AI, freelancing, dropshipping, and online business—optimized for clarity, SEO, and sustainable monetization on any host (including Vercel).
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/blog"
              className="rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white shadow hover:bg-emerald-500 dark:bg-emerald-500 dark:text-zinc-950 dark:hover:bg-emerald-400"
            >
              Browse all articles
            </Link>
            <Link
              href="/about"
              className="rounded-xl border border-zinc-300 px-5 py-2.5 text-sm font-semibold text-zinc-800 hover:bg-zinc-50 dark:border-zinc-600 dark:text-zinc-100 dark:hover:bg-zinc-800"
            >
              About GrowthPress
            </Link>
            <Link
              href="/contact"
              className="rounded-xl px-2 py-2.5 text-sm font-medium text-emerald-700 underline-offset-4 hover:underline dark:text-emerald-400"
            >
              Contact editorial
            </Link>
          </div>
        </div>
        <AdSlot slot="header" />
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Featured Posts</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {featuredPosts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Categories</h2>
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <Link
              key={category}
              href={`/category/${category.toLowerCase()}`}
              className="rounded-full border border-zinc-300 px-4 py-2 text-sm hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-800"
            >
              {category}
            </Link>
          ))}
        </div>
      </section>

      <TrendingSlider posts={trendingPosts} />
      <NewsletterSignup />
    </div>
  );
}
