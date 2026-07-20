// components/blog/BlogHero.tsx
"use client";

import { motion } from "framer-motion";

export default function BlogHero() {
  return (
    <section className="relative overflow-hidden bg-[#0A0E1A] pt-28 pb-20 sm:pt-36 sm:pb-24">
      {/* Ambient gradient blobs, consistent with the rest of the site */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -top-32 left-1/2 h-[480px] w-[480px] -translate-x-1/2 rounded-full bg-gradient-to-br from-cyan-400/20 via-violet-500/20 to-transparent blur-[110px]"
        animate={{ scale: [1, 1.08, 1], opacity: [0.6, 0.85, 0.6] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute bottom-0 right-0 h-[360px] w-[360px] rounded-full bg-gradient-to-tl from-amber-400/10 via-violet-500/10 to-transparent blur-[100px]"
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />

      <div className="relative mx-auto max-w-3xl px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mx-auto mb-6 inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm text-slate-300 backdrop-blur-md"
        >
          Resource Center
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mx-auto max-w-5xl text-center font-display text-4xl font-semibold tracking-tight text-white sm:text-5xl md:text-6xl"
        >
          Latest Buisness Guides
          
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-slate-400 sm:text-lg"
        >
          Learn invoicing, GST, payments and business growth with expert
          articles from Invoicezy.
        </motion.p>
      </div>
    </section>
  );
}
