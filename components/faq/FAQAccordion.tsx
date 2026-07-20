// components/faq/FAQAccordion.tsx
"use client";

import { useState, Fragment } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, FileQuestion } from "lucide-react";
import type { FAQItem } from "@/lib/faq-data";

// Renders answer text, converting [label](/path) markers into real
// internal <Link> elements without needing a markdown dependency.
function FAQAnswer({ text }: { text: string }) {
  const linkPattern = /\[([^\]]+)\]\(([^)]+)\)/g;
  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let key = 0;

  while ((match = linkPattern.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(<Fragment key={key++}>{text.slice(lastIndex, match.index)}</Fragment>);
    }
    parts.push(
      <Link
        key={key++}
        href={match[2]}
        className="font-medium text-cyan-300 underline decoration-cyan-300/30 underline-offset-2 transition-colors hover:text-cyan-200 hover:decoration-cyan-200/60"
      >
        {match[1]}
      </Link>
    );
    lastIndex = linkPattern.lastIndex;
  }
  if (lastIndex < text.length) {
    parts.push(<Fragment key={key++}>{text.slice(lastIndex)}</Fragment>);
  }

  return <p className="text-[15px] leading-relaxed text-slate-400 sm:text-base">{parts}</p>;
}

interface FAQAccordionProps {
  items: FAQItem[];
}

export default function FAQAccordion({ items }: FAQAccordionProps) {
  const [openId, setOpenId] = useState<string | null>(items[0]?.id ?? null);

  if (items.length === 0) {
    return (
      <div className="mx-auto flex max-w-2xl flex-col items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-6 py-16 text-center">
        <FileQuestion className="h-8 w-8 text-slate-500" aria-hidden />
        <p className="text-slate-300">No questions match your search.</p>
        <p className="text-sm text-slate-500">
          Try a different keyword, or{" "}
          <Link href="/contact" className="text-cyan-300 underline underline-offset-2">
            contact support
          </Link>{" "}
          directly.
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-3">
      {items.map((item) => {
        const isOpen = openId === item.id;
        return (
          <div
            key={item.id}
            className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-sm transition-colors hover:border-white/20"
          >
            <h3 className="m-0">
              <button
                type="button"
                onClick={() => setOpenId(isOpen ? null : item.id)}
                aria-expanded={isOpen}
                aria-controls={`faq-panel-${item.id}`}
                id={`faq-trigger-${item.id}`}
                className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-cyan-300 sm:px-6"
              >
                <span className="text-[15px] font-semibold text-white sm:text-base">
                  {item.question}
                </span>
                <motion.span
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.25 }}
                  className="shrink-0 rounded-full border border-white/10 bg-white/5 p-1.5"
                >
                  <ChevronDown className="h-4 w-4 text-slate-300" aria-hidden />
                </motion.span>
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  key="content"
                  id={`faq-panel-${item.id}`}
                  role="region"
                  aria-labelledby={`faq-trigger-${item.id}`}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <div className="px-5 pb-5 sm:px-6">
                    <FAQAnswer text={item.answer} />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
