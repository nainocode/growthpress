import type { MetadataRoute } from "next";
import { getAllPosts, getCategories } from "@/lib/posts";
import { siteConfig } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();

  const staticPages: MetadataRoute.Sitemap = [
    { url: siteConfig.url, lastModified: new Date(), priority: 1 },
    { url: `${siteConfig.url}/blog`, lastModified: new Date(), priority: 0.95 },
    { url: `${siteConfig.url}/search`, lastModified: new Date(), priority: 0.7 },
    { url: `${siteConfig.url}/about`, lastModified: new Date(), priority: 0.75 },
    { url: `${siteConfig.url}/contact`, lastModified: new Date(), priority: 0.65 },
    { url: `${siteConfig.url}/privacy`, lastModified: new Date(), priority: 0.5 },
  ];

  const categoryPages: MetadataRoute.Sitemap = getCategories().map((category) => ({
    url: `${siteConfig.url}/category/${category.toLowerCase()}`,
    lastModified: new Date(),
    priority: 0.75,
  }));

  const articlePages = posts.map((post) => ({
    url: `${siteConfig.url}/blog/${post.slug}`,
    lastModified: new Date(post.updatedAt ?? post.date),
    priority: 0.8,
  }));

  return [...staticPages, ...categoryPages, ...articlePages];
}
