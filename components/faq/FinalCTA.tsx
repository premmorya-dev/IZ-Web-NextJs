// components/faq/FinalCTA.tsx
"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";

const trustIndicators = [
  "Free Forever Plan",
  "No Credit Card Required",
  "Secure Cloud Platform",
];

export default function FinalCTA() {
  return (
    <section className="relative overflow-hidden bg-[#0A0E1A] py-24">
      <motion.div
        aria-hidden
        className="pointer-events-none absolute left-1/4 top-0 h-[420px] w-[420px] rounded-full bg-gradient-to-br from-cyan-400/25 to-transparent blur-[110px]"
        animate={{ x: [0, 40, 0], y: [0, -20, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute right-1/4 bottom-0 h-[380px] w-[380px] rounded-full bg-gradient-to-tl from-violet-500/25 to-transparent blur-[110px]"
        animate={{ x: [0, -30, 0], y: [0, 20, 0] }}
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
          Ready to Simplify Your Business Billing?
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mx-auto mt-4 max-w-xl text-slate-400"
        >
          Create GST invoices, track payments, manage clients, and grow your
          business using Invoicezy.
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
            className="group inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-cyan-400 to-violet-500 px-6 py-3.5 font-medium text-slate-950 shadow-[0_0_30px_-8px_rgba(34,211,238,0.6)] transition-transform hover:scale-[1.03] sm:w-auto"
          >
            Start Creating Invoices for Free
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
          </Link>
          <Link
            href="/features"
            className="inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-white/15 bg-white/5 px-6 py-3.5 font-medium text-white transition-colors hover:bg-white/10 sm:w-auto"
          >
            Explore All Features
          </Link>
        </motion.div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
          {trustIndicators.map((item) => (
            <span key={item} className="inline-flex items-center gap-1.5 text-sm text-slate-400">
              <Check className="h-4 w-4 text-emerald-400" aria-hidden />
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
