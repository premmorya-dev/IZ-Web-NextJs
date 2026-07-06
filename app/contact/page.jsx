import ContactPageClient from "@/components/contact/ContactPageClient";

export const metadata = {
  title: "Invoicezy Contact",
  description:
    "Explore Invoicezy's live invoice builder, payment tracking, GST automation, inventory control, and reporting features.",
  alternates: {
    canonical: "/contact"
  },
  keywords: "invoice, invoice generator, online invoice, free invoice maker, professional invoice, invoice template, invoicezy, create invoice, billing software"
};

export default function FeaturesPage() {
  return <ContactPageClient />;
}



