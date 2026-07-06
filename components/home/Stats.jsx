"use client";

import AnimatedCounter from "@/components/shared/AnimatedCounter";
import { STATS } from "@/lib/constants";

export default function Stats() {
  return (
    <section className="py-16 sm:py-20">
      <div className="section-shell">
        <div className="glass-card grid gap-8 p-6 sm:grid-cols-2 sm:p-8 lg:grid-cols-4 lg:p-10">
          {STATS.map((stat, index) => (
            <div
              key={stat.label}
              className={index !== STATS.length - 1 ? "lg:border-r lg:border-slate-200/70 lg:pr-8 dark:lg:border-white/10" : ""}
            >
              <div className="text-4xl font-semibold tracking-tight sm:text-5xl">
                <span className="gradient-text">
                  <AnimatedCounter duration={2000} end={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
                </span>
              </div>
              <p className="mt-3 text-sm uppercase tracking-[0.2em] text-slate-400 light:text-slate-600">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

