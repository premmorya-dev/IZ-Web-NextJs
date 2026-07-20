// app/faq/page.tsx
import type { Metadata } from "next";
import FAQHero from "@/components/faq/FAQHero";
import TrustBar from "@/components/faq/TrustBar";
import FAQInteractive from "@/components/faq/FAQInteractive";
import SupportCTA from "@/components/faq/SupportCTA";
import FinalCTA from "@/components/faq/FinalCTA";
import FooterStrip from "@/components/faq/FooterStrip";
import FAQSchema from "@/components/faq/FAQSchema";

export const metadata: Metadata = {
  title: "FAQs — Invoice Software, GST Billing & Payments | Invoicezy",
  description:
    "Answers to common questions about Invoicezy's invoice software, GST invoicing, UPI payments, recurring billing, invoice templates, and client management.",
  alternates: {
    canonical: "https://invoicezy.com/faq",
  },
  openGraph: {
    title: "FAQs — Invoice Software, GST Billing & Payments | Invoicezy",
    description:
      "Everything you need to know about Invoicezy: GST invoicing, billing, payments, clients, invoices and more.",
    url: "https://invoicezy.com/faq",
    type: "website",
  },
};

export default function FAQPage() {
  return (
    <main className="bg-[#0A0E1A]">
      <FAQInteractive />
    </main>
  );
}
