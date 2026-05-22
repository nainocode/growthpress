import type { BlogPost } from "@/lib/types";

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
    url: `${siteConfig.url}blog/${post.slug}`,
    image: `${siteConfig.url}${post.featuredImage}`,
    datePublished: post.date,
    dateModified: post.updatedAt ?? post.date,
    author: {
      "@type": "Person",
      name: post.author,
      url: siteConfig.url,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      logo: {
        "@type": "ImageObject",
        url: `${siteConfig.url}logo.png`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${siteConfig.url}blog/${post.slug}`,
    },
  };
}