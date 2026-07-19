"use client";

import Link from "next/link";

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-300 px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">

        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-white mt-12 sm:text-5xl">
            Privacy Policy
          </h1>
          <p className="mt-4 text-sm text-slate-400">
            Last Updated: 10-05-2025
          </p>
        </div>

        {/* Content Card */}
        <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 sm:p-10 space-y-8">

          <p className="text-sm leading-relaxed">
            This Privacy Policy describes how{" "}
            <span className="text-white font-medium">Invoicezy</span>, operated and owned by Prem Morya,
            collects, uses, and protects your information when you use our website and services.
          </p>

          {sections.map((section, index) => (
            <div key={index} className="space-y-3">
              <h2 className="text-lg font-semibold text-white">
                {section.title}
              </h2>

              {section.content.map((item, i) => (
                <p key={i} className="text-sm leading-relaxed text-slate-300">
                  {item}
                </p>
              ))}
            </div>
          ))}

          {/* Contact */}
          <div className="border-t border-white/10 pt-6">
            <h2 className="text-lg font-semibold text-white mb-3">
              Contact Information
            </h2>

            <p className="text-sm">
              Email:{" "}
              <a href="mailto:support@invoicezy.com" className="text-primary underline">
                support@invoicezy.com
              </a>
            </p>

            <p className="text-sm">
              Website:{" "}
              <Link href="https://invoicezy.com" className="text-primary underline">
                invoicezy.com
              </Link>
            </p>

            <p className="text-sm">
              Premium:{" "}
              <a href="https://pro.invoicezy.com" className="text-primary underline">
                pro.invoicezy.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

const sections = [
  {
    title: "1. Information We Collect",
    content: [
      "Personal Information: Name, email address, contact details, and billing information.",
      "Usage Data: Pages visited, actions performed, IP address, browser type, and device information.",
      "Uploaded Content: Data submitted such as client details, invoices, or uploaded files."
    ]
  },
  {
    title: "2. How We Use Your Information",
    content: [
      "To provide and maintain the Invoicezy service.",
      "To process payments and manage subscriptions.",
      "To respond to support queries and feedback.",
      "To send important updates and notifications.",
      "To improve functionality, security, and performance."
    ]
  },
  {
    title: "3. Data Sharing and Disclosure",
    content: [
      "We do not sell your data to third parties.",
      "Data may be shared with trusted providers (e.g. payment gateways) under confidentiality agreements.",
      "We may disclose information if required by law or to protect our rights and users."
    ]
  },
  {
    title: "4. Cookies and Tracking",
    content: [
      "Invoicezy uses cookies to enhance user experience, store preferences, and analyze usage.",
      "You can control cookies via browser settings."
    ]
  },
  {
    title: "5. Data Security",
    content: [
      "We implement industry-standard security measures.",
      "However, no internet transmission is 100% secure."
    ]
  },
  {
    title: "6. Data Retention",
    content: [
      "We retain data while your account is active or as required for legal and audit purposes.",
      "You may request deletion or anonymization of your data."
    ]
  },
  {
    title: "7. Your Rights",
    content: [
      "Access your personal data.",
      "Request correction or deletion.",
      "Withdraw consent or object to processing.",
      "Request a copy of your data.",
      "Contact support@invoicezy.com to exercise rights."
    ]
  },
  {
    title: "8. Children's Privacy",
    content: [
      "Invoicezy is not intended for users under 18.",
      "We do not knowingly collect data from children."
    ]
  },
  {
    title: "9. International Users",
    content: [
      "If accessed outside India, your data may be stored and processed in India."
    ]
  },
  {
    title: "10. Changes to This Privacy Policy",
    content: [
      "We may update this policy from time to time.",
      "Changes will be posted here with an updated date.",
      "Continued use implies acceptance."
    ]
  }
];