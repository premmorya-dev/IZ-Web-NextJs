"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BadgeCheck,
  CheckCircle2,
  CircleDollarSign,
  PlayCircle,
  Rocket,
  TrendingUp
} from "lucide-react";
import GradientBadge from "@/components/shared/GradientBadge";
import { buttonVariants } from "@/components/ui/button";
import { HERO_TRUST_POINTS } from "@/lib/constants";
import { cn } from "@/lib/utils";

const headlineLines = ["Create Invoices.", "Track Payments."];
const floatingCards = [
  {
    icon: CircleDollarSign,
    label: "Revenue: \u20B92,40,000",
    className: "right-0 top-10 lg:-right-8",
    initial: { opacity: 0, x: 40, y: 20 }
  },
  {
    icon: TrendingUp,
    label: "Growth +34%",
    className: "left-0 top-2 lg:-left-10",
    initial: { opacity: 0, x: -40, y: -12 }
  },
  {
    icon: BadgeCheck,
    label: "Payment received",
    className: "bottom-4 left-2 lg:-left-6",
    initial: { opacity: 0, x: -30, y: 30 }
  }
];

const particles = [
  "left-[4%] top-[12%]",
  "left-[12%] top-[75%]",
  "left-[26%] top-[32%]",
  "left-[38%] top-[14%]",
  "left-[52%] top-[82%]",
  "left-[67%] top-[18%]",
  "left-[74%] top-[58%]",
  "left-[88%] top-[28%]",
  "left-[92%] top-[72%]"
];

export default function Hero() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden pb-20 pt-32 sm:pb-24 lg:pt-36">
      <div className="hero-orb left-1/2 top-12 h-72 w-72 -translate-x-1/2 bg-primary/30" />
      <div className="hero-orb right-10 top-1/3 h-80 w-80 bg-accent/20" />
      <div className="hero-orb left-0 top-1/2 h-72 w-72 bg-fuchsia-600/15" />
      {particles.map((position, index) => (
        <motion.span
          key={position}
          animate={{ opacity: [0.2, 0.8, 0.2], y: [0, -10, 0] }}
          className={cn("absolute h-2 w-2 rounded-full bg-white/20", position)}
          transition={{ delay: index * 0.2, duration: 4 + index * 0.2, repeat: Infinity }}
        />
      ))}
      <div className="section-shell relative z-10 grid gap-14 lg:grid-cols-[1.02fr_0.98fr] lg:items-center">
        <div className="max-w-2xl space-y-8">
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <GradientBadge icon={Rocket} text="Trusted by 50,000+ businesses" />
          </motion.div>
          <div className="space-y-4">
            <div className="space-y-2">
              {headlineLines.map((line, lineIndex) => (
                <div key={line} className="flex flex-wrap gap-x-3 overflow-hidden text-5xl font-bold leading-tight text-white sm:text-6xl xl:text-7xl">
                  {line.split(" ").map((word, wordIndex) => (
                    <motion.span
                      key={`${line}-${word}`}
                      animate={{ opacity: 1, y: 0 }}
                      initial={{ opacity: 0, y: 28 }}
                      transition={{ delay: lineIndex * 0.16 + wordIndex * 0.08, duration: 0.55 }}
                    >
                      {word}
                    </motion.span>
                  ))}
                </div>
              ))}
            </div>
            <motion.h1
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl font-bold leading-tight sm:text-6xl xl:text-7xl"
              initial={{ opacity: 0, y: 32 }}
              transition={{ delay: 0.25, duration: 0.6 }}
            >
              <span className="gradient-text">Grow Your Business.</span>
            </motion.h1>
            <motion.p
              animate={{ opacity: 1, y: 0 }}
              className="max-w-xl text-lg leading-8 text-slate-300 light:text-slate-600"
              initial={{ opacity: 0, y: 24 }}
              transition={{ delay: 0.35, duration: 0.55 }}
            >
              All-in-one GST invoicing, UPI payments, expense tracking and business reports - built for Indian businesses.
            </motion.p>
          </div>
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col gap-4 sm:flex-row"
            initial={{ opacity: 0, y: 24 }}
            transition={{ delay: 0.45, duration: 0.55 }}
          >
            <Link className={buttonVariants({ size: "lg" })} href="/register">
              Start Free - It&apos;s Free
              <ArrowRight className="h-5 w-5" />
            </Link>
            <Link className={buttonVariants({ variant: "secondary", size: "lg" })} href="/features">
              <PlayCircle className="h-5 w-5" />
              Watch Demo
            </Link>
          </motion.div>
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-wrap gap-4 text-sm text-slate-400 light:text-slate-600"
            initial={{ opacity: 0, y: 18 }}
            transition={{ delay: 0.55, duration: 0.55 }}
          >
            {HERO_TRUST_POINTS.map((item) => (
              <div key={item} className="inline-flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-success-light" />
                <span>{item}</span>
              </div>
            ))}
          </motion.div>
        </div>
        <motion.div
          animate={{ opacity: 1, y: 0 }}
          className="relative mx-auto w-full max-w-xl"
          initial={{ opacity: 0, y: 24 }}
          transition={{ delay: 0.25, duration: 0.7 }}
        >
          <div className="absolute inset-8 rounded-full bg-primary/25 blur-[120px]" />
          {floatingCards.map((card, index) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.label}
                animate={{ opacity: 1, x: 0, y: 0 }}
                className={cn(
                  "glass-card absolute z-20 hidden items-center gap-3 px-4 py-3 text-sm text-white shadow-glow md:flex",
                  card.className
                )}
                initial={card.initial}
                transition={{ delay: 0.5 + index * 0.12, duration: 0.45 }}
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/10 text-primary-light">
                  <Icon className="h-5 w-5" />
                </span>
                <span>{card.label}</span>
              </motion.div>
            );
          })}
          <motion.div
            animate={{ y: [0, -8, 0] }}
            className="glass-card relative overflow-hidden p-5 shadow-[0_30px_90px_rgba(2,6,23,0.55)]"
            transition={{ duration: 5, ease: "easeInOut", repeat: Infinity }}
          >
            <div className="absolute inset-0 bg-mesh-gradient opacity-50" />
            <div className="relative rounded-[28px] border border-white/10 bg-slate-950/80 p-5 light:border-slate-200 light:bg-white">
              <div className="flex items-center justify-between border-b border-white/10 pb-4 light:border-slate-200">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Invoice snapshot</p>
                  <p className="mt-2 text-2xl font-semibold text-white light:text-slate-950">#INV-2024</p>
                </div>
                <div className="rounded-full border border-success/30 bg-success/10 px-4 py-2 text-sm font-medium text-success-light">
                  PAID
                </div>
              </div>
              <div className="grid gap-4 py-5 sm:grid-cols-2">
                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 light:border-slate-200 light:bg-slate-50">
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Amount</p>
                  <p className="mt-3 text-3xl font-semibold text-white light:text-slate-950">{"\u20B945,000"}</p>
                  <p className="mt-2 text-sm text-slate-400">Collected via UPI QR in 1 click</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 light:border-slate-200 light:bg-slate-50">
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Client</p>
                  <p className="mt-3 text-lg font-semibold text-white light:text-slate-950">Sharma Traders</p>
                  <p className="mt-2 text-sm text-slate-400">Auto-reminders sent on WhatsApp</p>
                </div>
              </div>
              <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-4 light:border-slate-200 light:bg-slate-50">
                <div className="mb-4 flex items-center justify-between">
                  <p className="text-sm font-medium text-white light:text-slate-950">Collections overview</p>
                  <p className="text-xs text-success-light">+18.4%</p>
                </div>
                <div className="grid grid-cols-6 items-end gap-3">
                  {[36, 50, 42, 62, 78, 91].map((height, index) => (
                    <div key={height} className="flex flex-col items-center gap-2">
                      <div
                        className={cn(
                          "w-full rounded-t-2xl bg-gradient-to-t from-primary to-accent",
                          index === 5 ? "shadow-[0_0_18px_rgba(6,182,212,0.35)]" : ""
                        )}
                        style={{ height: `${height}px` }}
                      />
                      <span className="text-[10px] uppercase tracking-[0.15em] text-slate-500">{["Jan", "Feb", "Mar", "Apr", "May", "Jun"][index]}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
