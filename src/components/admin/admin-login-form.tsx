"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export function AdminLoginForm() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setStatus("Signing in...");

    const response = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    if (!response.ok) {
      setLoading(false);
      setStatus("Invalid password or ADMIN_PASSWORD not set.");
      return;
    }

    setStatus("Success. Redirecting...");
    router.push("/admin");
    router.refresh();
  };

  return (
    <section className="mx-auto max-w-md space-y-5 rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
      <h1 className="text-2xl font-semibold">Admin Login</h1>
      <p className="text-sm text-zinc-600 dark:text-zinc-300">Set ADMIN_PASSWORD and ADMIN_SESSION_SECRET in .env.local before production.</p>

      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="Enter admin password"
          className="w-full rounded-lg border border-zinc-300 px-3 py-2 dark:border-zinc-700 dark:bg-zinc-950"
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-zinc-900 px-4 py-2 text-sm text-white disabled:opacity-60 dark:bg-zinc-100 dark:text-zinc-900"
        >
          {loading ? "Please wait..." : "Login"}
        </button>
      </form>

      <p className="text-sm text-zinc-600 dark:text-zinc-300">{status}</p>
    </section>
  );
}
