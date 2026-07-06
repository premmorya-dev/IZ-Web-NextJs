import FeaturesPageClient from "@/components/features/FeaturesPageClient";

export const metadata = {
  title: "Invoicezy Features - Live Invoicing, Collections, and Analytics",
  description:
    "Explore Invoicezy's live invoice builder, payment tracking, GST automation, inventory control, and reporting features.",
  alternates: {
    canonical: "/features"
  },
  keywords: "invoice, invoice generator, online invoice, free invoice maker, professional invoice, invoice template, invoicezy, create invoice, billing software"
};

export default function FeaturesPage() {
  return <FeaturesPageClient />;
}



