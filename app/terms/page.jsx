import TermsPageClient from "@/components/terms/TermsPageClient";

export const metadata = {
  title: "Register for Invoicezy",
  description:
    "Create your free Invoicezy account and start billing clients, tracking payments, and automating GST-ready workflows.",
  alternates: {
    canonical: "/register"
  },
    keywords: "invoice, invoice generator, online invoice, free invoice maker, professional invoice, invoice template, invoicezy, create invoice, billing software"
};

export default function TermsPage() {
  return <TermsPageClient />;
}
