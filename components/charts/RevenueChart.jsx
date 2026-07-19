"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";
import { CHART_DATA } from "@/lib/constants";

function CurrencyTooltip({ active, payload, label }) {
  if (!active || !payload?.length) {
    return null;
  }

  return (
    <div className="glass-card min-w-[180px] p-3 text-sm">
      <p className="mb-2 font-semibold text-white light:text-slate-950">{label}</p>
      {payload.map((entry) => (
        <div key={entry.dataKey} className="flex items-center justify-between gap-4 text-slate-300 light:text-slate-700">
          <span>{entry.name}</span>
          <span className="font-medium">{`\u20B9${entry.value.toLocaleString("en-IN")}`}</span>
        </div>
      ))}
    </div>
  );
}

export default function RevenueChart() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-120px" });

  return (
    <div ref={ref} className="glass-card p-6 sm:p-8">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.25em] text-primary-light">Business Analytics</p>
          <h3 className="mt-2 text-2xl font-semibold text-white light:text-slate-950">Revenue vs expenses</h3>
        </div>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          {[
            { label: "Total Revenue", value: "\u20B94.08L" },
            { label: "Growth", value: "+34%" },
            { label: "Pending", value: "\u20B922k" }
          ].map((metric) => (
            <div key={metric.label} className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 light:border-slate-200 light:bg-slate-50">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-500">{metric.label}</p>
              <p className="mt-2 text-lg font-semibold text-white light:text-slate-950">{metric.value}</p>
            </div>
          ))}
        </div>
      </div>
      <motion.div
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        initial={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.5 }}
        className="h-[320px]"
      >
        {isInView ? (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={CHART_DATA} margin={{ left: 0, right: 0, top: 12, bottom: 0 }}>
              <defs>
                <linearGradient id="revenueFill" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#4F46E5" stopOpacity={0.35} />
                  <stop offset="100%" stopColor="#4F46E5" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="expenseFill" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#EF4444" stopOpacity={0.25} />
                  <stop offset="100%" stopColor="#EF4444" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke="rgba(148, 163, 184, 0.12)" vertical={false} />
              <XAxis axisLine={false} dataKey="month" tick={{ fill: "#94A3B8", fontSize: 12 }} tickLine={false} />
              <YAxis axisLine={false} tick={{ fill: "#94A3B8", fontSize: 12 }} tickFormatter={(value) => `\u20B9${value / 1000}k`} tickLine={false} width={48} />
              <Tooltip content={<CurrencyTooltip />} cursor={{ stroke: "rgba(129, 140, 248, 0.4)", strokeDasharray: "4 4" }} />
              <Area
                dataKey="expenses"
                fill="url(#expenseFill)"
                name="Expenses"
                stroke="#EF4444"
                strokeWidth={2}
                type="monotone"
              />
              <Area
                dataKey="revenue"
                fill="url(#revenueFill)"
                name="Revenue"
                stroke="#4F46E5"
                strokeWidth={3}
                type="monotone"
              />
            </AreaChart>
          </ResponsiveContainer>
        ) : null}
      </motion.div>
    </div>
  );
}