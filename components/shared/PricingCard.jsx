"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Check, ChevronDown, Lock, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  CTA_LABELS,
  PLAN_BADGES,
  PLAN_TAGLINES,
  formatPrice,
  getAllFeatureRows,
  getHighlights,
  getLockedFeatures,
  getPricePerDay,
} from "@/lib/pricing-features";

import { useRouter } from "next/navigation";

const rowVariants = {
  hidden: { opacity: 0, y: 6 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.05 * i, duration: 0.35, ease: "easeOut" },
  }),
};

export default function PricingCard({
  plan,
  index,
  totalPlans,
  plans,
  billing = "yearly",
}) {
  const [expanded, setExpanded] = useState(false);

  const isFeatured = index === 2 && totalPlans >= 3; // Professional
  const badge = PLAN_BADGES[index] ?? null;
  const highlights = getHighlights(plan, index);
  const locked = getLockedFeatures(plans, index);
  const allFeatures = getAllFeatureRows(plan);
  const remainingFeatures = allFeatures.filter(
    (f) => !highlights.some((h) => h.key === f.key),
  );

  const price = Number(plan.price) || 0;
  const isFree = price === 0;
  const pricePerDay = getPricePerDay(plan);
  const monthlyEquivalent = Math.round(price / 12);
  const tagline =
    index === 1
      ? `Unlimited invoices, all in for about \u20b9${pricePerDay}/day.`
      : PLAN_TAGLINES[index];

  const router = useRouter();

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: "easeOut" }}
      whileHover={{ y: -8 }}
      className={cn(
        "group relative flex h-full flex-col",
        isFeatured && "lg:-translate-y-3",
      )}
    >
      {/* Ambient hover glow behind the card */}
      <div
        className={cn(
          "pointer-events-none absolute -inset-px rounded-[30px] opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-70",
          isFeatured
            ? "bg-primary-gradient opacity-40"
            : "bg-gradient-to-br from-primary/40 via-fuchsia-500/20 to-transparent",
        )}
      />

      <div
        className={cn(
          "glass-card relative flex h-full flex-col overflow-hidden rounded-[28px] border p-7 transition-all duration-300 sm:p-8",
          isFeatured
            ? "border-primary/50 shadow-[0_0_60px_-15px_rgba(129,90,238,0.55)]"
            : "border-white/10 group-hover:border-primary/30 group-hover:shadow-[0_0_40px_-18px_rgba(129,90,238,0.5)]",
        )}
      >
        {/* Badge */}
        {badge && (
          <div
            className={cn(
              "mb-5 inline-flex w-fit items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold",
              isFeatured
                ? "bg-primary-gradient text-white"
                : "border border-white/15 bg-white/5 text-slate-200",
            )}
          >
            <badge.icon className="h-3.5 w-3.5" />
            {badge.label}
          </div>
        )}

        {/* Name + description */}
        <h3 className="text-xl font-semibold text-white">{plan.name}</h3>
        <p className="mt-1.5 min-h-[40px] text-sm leading-relaxed text-slate-400">
          {plan.description}
        </p>

        {/* Price */}
        <div className="mt-6 flex items-end gap-1.5">
          <span className="bg-gradient-to-br from-white to-slate-300 bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-5xl">
            {isFree
              ? "Free"
              : `\u20b9${formatPrice(billing === "monthly" ? monthlyEquivalent : price)}`}
          </span>
          {!isFree && (
            <span className="mb-1.5 text-sm font-medium text-slate-400">
              /{billing === "monthly" ? "mo" : "year"}
            </span>
          )}
        </div>
        <p
          className="mt-1 text-xs text-slate-500  group-hover:text-white"
          id="per-day-price"
        >
          {isFree
            ? `Free forever perfect for trying Invoicezy risk-free`
            : billing === "monthly"
              ? `Billed annually as \u20b9${formatPrice(price)}`
              : `Unlimited invoices for less than ₹${pricePerDay}/day. billed annually`}
        </p>

        {/* CTA */}
        <button
          type="button"
          onClick={() => router.push("/register")}
          className={cn(
            "group mt-6 flex w-full items-center justify-center gap-2 rounded-2xl px-5 py-3.5 text-sm font-semibold transition-all duration-300",
            isFeatured
              ? "bg-primary-gradient text-white shadow-lg shadow-primary/30 hover:shadow-primary/50 hover:brightness-110"
              : "border border-white/15 bg-white/5 text-white hover:border-primary/40 hover:bg-white/10",
          )}
        >
          {CTA_LABELS[index] ?? "Choose Plan"}
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
        </button>

        {/* Highlighted features */}
        <div className="mt-7 flex flex-col divide-y divide-white/5 border-t border-white/5">
          {highlights.map((f, i) => (
            <motion.div
              key={f.key}
              custom={i}
              variants={rowVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="flex items-center gap-3 rounded-lg px-1.5 py-2.5 transition-colors duration-200 hover:bg-white/[0.04]"
            >
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-success/10 text-success-light">
                <Check className="h-3.5 w-3.5" />
              </span>
              <span className="text-sm text-slate-200">{f.label}</span>
            </motion.div>
          ))}
        </div>

        {/* Locked / upsell teaser */}
        {locked.length > 0 ? (
          <div className="mt-3 rounded-2xl border border-white/5 bg-white/[0.03] p-4">
            <p className="mb-2.5 flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wide text-slate-500">
              <Sparkles className="h-3 w-3 text-primary-light" />
              Upgrade to unlock
            </p>
            <div className="flex flex-col gap-2">
              {locked.map((f) => (
                <div
                  key={f.key}
                  className="flex items-center gap-2.5 text-sm text-slate-500"
                >
                  <Lock className="h-3.5 w-3.5 shrink-0 text-slate-600" />
                  <span>{f.label}</span>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="mt-3 rounded-2xl border border-success/20 bg-success/5 p-4 text-sm text-success-light">
            <span className="flex items-center gap-1.5 font-medium">
              <Sparkles className="h-3.5 w-3.5" />
              Every InvoiceZy feature, fully unlocked.
            </span>
          </div>
        )}

        {/* View all features toggle */}
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          className="mt-4 flex w-full items-center justify-center gap-1.5 rounded-xl py-2 text-sm font-medium text-primary-light transition-colors hover:text-white"
        >
          {expanded
            ? "Hide full feature list"
            : `View all ${allFeatures.length} features`}
          <ChevronDown
            className={cn(
              "h-4 w-4 transition-transform duration-300",
              expanded && "rotate-180",
            )}
          />
        </button>

        <AnimatePresence initial={false}>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <div className="flex flex-col divide-y divide-white/5 border-t border-white/5 pt-1">
                {remainingFeatures.map((f, i) => (
                  <motion.div
                    key={f.key}
                    custom={i}
                    variants={rowVariants}
                    initial="hidden"
                    animate="visible"
                    className="flex items-center gap-3 rounded-lg px-1.5 py-2.5 transition-colors duration-200 hover:bg-white/[0.04]"
                  >
                    <span
                      className={cn(
                        "flex h-6 w-6 shrink-0 items-center justify-center rounded-full",
                        f.enabled
                          ? "bg-success/10 text-success-light"
                          : "bg-white/5 text-slate-600",
                      )}
                    >
                      {f.enabled ? (
                        <Check className="h-3.5 w-3.5" />
                      ) : (
                        <Lock className="h-3 w-3" />
                      )}
                    </span>
                    <span
                      className={cn(
                        "text-sm",
                        f.enabled ? "text-slate-200" : "text-slate-600",
                      )}
                    >
                      {f.label}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bottom emotional line */}
        {tagline && (
          <p className="mt-6 border-t border-white/5 pt-4 text-center text-xs italic leading-relaxed text-slate-500">
            {tagline}
          </p>
        )}
      </div>
    </motion.div>
  );
}
