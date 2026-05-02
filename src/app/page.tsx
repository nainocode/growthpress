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
            GrowthPress publishes practical guides on AI, freelancing, and online business designed for organic traffic and affiliate conversions.
          </p>
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
