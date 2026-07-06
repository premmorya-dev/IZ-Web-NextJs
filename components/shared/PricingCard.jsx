"use client";

import { useState } from "react";
import { Check } from "lucide-react";

// dynamic label
const formatLabel = (key) => {
  return key
    .replace(/_/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase())
    .replace(/\bQr\b/g, "QR")
    .replace(/\bApi\b/g, "API");
};

export default function PricingCard({ plan }) {
  const [expanded, setExpanded] = useState(false);
  if (!plan) return null;

  const features =
    typeof plan.features === "string"
      ? JSON.parse(plan.features || "{}")
      : plan.features || {};

  const featureEntries = Object.entries(features).filter(
    ([_, value]) => value
  );

  const visibleFeatures = expanded
    ? featureEntries
    : featureEntries.slice(0, 6); // 👈 default visible

  return (
    <div className="glass-card p-6 flex flex-col justify-between">
      <div>
        <p className="text-lg font-semibold text-white light:text-slate-950">{plan.name}</p>

        <p className="text-sm text-slate-400 mt-2">
          {plan.description}
        </p>

        <div className="text-3xl font-bold mt-4 text-white light:text-slate-950">
          ₹{plan.price}
        </div>

        <div className="text-xs mt-2 text-slate-400">
          {plan.plan_id == 1 ? plan.invoice_limit : 'Unlimited'} invoices • {plan.plan_id == 1 ? plan.client_limit: "Unlimied"} clients
        </div>

        {/* ✅ Features */}
        <div className="mt-4 space-y-2">
          {visibleFeatures.map(([key]) => (
            <div key={key} className="flex gap-2 items-center text-sm">
              <Check size={16} className="text-green-500" />
              <span className="text-slate-300 light:text-slate-700">
                {formatLabel(key)}
              </span>
            </div>
          ))}
        </div>

        {/* ✅ Read More / Show Less */}
        {featureEntries.length > 6 && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="mt-3 text-xs text-primary-light hover:underline"
          >
            {expanded ? "Show Less" : "Read More"}
          </button>
        )}
      </div>

      <button  onClick={() => window.location.href="https://invoicezy.com/register" } className="mt-6 w-full bg-primary-gradient text-white py-2 rounded-lg">
        Get Started
      </button>
    </div>
  );
}