"use client";

import Link from "next/link";

export default function CookiePolicyPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-300 px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">

        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-white mt-12  sm:text-5xl">
            Cookie Policy
          </h1>
          <p className="mt-4 text-sm text-slate-400">
            Last Modified: 25-05-2018
          </p>
        </div>

        {/* Content Card */}
        <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 sm:p-10 space-y-8">

          <p className="text-sm leading-relaxed">
            This Cookie Policy explains how{" "}
            <span className="text-white font-medium">Invoicezy</span>, owned and operated by Prem Morya,
            uses cookies and similar technologies on its website and services.
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
              Questions or Concerns?
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
    title: "What are cookies?",
    content: [
      "A cookie is a small piece of text stored on your device by a web server.",
      "Your browser sends it back when you revisit the site.",
      "Cookies help remember preferences like language and time zone.",
      "We use session cookies (expire on close) and persistent cookies (stored for a longer time)."
    ]
  },
  {
    title: "How and why we use cookies",
    content: [
      "We use cookies and similar technologies (web beacons, pixel tags, etc.) to deliver and improve our services."
    ]
  },
  {
    title: "1. Access and Security (Strictly Necessary Cookies)",
    content: [
      "Recognize your device for login and session management.",
      "Protect against spam, abuse, and unauthorized access."
    ]
  },
  {
    title: "2. Settings (Functionality Cookies)",
    content: [
      "Remember preferences like language, region, and time zone."
    ]
  },
  {
    title: "3. Analytics and Research (Performance Cookies)",
    content: [
      "Understand how users interact with our website.",
      "Improve performance and usability."
    ]
  },
  {
    title: "4. Advertising and Marketing (Other Cookies)",
    content: [
      "Provide personalized content and relevant ads.",
      "Work with tools like Google Analytics to understand traffic and usage."
    ]
  },
  {
    title: "Data Sharing",
    content: [
      "We do not sell cookie data to third parties.",
      "Only authorized service providers process this data under strict confidentiality."
    ]
  },
  {
    title: "How to control cookies",
    content: [
      "You can disable or manage cookies through your browser settings (Chrome, Firefox, Safari, etc.).",
      "To opt out of Google Analytics, you can use the official browser add-on.",
      "For more info, visit www.allaboutcookies.org."
    ]
  },
  {
    title: "Changes to this Policy",
    content: [
      "We may update this policy due to legal or technical changes.",
      "Continued use of the service implies acceptance of updates."
    ]
  }
];