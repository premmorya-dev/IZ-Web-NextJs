export interface FaqItem {
  question: string;
  answer: string;
}

// Each entry is written to naturally target a keyword variation while
// answering the real question a visitor would have. Keep answers 1–3
// sentences — enough for FAQ rich results, short enough to scan.
export const faqData: FaqItem[] = [
  {
    question: "Is Invoicezy really free to use?",
    answer:
      "Yes. Invoicezy's free invoice generator lets you create, customize, and download unlimited invoices as PDF with no credit card and no hidden charges. You only pay if you later choose optional paid features like team accounts or advanced automation.",
  },
  {
    question: "Can I create GST invoices with Invoicezy?",
    answer:
      "Yes. Invoicezy is built for Indian businesses, so every invoice supports CGST, SGST, and IGST fields, HSN/SAC codes, and automatic GST calculation based on the rates you enter.",
  },
  {
    question: "Do I need to create an account before making an invoice?",
    answer:
      "No. You can generate and download your first invoice without logging in. Creating a free account only takes a few seconds and lets you save clients, products, and past invoices for reuse.",
  },
  {
    question: "Can I download my invoice as a PDF?",
    answer:
      "Yes. Every invoice you create can be downloaded instantly as a print-ready, high-resolution PDF that's ready to email or print for your client.",
  },
  {
    question: "Is Invoicezy suitable for freelancers?",
    answer:
      "Yes. Freelancers use Invoicezy to send professional invoices for design, writing, consulting, and development work, complete with their own logo, payment terms, and bank details.",
  },
  {
    question: "Can shop owners and retail stores use Invoicezy?",
    answer:
      "Yes. Retail shops and traders use Invoicezy to generate GST-compliant bills at the counter or online, with support for multiple items, discounts, and tax rates on a single invoice.",
  },
  {
    question: "Can I add my business logo to the invoice?",
    answer:
      "Yes. You can upload your logo once and it will appear automatically on every invoice, giving your business a consistent, professional look.",
  },
  {
    question: "Does Invoicezy support digital signatures?",
    answer:
      "Yes. You can upload a signature image or draw one directly, and it will be placed on your invoice PDF exactly where a signed document needs it.",
  },
  {
    question: "Can I create price estimates or quotations, not just invoices?",
    answer:
      "Yes. Invoicezy includes an estimate generator so you can send a quotation first and convert it into a full invoice once your client approves it.",
  },
  {
    question: "Can I use Invoicezy on my mobile phone?",
    answer:
      "Yes. The invoice generator is fully responsive, so you can create, edit, and download invoices from your phone or tablet with the same features as desktop.",
  },
  {
    question: "Can I add discounts and shipping charges to an invoice?",
    answer:
      "Yes. Invoicezy lets you apply flat or percentage discounts and add shipping or handling charges, and the total updates automatically as you type.",
  },
  {
    question: "Does Invoicezy support QR codes on invoices?",
    answer:
      "Yes. You can add a payment QR code to your invoice so clients can scan and pay instantly through UPI apps.",
  },
  {
    question: "Can I use Invoicezy for multiple currencies?",
    answer:
      "Yes. Alongside INR, Invoicezy supports major international currencies, which is useful for exporters and agencies who bill overseas clients.",
  },
  {
    question: "Is my invoice data stored securely?",
    answer:
      "Yes. Your invoices, clients, and product data are stored securely in the cloud, so you can access your invoice history anytime without keeping local files.",
  },
  {
    question: "Can I track which invoices are paid or unpaid?",
    answer:
      "Yes. Invoicezy includes payment tracking so you can mark invoices as paid, partially paid, or overdue, and see a clear summary of outstanding payments.",
  },
  {
    question: "Can agencies manage multiple clients on Invoicezy?",
    answer:
      "Yes. Agencies can save unlimited clients and products, then generate invoices for any client in seconds without re-entering the same details each time.",
  },
  {
    question: "What's the difference between Invoicezy and making invoices in Excel?",
    answer:
      "Unlike Excel, Invoicezy auto-calculates GST and totals, generates a polished PDF automatically, stores your invoice history in the cloud, and removes the risk of formula errors or version mix-ups.",
  },
  {
    question: "Can I set up recurring invoices for regular clients?",
    answer:
      "Yes. For clients you bill every month, Invoicezy can generate recurring invoices automatically on a schedule you set, saving you from recreating them manually.",
  },
  {
    question: "Does Invoicezy work for service businesses like consultants and contractors?",
    answer:
      "Yes. Consultants, contractors, and other service providers can bill by project, hours, or milestone, with tax and terms configured to match their industry.",
  },
  {
    question: "How is Invoicezy different from traditional invoicing software?",
    answer:
      "Traditional invoicing software often needs installation, licenses, and manual updates. Invoicezy runs entirely in your browser, updates automatically, and works from any device with no setup.",
  },
];
