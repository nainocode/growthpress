import type { ReactNode } from "react";

export function LegalProse({
  title,
  lead,
  children,
}: {
  title: string;
  lead?: string;
  children: ReactNode;
}) {
  return (
    <article className="mx-auto max-w-3xl space-y-8">
      <header className="space-y-3 border-b border-zinc-200 pb-8 dark:border-zinc-800">
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">{title}</h1>
        {lead ? <p className="text-lg text-zinc-600 dark:text-zinc-400">{lead}</p> : null}
      </header>
      <div className="prose prose-zinc max-w-none dark:prose-invert prose-headings:scroll-mt-24 prose-a:text-emerald-700 prose-a:no-underline hover:prose-a:underline dark:prose-a:text-emerald-400">
        {children}
      </div>
    </article>
  );
}
