import WebsiteDevelopmentPageClient from "@/components/website-development/WebsiteDevelopmentPageClient";

export const metadata = {
  title:
    "Website Development Services | Custom Business Websites & Software Solutions by Prem Morya",

  description:
    "Professional website development services for startups, businesses, coaching institutes and companies. Get responsive websites with free domain, hosting, SSL, SEO setup and post delivery support.",

  alternates: {
    canonical: "/website-development",
  },

  keywords: [
    "website development services",
    "website developer india",
    "custom website development",
    "business website development",
    "responsive website design",
    "web application development",
    "laravel developer",
    "next js developer",
    "react developer",
    "node js developer",
    "custom software development",
    "business website",
    "dynamic website development",
    "company website development",
    "ecommerce website development",
    "coaching institute website",
    "professional website developer",
    "website with domain hosting",
    "website development with ssl",
    "website development india",
    "Prem Morya web developer",
    "software solutions",
    "invoice software development",
    "admin panel development",
    "crm development",
    "erp development",
  ],

  openGraph: {
    title:
      "Website Development Services | Business Websites & Software Solutions",

    description:
      "Build modern websites and software solutions with free domain, hosting and SSL. Responsive business websites, custom software and admin panels.",

    url: "https://invoicezy.com/website-development",

    siteName: "Invoicezy",

    type: "website",

    images: [
      {
        url: "/website-development-og.jpg",
        width: 1200,
        height: 630,
        alt: "Website Development Services",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",

    title:
      "Website Development Services | Business Websites & Software Solutions",

    description:
      "Professional website development with domain, hosting, SSL and support included.",

    images: ["/website-development-og.jpg"],
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function WebsiteDevelopmentPage() {
  return <WebsiteDevelopmentPageClient />;
}