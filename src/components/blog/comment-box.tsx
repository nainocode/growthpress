"use client";

import { type FormEvent, useState } from "react";

interface Comment {
  name: string;
  message: string;
}

export function CommentBox() {
  const [comments, setComments] = useState<Comment[]>([]);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const submit = (event: FormEvent) => {
    event.preventDefault();
    if (!name || !message) return;
    setComments((prev) => [{ name, message }, ...prev]);
    setName("");
    setMessage("");
  };

  return (
    <section className="mt-10 rounded-2xl border border-zinc-200 p-6 dark:border-zinc-800">
      <h3 className="text-xl font-semibold">Comments</h3>
      <form onSubmit={submit} className="mt-4 space-y-3">
        <input
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="Your name"
          className="w-full rounded-lg border border-zinc-300 px-3 py-2 dark:border-zinc-700 dark:bg-zinc-900"
        />
        <textarea
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          placeholder="Your thoughts"
          rows={4}
          className="w-full rounded-lg border border-zinc-300 px-3 py-2 dark:border-zinc-700 dark:bg-zinc-900"
        />
        <button className="rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white dark:bg-zinc-100 dark:text-zinc-900">
          Post Comment
        </button>
      </form>

      <div className="mt-6 space-y-3">
        {comments.map((comment, index) => (
          <article key={`${comment.name}-${index}`} className="rounded-lg bg-zinc-100 p-3 dark:bg-zinc-900">
            <p className="text-sm font-medium">{comment.name}</p>
            <p className="text-sm text-zinc-600 dark:text-zinc-300">{comment.message}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
