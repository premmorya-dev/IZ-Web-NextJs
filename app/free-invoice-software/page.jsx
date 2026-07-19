import FreeInvoiceSoftwarePage from "@/components/free-invoice-software/FreeInvoiceSoftwarePageClient";
export const metadata = {
  title: "Free Invoice Software for Small Business & Freelancers | Invoicezy",
  
  description:
    "Free invoice software to create professional invoices, track payments, manage clients & GST billing. Invoicezy helps freelancers & small businesses get paid faster. No credit card required.",

  alternates: {
    canonical: "/free-invoice-software",
  },

  keywords: [
    "free invoice software",
    "invoice generator free",
    "online invoice maker",
    "gst billing software free",
    "invoice software for freelancers",
    "small business invoicing software",
    "create invoice online free",
    "billing software india",
    "invoice template generator",
    "invoice software with payment tracking"
  ],

  openGraph: {
    title: "Free Invoice Software | Invoicezy",
    description:
      "Create invoices, track payments, manage clients & GST billing with Invoicezy. 100% free for freelancers and small businesses.",
    url: "https://invoicezy.com/free-invoice-software",
    siteName: "Invoicezy",
    images: [
      {
        url: "/images/feature.jpeg",
        width: 1200,
        height: 630,
        alt: "Invoicezy Free Invoice Software",
      },
    ],
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Free Invoice Software | Invoicezy",
    description:
      "Create invoices, track payments & manage billing easily with Invoicezy.",
    images: ["/images/feature.jpeg"],
  },
};
export default function InvoiceSoftwarePage(){
    return <FreeInvoiceSoftwarePage />
}