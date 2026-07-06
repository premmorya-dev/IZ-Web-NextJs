import LoginPageClient from "@/components/auth/LoginPageClient";

export const metadata = {
  title: "Login to Invoicezy",
  description: "Sign in to Invoicezy to manage invoices, payments, GST exports, and reporting from one workspace.",
  alternates: {
    canonical: "/login"
  },
    keywords: "invoice, invoice generator, online invoice, free invoice maker, professional invoice, invoice template, invoicezy, create invoice, billing software"
};

export default function LoginPage() {
  return <LoginPageClient />;
}
