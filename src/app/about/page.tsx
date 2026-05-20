import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/seo";

export const metadata: Metadata = {
  title: `About GrowthPress | Actionable Guides for Solopreneurs`,
  description:
    "GrowthPress publishes sharp, actionable guides on AI tools, freelancing, dropshipping, and building income online — written for people who actually execute. Zero fluff.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About GrowthPress | Actionable Guides for Solopreneurs",
    description:
      "GrowthPress publishes sharp, actionable guides on AI tools, freelancing, dropshipping, and building income online — written for people who actually execute.",
    url: `${siteConfig.url}/about`,
    type: "website",
  },
};

const aboutSchema = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  name: "About GrowthPress",
  description:
    "GrowthPress is a publisher-first playbook for solopreneurs and small teams covering AI workflows, freelancing, dropshipping, and online income.",
  url: `${siteConfig.url}/about`,
  publisher: {
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
    description:
      "GrowthPress publishes original, actionable articles for indie hackers, freelancers, and solopreneurs.",
  },
};

const topics = [
  {
    icon: "🤖",
    title: "AI Workflows",
    desc: "Speed up drafting, research, and content ops without cutting corners on quality or ethics.",
    href: "/blog",
  },
  {
    icon: "💼",
    title: "Freelancing Ops",
    desc: "Positioning packages, tightening proposals, and raising rates without losing clients.",
    href: "/blog",
  },
  {
    icon: "🛒",
    title: "Dropshipping & Offers",
    desc: "Validation, messaging, and customer trust — not gimmicks. Real frameworks that repeat.",
    href: "/blog",
  },
  {
    icon: "📈",
    title: "Earning-Focused Tech",
    desc: "Analytics that matter, shipping cadence that compounds, and habits that build revenue.",
    href: "/blog",
  },
];

const values = [
  {
    label: "Clarity over hype",
    desc: "Every article earns its word count. If it doesn't help you execute, it doesn't ship.",
  },
  {
    label: "Transparent monetization",
    desc: "Affiliate links are disclosed inline. Payouts never change editorial decisions.",
  },
  {
    label: "Repeatability",
    desc: "We publish frameworks you can run again next week — not one-time inspiration.",
  },
];

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutSchema) }}
      />

      <main className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">

        {/* ── Hero ───────────────────────────────────────────────── */}
        <div className="mb-16">
          <span className="inline-block rounded-full bg-emerald-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400">
            About us
          </span>
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-5xl">
            Built for people who actually execute
          </h1>
          <p className="mt-5 text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            <strong className="text-zinc-900 dark:text-zinc-50">{siteConfig.name}</strong> is a
            publisher-first playbook for solopreneurs and small teams. One idea drives everything we
            publish: <em>clarity beats hype.</em>
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white shadow hover:bg-emerald-500 dark:bg-emerald-500 dark:text-zinc-950 dark:hover:bg-emerald-400"
            >
              Browse all articles →
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-xl border border-zinc-200 px-5 py-2.5 text-sm font-semibold text-zinc-700 hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-900"
            >
              Get in touch
            </Link>
          </div>
        </div>

        {/* ── Mission statement ──────────────────────────────────── */}
        <section aria-labelledby="mission-heading" className="mb-16">
          <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-8 dark:border-emerald-900 dark:bg-emerald-950/40">
            <h2
              id="mission-heading"
              className="text-lg font-bold text-zinc-900 dark:text-zinc-50"
            >
              Our mission
            </h2>
            <p className="mt-3 text-base leading-8 text-zinc-700 dark:text-zinc-300">
              We write for students of side hustles, indie hackers, freelancers, and store operators who
              want frameworks they can repeat every week — not vague motivation. Original articles, real
              tactics, zero padding.
            </p>
          </div>
        </section>

        {/* ── What you will find ─────────────────────────────────── */}
        <section aria-labelledby="topics-heading" className="mb-16">
          <h2
            id="topics-heading"
            className="mb-2 text-2xl font-bold text-zinc-900 dark:text-zinc-50"
          >
            What you will find here
          </h2>
          <p className="mb-8 text-sm text-zinc-500 dark:text-zinc-400">
            Four core topics — every article maps to one of them.
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            {topics.map((topic) => (
              <Link
                key={topic.title}
                href={topic.href}
                className="group rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm transition hover:border-emerald-300 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-950 dark:hover:border-emerald-700"
              >
                <span className="text-2xl">{topic.icon}</span>
                <h3 className="mt-3 text-sm font-semibold text-zinc-900 group-hover:text-emerald-700 dark:text-zinc-50 dark:group-hover:text-emerald-400">
                  {topic.title}
                </h3>
                <p className="mt-1.5 text-sm leading-6 text-zinc-500 dark:text-zinc-400">
                  {topic.desc}
                </p>
              </Link>
            ))}
          </div>
        </section>

        {/* ── Values ─────────────────────────────────────────────── */}
        <section aria-labelledby="values-heading" className="mb-16">
          <h2
            id="values-heading"
            className="mb-8 text-2xl font-bold text-zinc-900 dark:text-zinc-50"
          >
            How we operate
          </h2>
          <div className="space-y-4">
            {values.map((v, i) => (
              <div
                key={v.label}
                className="flex gap-5 rounded-2xl border border-zinc-100 bg-zinc-50 px-5 py-4 dark:border-zinc-800 dark:bg-zinc-900/50"
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-xs font-bold text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400">
                  {i + 1}
                </span>
                <div>
                  <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">{v.label}</p>
                  <p className="mt-1 text-sm leading-6 text-zinc-500 dark:text-zinc-400">{v.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Monetization transparency ──────────────────────────── */}
        <section aria-labelledby="monetization-heading" className="mb-16">
          <h2
            id="monetization-heading"
            className="mb-4 text-2xl font-bold text-zinc-900 dark:text-zinc-50"
          >
            How we monetize — transparently
          </h2>
          <div className="rounded-xl border border-amber-200 bg-amber-50 px-5 py-4 dark:border-amber-900 dark:bg-amber-950/40">
            <p className="text-sm font-semibold text-amber-900 dark:text-amber-200">
              Affiliate disclosure
            </p>
            <p className="mt-1 text-sm leading-6 text-amber-800 dark:text-amber-300">
              Some articles include affiliate links. Recommendations reflect what we already use or would
              confidently suggest to a friend. Editorial decisions{" "}
              <strong>never change because of payouts</strong> — disclosures appear inline beside every
              relevant link.
            </p>
          </div>
        </section>

        {/* ── CTA ────────────────────────────────────────────────── */}
        <section
          aria-labelledby="cta-heading"
          className="mb-16 rounded-2xl border border-zinc-200 bg-white p-8 text-center shadow-sm dark:border-zinc-800 dark:bg-zinc-950"
        >
          <h2
            id="cta-heading"
            className="text-xl font-bold text-zinc-900 dark:text-zinc-50"
          >
            Say hello
          </h2>
          <p className="mx-auto mt-2 max-w-sm text-sm text-zinc-500 dark:text-zinc-400">
            Questions, typo reports, or partnership ideas? We read every message and respond within a
            few business days.
          </p>
          <Link
            href="/contact"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-zinc-900 px-6 py-3 text-sm font-semibold text-white hover:bg-zinc-700 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200"
          >
            Contact us →
          </Link>
        </section>

        {/* ── Footer links ───────────────────────────────────────── */}
        <div className="border-t border-zinc-200 pt-8 dark:border-zinc-800">
          <p className="text-xs text-zinc-400 dark:text-zinc-500">
            {siteConfig.name} · <span className="font-mono text-xs">{siteConfig.url}</span>
          </p>
          <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-sm">
            <Link
              href="/blog"
              className="text-zinc-500 underline underline-offset-4 hover:text-emerald-600 dark:text-zinc-400 dark:hover:text-emerald-400"
            >
              Browse articles
            </Link>
            <Link
              href="/privacy"
              className="text-zinc-500 underline underline-offset-4 hover:text-emerald-600 dark:text-zinc-400 dark:hover:text-emerald-400"
            >
              Privacy policy
            </Link>
            <Link
              href="/contact"
              className="text-zinc-500 underline underline-offset-4 hover:text-emerald-600 dark:text-zinc-400 dark:hover:text-emerald-400"
            >
              Contact
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
