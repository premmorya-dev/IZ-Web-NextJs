import CTABanner from "@/components/home/CTABanner";
import FeatureGrid from "@/components/home/FeatureGrid";
import Hero from "@/components/home/Hero";
import HowItWorks from "@/components/home/HowItWorks";
<<<<<<< HEAD
import Stats from "@/components/home/Stats";
import TemplateShowcase from "@/components/home/TemplateShowcase";
import Testimonials from "@/components/home/Testimonials";
=======
import WhyChooseInvoicezy from "@/components/home/WhyChooseInvoicezy";
import TemplateShowcase from "@/components/home/TemplateShowcase";
>>>>>>> dev

export const metadata = {
  title: "Invoicezy Home | Free Online Invoice Software - Professional Invoices in Minutes",
  description:
    "Invoicezy is a free online invoice generator and GST billing software for freelancers, startups, and small businesses. Create professional invoices, track payments, manage clients, and generate GST-compliant bills online.",
  alternates: {
    canonical: "/"
  },
    keywords: "invoice, invoice generator, online invoice, free invoice maker, professional invoice, invoice template, invoicezy, create invoice, billing software"
};

const softwareSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "name": "Invoicezy",
      "url": "https://www.invoicezy.com",
      "logo": "https://www.invoicezy.com/invoicezy.jpeg",
      "sameAs": [
        "https://www.facebook.com/invoicezy",
        "https://twitter.com/invoicezy",
        "https://www.linkedin.com/company/invoicezy"
      ]
    },
    
    {
      "@type": "SoftwareApplication",
      "name": "Invoicezy",
      "description": "Invoicezy is a free invoice management and GST billing software designed for freelancers, startups, and small businesses. Create professional invoices, manage clients, track payments, and generate GST-compliant bills online.",
      "applicationCategory": "BusinessApplication",
      "operatingSystem": "Web",
      "url": "https://www.invoicezy.com",
      "image": "https://www.invoicezy.com/invoicezy.jpeg",
      "author": {
        "@type": "Organization",
        "name": "Invoicezy"
      },
      "publisher": {
        "@type": "Organization",
        "name": "Invoicezy",
        "logo": {
          "@type": "ImageObject",
          "url": "https://www.invoicezy.com/invoicezy.jpeg"
        }
      },
      "offers": {
        "@type": "Offer",
        "price": "299",
        "priceCurrency": "INR",
        "url": "https://www.invoicezy.com/register"
      },
      "featureList": [
        "Free invoice generator",
        "GST billing software",
        "Online invoice maker",
        "Invoicing software for freelancers",
        "Invoicing software for small businesses",
        "Expense tracking",
        "Client management",
        "Payment tracking",
        "Recurring invoices",
        "Multi-currency support"
      ],
      "keywords": "free invoice software, invoice generator, online invoice maker, GST billing software, invoicing software for freelancers, invoicing software for small business"
    },
    {
      "@type": "WebPage",
      "url": "https://www.invoicezy.com/",
      "name": "Invoicezy – Free Invoice & GST Billing Software",
      "description": "Invoicezy is an online invoice generator and GST billing software for freelancers, startups, and small businesses."
    },
    {
      "@type": "WebPage",
      "url": "https://www.invoicezy.com/features",
      "name": "Invoicezy Features",
      "description": "Explore Invoicezy features – GST invoicing, expense tracking, client management, recurring billing, and more."
    },
    {
      "@type": "WebPage",
      "url": "https://www.invoicezy.com/contact",
      "name": "Contact Invoicezy",
      "description": "Get in touch with Invoicezy for support, queries, or partnership opportunities."
    }
  ]
};

export default function HomePage() {
  return (
    <>
      <Hero />      
      <HowItWorks />
      <WhyChooseInvoicezy />
      <TemplateShowcase /> 
      <FeatureGrid />    
      <CTABanner />
      <script
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
        type="application/ld+json"
      />
    </>
  );
}
