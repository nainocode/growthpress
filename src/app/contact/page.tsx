
import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Contact GrowthPress | Get in Touch With Our Editorial Team",
  description:
    "Have a question, tip, or collaboration idea? Contact GrowthPress editorial team. We respond to partnerships, corrections, sponsorships, and reader feedback.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact GrowthPress | Get in Touch With Our Editorial Team",
    description:
      "Have a question, tip, or collaboration idea? Contact GrowthPress editorial team. We respond to partnerships, corrections, sponsorships, and reader feedback.",
    url: `${siteConfig.url}/contact`,
    type: "website",
  },
};

const contactEmail =
  typeof process.env.NEXT_PUBLIC_CONTACT_EMAIL === "string"
    ? process.env.NEXT_PUBLIC_CONTACT_EMAIL.trim()
    : "";

const faqs = [
  {
    question: "How quickly do you respond to emails?",
    answer:
      "We typically respond within 2–4 business days. For urgent DMCA or legal matters that cite applicable law, we prioritize those threads and aim to reply within 24 hours.",
  },
  {
    question: "Do you accept guest posts or contributor pitches?",
    answer:
      "Yes — we welcome pitches from subject-matter experts. Send a 2–3 sentence summary of your idea, your credentials, and any relevant links. We review every pitch, though we cannot guarantee a response for submissions that don't fit our current editorial calendar.",
  },
  {
    question: "Can I advertise or sponsor content on GrowthPress?",
    answer:
      "We offer sponsored content placements and newsletter sponsorships for brands aligned with our audience. Email us with your brand name, target audience, and campaign goals and we'll share our media kit.",
  },
  {
    question: "I found a factual error — how do I report it?",
    answer:
      "We take accuracy seriously. Email us with the article URL, the specific claim you believe is incorrect, and a reliable source. If verified, we'll issue a correction note within 48 hours.",
  },
  {
    question: "Do you have an affiliate or partnership program?",
    answer:
      "We partner selectively with tools and platforms relevant to our readers. If you're interested in an affiliate or co-marketing relationship, email us with details about your product and target audience.",
  },
  {
    question: "How do I submit a press release or news tip?",
    answer:
      "Email us directly with your press release or tip. Include all relevant facts, official sources, and a contact name. We review every tip, but publication is at editorial discretion.",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
};

const contactPageSchema = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: "Contact GrowthPress",
  description:
    "Contact GrowthPress for editorial inquiries, partnerships, corrections, and reader feedback.",
  url: `${siteConfig.url}/contact`,
  mainEntity: {
    "@type": "Organization",
    name: "GrowthPress",
    url: siteConfig.url,
    ...(contactEmail ? { email: contactEmail } : {}),
  },
};

export default function ContactPage() {
  const mailHref = contactEmail
    ? `mailto:${contactEmail}?subject=${encodeURIComponent("GrowthPress inquiry")}`
    : "";

  return (
    <>
      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactPageSchema) }}
      />

      <main className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">

        {/* ── Hero ───────────────────────────────────────────────── */}
        <div className="mb-12 text-center">
          <span className="inline-block rounded-full bg-emerald-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400">
            Get in touch
          </span>
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-5xl">
            Contact GrowthPress
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-lg text-zinc-500 dark:text-zinc-400">
            Partnerships, corrections, pitches, and reader notes — all land here first. We read every message.
          </p>
        </div>

        {/* ── Contact cards ──────────────────────────────────────── */}
        <div className="mb-14 grid gap-4 sm:grid-cols-3">
          {[
            {
              icon: "✉️",
              label: "Editorial",
              desc: "Tips, pitches & corrections",
            },
            {
              icon: "🤝",
              label: "Partnerships",
              desc: "Sponsorships & affiliates",
            },
            {
              icon: "⚡",
              label: "Fast-track",
              desc: "DMCA & legal — cite the law",
            },
          ].map((card) => (
            <div
              key={card.label}
              className="rounded-2xl border border-zinc-200 bg-white p-5 text-center shadow-sm dark:border-zinc-800 dark:bg-zinc-950"
            >
              <span className="text-2xl">{card.icon}</span>
              <p className="mt-2 text-sm font-semibold text-zinc-900 dark:text-zinc-50">{card.label}</p>
              <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">{card.desc}</p>
            </div>
          ))}
        </div>

        {/* ── Email CTA ──────────────────────────────────────────── */}
        <section
          aria-labelledby="email-heading"
          className="mb-14 rounded-2xl border border-emerald-200 bg-emerald-50 p-8 text-center dark:border-emerald-900 dark:bg-emerald-950/40"
        >
          <h2
            id="email-heading"
            className="text-xl font-semibold text-zinc-900 dark:text-zinc-50"
          >
            Send us an email
          </h2>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
            No ticketing portals. No chatbots. Just email — searchable, contextual, human.
          </p>

          {contactEmail ? (
            <a
              href={mailHref}
              className="mt-5 inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-6 py-3 text-sm font-semibold text-white shadow hover:bg-emerald-500 dark:bg-emerald-500 dark:text-zinc-950 dark:hover:bg-emerald-400"
            >
              <span>📬</span>
              {contactEmail}
            </a>
          ) : (
            <div className="mt-4 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-left text-sm text-amber-900 dark:border-amber-900 dark:bg-amber-950/50 dark:text-amber-100">
              <p className="font-medium">⚠️ Set your contact email</p>
              <p className="mt-1 opacity-90">
                Add{" "}
                <code className="rounded bg-amber-100 px-1.5 py-0.5 text-xs dark:bg-amber-900/70">
                  NEXT_PUBLIC_CONTACT_EMAIL
                </code>{" "}
                in your Vercel environment variables and redeploy.
              </p>
            </div>
          )}

          <p className="mt-4 text-xs text-zinc-500 dark:text-zinc-500">
            ⏱ Typical response: <strong className="text-zinc-700 dark:text-zinc-300">2–4 business days</strong>
          </p>
        </section>

        {/* ── What to include ────────────────────────────────────── */}
        <section aria-labelledby="tips-heading" className="mb-14">
          <h2
            id="tips-heading"
            className="mb-6 text-2xl font-bold text-zinc-900 dark:text-zinc-50"
          >
            What to include in your email
          </h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              { label: "Guest pitch", tip: "Topic summary, your credentials, and 2–3 sample links" },
              { label: "Factual correction", tip: "Article URL, the claim, and a reliable source" },
              { label: "Sponsorship", tip: "Brand name, target audience, and campaign goals" },
              { label: "DMCA / Legal", tip: "Cite the applicable law for fastest routing" },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-xl border border-zinc-100 bg-zinc-50 px-4 py-3 dark:border-zinc-800 dark:bg-zinc-900/50"
              >
                <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">{item.label}</p>
                <p className="mt-0.5 text-xs text-zinc-500 dark:text-zinc-400">{item.tip}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── FAQ ────────────────────────────────────────────────── */}
        <section aria-labelledby="faq-heading" className="mb-14">
          <h2
            id="faq-heading"
            className="mb-2 text-2xl font-bold text-zinc-900 dark:text-zinc-50"
          >
            Frequently asked questions
          </h2>
          <p className="mb-8 text-sm text-zinc-500 dark:text-zinc-400">
            Quick answers to what most people ask before reaching out.
          </p>

          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <details
                key={i}
                className="group rounded-2xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-950"
              >
                <summary className="flex cursor-pointer list-none items-start justify-between gap-4 px-5 py-4">
                  <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
                    {faq.question}
                  </h3>
                  <span className="mt-0.5 shrink-0 text-zinc-400 transition-transform group-open:rotate-45 dark:text-zinc-500">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                      <path d="M8 2v12M2 8h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  </span>
                </summary>
                <div className="border-t border-zinc-100 px-5 pb-4 pt-3 dark:border-zinc-800">
                  <p className="text-sm leading-7 text-zinc-600 dark:text-zinc-400">{faq.answer}</p>
                </div>
              </details>
            ))}
          </div>
        </section>

        {/* ── Footer links ───────────────────────────────────────── */}
        <div className="border-t border-zinc-200 pt-8 dark:border-zinc-800">
          <p className="text-xs text-zinc-400 dark:text-zinc-500">
            Site:&nbsp;
            <span className="font-mono">{siteConfig.url}</span>
          </p>
          <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-sm">
            <Link
              href="/privacy"
              className="text-zinc-500 underline underline-offset-4 hover:text-emerald-600 dark:text-zinc-400 dark:hover:text-emerald-400"
            >
              Privacy policy
            </Link>
            <Link
              href="/about"
              className="text-zinc-500 underline underline-offset-4 hover:text-emerald-600 dark:text-zinc-400 dark:hover:text-emerald-400"
            >
              About GrowthPress
            </Link>
            <Link
              href="/blog"
              className="text-zinc-500 underline underline-offset-4 hover:text-emerald-600 dark:text-zinc-400 dark:hover:text-emerald-400"
            >
              Read the blog
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
