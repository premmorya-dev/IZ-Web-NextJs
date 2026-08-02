// app/register/page.jsx
// RegisterPageClient is "use client", so metadata/JSON-LD can't live inside it —
// Next.js only reads `metadata` from server components. Keep this wrapper as the
// actual route file.

import RegisterPageClient from "@/components/auth/RegisterPageClient";

const SITE_URL = "https://invoicezy.com"; // replace if your canonical domain differs

export const metadata = {
  title: "Create Your Free Account | Invoicezy GST Invoicing",
  description:
    "Sign up free on Invoicezy and create GST-compliant invoices in minutes. Built for freelancers, CA firms, startups and agencies. No credit card required.",
  alternates: {
    canonical: `${SITE_URL}/register`,
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Create Your Free Invoicezy Account",
    description:
      "GST-compliant invoicing for Indian freelancers, CA firms, startups and agencies. Sign up free — no credit card required.",
    url: `${SITE_URL}/register`,
    siteName: "Invoicezy",
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Create Your Free Invoicezy Account",
    description:
      "GST-compliant invoicing for Indian freelancers, CA firms, startups and agencies.",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Create Your Free Account | Invoicezy",
  url: `${SITE_URL}/register`,
  isPartOf: {
    "@type": "WebSite",
    name: "Invoicezy",
    url: SITE_URL,
  },
  about: {
    "@type": "SoftwareApplication",
    name: "Invoicezy",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "INR",
    },
  },
};

export default function RegisterPage() {
  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <RegisterPageClient />
    </>
  );
}