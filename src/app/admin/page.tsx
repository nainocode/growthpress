import { redirect } from "next/navigation";
import { AdminEditor } from "@/components/admin/admin-editor";
import { clearAdminSessionCookie, isAdminAuthenticated } from "@/lib/admin-auth";
import { getAllPosts } from "@/lib/posts";

export default async function AdminPage() {
  async function logoutAction() {
    "use server";
    await clearAdminSessionCookie();
    redirect("/");
  }

  const isAuthed = await isAdminAuthenticated();

  if (!isAuthed) {
    redirect("/admin/login");
  }

  const posts = getAllPosts();

  return (
    <section className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-zinc-600 dark:text-zinc-300">Secure editor for creating, updating, and deleting posts.</p>
        </div>
        <form action={logoutAction}>
          <button className="rounded-lg border border-zinc-300 px-4 py-2 text-sm hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-900">
            Logout
          </button>
        </form>
      </div>

      <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-800 dark:border-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-300">
        Security enabled: protected session cookie, authenticated API writes, slug validation, and safe image uploads.
      </div>

      <AdminEditor existingPosts={posts} />

      <div className="rounded-xl border border-zinc-200 p-4 dark:border-zinc-800">
        <h2 className="text-lg font-semibold">Existing Posts</h2>
        <ul className="mt-3 space-y-2 text-sm">
          {posts.map((post) => (
            <li key={post.slug} className="flex items-center justify-between gap-3">
              <span>{post.title}</span>
              <span className="rounded bg-zinc-100 px-2 py-0.5 text-xs dark:bg-zinc-800">{post.slug}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
