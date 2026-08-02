import { industriesData } from "./industriesData";

export default function IndustriesSection() {
  return (
    <section className="bg-[#0A0E1A] px-4 py-20 sm:px-6" aria-labelledby="industries-heading">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <h2
            id="industries-heading"
            className="font-[Space_Grotesk] text-3xl font-semibold text-white sm:text-4xl"
          >
            Built for How Your Industry Bills
          </h2>
          <p className="mt-3 text-white/60">
            Invoicing looks different for a photographer than a wholesaler.
            Invoicezy adapts to how each industry actually works.
          </p>
        </div>

        <ul className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {industriesData.map((industry) => (
            <li
              key={industry.slug}
              id={industry.slug}
              className="rounded-xl border border-white/10 bg-white/[0.02] p-5"
            >
              <h3 className="font-[Space_Grotesk] text-sm font-semibold text-white">
                Invoice Generator for {industry.name}
              </h3>
              <p className="mt-1.5 text-sm text-white/55">{industry.blurb}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
