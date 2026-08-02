// app/contact/page.jsx
// ContactPageClient is "use client", so metadata/JSON-LD can't live inside it —
// Next.js only reads `metadata` from server components. Keep this wrapper as the
// actual route file.

import ContactPageClient from "@/components/contact/ContactPageClient";

const SITE_URL = "https://invoicezy.com"; // replace if your canonical domain differs

export const metadata = {
  title: "Contact Us | Invoicezy GST Invoicing",
  description:
    "Have a question about GST invoicing or your Invoicezy account? Send us a message and our team will get back to you within 24 hours.",
  alternates: {
    canonical: `${SITE_URL}/contact`,
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Contact Invoicezy",
    description:
      "Questions about GST invoicing, billing, or your account? Send us a message and we'll reply within 24 hours.",
    url: `${SITE_URL}/contact`,
    siteName: "Invoicezy",
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Invoicezy",
    description:
      "Questions about GST invoicing, billing, or your account? Send us a message and we'll reply within 24 hours.",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: "Contact Invoicezy",
  url: `${SITE_URL}/contact`,
  isPartOf: {
    "@type": "WebSite",
    name: "Invoicezy",
    url: SITE_URL,
  },
  about: {
    "@type": "Organization",
    name: "Invoicezy",
    url: SITE_URL,
  },
};

export default function ContactPage() {
  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ContactPageClient />
    </>
  );
}