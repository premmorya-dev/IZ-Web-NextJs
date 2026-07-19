"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Layers2, ShieldCheck, Workflow  } from "lucide-react";
import RevenueChart from "@/components/charts/RevenueChart";
import FeatureCard from "@/components/shared/FeatureCard";
import LiveInvoicePreview from "@/components/shared/LiveInvoicePreview";
import SectionHeader from "@/components/shared/SectionHeader";
import { buttonVariants } from "@/components/ui/button";
import { FEATURES } from "@/lib/constants";

export default function FeaturesPageClient() {
  return (
    <div className="pb-24 pt-32 sm:pb-28">
      <section className="section-shell">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div className="space-y-6">
            <SectionHeader
              align="left"
              as="h1"
              badge="Why Teams Choose Invoicezy"
              description="Replace scattered spreadsheets, clunky invoicing tools, and manual follow-ups with one elegant finance workflow."
              icon={Layers2}
              title="Modern billing, collections, and reporting in one place"
            />
            <div className="grid gap-4 sm:grid-cols-3">
              {[
                { title: "Faster collections", value: "+34%" },
                { title: "Setup time", value: "2 min" },
                { title: "Uptime", value: "99.9%" }
              ].map((item) => (
                <div key={item.title} className="glass-card p-5">
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-500">{item.title}</p>
                  <p className="mt-3 text-3xl font-semibold text-white light:text-slate-950">{item.value}</p>
                </div>
              ))}
            </div>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Link className={buttonVariants({ size: "lg" })} href="/register">
                Start free
                <ArrowRight className="h-5 w-5" />
              </Link>
              <Link className={buttonVariants({ variant: "secondary", size: "lg" })} href="/pricing">
                Explore pricing
              </Link>
            </div>
          </div>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="glass-card p-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-[28px] border border-white/10 bg-primary/10 p-5 light:border-slate-200">
                <Workflow className="h-7 w-7 text-primary-light" />
                <h3 className="mt-5 text-xl font-semibold text-white light:text-slate-950">Automated workflows</h3>
                <p className="mt-3 text-sm leading-6 text-slate-300 light:text-slate-600">
                  Recurring invoices, payment reminders, and status updates happen in the background.
                </p>
              </div>
              <div className="rounded-[28px] border border-white/10 bg-success/10 p-5 light:border-slate-200">
                <ShieldCheck className="h-7 w-7 text-success-light" />
                <h3 className="mt-5 text-xl font-semibold text-white light:text-slate-950">Secure by default</h3>
                <p className="mt-3 text-sm leading-6 text-slate-300 light:text-slate-600">
                  Built with audit-friendly reports, secure payment records, and business-grade reliability.
                </p>
              </div>
              <div className="sm:col-span-2 rounded-[28px] border border-white/10 bg-white/[0.03] p-5 light:border-slate-200 light:bg-slate-50">
                <p className="text-sm text-slate-400">Use Invoicezy to create GST-compliant invoices, accept payments, manage inventory, and track revenue trends from one dashboard.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="section-shell mt-20">
        <SectionHeader
          align="left"
          badge="Interactive Demo"
          description="This live builder updates totals, taxes, and preview instantly as you edit the invoice form."
          icon={Workflow}
          title="See the invoice change as you type"
        />
        <LiveInvoicePreview />
      </section>

      <section className="section-shell mt-20">
        <SectionHeader
          align="left"
          badge="Reporting"
          description="Stay on top of revenue, expenses, and pending collections with a dashboard your whole team can understand."
          icon={ShieldCheck}
          title="Analytics that help you act faster"
        />
        <RevenueChart />
      </section>

      <section className="section-shell mt-20">
        <SectionHeader
          badge="Capability Grid"
          description="Everything from billing to payment tracking and business management, designed to feel clean, fast, and dependable."
          icon={Layers2}
          title="A feature set built for real operations"
        />
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {FEATURES.map((feature, index) => (
            <FeatureCard key={`page-${feature.title}`} index={index} {...feature} />
          ))}
        </div>
      </section>
    </div>
  );
}


