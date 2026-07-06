"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function FreeInvoiceSoftwarePage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-300 overflow-hidden">

      {/* HERO */}
      <section className="relative px-4 pt-28 pb-20 sm:px-6 lg:px-8">
        {/* Gradient BG */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/20 via-purple-600/10 to-transparent blur-3xl" />

        <div className="relative mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* LEFT */}
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-4xl sm:text-6xl font-bold text-white leading-tight">
              Free Invoice Software
              <span className="block text-primary mt-2">
                Built for Speed & Simplicity
              </span>
            </h1>

            <p className="mt-6 text-lg text-slate-400">
              Invoicezy helps freelancers and small businesses create professional invoices,
              manage clients, and get paid faster — all in one place.
            </p>

            {/* CTA */}
            <div className="mt-8 flex gap-4">
              <Link
                href="/register"
                className="rounded-xl bg-primary px-6 py-3 text-sm font-medium text-white shadow-lg hover:scale-105 transition"
              >
                Start Free
              </Link>

              <a
                href="https://pro.invoicezy.com"
                className="rounded-xl border border-white/10 px-6 py-3 text-sm hover:bg-white/5"
              >
                Login
              </a>
            </div>

            {/* Quick Points */}
            <div className="mt-8 grid grid-cols-2 gap-4 text-sm">
              {[
                "Unlimited Invoices",
                "GST Ready",
                "QR Payments",
                "Free Forever",
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2">
                  <span className="text-primary">✔</span>
                  {item}
                </div>
              ))}
            </div>
          </motion.div>

          {/* RIGHT IMAGE */}
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
            <Image
              src="/images/feature.jpeg"
              alt="Invoicezy Dashboard"
              width={900}
              height={600}
              className="rounded-2xl border border-white/10 shadow-2xl"
            />
          </motion.div>
        </div>
      </section>

      {/* FEATURE GRID */}
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl text-center">
          <h2 className="text-3xl font-bold text-white">
            Powerful Features for Your Business
          </h2>

          <p className="mt-4 text-slate-400">
            Everything you need to manage invoices, payments, and clients — all in one place.
          </p>

          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featureCards.map((f, i) => (
              <div
                key={i}
                className="rounded-2xl border border-white/10 bg-white/5 p-6 hover:border-primary/40 transition"
              >
                <h3 className="text-lg font-semibold text-white">{f.title}</h3>
                <p className="mt-2 text-sm text-slate-400">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HIGHLIGHT SECTION */}
      <section className="px-4 py-20 sm:px-6 lg:px-8 bg-slate-900/40">
        <div className="mx-auto max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          <Image
            src="/images/feature.jpeg"
            alt="Invoice Features"
            width={800}
            height={500}
            className="rounded-2xl border border-white/10"
          />

          <div>
            <h2 className="text-3xl font-bold text-white">
              Why Choose Invoicezy?
            </h2>

            <div className="mt-6 space-y-4">
              {whyPoints.map((item, i) => (
                <div key={i} className="flex gap-3">
                  <span className="text-primary">✔</span>
                  <p>{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="px-4 py-24 text-center sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-4xl font-bold text-white">
            Start Using Invoicezy Today 🚀
          </h2>

          <p className="mt-4 text-slate-400">
            Free forever. No credit card required.
          </p>

          <div className="mt-8">
            <Link
              href="/register"
              className="rounded-xl bg-primary px-10 py-4 text-lg font-medium text-white shadow-xl hover:scale-105 transition"
            >
              Get Started Now
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}

/* FEATURE CARDS */
const featureCards = [
  {
    title: "Invoice Management",
    desc: "Create, send and manage invoices easily.",
  },
  {
    title: "Client Management",
    desc: "Organize all your clients in one place.",
  },
  {
    title: "Expense Tracking",
    desc: "Track all your business expenses.",
  },
  {
    title: "QR Code Payments",
    desc: "Accept instant payments online.",
  },
  {
    title: "Reports & Analytics",
    desc: "Get financial insights instantly.",
  },
  {
    title: "Inventory Tracking",
    desc: "Manage stock and products efficiently.",
  },
];

/* WHY */
const whyPoints = [
  "Create unlimited invoices",
  "Accept payments faster",
  "Fully customizable branding",
  "Automated reminders",
  "Perfect for freelancers & startups",
];