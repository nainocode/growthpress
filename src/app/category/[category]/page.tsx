import { notFound } from "next/navigation";
import { PostCard } from "@/components/blog/post-card";
import { getAllPosts, getCategories } from "@/lib/posts";

export async function generateStaticParams() {
  return getCategories().map((category) => ({ category: category.toLowerCase() }));
}

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  const posts = getAllPosts().filter((post) => post.category.toLowerCase() === category);

  if (!posts.length) notFound();

  return (
    <section className="space-y-6">
      <h1 className="text-3xl font-bold capitalize">{category} Posts</h1>
      <div className="grid gap-4 md:grid-cols-3">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
    </section>
  );
}
