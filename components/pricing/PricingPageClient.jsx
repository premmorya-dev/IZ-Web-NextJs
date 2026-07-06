"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { BadgePercent, Check, Sparkles, X } from "lucide-react";
import PricingCard from "@/components/shared/PricingCard";
import SectionHeader from "@/components/shared/SectionHeader";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

// 🔥 dynamic label
const formatLabel = (key) => {
  return key
    .replace(/_/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase())
    .replace(/\bQr\b/g, "QR")
    .replace(/\bApi\b/g, "API");
};

export default function PricingPageClient() {
  const [yearly, setYearly] = useState(false);
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ API CALL
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
              : plan.features || {}
        }));

        setPlans(parsed);
      } catch (err) {
        console.error("API Error:", err);
        setPlans([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPlans();
  }, []);

  const allFeatures =
    plans.length > 0 ? Object.keys(plans[0].features) : [];

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

        {/* Toggle */}
        <div className="mb-10 flex justify-center">
          <div className="glass-card inline-flex items-center gap-2 p-2">
            <button
              className={cn(
                "rounded-xl px-5 py-3 text-sm font-medium",
                yearly ? "bg-primary-gradient text-white" : "text-slate-400"
              )}
              onClick={() => setYearly(true)}
            >
              Yearly
            </button>

            <span className="rounded-full border border-success/30 bg-success/10 px-3 py-1 text-xs text-success-light">
              Save 40%
            </span>
          </div>
        </div>

        {/* Cards */}
        {loading ? (
          <p className="text-center text-slate-400">Loading...</p>
        ) : (
          <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-4">
            {plans.map((plan, index) => (
              <PricingCard
                key={plan.plan_id}
                plan={plan}
                planIndex={index}
                yearly={yearly}
              />
            ))}
          </div>
        )}
      </section>

      {/* Comparison Table */}
      <section className="section-shell mt-20">
        <motion.div className="glass-card p-6">
          <div className="mb-6 flex items-center gap-3">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary-light">
              <Sparkles className="h-5 w-5" />
            </span>
            <div>
              <h2 className="text-2xl font-semibold text-white">
                Full feature comparison
              </h2>
              <p className="text-sm text-slate-400">
                Compare plans easily
              </p>
            </div>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Feature</TableHead>
                {plans.map((plan) => (
                  <TableHead key={plan.plan_id} className="text-center">
                    {plan.name}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>

            <TableBody>
              {allFeatures.map((featureKey) => (
                <TableRow key={featureKey}>
                  <TableCell>{formatLabel(featureKey)}</TableCell>

                  {plans.map((plan) => (
                    <TableCell key={plan.plan_id} className="text-center">
                      {plan.features[featureKey] ? (
                        <Check className="mx-auto text-green-500" />
                      ) : (
                        <X className="mx-auto text-gray-400" />
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </motion.div>
      </section>
    </div>
  );
}