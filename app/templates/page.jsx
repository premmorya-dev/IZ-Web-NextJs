import TemplatesPageClient from "@/components/templates/TemplatesPageClient";

export const metadata = {
  title: "Invoicezy Templates - GST, Freelance, Product, and Service Layouts",
  description:
    "Browse Invoicezy invoice templates for GST billing, products, services, freelance work, quotations, and credit notes.",
  alternates: {
    canonical: "/templates"
  },
    keywords: "invoice, invoice generator, online invoice, free invoice maker, professional invoice, invoice template, invoicezy, create invoice, billing software"
};

export default function TemplatesPage() {
  return <TemplatesPageClient />;
}
