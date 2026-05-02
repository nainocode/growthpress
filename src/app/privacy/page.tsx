import type { Metadata } from "next";
import Link from "next/link";
import { LegalProse } from "@/components/layout/legal-prose";
import { siteConfig } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How GrowthPress collects, uses, and protects visitor information.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  const updated = "May 2026";

  return (
    <LegalProse
      title="Privacy Policy"
      lead={`Last updated: ${updated}. This notice explains how ${siteConfig.name} (“we”, “our”) treats information when you use ${siteConfig.url}.`}
    >
      <p>
        We keep this readable. If anything here conflicts with mandatory local law where you live, the law wins—and we aim to
        honor both spirit and letter.
      </p>

      <h2>What we collect</h2>
      <ul>
        <li>
          <strong>Server and hosting logs:</strong> Vercel-style edge logs often include IPs, timestamps, URLs, device hints,
          and errors. Hosting providers rotate or aggregate these automatically—we do not use them to build individual
          dossiers or sell identities.
        </li>
        <li>
          <strong>Cookies & local storage:</strong> We rely on essentials for routing, caching, analytics (if configured),
          and theme preferences (`next-themes`) so dark mode survives reloads.
        </li>
        <li>
          <strong>Optional forms:</strong> If you email us or submit a newsletter form once integrated, we only keep what you
          send plus delivery metadata strictly needed for support.
        </li>
      </ul>

      <h2>Analytics & marketing tags</h2>
      <p>
        GrowthPress reserves slots for respectful analytics tools (privacy-friendly counters, hashed audiences, Google
        Analytics, etc.). If a script activates, future privacy addenda cover opt-outs. Until then assume minimal,
        aggregated metrics only—the kind that helps editors see which frameworks resonate.
      </p>

      <h2>Affiliate links</h2>
      <p>
        Select posts reference external offers. Affiliate partners record clicks per their policies once you leave GrowthPress.
        We disclose relationships inline where required; read our disclosures at the editorial level beside each outbound link.
      </p>

      <h2>How we use data</h2>
      <ul>
        <li>Operate, secure, and debug the publication.</li>
        <li>Improve layout, typography, article structure, and search.</li>
        <li>Fulfill legal obligations (fraud mitigation, subpoenas).</li>
      </ul>

      <h2>Sharing</h2>
      <p>
        Hosting (e.g., Vercel), DNS, transactional email vendors, analytics partners—each executes under contractual
        confidentiality. We never sell mailing lists scraped from GrowthPress interactions.
      </p>

      <h2>Retention</h2>
      <p>
        Operational logs purge on provider schedules unless law demands longer holds. Editorial Markdown files reside in our
        repository and deploy pipeline for site generation only.
      </p>

      <h2>Rights</h2>
      <p>
        Depending on jurisdiction you may ask for access, correction, export, objection, erasure—email us listed on the{" "}
        <Link href="/contact">contact page</Link>. We respond pragmatically unless a lawful exception applies.
      </p>

      <h2>Kids</h2>
      <p>GrowthPress is not directed toward children under 13/16—we do not knowingly solicit data from minors.</p>

      <h2>International visitors</h2>
      <p>
        Editors ship from multiple regions yet infrastructure may process data globally. Whenever EU/UK safeguards apply we
        document Standard Contractual Clauses or equivalents if required processors sit outside compliant zones.
      </p>

      <h2>Changes</h2>
      <p>
        Meaningful updates revise the “Last updated” date above plus a short changelog snippet on the changelog page when we
        add one—or note it within this section.
      </p>

      <p>
        <Link href="/">← Back home</Link>
      </p>
    </LegalProse>
  );
}
