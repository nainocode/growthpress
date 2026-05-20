import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/seo";

export const metadata: Metadata = {
  title: `Privacy Policy | ${siteConfig.name}`,
  description: `Learn how ${siteConfig.name} collects, uses, and protects your personal information. We keep it simple, transparent, and GDPR-friendly.`,
  alternates: { canonical: "/privacy" },
  openGraph: {
    title: `Privacy Policy | ${siteConfig.name}`,
    description: `Learn how ${siteConfig.name} collects, uses, and protects your personal information.`,
    url: `${siteConfig.url}/privacy`,
    type: "website",
  },
};

const UPDATED = "May 2026";

const sections = [
  { id: "what-we-collect",       label: "What we collect" },
  { id: "analytics",             label: "Analytics & marketing" },
  { id: "affiliate-links",       label: "Affiliate links" },
  { id: "how-we-use-data",       label: "How we use data" },
  { id: "sharing",               label: "Sharing" },
  { id: "retention",             label: "Retention" },
  { id: "your-rights",           label: "Your rights" },
  { id: "children",              label: "Children" },
  { id: "international",         label: "International visitors" },
  { id: "changes",               label: "Changes to this policy" },
];

const privacySchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: `Privacy Policy | ${siteConfig.name}`,
  description: `How ${siteConfig.name} collects, uses, and protects visitor information.`,
  url: `${siteConfig.url}/privacy`,
  dateModified: "2026-05-01",
  publisher: {
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
  },
};

export default function PrivacyPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(privacySchema) }}
      />

      <main className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">

        {/* ── Hero ───────────────────────────────────────────────── */}
        <div className="mb-12">
          <span className="inline-block rounded-full bg-emerald-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400">
            Legal
          </span>
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-5xl">
            Privacy Policy
          </h1>
          <p className="mt-4 text-base text-zinc-500 dark:text-zinc-400">
            Last updated: <strong className="text-zinc-700 dark:text-zinc-300">{UPDATED}</strong>
          </p>
          <p className="mt-3 text-lg text-zinc-600 dark:text-zinc-400">
            This notice explains how{" "}
            <strong className="text-zinc-900 dark:text-zinc-50">{siteConfig.name}</strong> treats
            information when you use{" "}
            <span className="font-mono text-sm text-emerald-700 dark:text-emerald-400">{siteConfig.url}</span>.
            We keep it plain. If anything conflicts with mandatory local law where you live, the law wins.
          </p>
        </div>

        {/* ── Table of contents ──────────────────────────────────── */}
        <nav
          aria-label="Privacy policy sections"
          className="mb-12 rounded-2xl border border-zinc-200 bg-zinc-50 p-6 dark:border-zinc-800 dark:bg-zinc-900/50"
        >
          <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
            Contents
          </p>
          <ol className="space-y-2">
            {sections.map((s, i) => (
              <li key={s.id} className="flex items-baseline gap-3">
                <span className="w-5 shrink-0 text-right text-xs text-zinc-400 dark:text-zinc-600">
                  {i + 1}.
                </span>
                <a
                  href={`#${s.id}`}
                  className="text-sm text-emerald-700 underline underline-offset-4 hover:text-emerald-500 dark:text-emerald-400 dark:hover:text-emerald-300"
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        {/* ── Sections ───────────────────────────────────────────── */}
        <div className="space-y-12">

          <Section id="what-we-collect" title="What we collect">
            <p className="mb-4 text-sm leading-7 text-zinc-600 dark:text-zinc-400">
              We collect the minimum necessary to run the publication. Here is exactly what that means:
            </p>
            <div className="space-y-3">
              {[
                {
                  icon: "🖥️",
                  label: "Server & hosting logs",
                  desc: "Vercel edge logs include IPs, timestamps, URLs, device hints, and errors. Hosting providers rotate or aggregate these automatically — we do not use them to build individual profiles or sell identities.",
                },
                {
                  icon: "🍪",
                  label: "Cookies & local storage",
                  desc: "We rely on essentials for routing, caching, analytics (if configured), and theme preferences (next-themes) so dark mode survives reloads. No third-party ad cookies are set by default.",
                },
                {
                  icon: "📬",
                  label: "Optional forms",
                  desc: "If you email us or submit a newsletter form, we only keep what you send plus delivery metadata strictly needed for support. We do not share this with data brokers.",
                },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex gap-4 rounded-xl border border-zinc-100 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950"
                >
                  <span className="mt-0.5 text-xl">{item.icon}</span>
                  <div>
                    <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">{item.label}</p>
                    <p className="mt-1 text-sm leading-6 text-zinc-500 dark:text-zinc-400">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </Section>

          <Section id="analytics" title="Analytics & marketing tags">
            <p className="text-sm leading-7 text-zinc-600 dark:text-zinc-400">
              {siteConfig.name} reserves slots for respectful analytics tools — privacy-friendly counters,
              hashed audiences, or Google Analytics. If a script activates, future addenda will cover
              opt-outs. Until then assume minimal, aggregated metrics only — the kind that helps editors
              see which topics resonate without tracking you individually.
            </p>
          </Section>

          <Section id="affiliate-links" title="Affiliate links">
            <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 dark:border-amber-900 dark:bg-amber-950/40">
              <p className="text-sm font-semibold text-amber-900 dark:text-amber-200">Disclosure</p>
              <p className="mt-1 text-sm leading-6 text-amber-800 dark:text-amber-300">
                Select posts reference external offers. Affiliate partners record clicks per their own
                policies once you leave {siteConfig.name}. We disclose relationships inline beside each
                outbound affiliate link as required by FTC guidelines.
              </p>
            </div>
          </Section>

          <Section id="how-we-use-data" title="How we use data">
            <ul className="space-y-2">
              {[
                "Operate, secure, and debug the publication.",
                "Improve layout, typography, article structure, and search.",
                "Fulfill legal obligations such as fraud mitigation and lawful subpoenas.",
                "Send transactional emails if you subscribe — never unsolicited marketing.",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-zinc-600 dark:text-zinc-400">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" />
                  {item}
                </li>
              ))}
            </ul>
          </Section>

          <Section id="sharing" title="Sharing">
            <p className="text-sm leading-7 text-zinc-600 dark:text-zinc-400">
              We work with hosting (Vercel), DNS providers, transactional email vendors, and analytics
              partners — each operating under contractual confidentiality. We{" "}
              <strong className="text-zinc-900 dark:text-zinc-50">never sell</strong> mailing lists or
              personal data scraped from {siteConfig.name} interactions.
            </p>
          </Section>

          <Section id="retention" title="Retention">
            <p className="text-sm leading-7 text-zinc-600 dark:text-zinc-400">
              Operational logs purge on provider schedules unless law demands longer holds. Editorial
              Markdown files reside in our repository and deploy pipeline for site generation only — they
              do not contain personal reader data.
            </p>
          </Section>

          <Section id="your-rights" title="Your rights">
            <p className="mb-4 text-sm leading-7 text-zinc-600 dark:text-zinc-400">
              Depending on your jurisdiction you may request:
            </p>
            <div className="grid gap-2 sm:grid-cols-2">
              {[
                { right: "Access", desc: "See what data we hold about you" },
                { right: "Correction", desc: "Fix inaccurate personal data" },
                { right: "Export", desc: "Receive your data in a portable format" },
                { right: "Erasure", desc: "Request deletion of your data" },
                { right: "Objection", desc: "Object to certain processing activities" },
                { right: "Restriction", desc: "Limit how we process your data" },
              ].map((item) => (
                <div
                  key={item.right}
                  className="rounded-lg border border-zinc-100 bg-zinc-50 px-4 py-3 dark:border-zinc-800 dark:bg-zinc-900/50"
                >
                  <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">{item.right}</p>
                  <p className="mt-0.5 text-xs text-zinc-500 dark:text-zinc-400">{item.desc}</p>
                </div>
              ))}
            </div>
            <p className="mt-4 text-sm text-zinc-600 dark:text-zinc-400">
              To exercise any right, email us via the{" "}
              <Link
                href="/contact"
                className="text-emerald-700 underline underline-offset-4 hover:text-emerald-500 dark:text-emerald-400"
              >
                contact page
              </Link>
              . We respond within a reasonable timeframe unless a lawful exception applies.
            </p>
          </Section>

          <Section id="children" title="Children">
            <p className="text-sm leading-7 text-zinc-600 dark:text-zinc-400">
              {siteConfig.name} is not directed toward children under 13 (or 16 where applicable under
              GDPR). We do not knowingly solicit, collect, or store personal data from minors. If you
              believe a minor has submitted data, contact us and we will delete it promptly.
            </p>
          </Section>

          <Section id="international" title="International visitors">
            <p className="text-sm leading-7 text-zinc-600 dark:text-zinc-400">
              Our infrastructure may process data globally. Whenever EU/UK GDPR safeguards apply, we
              document Standard Contractual Clauses or equivalent mechanisms where required processors sit
              outside compliant zones. California residents may have additional rights under CCPA.
            </p>
          </Section>

          <Section id="changes" title="Changes to this policy">
            <p className="text-sm leading-7 text-zinc-600 dark:text-zinc-400">
              Meaningful updates revise the "Last updated" date at the top of this page. For significant
              changes we will add a short summary here describing what changed and why. Continued use of{" "}
              {siteConfig.name} after changes constitutes acceptance.
            </p>
          </Section>

        </div>

        {/* ── Footer ─────────────────────────────────────────────── */}
        <div className="mt-16 border-t border-zinc-200 pt-8 dark:border-zinc-800">
          <p className="text-xs text-zinc-400 dark:text-zinc-500">
            {siteConfig.name} · <span className="font-mono">{siteConfig.url}</span> · Last updated {UPDATED}
          </p>
          <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-sm">
            <Link
              href="/"
              className="text-zinc-500 underline underline-offset-4 hover:text-emerald-600 dark:text-zinc-400 dark:hover:text-emerald-400"
            >
              ← Back home
            </Link>
            <Link
              href="/contact"
              className="text-zinc-500 underline underline-offset-4 hover:text-emerald-600 dark:text-zinc-400 dark:hover:text-emerald-400"
            >
              Contact us
            </Link>
            <Link
              href="/about"
              className="text-zinc-500 underline underline-offset-4 hover:text-emerald-600 dark:text-zinc-400 dark:hover:text-emerald-400"
            >
              About GrowthPress
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}

/* ── Reusable section wrapper ──────────────────────────────────────── */
function Section({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} aria-labelledby={`${id}-heading`} className="scroll-mt-24">
      <h2
        id={`${id}-heading`}
        className="mb-4 text-xl font-bold text-zinc-900 dark:text-zinc-50"
      >
        {title}
      </h2>
      {children}
    </section>
  );
}
