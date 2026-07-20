"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  FileText,
  Users,
  Calculator,
  Eye,
  Send,
  QrCode,
  BarChart3,
  CheckCircle2,
} from "lucide-react";

const STEPS = [
  {
    id: "create",
    icon: FileText,
    title: "Create Invoice",
    desc: "Start a GST-ready invoice in seconds.",
    badge: "Draft",
    span: "lg:col-span-5 lg:row-span-2",
    offset: "lg:mt-0",
    ui: (
      <div className="space-y-1.5">
        <div className="h-2 w-3/5 rounded-full bg-white/25" />
        <div className="h-2 w-2/5 rounded-full bg-white/15" />
        <div className="mt-3 h-10 rounded-xl border border-white/10 bg-white/5" />
      </div>
    ),
  },
  {
    id: "customer",
    icon: Users,
    title: "Add Customer & Products",
    desc: "Pull saved clients and catalog items instantly.",
    badge: "Synced",
    span: "lg:col-span-4",
    offset: "lg:mt-10",
    ui: (
      <div className="space-y-1.5">
        {["Acme Traders", "Rohan Textiles"].map((n) => (
          <div key={n} className="flex items-center gap-2 rounded-lg bg-white/5 px-2 py-1.5">
            <div className="h-4 w-4 shrink-0 rounded-full bg-gradient-to-br from-indigo-400 to-cyan-400" />
            <span className="text-[10px] text-white/60">{n}</span>
          </div>
        ))}
      </div>
    ),
  },
  {
    id: "gst",
    icon: Calculator,
    title: "Auto GST Calculation",
    desc: "CGST, SGST & IGST computed automatically.",
    badge: "GST Ready",
    span: "lg:col-span-3",
    offset: "lg:mt-2",
    ui: (
      <div className="space-y-1 text-[10px] text-white/50">
        <div className="flex justify-between"><span>CGST</span><span className="text-white/80">9%</span></div>
        <div className="flex justify-between"><span>SGST</span><span className="text-white/80">9%</span></div>
        <div className="h-px bg-white/10 my-1" />
        <div className="flex justify-between font-medium text-white/80"><span>Total</span><span>₹11,800</span></div>
      </div>
    ),
  },
  {
    id: "preview",
    icon: Eye,
    title: "Preview Invoice",
    desc: "Pixel-perfect PDF preview before it goes out.",
    badge: "Auto Saved",
    span: "lg:col-span-3",
    offset: "lg:mt-14",
    ui: (
      <div className="rounded-lg border border-white/10 bg-white/5 p-2">
        <div className="h-1.5 w-1/2 rounded-full bg-white/25 mb-1.5" />
        <div className="h-1.5 w-full rounded-full bg-white/10 mb-1" />
        <div className="h-1.5 w-4/5 rounded-full bg-white/10" />
      </div>
    ),
  },
  {
    id: "send",
    icon: Send,
    title: "Send via Email / WhatsApp",
    desc: "One tap delivery, wherever your client is.",
    badge: "Sent",
    span: "lg:col-span-4",
    offset: "lg:-mt-2",
    ui: (
      <div className="flex gap-2">
        <span className="rounded-full bg-indigo-500/15 px-2.5 py-1 text-[10px] text-indigo-200 ring-1 ring-indigo-400/20">Email</span>
        <span className="rounded-full bg-emerald-500/15 px-2.5 py-1 text-[10px] text-emerald-200 ring-1 ring-emerald-400/20">WhatsApp</span>
      </div>
    ),
  },
  {
    id: "pay",
    icon: QrCode,
    title: "Customer Pays via UPI",
    desc: "A scannable QR sits right on the invoice.",
    badge: "UPI Ready",
    span: "lg:col-span-5 lg:row-span-2",
    offset: "lg:mt-6",
    ui: (
      <div className="flex items-center gap-3">
        <div className="grid h-14 w-14 shrink-0 grid-cols-4 gap-0.5 rounded-md bg-white/90 p-1.5">
          {Array.from({ length: 16 }).map((_, i) => (
            <div key={i} className={`rounded-[1px] ${[0,1,3,4,6,9,11,12,14,15].includes(i) ? "bg-slate-900" : "bg-transparent"}`} />
          ))}
        </div>
        <span className="rounded-full bg-emerald-500/15 px-2.5 py-1 text-[10px] font-medium text-emerald-200 ring-1 ring-emerald-400/20">
          Paid ✓
        </span>
      </div>
    ),
  },
  {
    id: "reports",
    icon: BarChart3,
    title: "Reports Updated",
    desc: "Cash flow and GST reports refresh in real time.",
    badge: "Cloud Sync",
    span: "lg:col-span-7",
    offset: "lg:mt-16",
    ui: (
      <div className="flex items-end gap-1 h-10">
        {[40, 65, 45, 80, 60, 95].map((h, i) => (
          <div
            key={i}
            className="w-2.5 rounded-full bg-gradient-to-t from-indigo-500/40 to-cyan-400/80"
            style={{ height: `${h}%` }}
          />
        ))}
      </div>
    ),
  },
];

export default function HowItWorks() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative overflow-hidden py-24 sm:py-5">
      {/* ambient glow, matches hero aurora language */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/4 top-0 h-[420px] w-[420px] rounded-full bg-indigo-600/20 blur-[120px]" />
        <div className="absolute right-1/4 bottom-0 h-[420px] w-[420px] rounded-full bg-cyan-500/15 blur-[120px]" />
      </div>

      <div className="section-shell">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-1 text-xs font-medium text-white/70 backdrop-blur-sm">
            Invoice Lifecycle
          </span>
          <h2 className="mt-5 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            Create. Send.{" "}
            <span className="bg-gradient-to-r from-indigo-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent">
              Get Paid.
            </span>
          </h2>
          <p className="mt-4 text-base text-white/50">
            Invoicezy automates GST billing, delivery and payment collection end to end.
          </p>
        </motion.div>

        {/* Desktop asymmetric workflow */}
        <div className="relative mt-20 hidden lg:block">
          <svg
            className="pointer-events-none absolute inset-0 h-full w-full"
            viewBox="0 0 1200 620"
            fill="none"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="hiw-line" x1="0" y1="0" x2="1200" y2="0" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#818cf8" stopOpacity="0.5" />
                <stop offset="50%" stopColor="#a78bfa" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#22d3ee" stopOpacity="0.5" />
              </linearGradient>
            </defs>
            <path
              id="hiw-path"
              d="M 210 120 C 420 60, 480 220, 660 180 C 820 150, 780 320, 980 300 C 1120 290, 1000 480, 1180 470"
              stroke="url(#hiw-line)"
              strokeWidth="1.5"
              strokeDasharray="4 6"
            />
            {!reduceMotion && (
              <circle r="4.5" fill="#e0e7ff">
                <animateMotion dur="7s" repeatCount="indefinite" rotate="auto">
                  <mpath href="#hiw-path" />
                </animateMotion>
              </circle>
            )}
          </svg>

          <div className="relative grid grid-cols-12 gap-5">
            {STEPS.map((step, i) => (
              <WorkflowCard key={step.id} step={step} index={i} />
            ))}
          </div>
        </div>

        {/* Mobile vertical journey */}
        <div className="relative mt-16 space-y-4 lg:hidden">
          <div className="absolute left-[27px] top-3 bottom-3 w-px bg-gradient-to-b from-indigo-400/40 via-purple-400/30 to-cyan-400/40" />
          {STEPS.map((step, i) => (
            <WorkflowCard key={step.id} step={step} index={i} mobile />
          ))}
        </div>
      </div>
    </section>
  );
}

function WorkflowCard({ step, index, mobile }) {
  const Icon = step.icon;

  if (mobile) {
    return (
      <motion.div
        initial={{ opacity: 0, x: -12 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.45, delay: index * 0.06, ease: "easeOut" }}
        className="relative flex gap-4 pl-1"
      >
        <div className="relative z-10 grid h-14 w-14 shrink-0 place-items-center rounded-2xl border border-white/10 bg-white/[0.06] backdrop-blur-sm">
          <Icon className="h-5 w-5 text-indigo-200" strokeWidth={1.75} />
        </div>
        <div className="flex-1 rounded-2xl border border-white/10 bg-white/[0.04] p-4 backdrop-blur-sm">
          <div className="flex items-center justify-between gap-2">
            <h3 className="text-sm font-medium text-white">{step.title}</h3>
            <span className="shrink-0 rounded-full bg-white/5 px-2 py-0.5 text-[10px] text-white/50 ring-1 ring-white/10">
              {step.badge}
            </span>
          </div>
          <p className="mt-1 text-xs text-white/45">{step.desc}</p>
          <div className="mt-3">{step.ui}</div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, delay: index * 0.08, ease: "easeOut" }}
      whileHover={{ y: -4 }}
      className={`group relative rounded-[28px] border border-white/10 bg-white/[0.045] p-5 backdrop-blur-sm transition-colors duration-300 hover:border-white/20 hover:bg-white/[0.07] ${step.span} ${step.offset}`}
      style={{ boxShadow: "0 1px 0 0 rgba(255,255,255,0.04) inset" }}
    >
      <div className="pointer-events-none absolute inset-0 rounded-[28px] opacity-0 transition-opacity duration-300 group-hover:opacity-100" style={{ boxShadow: "0 0 40px -8px rgba(129,140,248,0.35)" }} />

      <div className="flex items-start justify-between">
        <motion.div
          whileHover={{ rotate: 3 }}
          className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-gradient-to-br from-indigo-500/20 to-cyan-400/10"
        >
          <Icon className="h-4.5 w-4.5 text-indigo-200" strokeWidth={1.75} />
        </motion.div>
        <span className="inline-flex items-center gap-1 rounded-full bg-white/5 px-2.5 py-1 text-[10px] font-medium text-white/55 ring-1 ring-white/10">
          <CheckCircle2 className="h-2.5 w-2.5 text-emerald-300" />
          {step.badge}
        </span>
      </div>

      <h3 className="mt-4 text-[15px] font-medium text-white">{step.title}</h3>
      <p className="mt-1 text-xs leading-relaxed text-white/45">{step.desc}</p>

      <div className="mt-4">{step.ui}</div>
    </motion.div>
  );
}