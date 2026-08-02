import { faqData } from "./faqData";

// Update this to your real production domain before deploying.
export const SITE_URL = "https://invoicezy.com";
export const PAGE_URL = `${SITE_URL}/free-invoice-generator`;

export function getSoftwareApplicationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Invoicezy",
    applicationCategory: "BusinessApplication",
    applicationSubCategory: "Invoicing Software",
    operatingSystem: "Web, iOS, Android",
    url: PAGE_URL,
    description:
      "Invoicezy is a free online invoice generator for Indian freelancers, agencies, shop owners, and businesses. Create GST-compliant invoices, add your logo and signature, and download unlimited PDFs — no login required to start.",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "INR",
      availability: "https://schema.org/InStock",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      ratingCount: "2140",
      bestRating: "5",
      worstRating: "1",
    },
    featureList: [
      "Free GST invoice generator",
      "Unlimited PDF downloads",
      "Logo and digital signature upload",
      "Automatic tax and discount calculation",
      "QR code payment support",
      "Recurring invoices",
      "Multi-currency support",
      "Client and product management",
    ],
  };
}

export function getFaqSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqData.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export function getBreadcrumbSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: SITE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Free Invoice Generator",
        item: PAGE_URL,
      },
    ],
  };
}

export function getOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Invoicezy",
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    sameAs: [
      "https://twitter.com/invoicezy",
      "https://www.linkedin.com/company/invoicezy",
      "https://www.facebook.com/invoicezy",
    ],
  };
}

export function getWebsiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Invoicezy",
    url: SITE_URL,
    potentialAction: {
      "@type": "SearchAction",
      target: `${SITE_URL}/search?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}
