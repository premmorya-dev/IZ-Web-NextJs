import type { Metadata } from "next";
import InvoiceGeneratorHero from "./InvoiceGeneratorHero";
import InvoiceToolSection from "./InvoiceToolSection";
import HowItWorksSection from "./HowItWorksSection";
import FeaturesGrid from "./FeaturesGrid";
import IndustriesSection from "./IndustriesSection";
import ComparisonSection from "./ComparisonSection";
import TestimonialsSection from "./TestimonialsSection";
import TrustSection from "./TrustSection";
import FAQSection from "./FAQSection";
import StickyCTA from "./StickyCTA";
import ExitIntentModal from "./ExitIntentModal";
import {
  PAGE_URL,
  getSoftwareApplicationSchema,
  getFaqSchema,
  getBreadcrumbSchema,
  getOrganizationSchema,
  getWebsiteSchema,
} from "./schema";

const TITLE =
  "Free Invoice Generator Online | Create GST Invoices in Seconds — Invoicezy";
const DESCRIPTION =
  "Create professional GST invoices free with Invoicezy's online invoice generator. Add your logo, apply tax & discounts automatically, and download unlimited PDFs. No login needed to start.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: PAGE_URL,
  },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: PAGE_URL,
    siteName: "Invoicezy",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://invoicezy.com/og/free-invoice-generator.png",
        width: 1200,
        height: 630,
        alt: "Invoicezy Free Invoice Generator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["https://invoicezy.com/og/free-invoice-generator.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function FreeInvoiceGeneratorPage() {
  const schemas = [
    getSoftwareApplicationSchema(),
    getFaqSchema(),
    getBreadcrumbSchema(),
    getOrganizationSchema(),
    getWebsiteSchema(),
  ];

  return (
    <>
      {schemas.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      <main className="izy-invoice-landing bg-[#0A0E1A]">
        <InvoiceGeneratorHero />
        <InvoiceToolSection />
        <TestimonialsSection />
        <HowItWorksSection />
        <FeaturesGrid />
        <IndustriesSection />
        <ComparisonSection />
        <TrustSection />
        <FAQSection />
      </main>

      <StickyCTA />
      <ExitIntentModal />
    </>
  );
}
