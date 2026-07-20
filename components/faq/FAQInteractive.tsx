// components/faq/FAQInteractive.tsx
"use client";

import { useMemo, useState } from "react";
import type { FAQCategory } from "@/lib/faq-data";
import { getFilteredFaqs } from "@/lib/faq-data";
import FAQSearch from "./FAQSearch";
import FAQCategories from "./FAQCategories";
import FAQAccordion from "./FAQAccordion";

export default function FAQInteractive() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<FAQCategory>("All");

  const filtered = useMemo(() => getFilteredFaqs(category, query), [category, query]);

  return (

    <section className="relative bg-[#0A0E1A] pb-24 mt-24">
  <div className="mx-auto mt-10 max-w-4xl px-6 text-center">

    <span className="inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-4 py-1 text-sm font-medium text-primary">
      Help Center
    </span>

    <h2 className="mt-6 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
      Frequently Asked Questions About Invoicezy
    </h2>

    <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-slate-300">
      Find answers to the most common questions about Invoicezy, including
      GST invoicing, online billing, invoice templates, UPI payments, client
      management, expense tracking, pricing, security, and more. Whether
      you're a freelancer, startup, small business, or growing company, this
      FAQ section will help you get the most out of our cloud-based invoice
      software.
    </p>
  </div>
<div className="mx-auto mt-14 max-w-5xl px-6">
  <FAQSearch
    value={query}
    onChange={setQuery}
    resultCount={filtered.length}
  />

  <FAQCategories
    active={category}
    onChange={setCategory}
  />
</div>

  <div className="mx-auto mt-14 max-w-3xl px-6">
    <FAQAccordion items={filtered} />
  </div>
</section>
  );
}
