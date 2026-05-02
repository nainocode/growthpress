import Image from "next/image";
import Link from "next/link";
import type { BlogPost } from "@/lib/types";
import { formatDate } from "@/lib/utils";

export function PostCard({ post }: { post: BlogPost }) {
  return (
    <article className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900">
      <Image
        src={post.featuredImage}
        alt={post.title}
        width={800}
        height={420}
        loading="lazy"
        unoptimized={post.featuredImage.endsWith(".svg")}
        className="h-48 w-full object-cover"
        suppressHydrationWarning
      />
      <div className="p-5">
        <p className="text-xs uppercase tracking-wide text-zinc-500">{post.category}</p>
        <h3 className="mt-2 text-lg font-semibold">
          <Link href={`/blog/${post.slug}`}>{post.title}</Link>
        </h3>
        <p className="mt-2 line-clamp-2 text-sm leading-snug text-zinc-600 dark:text-zinc-300">{post.description}</p>
        <p className="mt-2">
          <Link
            href={`/blog/${post.slug}`}
            className="text-sm font-medium text-emerald-700 hover:underline dark:text-emerald-400"
          >
            Read more
          </Link>
        </p>
        <p className="mt-4 text-xs text-zinc-500">
          {formatDate(post.date)} - {post.readingTimeText}
        </p>
      </div>
    </article>
  );
}
