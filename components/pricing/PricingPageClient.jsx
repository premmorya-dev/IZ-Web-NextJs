"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { BadgePercent, Check, Lock, Sparkles } from "lucide-react";
import PricingCard from "@/components/shared/PricingCard";
import SectionHeader from "@/components/shared/SectionHeader";
import { PLANS } from "@/lib/plan";
import { getAllFeatureRows } from "@/lib/pricing-features";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

export default function PricingPageClient() {
  const [billing, setBilling] = useState("yearly"); // "monthly" | "yearly"
  const [plans, setPlans] = useState(PLANS); // render instantly with fallback data, never a blank state
  const [syncing, setSyncing] = useState(true);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const res = await fetch("https://pro.invoicezy.com/api/plans");
        const data = await res.json();

        const parsed = data.map((plan) => ({
          ...plan,
          features:
            typeof plan.features === "string"
              ? JSON.parse(plan.features || "{}")
              : plan.features || {},
        }));

        if (parsed.length > 0) {
          setPlans(parsed.sort((a, b) => a.plan_id - b.plan_id));
        }
      } catch (err) {
        console.error("Pricing API error, showing cached plans:", err);
      } finally {
        setSyncing(false);
      }
    };

    fetchPlans();
  }, []);

  const featureRows = plans.length > 0 ? getAllFeatureRows(plans[0]) : [];

  return (
    <div className="pb-24 pt-32 sm:pb-28">
      <section className="section-shell">
        <SectionHeader
          align="center"
          as="h1"
          badge="Simple Pricing"
          description="Choose a plan that matches your invoice volume today and grow into more automation, users, and control later."
          icon={BadgePercent}
          title="Pricing That Scales With Your Business"
        />

        {/* Billing toggle */}
        <div className="mb-12 flex justify-center">
          <div className="glass-card relative inline-flex items-center gap-1 rounded-2xl border border-white/10 p-1.5">
            {[ "yearly"].map((mode) => (
              <button
                key={mode}
                onClick={() => setBilling(mode)}
                className={cn(
                  "relative z-10 rounded-xl px-5 py-2.5 text-sm font-medium capitalize transition-colors duration-200",
                  billing === mode ? "text-white" : "text-slate-400 hover:text-slate-200"
                )}
              >
                {billing === mode && (
                  <motion.span
                    layoutId="billing-pill"
                    transition={{ type: "spring", stiffness: 350, damping: 28 }}
                    className="absolute inset-0 -z-10 rounded-xl bg-primary-gradient"
                  />
                )}
                {mode}
              </button>
            ))}
            <span className="ml-2 mr-1.5 flex items-center rounded-full border border-success/30 bg-success/10 px-3 py-1 text-xs font-medium text-success-light">
              Save on annual
            </span>
          </div>
        </div>

        {/* Cards */}
        <div className="grid items-stretch gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {plans.map((plan, index) => (
            <PricingCard
              key={plan.plan_id}
              plan={plan}
              index={index}
              totalPlans={plans.length}
              plans={plans}
              billing={billing}
            />
          ))}
        </div>

        {!syncing ? null : (
          <p className="mt-6 text-center text-xs text-slate-600">Syncing latest prices...</p>
        )}
      </section>

      {/* Comparison Table */}
      <section className="section-shell mt-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="glass-card overflow-hidden rounded-[28px] border border-white/10 p-6 sm:p-8"
        >
          <div className="mb-6 flex items-center gap-3">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary-light">
              <Sparkles className="h-5 w-5" />
            </span>
            <div>
              <h2 className="text-2xl font-semibold text-white">Full feature comparison</h2>
              <p className="text-sm text-slate-400">Every plan, side by side.</p>
            </div>
          </div>

          <div className="-mx-6 overflow-x-auto px-6 sm:-mx-8 sm:px-8">
            <Table className="min-w-[640px]">
              <TableHeader>
                <TableRow className="border-white/10 hover:bg-transparent">
                  <TableHead className="text-slate-400">Feature</TableHead>
                  {plans.map((plan) => (
                    <TableHead key={plan.plan_id} className="text-center font-semibold text-white">
                      {plan.name}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>

              <TableBody>
                {featureRows.map((row) => (
                  <TableRow
                    key={row.key}
                    className="border-white/5 transition-colors hover:bg-white/[0.03]"
                  >
                    <TableCell className="flex items-center gap-2.5 text-sm text-slate-300">
                      <row.icon className="h-4 w-4 shrink-0 text-slate-500" />
                      {row.label}
                    </TableCell>

                    {plans.map((plan) => {
                      const enabled = row.key === "gst_billing" ? true : Boolean(plan.features?.[row.key]);
                      return (
                        <TableCell key={plan.plan_id} className="text-center">
                          {enabled ? (
                            <Check className="mx-auto h-4 w-4 text-success-light" />
                          ) : (
                            <Lock className="mx-auto h-3.5 w-3.5 text-slate-700" />
                          )}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </motion.div>
      </section>
    </div>
  );
}