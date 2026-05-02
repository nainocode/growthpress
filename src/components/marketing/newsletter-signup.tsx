import Link from "next/link";

export function NewsletterSignup() {
  return (
    <section className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
      <h2 className="text-2xl font-semibold">Join the newsletter</h2>
      <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">
        Weekly practical insights on traffic growth, monetization, and AI workflows.
      </p>
      <form className="mt-4 flex flex-col gap-3 sm:flex-row">
        <input
          type="email"
          placeholder="you@example.com"
          className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 dark:border-zinc-700 dark:bg-zinc-950"
        />
        <button className="rounded-xl bg-zinc-900 px-5 py-3 text-sm font-medium text-white hover:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-900">
          Subscribe
        </button>
      </form>
      <p className="mt-3 text-xs text-zinc-500">Integrate with ConvertKit or Mailchimp later.</p>
      <Link href="/admin" className="mt-4 inline-block text-sm text-zinc-700 underline dark:text-zinc-300">
        Manage posts in admin dashboard
      </Link>
    </section>
  );
}
