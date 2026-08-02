const testimonials = [
  {
    name: "Rohit Malhotra",
    role: "Freelance Graphic Designer, Delhi",
    quote:
      "I used to spend 20 minutes formatting every invoice in Word. Now I fill in the items and the PDF is ready before my chai gets cold.",
  },
  {
    name: "Priya Nair",
    role: "Founder, Nair Interiors, Kochi",
    quote:
      "GST calculation used to be the part I dreaded most. Invoicezy gets CGST and SGST right automatically, every single time.",
  },
  {
    name: "Ashok Verma",
    role: "Verma Traders, Kanpur",
    quote:
      "We raise 40–50 bills a day at the counter. Switching from handwritten books to Invoicezy cut our billing time in half.",
  },
];

export default function TestimonialsSection() {
  return (
    <section
      className="bg-[#0A0E1A] px-4 py-20 sm:px-6"
      aria-labelledby="testimonials-heading"
    >
      <div className="mx-auto max-w-5xl">
        <div className="mx-auto max-w-2xl text-center">
          <h2
            id="testimonials-heading"
            className="font-[Space_Grotesk] text-3xl font-semibold text-white sm:text-4xl"
          >
            What Businesses Say After Switching
          </h2>
        </div>

        <ul className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-3">
          {testimonials.map((t) => (
            <li
              key={t.name}
              className="rounded-xl border border-white/10 bg-white/[0.02] p-6"
            >
              <div
                className="text-amber-300"
                aria-label="5 out of 5 stars"
              >
                ★★★★★
              </div>
              <p className="mt-3 text-sm leading-relaxed text-white/70">
                &ldquo;{t.quote}&rdquo;
              </p>
              <p className="mt-4 font-[Space_Grotesk] text-sm font-semibold text-white">
                {t.name}
              </p>
              <p className="text-xs text-white/40">{t.role}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
