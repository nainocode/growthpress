"use client";

import { useEffect } from "react";

interface AdSlotProps {
  slot: string;
}

declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

export function AdSlot({ slot }: AdSlotProps) {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.log("AdSense error:", e);
    }
  }, []);

  return (
    <ins
      className="adsbygoogle"
      style={{ display: "block" }}
      data-ad-client="ca-pub-4412628459194919"
      data-ad-slot={slot}
      data-ad-format="auto"
      data-full-width-responsive="true"
    />
  );
}