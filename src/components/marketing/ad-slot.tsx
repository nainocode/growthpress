interface AdSlotProps {
  slot: "header" | "in-article" | "sidebar";
}

export function AdSlot({ slot }: AdSlotProps) {
  return (
    <div className="rounded-xl border border-dashed border-zinc-300 bg-zinc-50 p-4 text-center text-sm text-zinc-500 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-400">
      <p className="font-medium uppercase tracking-wide">AdSense Slot: {slot}</p>
      <p className="mt-1 text-xs">Replace with Google AdSense script unit in production.</p>
    </div>
  );
}
