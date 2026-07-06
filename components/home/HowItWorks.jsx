"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Mail, QrCode, Send, Sparkles } from "lucide-react";
import SectionHeader from "@/components/shared/SectionHeader";
import { HOW_IT_WORKS_STEPS } from "@/lib/constants";
import { scrollReveal } from "@/lib/animations";
import { cn } from "@/lib/utils";

function StepVisual({ visual }) {
  if (visual === "form") {
    return (
      <div className="glass-card p-5">
        <div className="space-y-4 rounded-[28px] border border-white/10 bg-slate-950/80 p-5 light:border-slate-200 light:bg-white">
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 light:border-slate-200 light:bg-slate-50">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Business</p>
              <div className="mt-3 h-3 w-24 rounded-full bg-white/70 light:bg-slate-300" />
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 light:border-slate-200 light:bg-slate-50">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Client</p>
              <div className="mt-3 h-3 w-20 rounded-full bg-white/70 light:bg-slate-300" />
            </div>
          </div>
          {[0, 1, 2].map((row) => (
            <div key={row} className="grid grid-cols-[1.5fr_0.6fr_0.8fr] gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-4 light:border-slate-200 light:bg-slate-50">
              <div className="h-3 rounded-full bg-white/70 light:bg-slate-300" />
              <div className="h-3 rounded-full bg-white/20 light:bg-slate-200" />
              <div className="h-3 rounded-full bg-white/20 light:bg-slate-200" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (visual === "share") {
    return (
      <div className="glass-card p-5">
        <div className="space-y-4 rounded-[28px] border border-white/10 bg-slate-950/80 p-5 light:border-slate-200 light:bg-white">
          <div className="rounded-2xl border border-white/10 bg-primary/10 p-4 light:border-slate-200">
            <p className="text-sm font-semibold text-white light:text-slate-950">Invoice ready to share</p>
            <p className="mt-1 text-sm text-slate-400">Send via email or WhatsApp with payment link</p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 light:border-slate-200 light:bg-slate-50">
              <Mail className="h-5 w-5 text-primary-light" />
              <div className="mt-4 h-3 w-24 rounded-full bg-white/70 light:bg-slate-300" />
              <div className="mt-2 h-2 w-16 rounded-full bg-white/20 light:bg-slate-200" />
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 light:border-slate-200 light:bg-slate-50">
              <Send className="h-5 w-5 text-success-light" />
              <div className="mt-4 h-3 w-20 rounded-full bg-white/70 light:bg-slate-300" />
              <div className="mt-2 h-2 w-14 rounded-full bg-white/20 light:bg-slate-200" />
            </div>
          </div>
          <div className="rounded-2xl border border-dashed border-primary/40 bg-white/[0.03] p-4 light:border-slate-300 light:bg-slate-50">
            <div className="flex items-center justify-between text-sm text-slate-400">
              <span>Reminder Calender</span>
              <span className="text-primary-light">Every 3 days</span>
            </div>
            <div className="mt-4 flex gap-2">
              {['Email'].map((channel) => (
                <span key={channel} className="rounded-full border border-white/10 px-3 py-1 text-xs text-slate-300 light:border-slate-200 light:text-slate-600">
                  {channel}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="glass-card p-5">
      <div className="rounded-[28px] border border-white/10 bg-slate-950/80 p-5 light:border-slate-200 light:bg-white">
        <div className="grid gap-4 sm:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-4 light:border-slate-200 light:bg-slate-50">
            <div className="mb-3 flex items-center justify-between">
              <span className="text-xs uppercase tracking-[0.2em] text-slate-500">UPI QR</span>
              <QrCode className="h-4 w-4 text-primary-light" />
            </div>
            <div className="grid grid-cols-6 gap-1 rounded-2xl bg-white p-3">
              {Array.from({ length: 36 }).map((_, index) => (
                <span
                  key={index}
                  className={cn(
                    "aspect-square rounded-[2px]",
                    [0, 1, 5, 6, 7, 10, 11, 15, 17, 20, 23, 24, 28, 30, 31, 34].includes(index)
                      ? "bg-slate-950"
                      : "bg-slate-200"
                  )}
                />
              ))}
            </div>
          </div>
          <div className="rounded-3xl border border-success/30 bg-success/10 p-5">
            <Sparkles className="h-6 w-6 text-success-light" />
            <h4 className="mt-4 text-xl font-semibold text-white light:text-slate-950">Payment successful</h4>
            <p className="mt-2 text-sm text-slate-300 light:text-slate-600">{"\u20B945,000 collected instantly via UPI."}</p>
            <div className="mt-5 space-y-3">
              {["Invoice marked paid", "Receipts sent to client"].map((item) => (
                <div key={item} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/10 px-4 py-3 light:border-slate-200">
                  <CheckCircle2 className="h-4 w-4 text-success-light" />
                  <span className="text-sm text-white light:text-slate-950">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function HowItWorks() {
  return (
    <section className="py-24 sm:py-28">
      <div className="section-shell">
        <SectionHeader
          badge="How It Works"
          description="Create, send, and get paid with a workflow that feels effortless for your team and professional for your clients."
          icon={Sparkles}
          title="From Invoice to Payment in Three Easy Steps"
        />
        <div className="relative space-y-12 md:space-y-16">
          <div className="absolute left-[22px] top-16 hidden h-[calc(100%-8rem)] border-l border-dashed border-primary/40 md:block lg:left-1/2 lg:-translate-x-1/2" />
          {HOW_IT_WORKS_STEPS.map((step, index) => {
            const reversed = index % 2 === 1;
            return (
              <motion.div
                key={step.number}
                {...scrollReveal}
                className="grid gap-8 lg:grid-cols-2 lg:items-center"
              >
                <div className={cn("space-y-6", reversed ? "lg:order-2" : "lg:order-1")}>
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-primary/30 bg-primary/10 text-lg font-semibold text-primary-light">
                    {step.number}
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-3xl font-semibold text-white light:text-slate-950">{step.title}</h3>
                    <p className="max-w-xl text-base leading-7 text-slate-400 light:text-slate-600">{step.description}</p>
                  </div>
                  <div className="space-y-3">
                    {step.bullets.map((bullet) => (
                      <div key={bullet} className="flex items-start gap-3">
                        <CheckCircle2 className="mt-1 h-4 w-4 text-success-light" />
                        <span className="text-sm leading-6 text-slate-300 light:text-slate-700">{bullet}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className={cn(reversed ? "lg:order-1" : "lg:order-2")}>
                  <StepVisual visual={step.visual} />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
