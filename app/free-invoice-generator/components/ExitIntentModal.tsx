"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

/**
 * Fires once per session when a desktop visitor's mouse leaves the top of
 * the viewport (classic exit-intent signal). Skipped on touch devices since
 * there's no reliable mouse-leave signal there — the StickyCTA bar covers
 * mobile instead.
 */
export default function ExitIntentModal() {
  const [show, setShow] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem("izy-exit-intent-shown")) return;

    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !dismissed) {
        setShow(true);
        sessionStorage.setItem("izy-exit-intent-shown", "1");
      }
    };

    document.addEventListener("mouseleave", handleMouseLeave);
    return () => document.removeEventListener("mouseleave", handleMouseLeave);
  }, [dismissed]);

  if (!show) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="exit-intent-heading"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4"
    >
      <div className="relative w-full max-w-sm rounded-2xl border border-white/10 bg-[#0F1524] p-6 text-center shadow-2xl">
        <button
          type="button"
          onClick={() => {
            setShow(false);
            setDismissed(true);
          }}
          aria-label="Close"
          className="absolute right-3 top-3 text-white/40 hover:text-white/70"
        >
          ×
        </button>

        <h2
          id="exit-intent-heading"
          className="font-[Space_Grotesk] text-xl font-semibold text-white"
        >
          Don&apos;t lose this invoice
        </h2>
        <p className="mt-2 text-sm text-white/60">
          Save it to a free Invoicezy account in 15 seconds — your items,
          GST, and totals will still be here.
        </p>

        <Link
          href="/register"
          className="izy-btn-primary mt-5 block w-full rounded-lg bg-gradient-to-r from-cyan-400 to-violet-500 py-3 text-sm font-semibold text-[#0A0E1A]"
          onClick={() => setShow(false)}
        >
          Save My Invoice — Free
        </Link>
        <button
          type="button"
          onClick={() => {
            setShow(false);
            setDismissed(true);
          }}
          className="mt-3 text-xs text-white/40 hover:text-white/60"
        >
          Maybe later
        </button>
      </div>
    </div>
  );
}
