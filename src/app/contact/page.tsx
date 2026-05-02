import type { Metadata } from "next";
import Link from "next/link";
import { LegalProse } from "@/components/layout/legal-prose";
import { siteConfig } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Contact",
  description: "Reach the GrowthPress editorial team.",
  alternates: { canonical: "/contact" },
};

const contactEmail =
  typeof process.env.NEXT_PUBLIC_CONTACT_EMAIL === "string" ? process.env.NEXT_PUBLIC_CONTACT_EMAIL.trim() : "";

export default function ContactPage() {
  const mailHref = contactEmail ? `mailto:${contactEmail}?subject=${encodeURIComponent("GrowthPress inquiry")}` : "";

  return (
    <LegalProse
      title="Contact GrowthPress"
      lead="Partnerships, factual corrections, and reader notes all land here first."
    >
      <p>
        GrowthPress intentionally ships without bloated ticketing portals. Prefer email so threads stay searchable and grounded
        in context.
      </p>

      <h2>Editorial inbox</h2>
      <p>For tips, typo fixes, and collaboration sparks:</p>
      {contactEmail ? (
        <p>
          <a
            href={mailHref}
            className="font-semibold text-emerald-700 underline decoration-emerald-500/60 underline-offset-4 dark:text-emerald-400"
          >
            {contactEmail}
          </a>
        </p>
      ) : (
        <div className="not-prose rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900 dark:border-amber-900 dark:bg-amber-950/50 dark:text-amber-100">
          <p className="font-medium">Set contact email</p>
          <p className="mt-1 opacity-90">
            Add{" "}
            <code className="rounded bg-amber-100 px-1.5 py-0.5 text-xs dark:bg-amber-900/70">NEXT_PUBLIC_CONTACT_EMAIL</code>{" "}
            in your Vercel project environment (and local <code>.env</code>). Redeploy to display the live mail link.
          </p>
        </div>
      )}

      <h2>Response windows</h2>
      <p>
        Indie publishing teams handle messages in bursts—expect a pragmatic reply within several business days. Urgent fraud or
        DMCA inquiries should cite applicable law plainly to route faster.
      </p>

      <h2>Vercel + hosting inquiries</h2>
      <p>
        The site ships as a modern Next.js app on Vercel; infrastructure-level abuse reports should funnel through hosting
        trust channels—but we happily coordinate editorially when we can validate context.
      </p>

      <p className="text-sm text-zinc-600 dark:text-zinc-400">
        Site:&nbsp;<span className="font-mono text-xs">{siteConfig.url}</span>
      </p>

      <p>
        <Link href="/privacy">Privacy policy</Link>
        {" · "}
        <Link href="/about">About GrowthPress</Link>
      </p>
    </LegalProse>
  );
}
