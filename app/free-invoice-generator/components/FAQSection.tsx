"use client";

import { useState } from "react";
import { faqData } from "./faqData";

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="bg-[#0A0E1A] px-4 py-20 sm:px-6" aria-labelledby="faq-heading">
      <div className="mx-auto max-w-3xl">
        <div className="mx-auto max-w-2xl text-center">
          <h2
            id="faq-heading"
            className="font-[Space_Grotesk] text-3xl font-semibold text-white sm:text-4xl"
          >
            Frequently Asked Questions
          </h2>
          <p className="mt-3 text-white/60">
            Common questions about Invoicezy&apos;s free invoice generator,
            GST support, and how billing works.
          </p>
        </div>

        <div className="mt-12 divide-y divide-white/10 rounded-2xl border border-white/10">
          {faqData.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div key={item.question} className="izy-faq-item">
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                >
                  <span className="text-sm font-medium text-white">
                    {item.question}
                  </span>
                  <span
                    aria-hidden="true"
                    className={`shrink-0 text-white/40 transition-transform ${
                      isOpen ? "rotate-45" : ""
                    }`}
                  >
                    +
                  </span>
                </button>
                {isOpen && (
                  <p className="px-5 pb-4 text-sm text-white/60">
                    {item.answer}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
