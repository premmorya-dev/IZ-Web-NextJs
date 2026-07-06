import { Inter, Poppins } from "next/font/google";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ChatWidget from "@/components/shared/ChatWidget";
import { ThemeProvider } from "@/components/ui/theme-provider";
import "../styles/globals.css";
import Script from "next/script";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter"
});

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["600", "700"]
});

export const metadata = {
    icons: {
    icon: '/favicon.jpeg',

  },
  metadataBase: new URL("https://invoicezy.com"),
  title: "Invoicezy - GST Invoicing & Billing Software for Indian Businesses",
  description:
    "Invoicezy helps Indian businesses create GST invoices, track payments, accept UPI, manage billing, and understand reports from one fast, modern dashboard.",
  alternates: {
    canonical: "/"
  },
  openGraph: {
    title: "Invoicezy - GST Invoicing & Billing Software for Indian Businesses",
    description:
      "Create invoices, track payments, and grow your business with Invoicezy's all-in-one billing platform.",
    url: "https://invoicezy.com",
    siteName: "Invoicezy",
    images: [
      {
        url: "/invoicezy.jpeg",
        width: 1200,
        height: 630,
        alt: "Invoicezy product preview"
      }
    ],
    locale: "en_IN",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Invoicezy - GST Invoicing & Billing Software",
    description:
      "Modern invoicing, UPI payments, business reports, and collections for Indian businesses.",
    images: ["/invoicezy.jpeg"]
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${poppins.variable} font-sans antialiased`}>

        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-E0NH65K8GD"
          strategy="afterInteractive"
        />

        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];

            function gtag() {
              dataLayer.push(arguments);
            }

            window.gtag = gtag;

            gtag('js', new Date());

            gtag('config', 'G-E0NH65K8GD', {
              cookie_domain: '.invoicezy.com'
            });
          `}
        </Script>

        <ThemeProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
          <ChatWidget />
        </ThemeProvider>
      </body>
    </html>
  );
}
