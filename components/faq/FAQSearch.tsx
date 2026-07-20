// components/faq/FAQSearch.tsx
"use client";

import { Search, X } from "lucide-react";

interface FAQSearchProps {
  value: string;
  onChange: (value: string) => void;
  resultCount: number;
}

export default function FAQSearch({ value, onChange, resultCount }: FAQSearchProps) {
  return (
    <div className="mx-auto -mt-8 max-w-2xl px-6 sm:-mt-10">
      <div className="relative">
        <Search
          className="pointer-events-none absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400"
          aria-hidden
        />
        <input
          type="search"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Search FAQs..."
          aria-label="Search frequently asked questions"
          className="w-full rounded-2xl border border-white/10 bg-white/[0.06] py-4 pl-14 pr-12 text-white placeholder:text-slate-500 shadow-2xl backdrop-blur-xl transition-colors focus:border-cyan-400/50 focus:outline-none focus:ring-2 focus:ring-cyan-400/30"
        />
        {value.length > 0 && (
          <button
            type="button"
            onClick={() => onChange("")}
            aria-label="Clear search"
            className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full p-1 text-slate-400 transition-colors hover:bg-white/10 hover:text-white"
          >
            <X className="h-4 w-4" aria-hidden />
          </button>
        )}
      </div>
      {value.length > 0 && (
        <p className="mt-3 text-center text-sm text-slate-400" role="status" aria-live="polite">
          {resultCount} {resultCount === 1 ? "result" : "results"} for &ldquo;{value}&rdquo;
        </p>
      )}
    </div>
  );
}
