const comparisons = [
  {
    against: "Excel",
    invoicezy: "GST and totals calculate automatically",
    other: "Manual formulas that break easily",
  },
  {
    against: "Word",
    invoicezy: "Consistent, print-ready PDF every time",
    other: "Formatting shifts between devices and printers",
  },
  {
    against: "Manual Billing",
    invoicezy: "Every invoice saved and searchable in the cloud",
    other: "Paper records that are easy to lose or misplace",
  },
  {
    against: "Traditional Invoice Software",
    invoicezy: "Runs in your browser, no installation or license",
    other: "Needs installation, updates, and often a paid license",
  },
];

export default function ComparisonSection() {
  return (
    <section className="bg-[#0A0E1A] px-4 py-20 sm:px-6" aria-labelledby="comparison-heading">
      <div className="mx-auto max-w-4xl">
        <div className="mx-auto max-w-2xl text-center">
          <h2
            id="comparison-heading"
            className="font-[Space_Grotesk] text-3xl font-semibold text-white sm:text-4xl"
          >
            Why Businesses Switch to Invoicezy
          </h2>
          <p className="mt-3 text-white/60">
            See how Invoicezy compares to the tools most Indian businesses
            already use for billing.
          </p>
        </div>

        <div className="mt-14 space-y-4">
          {comparisons.map((c) => (
            <div
              key={c.against}
              className="grid grid-cols-1 gap-3 rounded-xl border border-white/10 bg-white/[0.02] p-5 sm:grid-cols-[160px_1fr_1fr] sm:items-center sm:gap-6"
            >
              <p className="font-[Space_Grotesk] text-sm font-semibold text-white/70">
                Invoicezy vs {c.against}
              </p>
              <p className="flex items-start gap-2 text-sm text-white">
                <span className="mt-0.5 text-cyan-400">✓</span>
                {c.invoicezy}
              </p>
              <p className="flex items-start gap-2 text-sm text-white/40">
                <span className="mt-0.5 text-white/25">✕</span>
                {c.other}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
