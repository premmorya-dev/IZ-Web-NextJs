// components/faq/FAQHero.tsx
"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, ShieldCheck } from "lucide-react";

const floatingCards = [
  { label: "How do I add GST?", top: "12%", left: "4%", delay: 0 },
  { label: "Recurring invoices?", top: "68%", left: "2%", delay: 0.6 },
  { label: "UPI payments supported?", top: "22%", left: "82%", delay: 0.3 },
  { label: "Free plan limits?", top: "72%", left: "80%", delay: 0.9 },
];

export default function FAQHero() {
  return (
    <section className="relative overflow-hidden bg-[#0A0E1A] pt-28 pb-24 sm:pt-36 sm:pb-32">
      {/* Ledger-line texture: faint horizontal rules, nodding to invoice line items */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(to bottom, transparent, transparent 39px, rgba(148,163,184,0.6) 40px)",
        }}
      />

      {/* Ambient gradient blobs */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -top-32 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-gradient-to-br from-cyan-400/25 via-violet-500/20 to-transparent blur-[110px]"
        animate={{ scale: [1, 1.08, 1], opacity: [0.6, 0.85, 0.6] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute bottom-0 right-0 h-[380px] w-[380px] rounded-full bg-gradient-to-tl from-amber-400/10 via-violet-500/10 to-transparent blur-[100px]"
        animate={{ scale: [1, 1.12, 1] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />

      <div className="relative mx-auto max-w-4xl px-6 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm text-slate-300 backdrop-blur-md"
        >
          <Sparkles className="h-3.5 w-3.5 text-cyan-300" aria-hidden />
          Help Center
        </motion.div>

        {/* H1 */}
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-display text-4xl font-semibold tracking-tight text-white sm:text-5xl md:text-6xl"
        >
          Frequently Asked{" "}
          <span className="bg-gradient-to-r from-cyan-300 via-sky-300 to-violet-400 bg-clip-text text-transparent">
            Questions
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-slate-400 sm:text-lg"
        >
          Everything you need to know about Invoicezy, GST invoicing, billing,
          payments, clients, invoices and more.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row"
        >
          <Link
            href="/signup"
            className="group inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-cyan-400 to-violet-500 px-6 py-3.5 font-medium text-slate-950 shadow-[0_0_30px_-8px_rgba(34,211,238,0.6)] transition-transform hover:scale-[1.03] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300 sm:w-auto"
          >
            Start Creating Invoices for Free
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
          </Link>
          <Link
            href="/features"
            className="inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-white/15 bg-white/5 px-6 py-3.5 font-medium text-white backdrop-blur-md transition-colors hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/40 sm:w-auto"
          >
            Explore All Features
          </Link>
        </motion.div>

        {/* Signature element: rotating verified/paid stamp */}
        <motion.div
          initial={{ opacity: 0, scale: 0.7, rotate: -20 }}
          animate={{ opacity: 1, scale: 1, rotate: -12 }}
          transition={{ duration: 0.7, delay: 0.5, ease: "backOut" }}
          className="pointer-events-none absolute right-2 top-6 hidden select-none sm:right-10 sm:block md:right-16"
        >
          <motion.div
            animate={{ rotate: [-12, -8, -12] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="flex h-20 w-20 flex-col items-center justify-center rounded-full border-2 border-dashed border-amber-400/50 text-amber-300/80 sm:h-24 sm:w-24"
          >
            <ShieldCheck className="h-6 w-6" aria-hidden />
            <span className="mt-1 font-mono text-[9px] uppercase tracking-widest">
              Verified
            </span>
          </motion.div>
        </motion.div>
      </div>

      {/* Floating FAQ / question bubble cards */}
      <div aria-hidden className="pointer-events-none absolute inset-0 hidden lg:block">
        {floatingCards.map((card) => (
          <motion.div
            key={card.label}
            className="absolute rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-2.5 text-xs text-slate-300 shadow-lg backdrop-blur-md"
            style={{ top: card.top, left: card.left }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: [0, 1, 1, 1], y: [10, 0, -8, 0] }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: card.delay,
            }}
          >
            {card.label}
          </motion.div>
        ))}
      </div>
    </section>
  );
}
