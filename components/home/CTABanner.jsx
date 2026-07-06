"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Headphones } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";

export default function CTABanner() {
  return (
    <section className="pb-24 pt-8 sm:pb-28">
      <div className="section-shell">
        <motion.div
          animate={{ opacity: 1, y: 0 }}
          className="relative overflow-hidden rounded-[32px] border border-primary/40 bg-primary-gradient px-6 py-12 text-center shadow-[0_30px_100px_rgba(79,70,229,0.35)] sm:px-10 sm:py-16"
          initial={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.45 }}
        >
          <div className="mesh-overlay absolute inset-0 opacity-25" />
          <div className="hero-orb -left-10 top-1/2 h-48 w-48 -translate-y-1/2 bg-white/20" />
          <div className="hero-orb -right-10 top-0 h-48 w-48 bg-accent/25" />
          <div className="relative z-10 mx-auto max-w-3xl space-y-5">
            <h2 className="text-balance text-4xl font-semibold text-white sm:text-5xl">
              Start Creating Professional Invoices Today
            </h2>
            <p className="text-balance text-base leading-7 text-indigo-100 sm:text-lg">
              Join 50,000+ businesses. Free forever. No credit card required.
            </p>
            <div className="flex flex-col justify-center gap-4 pt-4 sm:flex-row">
              <Link className={buttonVariants({ variant: "light", size: "lg" })} href="/register">
                Get Started Free
                <ArrowRight className="h-5 w-5" />
              </Link>
              <Link className={buttonVariants({ variant: "outline", size: "lg" })} href="/pricing">
                <Headphones className="h-5 w-5" />
                Talk to Sales
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
