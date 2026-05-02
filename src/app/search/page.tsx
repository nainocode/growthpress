import { SearchPosts } from "@/components/blog/search-posts";
import { getAllPosts } from "@/lib/posts";

export default function SearchPage() {
  const posts = getAllPosts();

  return (
    <section className="space-y-6">
      <h1 className="text-3xl font-bold">Search Posts</h1>
      <SearchPosts posts={posts} />
    </section>
  );
}
