"use client";

import Link from "next/link";

export default function RefundPolicyPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-300 px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">

        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-white mt-12 sm:text-5xl">
            Cancellation & Refund Policy
          </h1>
          <p className="mt-4 text-sm text-slate-400">
            Last Updated: 16-05-2025
          </p>
        </div>

        {/* Content Card */}
        <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 sm:p-10 space-y-8">

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
              Contact & Support
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
              Premium Platform:{" "}
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
    title: "1. Overview",
    content: [
      "Invoicezy is a cloud-based invoicing platform available at pro.invoicezy.com, where users can create, manage, and send invoices efficiently.",
      "All plans and legal policies are outlined on invoicezy.com."
    ]
  },
  {
    title: "2. Subscription Cancellation",
    content: [
      "Customers may cancel their subscription at any time via account settings or by contacting support@invoicezy.com.",
      "Cancellation stops future renewals but does not provide any refund for unused time.",
      "Access to premium features remains active until the end of the billing cycle."
    ]
  },
  {
    title: "3. Refund Policy",
    content: [
      "All subscription fees are charged in advance and are non-refundable.",
      "By subscribing, the Customer agrees:",
      "• All payments are final and non-refundable.",
      "• No refunds for partial use, downgrades, or unused duration.",
      "• Customers must evaluate the service before purchasing.",
      "Exceptions may apply only where required by law."
    ]
  },
  {
    title: "4. Free Plan Policy",
    content: [
      "Invoicezy offers a Free Plan with limited features and unlimited validity.",
      "No charges apply to free users.",
      "The Free Plan does not auto-upgrade to paid plans.",
      "Users may upgrade anytime based on their needs."
    ]
  },
  {
    title: "5. Contact and Support",
    content: [
      "For any queries related to this policy, please contact support@invoicezy.com."
    ]
  }
];