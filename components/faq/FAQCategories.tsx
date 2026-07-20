// components/faq/FAQCategories.tsx
"use client";

import { motion } from "framer-motion";
import type { FAQCategory } from "@/lib/faq-data";
import { faqCategories } from "@/lib/faq-data";

interface FAQCategoriesProps {
  active: FAQCategory;
  onChange: (category: FAQCategory) => void;
}

export default function FAQCategories({ active, onChange }: FAQCategoriesProps) {
  return (
    <div
      className="mx-auto mt-8 flex max-w-4xl gap-2 overflow-x-auto px-6 pb-2 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
      role="tablist"
      aria-label="FAQ categories"
    >
      {faqCategories.map((cat) => {
        const isActive = cat === active;
        return (
          <button
            key={cat}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(cat)}
            className={`relative shrink-0 rounded-full px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300 ${
              isActive ? "text-slate-950" : "text-slate-300 hover:text-white"
            }`}
          >
            {isActive && (
              <motion.span
                layoutId="active-category-pill"
                className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-300 to-violet-400"
                transition={{ type: "spring", stiffness: 400, damping: 32 }}
              />
            )}
            {!isActive && (
              <span className="absolute inset-0 rounded-full border border-white/10 bg-white/[0.04]" />
            )}
            <span className="relative">{cat}</span>
          </button>
        );
      })}
    </div>
  );
}
