"use client";

import { Layers3 } from "lucide-react";
import FeatureCard from "@/components/shared/FeatureCard";
import SectionHeader from "@/components/shared/SectionHeader";
import { FEATURES } from "@/lib/constants";

export default function FeatureGrid() {
  return (
    <section className="py-24 sm:py-28">
      <div className="section-shell">
        <SectionHeader
          badge="Everything You Need"
          description="From invoice creation to payment reconciliation and reporting, Invoicezy keeps your entire billing workflow in one polished workspace."
          icon={Layers3}
          title="Built for Modern Businesses"
        />
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {FEATURES.map((feature, index) => (
            <FeatureCard key={feature.title} index={index} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
}
