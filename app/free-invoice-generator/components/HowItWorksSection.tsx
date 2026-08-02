import { Building2, Calculator, Download } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Building2,
    title: "Enter Business & Client Details",
    desc: "Add your business name, logo, and the client you're billing. Saved clients auto-fill next time.",
  },
  {
    number: "02",
    icon: Calculator,
    title: "Add Items & Apply GST",
    desc: "List your products or services, set quantities and rates — Invoicezy calculates GST, discounts, and totals automatically.",
  },
  {
    number: "03",
    icon: Download,
    title: "Download or Share the PDF",
    desc: "Get a print-ready invoice PDF instantly — download it, email it, or share a payment link with a QR code.",
  },
];

export default function HowItWorksSection() {
  return (
    <section
      className="bg-[#0A0E1A] px-4 py-20 sm:px-6"
      aria-labelledby="how-it-works-heading"
    >
      <div className="mx-auto max-w-5xl">
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-[IBM_Plex_Mono] text-xs uppercase tracking-[0.3em] text-cyan-300/70">
            How it works
          </p>
          <h2
            id="how-it-works-heading"
            className="mt-3 font-[Space_Grotesk] text-3xl font-semibold text-white sm:text-4xl"
          >
            Create an invoice in 3 steps
          </h2>
          <p className="mt-3 text-white/60">
            No downloads, no templates to format by hand — go from blank
            invoice to downloaded PDF in under a minute.
          </p>
        </div>

        <ol className="relative mt-14 grid gap-6 sm:grid-cols-3 sm:gap-6">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <li key={step.number} className="relative">
                {/* connecting line between icon centers — desktop/tablet only, avoids overlapping centered text on mobile */}
                {i < steps.length - 1 && (
                  <span
                    aria-hidden="true"
                    className="absolute left-[calc(50%+2.5rem)] top-[3.75rem] hidden h-px w-[calc(100%-5rem)] bg-gradient-to-r from-white/20 to-transparent sm:block"
                  />
                )}

                <div className="relative flex flex-col items-center rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-center">
                  <div className="mb-5 flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-cyan-400 to-violet-500">
                    <Icon className="h-9 w-9 text-[#0A0E1A]" strokeWidth={2.25} />
                  </div>

                  <div>
                    <span className="font-[IBM_Plex_Mono] text-xs text-white/30">
                      Step {step.number}
                    </span>
                    <h3 className="mt-1 font-[Space_Grotesk] text-lg font-semibold text-white">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-white/55">
                      {step.desc}
                    </p>
                  </div>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}