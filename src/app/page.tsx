import Link from "next/link";
import { PostCard } from "@/components/blog/post-card";
import { TrendingSlider } from "@/components/blog/trending-slider";
import { AdSlot } from "@/components/marketing/ad-slot";
import { NewsletterSignup } from "@/components/marketing/newsletter-signup";
import { getCategories, getFeaturedPosts, getTrendingPosts } from "@/lib/posts";

const CATEGORY_ICONS: Record<string, string> = {
  "AI Tools": "🤖",
  Freelancing: "💼",
  Dropshipping: "📦",
  "Online Business": "🚀",
  SEO: "🔍",
  Monetization: "💰",
  "Content Writing": "📝",
  Analytics: "📊",
};

export default function Home() {
  const featuredPosts = getFeaturedPosts();
  const trendingPosts = getTrendingPosts();
  const categories = getCategories();

  return (
    <div className="space-y-0">

      {/* Hero */}
      <section className="grid gap-6 grid-cols-1 md:grid-cols-[1.8fr_1fr] px-4 md:px-0 pt-10 pb-12">
        <div>
          <div className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-emerald-500 dark:text-emerald-400 mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 dark:bg-emerald-400 animate-pulse" />
            Monetized Content Engine
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-[1.1] tracking-tight mb-5">
            Build authority &amp;{" "}
            <em className="italic text-emerald-600 dark:text-emerald-400 font-extrabold">
              revenue
            </em>{" "}
            through content.
          </h1>
          <p className="text-base text-zinc-500 dark:text-zinc-400 leading-relaxed max-w-xl mb-8">
            GrowthPress publishes original, practical guides on AI, freelancing, dropshipping,
            and online business — optimized for clarity, SEO, and sustainable monetization.
          </p>
          <div className="flex gap-3 flex-wrap">
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

          {/* Stats */}
          <div className="flex gap-8 mt-10 pt-8 border-t border-zinc-200 dark:border-zinc-800">
            {[["240+", "Articles published"], ["18k", "Monthly readers"], ["6", "Categories"]].map(([num, label]) => (
              <div key={label}>
                <div className="text-2xl font-bold text-zinc-900 dark:text-white">{num}</div>
                <div className="text-xs text-zinc-400 uppercase tracking-wide mt-0.5">{label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Trending Sidebar */}
        <div className="rounded-2xl border border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900 p-5">
          <div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-zinc-400 mb-4">
            Trending now
          </div>
          {trendingPosts.slice(0, 4).map((post, i) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="flex gap-3 items-start py-3 border-b border-zinc-200 dark:border-zinc-800 last:border-0 no-underline group"
            >
              <span className="text-2xl font-bold text-zinc-200 dark:text-zinc-700 min-w-[28px] leading-none mt-0.5">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <div className="text-sm font-medium text-zinc-700 dark:text-zinc-300 leading-snug mb-1 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                  {post.title}
                </div>
                <div className="text-xs text-zinc-400">{post.category}</div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Ad Slot */}
      <AdSlot slot="header" />

      {/* Featured Posts */}
      <section className="space-y-4 pt-10">
        <div className="flex items-baseline justify-between">
          <h2 className="text-2xl font-semibold">Featured posts</h2>
          <Link href="/blog" className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:opacity-75">
            See all →
          </Link>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {featuredPosts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="space-y-4 pt-10">
        <h2 className="text-2xl font-semibold">Categories</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {categories.map((category) => (
            <Link
              key={category}
              href={`/category/${category.toLowerCase()}`}
              className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 px-4 py-3 hover:border-emerald-400 hover:bg-emerald-50 dark:hover:bg-zinc-800 transition-all group no-underline"
            >
              <span className="text-xl block mb-1.5">{CATEGORY_ICONS[category] ?? "📌"}</span>
              <div className="text-sm font-semibold text-zinc-700 dark:text-zinc-300 group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors">
                {category}
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Trending Slider */}
      <div className="pt-10">
        <TrendingSlider posts={trendingPosts} />
      </div>

      {/* Newsletter */}
      <div className="pt-10">
        <NewsletterSignup />
      </div>

    </div>
  );
}
