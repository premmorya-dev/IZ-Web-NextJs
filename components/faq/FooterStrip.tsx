// components/faq/FooterStrip.tsx
"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function FooterStrip() {
  return (
    <div className="border-t border-white/5 bg-[#0A0E1A] py-8">
      <div className="mx-auto flex max-w-4xl flex-col items-center justify-between gap-4 px-6 sm:flex-row">
        <div>
          <p className="text-sm font-medium text-white">Need invoice software?</p>
          <p className="text-sm text-slate-500">Start in less than 60 seconds.</p>
        </div>
        <Link
          href="/signup"
          className="inline-flex items-center gap-1.5 rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-white/10"
        >
          Get Started
          <ArrowRight className="h-3.5 w-3.5" aria-hidden />
        </Link>
      </div>
    </div>
  );
}
