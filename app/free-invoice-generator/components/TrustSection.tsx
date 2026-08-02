const trustPoints = [
  { title: "Fast", desc: "Create and download a full invoice in under a minute." },
  { title: "Secure", desc: "Your business and client data is encrypted and stored securely." },
  { title: "Cloud-Based", desc: "Access your invoice history from any device, anytime." },
  { title: "No Installation", desc: "Works entirely in your browser — nothing to download or update." },
  { title: "Free Forever", desc: "Core invoicing stays free, with no forced trial or expiry." },
];

export default function TrustSection() {
  return (
    <section className="bg-[#0A0E1A] px-4 py-16 sm:px-6" aria-labelledby="trust-heading">
      <div className="mx-auto max-w-6xl rounded-2xl border border-white/10 bg-white/[0.02] p-8 sm:p-10">
        <h2
          id="trust-heading"
          className="text-center font-[Space_Grotesk] text-2xl font-semibold text-white sm:text-3xl"
        >
          Why Thousands Choose Invoicezy
        </h2>
        <ul className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-5">
          {trustPoints.map((point) => (
            <li key={point.title} className="text-center">
              <p className="font-[Space_Grotesk] text-sm font-semibold text-white">
                {point.title}
              </p>
              <p className="mt-1.5 text-xs text-white/50">{point.desc}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
