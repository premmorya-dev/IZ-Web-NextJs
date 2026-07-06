"use client";

import Link from "next/link";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-300 px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        
        {/* Header */}
        <div className="mb-12 mt-12 text-center">
          <h1 className="text-4xl font-bold text-white sm:text-5xl">
            Terms & Conditions
          </h1>
          <p className="mt-4 text-sm text-slate-400">
            Last Modified: 10-05-2025
          </p>
        </div>

        {/* Content Card */}
        <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 sm:p-10 space-y-8">

          <p className="text-sm leading-relaxed">
            PLEASE READ THIS AGREEMENT CAREFULLY BEFORE USING THIS SERVICE.
          </p>

          <p className="text-sm leading-relaxed">
            By using the service or clicking “Agree,” you (the Customer) are agreeing to be bound by this agreement. 
            If you are accepting this agreement on behalf of your employer or an organization, you represent and 
            warrant that you have the authority to do so.
          </p>

          <p className="text-sm leading-relaxed">
            This agreement is between <span className="text-white font-medium">Prem Morya</span>, the individual owner and operator of invoicezy.com 
            ("Invoicezy"), and the customer agreeing to these terms ("Customer").
          </p>

          {/* Sections */}
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
    title: "1. Software-as-a-Service",
    content: [
      "This agreement provides access to and use of Invoicezy’s online software services as outlined on invoicezy.com ('Service')."
    ]
  },
  {
    title: "2. Use of Service",
    content: [
      "Customer Data: All logos, data, and information uploaded by the Customer remain the Customer’s property. Invoicezy may use such data solely to operate and improve the Service.",
      "Access: Customers may allow authorized contractors to use the Service. All users must follow these terms.",
      "Responsibilities:",
      "• Keep login credentials confidential.",
      "• Be responsible for all activity under their account.",
      "• Notify Invoicezy of unauthorized use.",
      "• Use the Service for legal purposes only.",
      "Support: Available via invoicezy.com/contact or support@invoicezy.com."
    ]
  },
  {
    title: "3. Publicity",
    content: [
      "Invoicezy may use Customer name and logo in promotional materials unless opted out."
    ]
  },
  {
    title: "4. Disclaimer",
    content: [
      "The Service is provided 'AS IS'. Invoicezy disclaims all warranties including fitness for a particular purpose."
    ]
  },
  {
    title: "5. Payment Terms",
    content: [
      "Fees are payable per subscription plan.",
      "Accepted methods include Credit Cards, UPI, Bank Transfer, PayPal.",
      "Late payments may result in suspension after 15 days."
    ]
  },
  {
    title: "6. Confidentiality",
    content: [
      "Both parties agree to protect confidential information excluding public data."
    ]
  },
  {
    title: "7. Intellectual Property",
    content: [
      "All platform software, design, and tools are the property of Invoicezy."
    ]
  },
  {
    title: "8. Termination",
    content: [
      "Agreement remains active until terminated.",
      "Data export available for 90 days.",
      "Unpaid dues must be cleared immediately."
    ]
  },
  {
    title: "9. Limitation of Liability",
    content: [
      "Invoicezy is not liable for indirect damages.",
      "Maximum liability is limited to fees paid in last 6 months."
    ]
  },
  {
    title: "10. Indemnity",
    content: [
      "Customers agree to indemnify Invoicezy for misuse of the Service."
    ]
  },
  {
    title: "11. Governing Law",
    content: [
      "Governed by laws of India.",
      "Jurisdiction: Ghaziabad, Uttar Pradesh."
    ]
  },
  {
    title: "12. Other Terms",
    content: [
      "This is the entire agreement.",
      "Changes must be in writing.",
      "Rights are non-transferable.",
      "Force Majeure applies.",
      "Feedback may be used without restriction."
    ]
  },
  {
    title: "13. Refund Policy",
    content: [
      "Invoicezy is a cloud-based invoicing solution.",
      "Subscription fees are charged in advance.",
      "All payments are non-refundable except where required by law.",
      "Users should try free plan before purchasing.",
      "Contact support@invoicezy.com for help."
    ]
  }
];