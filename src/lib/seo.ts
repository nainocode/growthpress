import type { BlogPost } from "@/lib/types";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://exampleblog.com";

export const siteConfig = {
  name: "GrowthPress",
  description:
    "A modern growth-focused blog about tech, AI, earning strategies, and digital business.",
  url: "https://growthpress.vercel.app/",
  keywords: [
    "blogging",
    "AI",
    "freelancing",
    "dropshipping",
    "online earning",
    "affiliate marketing",
  ],
};

export function blogPostingSchema(post: BlogPost) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    image: `${siteConfig.url}${post.featuredImage}`,
    datePublished: post.date,
    dateModified: post.updatedAt ?? post.date,
    author: {
      "@type": "Person",
      name: post.author,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      logo: {
        "@type": "ImageObject",
        url: `${siteConfig.url}/logo.png`,
      },
    },
    mainEntityOfPage: `${siteConfig.url}/blog/${post.slug}`,
  };
}
