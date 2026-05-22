import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import { CommentBox } from "@/components/blog/comment-box";
import { RelatedPosts } from "@/components/blog/related-posts";
import { SocialShare } from "@/components/blog/social-share";
import { TableOfContents } from "@/components/blog/table-of-contents";
import { AffiliateProducts } from "@/components/marketing/affiliate-products";
import { AdSlot } from "@/components/marketing/ad-slot";
import { blogPostingSchema, siteConfig } from "@/lib/seo";
import { getAllPosts, getPostBySlug, getRelatedPosts } from "@/lib/posts";
import { formatDate } from "@/lib/utils";
import AuthorBox from "@/components/AuthorBox";


export async function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      images: [post.featuredImage],
    },
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const relatedPosts = getRelatedPosts(post);
  const schema = blogPostingSchema(post);
  const baseUrl = siteConfig.url.replace(/\/+$/, "");
  const shareUrl = `${baseUrl}/blog/${slug}`;


  return (
    <>
      <script
        id={`jsonld-${post.slug}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <article className="grid gap-8 lg:grid-cols-[1fr_280px]">
        <div>
          <p className="text-sm uppercase tracking-wide text-zinc-500">
            {post.category}
          </p>
          <h1 className="mt-2 text-4xl font-bold leading-tight">{post.title}</h1>
          <p className="mt-3 text-zinc-600 dark:text-zinc-300">
            {post.description}
          </p>
          <p className="mt-4 text-sm text-zinc-500">
            {formatDate(post.date)} - {post.readingTimeText} - {post.author}
          </p>

          <div className="mt-6 overflow-hidden rounded-2xl">
            <Image
              src={post.featuredImage}
              alt={post.title}
              width={1200}
              height={620}
              priority
              unoptimized={post.featuredImage.endsWith(".svg")}
              className="w-full object-cover"
              suppressHydrationWarning
            />
          </div>
          <div className="mt-6">
            <SocialShare title={post.title} url={shareUrl} />
          </div>

          <div className="my-6">
            <AdSlot slot="in-article" />
          </div>

          <div className="prose prose-zinc max-w-none dark:prose-invert">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeSlug, rehypeAutolinkHeadings]}
            >
              {post.content}
            </ReactMarkdown>
          </div>

          <AffiliateProducts items={post.affiliateProducts ?? []} />
          <RelatedPosts posts={relatedPosts} />
          <CommentBox />
        </div>

        <aside className="space-y-4 lg:sticky lg:top-24 lg:h-fit">
          <TableOfContents headings={post.headings} />   
           <AdSlot slot="sidebar" />
          <article className="max-w-4xl mx-auto px-4">
            <AuthorBox
              name="Husnain Raza"
              bio="Husnain Raza is a full-stack developer with experience in WordPress, SEO, blogging, and AI-powered workflows. He writes practical content about web development, blogging, automation, and digital growth."
            />
          </article>
        </aside>



      </article>
    </>
  );
}