// components/blog/BlogCTA.tsx
"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

/**
 * Shared closing CTA, reused on both /blog and /blog/[slug].
 * Client component only because of the hover/scroll motion —
 * the content itself is static.
 */
export default function BlogCTA() {
  return (
    <section className="relative overflow-hidden bg-[#0A0E1A] py-24">
      <motion.div
        aria-hidden
        className="pointer-events-none absolute left-1/4 top-0 h-[380px] w-[380px] rounded-full bg-gradient-to-br from-cyan-400/20 to-transparent blur-[110px]"
        animate={{ x: [0, 30, 0], y: [0, -15, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute right-1/4 bottom-0 h-[340px] w-[340px] rounded-full bg-gradient-to-tl from-violet-500/20 to-transparent blur-[110px]"
        animate={{ x: [0, -25, 0], y: [0, 15, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />

      <div className="relative mx-auto max-w-3xl px-6 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className="font-display text-3xl font-semibold text-white sm:text-4xl"
        >
          Ready to Simplify Your Billing?
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mx-auto mt-4 max-w-xl text-slate-400"
        >
          Create GST invoices, manage clients and get paid faster with
          Invoicezy.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row"
        >
          <Link
            href="/signup"
            className="inline-flex items-center gap-2 rounded-xl font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 disabled:pointer-events-none disabled:opacity-60 primary-button text-white shadow-[0_20px_60px_rgba(79,70,229,0.35)] hover:shadow-[0_25px_70px_rgba(79,70,229,0.45)] h-14 px-8 text-base w-full justify-center sm:w-auto"
          >
            Start Creating Invoices for Free
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
          </Link>
          <Link
            href="/features"
            className="inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-white/15 bg-white/5 px-6 py-3.5 font-medium text-white transition-colors hover:bg-white/10 sm:w-auto"
          >
            Explore Features
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
