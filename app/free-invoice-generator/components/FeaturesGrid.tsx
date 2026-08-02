const features: { title: string; desc: string }[] = [
  { title: "Unlimited PDF Downloads", desc: "Generate and download as many invoices as you need, with no monthly cap." },
  { title: "Professional Templates", desc: "Choose from clean, print-ready invoice layouts designed for Indian businesses." },
  { title: "Logo Upload", desc: "Add your business logo once and it appears on every invoice automatically." },
  { title: "Digital Signature", desc: "Upload or draw a signature to place on your invoice PDF." },
  { title: "GST Support", desc: "CGST, SGST, and IGST are calculated automatically based on your rates." },
  { title: "HSN / SAC Codes", desc: "Add HSN or SAC codes per line item to stay tax-compliant." },
  { title: "Discounts", desc: "Apply flat or percentage discounts, with totals updating instantly." },
  { title: "Shipping Charges", desc: "Add shipping or handling fees as a separate invoice line item." },
  { title: "QR Code Payments", desc: "Embed a UPI QR code so clients can pay directly from the invoice." },
  { title: "Multiple Currencies", desc: "Bill international clients in USD, EUR, GBP, and more." },
  { title: "Multiple Languages", desc: "Generate invoices in the language your clients understand best." },
  { title: "Cloud Storage", desc: "Every invoice is saved to your account, accessible from any device." },
  { title: "Recurring Invoices", desc: "Automate billing for retainers and subscriptions on a set schedule." },
  { title: "Estimate Generator", desc: "Send quotations first, then convert approved estimates into invoices." },
  { title: "Client Management", desc: "Save client details once and reuse them across every invoice." },
  { title: "Product Management", desc: "Maintain a product or service catalog to speed up invoice creation." },
  { title: "Payment Tracking", desc: "Mark invoices as paid, partial, or overdue and track outstanding amounts." },
  { title: "Expense Tracking", desc: "Log business expenses alongside your invoices for a fuller financial picture." },
  { title: "Auto Calculation", desc: "Tax, discounts, and totals recalculate instantly as you edit an invoice." },
  { title: "Responsive Design", desc: "Create invoices comfortably from desktop, tablet, or mobile." },
  { title: "Print Ready", desc: "Every PDF is formatted to print cleanly on A4 without cropping issues." },
  { title: "Multi-Item Billing", desc: "Add unlimited line items to a single invoice for complex orders." },
  { title: "Custom Invoice Numbers", desc: "Set your own invoice numbering format to match your accounting system." },
  { title: "Team Access", desc: "Add teammates so your accounts or admin staff can raise invoices too." },
];

export default function FeaturesGrid() {
  return (
    <section className="bg-[#0A0E1A] px-4 py-20 sm:px-6" aria-labelledby="features-heading">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <h2
            id="features-heading"
            className="font-[Space_Grotesk] text-3xl font-semibold text-white sm:text-4xl"
          >
            Everything an Indian Invoice Generator Should Do
          </h2>
          <p className="mt-3 text-white/60">
            Invoicezy is built specifically for GST billing, so every feature
            below solves a real problem Indian freelancers and businesses run
            into with generic invoice tools.
          </p>
        </div>

        <ul className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <li
              key={f.title}
              className="izy-feature-card rounded-xl border border-white/10 bg-white/[0.02] p-5 transition-colors hover:border-white/20 hover:bg-white/[0.04]"
            >
              <h3 className="font-[Space_Grotesk] text-sm font-semibold text-white">
                {f.title}
              </h3>
              <p className="mt-1.5 text-sm text-white/55">{f.desc}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
