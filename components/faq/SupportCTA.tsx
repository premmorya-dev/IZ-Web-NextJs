// components/faq/SupportCTA.tsx
"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { LifeBuoy, Mail } from "lucide-react";

export default function SupportCTA() {
  return (
    <section className="mx-auto max-w-4xl px-6 py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.5 }}
        className="relative overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.04] px-8 py-12 text-center backdrop-blur-md sm:px-14 sm:py-16"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute -top-20 left-1/2 h-52 w-52 -translate-x-1/2 rounded-full bg-violet-500/20 blur-[90px]"
        />
        <div className="relative mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/5">
          <LifeBuoy className="h-6 w-6 text-cyan-300" aria-hidden />
        </div>
        <h2 className="relative font-display text-2xl font-semibold text-white sm:text-3xl">
          Still have questions?
        </h2>
        <p className="relative mx-auto mt-3 max-w-md text-sm text-slate-400 sm:text-base">
          Our support team is happy to help with anything not covered above.
        </p>
        <div className="relative mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/contact"
            className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-cyan-400 to-violet-500 px-6 py-3 font-medium text-slate-950 transition-transform hover:scale-[1.03] sm:w-auto"
          >
            Contact Support
          </Link>
          <Link
            href="mailto:support@invoicezy.com"
            className="inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-white/15 bg-white/5 px-6 py-3 font-medium text-white transition-colors hover:bg-white/10 sm:w-auto"
          >
            <Mail className="h-4 w-4" aria-hidden />
            Email Us
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
