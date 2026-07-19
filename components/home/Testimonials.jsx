"use client";

import { motion } from "framer-motion";
import { MessageSquareQuote } from "lucide-react";
import SectionHeader from "@/components/shared/SectionHeader";
import TestimonialCard from "@/components/shared/TestimonialCard";
import { TESTIMONIALS } from "@/lib/constants";

export default function Testimonials() {
  return (
    <section className="py-24 sm:py-28">
      <div className="section-shell">
        <SectionHeader
          badge="Customer Love"
          description="Teams across India use Invoicezy to ship cleaner invoices, get paid faster, and stay audit ready."
          icon={MessageSquareQuote}
          title="What Businesses Say About Invoicezy"
        />
        <motion.div className="hide-scrollbar flex gap-6 overflow-x-auto pb-2 lg:grid lg:grid-cols-3 lg:overflow-visible" drag="x" dragConstraints={{ left: -160, right: 0 }}>
          {TESTIMONIALS.map((testimonial) => (
            <TestimonialCard key={testimonial.name} testimonial={testimonial} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
