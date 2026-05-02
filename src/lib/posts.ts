import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import readingTime from "reading-time";
import type { BlogFrontmatter, BlogPost, HeadingItem } from "@/lib/types";
import { slugify } from "@/lib/utils";

const contentDirectory = path.join(process.cwd(), "content", "posts");

function getHeadingItems(content: string): HeadingItem[] {
  return content
    .split("\n")
    .filter((line) => line.startsWith("## ") || line.startsWith("### "))
    .map((line) => {
      const level = line.startsWith("### ") ? 3 : 2;
      const text = line.replace(/^###?\s/, "").trim();
      return { id: slugify(text), text, level };
    });
}

function parsePostFile(fileName: string): BlogPost {
  const fullPath = path.join(contentDirectory, fileName);
  const raw = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(raw);
  const frontmatter = data as BlogFrontmatter;
  const slug = fileName.replace(/\.md$/, "");

  return {
    ...frontmatter,
    slug,
    content,
    readingTimeText: readingTime(content).text,
    headings: getHeadingItems(content),
  };
}

export function getAllPosts(): BlogPost[] {
  if (!fs.existsSync(contentDirectory)) return [];
  const files = fs.readdirSync(contentDirectory).filter((file) => file.endsWith(".md"));
  return files
    .map(parsePostFile)
    .sort((a, b) => +new Date(b.date) - +new Date(a.date));
}

export function getPostBySlug(slug: string): BlogPost | null {
  const fullPath = path.join(contentDirectory, `${slug}.md`);
  if (!fs.existsSync(fullPath)) return null;
  return parsePostFile(`${slug}.md`);
}

export function getFeaturedPosts(limit = 3) {
  return getAllPosts()
    .filter((post) => post.featured)
    .slice(0, limit);
}

export function getTrendingPosts(limit = 6) {
  return getAllPosts()
    .filter((post) => post.trending)
    .slice(0, limit);
}

export function getRelatedPosts(post: BlogPost, limit = 3) {
  return getAllPosts()
    .filter(
      (candidate) =>
        candidate.slug !== post.slug &&
        (candidate.category === post.category ||
          candidate.tags.some((tag) => post.tags.includes(tag))),
    )
    .slice(0, limit);
}

export function getCategories() {
  return [...new Set(getAllPosts().map((post) => post.category))];
}

export function upsertPost(slug: string, body: string) {
  const fullPath = path.join(contentDirectory, `${slug}.md`);
  fs.writeFileSync(fullPath, body, "utf8");
}

export function removePost(slug: string): boolean {
  const fullPath = path.join(contentDirectory, `${slug}.md`);
  if (!fs.existsSync(fullPath)) return false;
  fs.unlinkSync(fullPath);
  return true;
}
