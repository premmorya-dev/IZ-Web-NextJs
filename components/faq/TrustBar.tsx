// components/faq/TrustBar.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const stats = [
  { value: 12000, suffix: "+", label: "Invoices generated" },
  { value: 3200, suffix: "+", label: "Freelancers & CA firms" },
  { value: 850, suffix: "+", label: "Startups & agencies" },
  { value: 99.9, suffix: "%", label: "Platform uptime", decimals: 1 },
];

function Counter({
  value,
  suffix,
  decimals = 0,
}: {
  value: number;
  suffix: string;
  decimals?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const duration = 1400;
    const start = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(value * eased);
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, value]);

  return (
    <span ref={ref} className="font-mono tabular-nums">
      {display.toFixed(decimals)}
      {suffix}
    </span>
  );
}

export default function TrustBar() {
  return (
    <section className="relative bg-[#0A0E1A] pb-20">
      <div className="mx-auto max-w-5xl px-6">
        <p className="mb-8 text-center text-xs font-medium uppercase tracking-[0.2em] text-slate-500">
          Trusted by CA firms, freelancers, startups & agencies
        </p>
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-6 text-center backdrop-blur-sm"
            >
              <div className="text-2xl font-semibold text-white sm:text-3xl">
                <Counter value={stat.value} suffix={stat.suffix} decimals={stat.decimals} />
              </div>
              <div className="mt-1 text-xs text-slate-400 sm:text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
