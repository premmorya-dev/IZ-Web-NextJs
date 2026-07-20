"use client";

import { motion } from "framer-motion";
import {
  Zap,
  BadgeIndianRupee,
  QrCode,
  ShieldCheck,
  Smartphone,
  Infinity as InfinityIcon,
  Rocket,
} from "lucide-react";

const FEATURES = [
  {
    icon: Zap,
    title: "Fast Setup",
    desc: "Start creating professional GST invoices in less than two minutes.",
  },
  {
    icon: BadgeIndianRupee,
    title: "GST Ready",
    desc: "Automatic GST calculation with support for CGST, SGST and IGST.",
  },
  {
    icon: QrCode,
    title: "UPI QR Payments",
    desc: "Accept payments instantly using dynamic UPI QR codes.",
  },
  {
    icon: ShieldCheck,
    title: "Secure Cloud Storage",
    desc: "Your invoices stay safe and accessible from anywhere.",
  },
  {
    icon: Smartphone,
    title: "Multi Device Access",
    desc: "Use Invoicezy on desktop, tablet and mobile devices.",
  },
  {
    icon: InfinityIcon,
    title: "Free Forever",
    desc: "Create up to 10 invoices every month at no cost.",
  },
];

export default function WhyChooseInvoicezy() {
  return (
    <section className="relative overflow-hidden py-24 sm:py-28">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/3 top-0 h-[380px] w-[380px] rounded-full bg-purple-600/15 blur-[120px]" />
        <div className="absolute right-1/4 bottom-0 h-[380px] w-[380px] rounded-full bg-indigo-500/15 blur-[120px]" />
      </div>

      <div className="section-shell">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mx-auto max-w-2xl text-center"
        >
          <h2 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            Why Businesses Choose{" "}
            <span className="bg-gradient-to-r from-indigo-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent">
              Invoicezy
            </span>
          </h2>
          <p className="mt-4 text-base text-white/50">
            Everything you need to create GST invoices, accept payments and manage your business from one platform.
          </p>
        </motion.div>

        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2">
          {FEATURES.map((f, i) => (
            <FeatureCard key={f.title} feature={f} index={i} />
          ))}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: FEATURES.length * 0.07, ease: "easeOut" }}
            whileHover={{ y: -3 }}
            className="group relative overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.05] p-7 text-center backdrop-blur-sm transition-colors duration-300 hover:border-white/20 sm:col-span-2"
          >
            <div className="pointer-events-none absolute inset-0 rounded-[28px] opacity-0 transition-opacity duration-500 group-hover:opacity-100" style={{ boxShadow: "0 0 60px -10px rgba(167,139,250,0.4)" }} />
            <div className="relative mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-indigo-500/25 to-cyan-400/15 ring-1 ring-white/10">
              <Rocket className="h-5 w-5 text-indigo-200" strokeWidth={1.75} />
            </div>
            <h3 className="relative mt-4 text-[15px] font-medium text-white">No Credit Card Required</h3>
            <p className="relative mt-1.5 text-xs text-white/45">
              Start using Invoicezy instantly without payment.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function FeatureCard({ feature, index }) {
  const Icon = feature.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.07, ease: "easeOut" }}
      whileHover={{ y: -4 }}
      className="group relative overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.045] p-6 backdrop-blur-sm transition-colors duration-300 hover:border-white/20 hover:bg-white/[0.07]"
    >
      <div
        className="pointer-events-none absolute inset-0 rounded-[28px] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ boxShadow: "0 0 40px -8px rgba(129,140,248,0.35)" }}
      />
      <div className="pointer-events-none absolute -inset-px rounded-[28px] opacity-0 transition-opacity duration-300 group-hover:opacity-100" style={{
        background: "linear-gradient(120deg, rgba(129,140,248,0.35), transparent 30%, transparent 70%, rgba(34,211,238,0.3))",
        maskImage: "linear-gradient(#000 0 0)",
        WebkitMaskComposite: "xor",
        padding: "1px",
      }} />

      <motion.div
        whileHover={{ scale: 1.08 }}
        transition={{ type: "spring", stiffness: 300, damping: 15 }}
        className="relative grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-indigo-500/25 to-cyan-400/15 ring-1 ring-white/10"
      >
        <Icon className="h-5 w-5 text-indigo-200" strokeWidth={1.75} />
      </motion.div>

      <h3 className="relative mt-4 text-[15px] font-medium text-white">{feature.title}</h3>
      <p className="relative mt-1.5 text-xs leading-relaxed text-white/45">{feature.desc}</p>
    </motion.div>
  );
}
