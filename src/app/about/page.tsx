import type { Metadata } from "next";
import Link from "next/link";
import { LegalProse } from "@/components/layout/legal-prose";
import { siteConfig } from "@/lib/seo";

export const metadata: Metadata = {
  title: "About GrowthPress",
  description:
    "We publish sharp, actionable guides on AI tools, freelancing, dropshipping, and building income online—with zero fluff.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <LegalProse
      title="About GrowthPress"
      lead={`${siteConfig.name} is a publisher-first playbook for solopreneurs and small teams.`}
    >
      <p>
        We built this site around one idea: clarity beats hype. GrowthPress publishes original articles written for people who
        actually execute—students of side hustles, indie hackers, freelancers, and store operators who want frameworks they
        can repeat every week—not vague motivation.
      </p>
      <h2>What you will find here</h2>
      <ul>
        <li>
          <strong>AI workflows</strong> that speed up drafting and research without cutting corners on quality or ethics.
        </li>
        <li>
          <strong>Freelancing ops</strong>—positioning packages, tightening proposals, raising rates without churn.
        </li>
        <li>
          <strong>Dropshipping and offers</strong> focused on validation, messaging, and customer trust—not gimmicks.
        </li>
        <li>
          <strong>Earning-focused tech habits</strong> like analytics that matter and shipping cadence that compounds.
        </li>
      </ul>
      <h2>How we monetize transparently</h2>
      <p>
        Some articles include thoughtfully chosen affiliate disclosures where relevant. Recommendations mirror what we already
        use or would confidently suggest to friends. Editorial decisions never change because of payouts.
      </p>
      <h2>Say hello</h2>
      <p>
        Questions, typo reports, or partnership ideas? Reach us via the{" "}
        <Link href="/contact">contact page</Link>. We read every message.
      </p>
      <p>
        <Link href="/blog">Browse every article →</Link>
      </p>
    </LegalProse>
  );
}
