import PricingPageClient from "@/components/pricing/PricingPageClient";

export const metadata = {
  title: "Invoicezy Pricing - Monthly and Yearly Plans for Every Stage",
  description:
    "Compare Invoicezy pricing plans from free to enterprise and choose the right billing, GST, and reporting toolkit for your team.",
  alternates: {
    canonical: "/pricing"
  },
    keywords: "invoice, invoice generator, online invoice, free invoice maker, professional invoice, invoice template, invoicezy, create invoice, billing software"
};

export default function PricingPage() {
  return <PricingPageClient />;
}
