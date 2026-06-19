import type { BlogPost } from "@/lib/types";

export const siteConfig = {
  name: "GrowthPress",
  description:
    "A modern growth-focused blog about tech, AI, earning strategies, and digital business.",

  // ❌ remove trailing slash (IMPORTANT FIX)
  url: "https://growthpress.vercel.app",

  keywords: [
    "blogging",
    "AI",
    "freelancing",
    "dropshipping",
    "online earning",
    "affiliate marketing",
  ],
};

// helper to avoid double slash bugs
const siteUrl = siteConfig.url;

export function blogPostingSchema(post: BlogPost) {
  const postUrl = `${siteUrl}/blog/${post.slug}`;

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",

    headline: post.title,
    description: post.description,

    url: postUrl,

    image: `${siteUrl}${post.featuredImage.startsWith("/") ? "" : "/"}${post.featuredImage}`,

    datePublished: new Date(post.date).toISOString(),
    dateModified: new Date(post.updatedAt ?? post.date).toISOString(),

    author: {
      "@type": "Person",
      name: post.author,
      url: siteUrl,
    },

    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      logo: {
        "@type": "ImageObject",
        url: `${siteUrl}/logo.png`,
      },
    },

    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": postUrl,
    },
  };
}