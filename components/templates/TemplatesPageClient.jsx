"use client";

import { useMemo, useState } from "react";
import { LayoutTemplate, Search } from "lucide-react";
import SectionHeader from "@/components/shared/SectionHeader";
import TemplateCard from "@/components/shared/TemplateCard";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { TEMPLATE_FILTERS, TEMPLATES, TEMPLATE_SORT_OPTIONS } from "@/lib/constants";
import { cn } from "@/lib/utils";

export default function TemplatesPageClient() {
  const [filter, setFilter] = useState("All");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("Popular");

  const featured = useMemo(
    () => [...TEMPLATES].sort((a, b) => b.downloads - a.downloads).slice(0, 3),
    []
  );

  const visibleTemplates = useMemo(() => {
    let data = [...TEMPLATES];

    if (filter !== "All") {
      data = data.filter((template) => template.category === filter);
    }

    if (query.trim()) {
      const keyword = query.toLowerCase();
      data = data.filter(
        (template) =>
          template.name.toLowerCase().includes(keyword) ||
          template.category.toLowerCase().includes(keyword) ||
          template.description.toLowerCase().includes(keyword)
      );
    }

    if (sort === "Popular") {
      data.sort((a, b) => b.downloads - a.downloads);
    } else if (sort === "New") {
      data.sort((a, b) => b.id - a.id);
    } else {
      data.sort((a, b) => a.category.localeCompare(b.category));
    }

    return data;
  }, [filter, query, sort]);

  return (
    <div className="pb-24 pt-32 sm:pb-28">
      <section className="section-shell">
        <SectionHeader
          as="h1"
          badge="Template Library"
          description="Browse curated invoice layouts for GST billing, services, products, quotations, and everything in between."
          icon={LayoutTemplate}
          title="Invoice Templates for Every Business"
        />
        <div className="glass-card mb-10 grid gap-4 p-4 lg:grid-cols-[1.4fr_0.9fr_0.7fr]">
          <div className="flex flex-wrap gap-3">
            {TEMPLATE_FILTERS.map((item) => (
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
          <div className="relative">
            <Input placeholder="Search templates" value={query} onChange={(event) => setQuery(event.target.value)} />
            <Search className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
          </div>
          <Select
            options={TEMPLATE_SORT_OPTIONS.map((item) => ({ label: item, value: item }))}
            value={sort}
            onChange={(event) => setSort(event.target.value)}
          />
        </div>
      </section>

      <section className="section-shell">
       
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {visibleTemplates.map((template) => (
            <TemplateCard key={template.id} template={template} />
          ))}
        </div>
      </section>
    </div>
  );
}


