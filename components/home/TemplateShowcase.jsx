"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { LayoutTemplate, MoveRight } from "lucide-react";
import SectionHeader from "@/components/shared/SectionHeader";
import TemplateCard from "@/components/shared/TemplateCard";
import { HOME_TEMPLATE_FILTERS, TEMPLATES } from "@/lib/constants";
import { cn } from "@/lib/utils";

export default function TemplateShowcase() {
  const [filter, setFilter] = useState("All");

  const templates = useMemo(() => {
    const filtered =
      filter === "All"
        ? TEMPLATES
        : TEMPLATES.filter((template) => template.shortCategory === filter || template.category === filter);

    return filtered.slice(0, 6);
  }, [filter]);

  return (
    <section className="py-10 sm:py-10">
      <div className="section-shell">
        <SectionHeader
          badge="Professional Invoice Templates"
          description="Pick a polished template for GST, service billing, products, or freelance work and launch in minutes."
          icon={LayoutTemplate}
          title="Templates That Match How You Sell"
        />
        <div className="mb-8 flex flex-wrap justify-center gap-3">
          {HOME_TEMPLATE_FILTERS.map((item) => (
            <button
              key={item}
              className={cn(
                "rounded-full border px-4 py-2 text-sm font-medium transition-all duration-300",
                filter === item
                  ? "border-primary/40 bg-primary/10 text-white shadow-badge light:text-primary"
                  : "border-white/10 bg-white/[0.03] text-slate-400 hover:border-primary/30 hover:text-white light:border-slate-200 light:bg-white light:text-slate-600"
              )}
              onClick={() => setFilter(item)}
              type="button"
            >
              {item}
            </button>
          ))}
        </div>
        <div className="grid gap-6 lg:grid-cols-3">
          {templates.map((template) => (
            <TemplateCard key={template.id} compact template={template} />
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link className="inline-flex items-center gap-2 text-sm font-medium text-primary-light hover:text-white light:text-primary" href="/templates">
            View all 50+ templates
            <MoveRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
