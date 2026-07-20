"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BadgeCheck,
  Boxes,
  CloudUpload,
  FileText,
  Flag,
  PenLine,
  QrCode,
  Receipt,
  RefreshCw,
  Sparkles,
  Zap
} from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/* -------------------------------------------------------------------------- */
/*  Content                                                                    */
/* -------------------------------------------------------------------------- */

const TRUST_POINTS = [
  { icon: BadgeCheck, label: "No Credit Card Required" },
  { icon: Sparkles, label: "Free Forever Plan" },
  { icon: Zap, label: "Setup in 30 Seconds" },
  { icon: Flag, label: "Made in India" },
  { icon: FileText, label: "GST Ready" },
  { icon: CloudUpload, label: "Secure Cloud Storage" }
];

const FLOATING_CARDS = [
  {
    icon: FileText,
    label: "GST Ready",
    position: "left-2 top-4 lg:-left-10 lg:top-6",
    initial: { opacity: 0, x: -32, y: -16 }
  },
  {
    icon: QrCode,
    label: "UPI Payments",
    position: "right-0 top-16 lg:-right-10 lg:top-20",
    initial: { opacity: 0, x: 32, y: -16 }
  },
  {
    icon: RefreshCw,
    label: "Recurring Invoices",
    position: "left-4 bottom-24 lg:-left-12 lg:bottom-28",
    initial: { opacity: 0, x: -32, y: 16 }
  },
  {
    icon: PenLine,
    label: "Digital Signature",
    position: "right-2 bottom-6 lg:-right-8 lg:bottom-8",
    initial: { opacity: 0, x: 32, y: 16 }
  }
];

const CAPABILITY_CHIPS = [
  { icon: Boxes, label: "Inventory" },
  { icon: CloudUpload, label: "Cloud Backup" },
  { icon: BadgeCheck, label: "Payment Reminders" }
];

const PRICING_PREVIEW = [
  {
    name: "Free",
    price: "\u20B90",
    suffix: "/ forever",
    detail: "10 invoices / month",
    recommended: false
  },
  {
    name: "Pro",
    price: "\u20B9299",
    suffix: "/ month",
    detail: "Unlimited invoices & clients",
    recommended: true
  }
];

const STATUS_STYLES = {
  Paid: "border-success/30 bg-success/10 text-success-light",
  Pending: "border-amber-400/30 bg-amber-400/10 text-amber-300",
  Overdue: "border-rose-400/30 bg-rose-400/10 text-rose-300"
};

const RECENT_INVOICES = [
  { id: "INV-2049", client: "Sharma Traders", amount: "\u20B945,000", status: "Paid" },
  { id: "INV-2048", client: "Nair Textiles", amount: "\u20B912,400", status: "Pending" },
  { id: "INV-2047", client: "Verma Consulting", amount: "\u20B98,750", status: "Overdue" }
];

const RECENT_CLIENTS = [
  { initials: "ST", name: "Sharma Traders" },
  { initials: "NT", name: "Nair Textiles" },
  { initials: "VC", name: "Verma Consulting" },
  { initials: "KE", name: "Kapoor Electronics" }
];

const INVOICE_TREND = [
  { label: "Wk 1", value: 5 },
  { label: "Wk 2", value: 7 },
  { label: "Wk 3", value: 6 },
  { label: "Wk 4", value: 9 },
  { label: "Wk 5", value: 8 },
  { label: "Wk 6", value: 11 }
];

const INVOICE_STAGES = [
  { label: "Draft", icon: FileText },
  { label: "Pending", icon: QrCode },
  { label: "Paid", icon: BadgeCheck }
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

/* -------------------------------------------------------------------------- */
/*  Motion helpers                                                            */
/* -------------------------------------------------------------------------- */

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay, duration: 0.55, ease: "easeOut" }
  })
};

function Reveal({ children, delay = 0, className }) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      animate="visible"
      custom={delay}
      variants={fadeUp}
    >
      {children}
    </motion.div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Small presentational pieces                                              */
/* -------------------------------------------------------------------------- */

function TrustStrip() {
  return (
    <ul className="grid grid-cols-2 gap-x-3 gap-y-2.5 text-xs text-slate-400 light:text-slate-600 sm:flex sm:flex-wrap sm:gap-x-5 sm:gap-y-3 sm:text-sm">
      {TRUST_POINTS.map((item) => (
        <li key={item.label} className="inline-flex items-center gap-1.5 sm:gap-2">
          <item.icon className="h-3.5 w-3.5 shrink-0 text-success-light sm:h-4 sm:w-4" aria-hidden="true" />
          <span className="truncate">{item.label}</span>
        </li>
      ))}
    </ul>
  );
}

function CapabilityChips() {
  return (
    <div className="hidden flex-wrap gap-2 sm:flex">
      {CAPABILITY_CHIPS.map((chip) => (
        <span
          key={chip.label}
          className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-slate-300 light:border-slate-200 light:bg-slate-50 light:text-slate-600"
        >
          <chip.icon className="h-3.5 w-3.5" aria-hidden="true" />
          {chip.label}
        </span>
      ))}
    </div>
  );
}

function PricingPreview() {
  return (
    <div
      className="grid grid-cols-2 gap-2.5 sm:gap-3"
      role="group"
      aria-label="Invoicezy pricing preview"
    >
      {PRICING_PREVIEW.map((plan) => (
        <div
          key={plan.name}
          className={cn(
            "relative rounded-xl border p-3 sm:rounded-2xl sm:p-4",
            plan.recommended
              ? "border-primary/40 bg-primary/[0.08] shadow-[0_0_0_1px_rgba(99,102,241,0.15)]"
              : "border-white/10 bg-white/[0.03] light:border-slate-200 light:bg-slate-50"
          )}
        >
          {plan.recommended ? (
            <span className="absolute -top-2.5 right-3 rounded-full bg-primary px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wide text-white sm:right-4 sm:px-2.5 sm:text-[10px]">
              Recommended
            </span>
          ) : null}
          <p className="text-[10px] uppercase tracking-[0.2em] text-slate-500 sm:text-xs">{plan.name}</p>
          <p className="mt-1.5 flex items-baseline gap-1 text-white light:text-slate-950">
            <span className="text-xl font-semibold sm:text-2xl">{plan.price}</span>
            <span className="text-[10px] text-slate-400 light:text-slate-500 sm:text-xs">{plan.suffix}</span>
          </p>
          <p className="mt-1 text-[10px] text-slate-400 light:text-slate-600 sm:text-xs">{plan.detail}</p>
        </div>
      ))}
    </div>
  );
}

function FloatingChip({ icon: Icon, label, position, initial, delay }) {
  return (
    <motion.div
      initial={initial}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={{ delay, duration: 0.5, ease: "easeOut" }}
      className={cn(
        "glass-card absolute z-20 hidden items-center gap-2 px-3 py-2 text-[11px] font-medium text-white shadow-glow md:flex lg:gap-2.5 lg:px-3.5 lg:py-2.5 lg:text-xs",
        position
      )}
    >
      <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-white/10 text-primary-light">
        <Icon className="h-4 w-4" aria-hidden="true" />
      </span>
      {label}
    </motion.div>
  );
}

function StatusPill({ status }) {
  return (
    <span
      className={cn(
        "rounded-full border px-2.5 py-1 text-[11px] font-medium",
        STATUS_STYLES[status]
      )}
    >
      {status}
    </span>
  );
}

/** Cycles Draft \u2192 Pending \u2192 Paid to demonstrate the invoice lifecycle without fake metrics. */
function LifecycleTicker() {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setStage((prev) => (prev + 1) % INVOICE_STAGES.length);
    }, 2200);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="flex items-center gap-2" role="status" aria-live="polite">
      {INVOICE_STAGES.map((item, index) => {
        const isActive = index === stage;
        const Icon = item.icon;
        return (
          <span
            key={item.label}
            className={cn(
              "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-medium transition-colors duration-500",
              isActive
                ? "border-primary/40 bg-primary/15 text-primary-light"
                : "border-white/10 bg-white/[0.02] text-slate-500 light:border-slate-200 light:bg-slate-50"
            )}
          >
            <Icon className="h-3 w-3" aria-hidden="true" />
            {item.label}
          </span>
        );
      })}
    </div>
  );
}

function InvoiceDashboard() {
  return (
    <motion.div
      animate={{ y: [0, -8, 0] }}
      transition={{ duration: 6, ease: "easeInOut", repeat: Infinity }}
      className="glass-card relative w-full max-w-full overflow-hidden p-3 px-10 shadow-[0_30px_90px_rgba(2,6,23,0.55)] sm:p-5"
    >
      <div className="absolute inset-0 bg-mesh-gradient opacity-50" aria-hidden="true" />
      <div className="relative rounded-[24px] border border-white/10 bg-slate-950/80 p-3.5 light:border-slate-200 light:bg-white sm:rounded-[28px] sm:p-5">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-2.5 border-b border-white/10 pb-3 light:border-slate-200 sm:gap-3 sm:pb-4">
          <div>
            <p className="text-[10px] uppercase tracking-[0.15em] text-slate-500 sm:text-xs sm:tracking-[0.2em]">Invoicezy Dashboard</p>
            <p className="mt-1.5 text-sm font-semibold text-white light:text-slate-950 sm:mt-2 sm:text-lg">
              GST Invoice #INV-2049
            </p>
          </div>
          <LifecycleTicker />
        </div>

        {/* GST + UPI highlight */}
        <div className="grid grid-cols-2 gap-2.5 py-3.5 sm:gap-4 sm:py-5">
          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3 light:border-slate-200 light:bg-slate-50 sm:rounded-2xl sm:p-4">
            <p className="text-[10px] uppercase tracking-[0.15em] text-slate-500 sm:text-xs sm:tracking-[0.2em]">Amount Due</p>
            <p className="mt-2 text-lg font-semibold text-white light:text-slate-950 sm:mt-3 sm:text-2xl">
              {"\u20B945,000"}
            </p>
            <p className="mt-1.5 text-[10px] text-slate-400 sm:mt-2 sm:text-xs">CGST 9% + SGST 9%</p>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3 light:border-slate-200 light:bg-slate-50 sm:rounded-2xl sm:p-4">
            <p className="text-[10px] uppercase tracking-[0.15em] text-slate-500 sm:text-xs sm:tracking-[0.2em]">Collected via</p>
            <div className="mt-2 flex items-center gap-1.5 text-white light:text-slate-950 sm:mt-3 sm:gap-2">
              <QrCode className="h-4 w-4 text-primary-light sm:h-5 sm:w-5" aria-hidden="true" />
              <span className="text-sm font-semibold sm:text-lg">UPI QR</span>
            </div>
            <p className="mt-1.5 text-[10px] text-slate-400 sm:mt-2 sm:text-xs">Reminder auto-sent</p>
          </div>
        </div>

        {/* Recent invoices table */}
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] light:border-slate-200 light:bg-slate-50">
          <div className="flex items-center justify-between px-4 pt-4">
            <p className="text-sm font-medium text-white light:text-slate-950">Recent Invoices</p>
            <span className="text-[11px] text-slate-500">Outstanding: {"\u20B921,150"}</span>
          </div>
          <div className="space-y-2 p-3 sm:hidden">
            {RECENT_INVOICES.map((invoice) => (
              <div
                key={invoice.id}
                className="flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-3 light:border-slate-200 light:bg-white"
              >
                <div className="min-w-0">
                  <p className="truncate text-xs font-medium text-white light:text-slate-950">
                    {invoice.client}
                  </p>
                  <p className="text-[10px] text-slate-500">{invoice.id}</p>
                </div>
                <div className="flex shrink-0 flex-col items-end gap-1.5">
                  <span className="text-xs font-semibold text-white light:text-slate-950">
                    {invoice.amount}
                  </span>
                  <StatusPill status={invoice.status} />
                </div>
              </div>
            ))}
          </div>
          <div className="hidden overflow-x-auto sm:block">
            <table className="mt-3 w-full min-w-[420px] text-left text-xs">
              <caption className="sr-only">Recent invoices with client, amount and payment status</caption>
              <thead>
                <tr className="text-slate-500">
                  <th scope="col" className="px-2.5 pb-2 font-medium sm:px-4">Invoice</th>
                  <th scope="col" className="px-2.5 pb-2 font-medium sm:px-4">Client</th>
                  <th scope="col" className="px-2.5 pb-2 font-medium sm:px-4">Amount</th>
                  <th scope="col" className="px-2.5 pb-2 text-right font-medium sm:px-4">Status</th>
                </tr>
              </thead>
              <tbody>
                {RECENT_INVOICES.map((invoice) => (
                  <tr key={invoice.id} className="border-t border-white/5 light:border-slate-200">
                    <td className="whitespace-nowrap px-2.5 py-2.5 text-slate-300 light:text-slate-700 sm:px-4">
                      {invoice.id}
                    </td>
                    <td className="max-w-[110px] truncate px-2.5 py-2.5 text-slate-300 light:text-slate-700 sm:max-w-none sm:px-4">
                      {invoice.client}
                    </td>
                    <td className="whitespace-nowrap px-2.5 py-2.5 font-medium text-white light:text-slate-950 sm:px-4">
                      {invoice.amount}
                    </td>
                    <td className="px-2.5 py-2.5 text-right sm:px-4">
                      <StatusPill status={invoice.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Mini analytics + recent clients */}
        <div className="mt-4 hidden gap-4 sm:grid sm:grid-cols-[1.3fr_1fr]">
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 light:border-slate-200 light:bg-slate-50">
            <p className="mb-3 text-xs font-medium text-white light:text-slate-950">
              Invoices sent, last 6 weeks
            </p>
            <div className="grid grid-cols-6 items-end gap-1.5 sm:gap-2.5">
              {INVOICE_TREND.map((point, index) => (
                <div key={point.label} className="flex min-w-0 flex-col items-center gap-1.5">
                  <div
                    className={cn(
                      "w-full rounded-t-lg bg-gradient-to-t from-primary to-accent sm:rounded-t-xl",
                      index === INVOICE_TREND.length - 1
                        ? "shadow-[0_0_16px_rgba(6,182,212,0.35)]"
                        : ""
                    )}
                    style={{ height: `${Math.max(point.value * 5, 24)}px` }}
                  />
                  <span className="text-[8px] uppercase tracking-[0.08em] text-slate-500 sm:text-[9px] sm:tracking-[0.1em]">
                    {point.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 light:border-slate-200 light:bg-slate-50">
            <p className="mb-3 text-xs font-medium text-white light:text-slate-950">Recent Clients</p>
            <ul className="space-y-2.5">
              {RECENT_CLIENTS.map((client) => (
                <li key={client.name} className="flex items-center gap-2.5 text-xs">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/15 text-[10px] font-semibold text-primary-light">
                    {client.initials}
                  </span>
                  <span className="truncate text-slate-300 light:text-slate-700">{client.name}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Hero                                                                       */
/* -------------------------------------------------------------------------- */

export default function Hero() {
  return (
    <section
      aria-label="Invoicezy  GST billing software for Indian businesses"
      className="relative flex min-h-screen items-center overflow-x-hidden pb-14 pt-28 sm:pb-24 sm:pt-32 lg:pt-36"
    >
      {/* Aurora / gradient lighting */}
      <div className="hero-orb left-1/2 top-12 h-72 w-72 -translate-x-1/2 bg-primary/30" aria-hidden="true" />
      <div className="hero-orb right-10 top-1/3 h-80 w-80 bg-accent/20" aria-hidden="true" />
      <div className="hero-orb left-0 top-1/2 h-72 w-72 bg-fuchsia-600/15" aria-hidden="true" />

      {/* Subtle particles */}
      <div aria-hidden="true">
        {particles.map((position, index) => (
          <motion.span
            key={position}
            animate={{ opacity: [0.2, 0.8, 0.2], y: [0, -10, 0] }}
            transition={{ delay: index * 0.2, duration: 4 + index * 0.2, repeat: Infinity }}
            className={cn("absolute h-2 w-2 rounded-full bg-white/20", position)}
          />
        ))}
      </div>

      <div className="section-shell relative z-10 grid w-full max-w-full gap-14 overflow-x-hidden lg:grid-cols-[1.02fr_0.98fr] lg:items-center lg:overflow-visible">
        {/* Left column */}
        <div className="min-w-0 max-w-2xl space-y-8">
          <Reveal delay={0}>
            <span className="inline-flex min-w-0 max-w-full items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1.5 text-xs font-medium text-slate-200 light:border-slate-200 light:bg-slate-50 light:text-slate-700 sm:text-sm">
              <Sparkles className="h-3.5 w-3.5 shrink-0 text-primary-light" aria-hidden="true" />
              <span className="truncate">GST billing for Indian businesses</span>
            </span>
          </Reveal>

          <div className="space-y-4">
            <h1 className="text-3xl font-bold leading-tight text-white sm:text-5xl md:text-6xl xl:text-7xl light:text-slate-950">
              <motion.span
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.55 }}
                className="block"
              >
              GST Billing & Invoice Software

              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.22, duration: 0.55 }}
                className="gradient-text block"
              >
              for Indian Businesses
              </motion.span>
            </h1>

            <Reveal delay={0.34}>
              <p className="max-w-xl text-base leading-7 text-slate-300 light:text-slate-600 sm:text-lg sm:leading-8">
                Create GST-compliant invoices, collect payments instantly with UPI QR
                codes, and track inventory and expenses  everything a growing Indian
                business needs to get paid faster, in one place.
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.44} className="flex flex-col gap-4 sm:flex-row">
            <Link
              className={cn(buttonVariants({ size: "lg" }), "w-full justify-center sm:w-auto")}
              href="/register"
            >
              Start Free
              <ArrowRight className="h-5 w-5" aria-hidden="true" />
            </Link>
            <Link
              className={cn(buttonVariants({ variant: "secondary", size: "lg" }), "w-full justify-center sm:w-auto")}
              href="/pricing"
            >
              <Receipt className="h-5 w-5" aria-hidden="true" />
              See Pricing
            </Link>
          </Reveal>

          <Reveal delay={0.52}>
            <TrustStrip />
          </Reveal>

          <Reveal delay={0.58}>
            <CapabilityChips />
          </Reveal>

          <Reveal delay={0.64} className="max-w-md">
            <PricingPreview />
          </Reveal>
        </div>

        {/* Right column  product visual */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.7 }}
          className="relative mx-auto w-full min-w-0 max-w-xl"
        >
          <div className="absolute inset-8 rounded-full bg-primary/25 blur-[120px]" aria-hidden="true" />

          {FLOATING_CARDS.map((card, index) => (
            <FloatingChip
              key={card.label}
              icon={card.icon}
              label={card.label}
              position={card.position}
              initial={card.initial}
              delay={0.55 + index * 0.12}
            />
          ))}

          <InvoiceDashboard />
        </motion.div>
      </div>
    </section>
  );
}