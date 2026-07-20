// lib/faq-data.ts
// Single source of truth for FAQ content. Used by the accordion UI
// and by the JSON-LD FAQPage schema generator, so copy and schema
// can never drift out of sync.

export type FAQCategory =
  | "All"
  | "Getting Started"
  | "Invoices"
  | "GST"
  | "Payments"
  | "Clients"
  | "Pricing"
  | "Security"
  | "Templates"
  | "Business";

export interface FAQItem {
  id: string;
  category: Exclude<FAQCategory, "All">;
  question: string;
  // Answers are plain strings with light markdown-style link markers:
  // [label](/path) — rendered as real <a> internal links by FAQAnswer.
  answer: string;
}

export const faqCategories: FAQCategory[] = [
  "All",
  "Getting Started",
  "Invoices",
  "GST",
  "Payments",
  "Clients",
  "Pricing",
  "Security",
  "Templates",
  "Business",
];

export const faqData: FAQItem[] = [
  {
    id: "what-is-invoicezy",
    category: "Getting Started",
    question: "What is Invoicezy and who is it built for?",
    answer:
      "Invoicezy is a cloud-based invoice software built for freelancers, startups, CA firms, and agencies that need to create, send, and track invoices without the overhead of traditional accounting software. It combines an [online invoice generator](/features), GST-compliant billing, payment tracking, and client management in a single workspace. You can get started in minutes on the [free plan](/pricing) with no credit card required, and scale up as your billing volume grows.",
  },
  {
    id: "getting-started-time",
    category: "Getting Started",
    question: "How long does it take to set up Invoicezy?",
    answer:
      "Most businesses are creating their first invoice within 60 seconds of signing up. You create a free account, add your business details and logo once, and Invoicezy carries that branding across every invoice automatically. There's no installation, no onboarding call, and no spreadsheet migration required. If you're switching from another tool, you can import your client list directly, and our [features page](/features) walks through the full setup flow in more detail.",
  },
  {
    id: "invoice-software-vs-word-excel",
    category: "Getting Started",
    question: "Why use invoice software instead of Word or Excel templates?",
    answer:
      "Word and Excel templates work for a handful of invoices, but they break down as your business grows: no automatic numbering, no payment tracking, no GST validation, and no record of who was sent what. Invoice management software like Invoicezy automatically sequences invoice numbers, calculates taxes, tracks payment status in real time, and stores every invoice searchably in one place. It also removes manual errors in tax calculations, which matters a lot once you're filing GST returns.",
  },
  {
    id: "create-first-invoice",
    category: "Invoices",
    question: "How do I create my first invoice on Invoicezy?",
    answer:
      "From your dashboard, select 'New Invoice', choose a client (or add a new one inline), and add line items with quantity, rate, and tax. Invoicezy calculates subtotals, taxes, and the final amount automatically. You can pick from our [invoice templates](/templates) to match your brand, then send the invoice by email or shareable link, or download it as a PDF. Every invoice is saved to your dashboard with its status tracked automatically as draft, sent, viewed, or paid.",
  },
  {
    id: "edit-invoice-after-sending",
    category: "Invoices",
    question: "Can I edit an invoice after it has been sent?",
    answer:
      "Yes, you can edit an invoice after sending it, though we recommend caution once a client has viewed or paid it, since GST rules require unbroken invoice numbering. For minor corrections, Invoicezy lets you edit and resend with a version note. For invoices tied to a completed GST filing, the safer route is to issue a credit note rather than editing the original, and Invoicezy supports credit notes natively so your books stay compliant.",
  },
  {
    id: "recurring-invoices",
    category: "Invoices",
    question: "Does Invoicezy support recurring invoices and automatic billing?",
    answer:
      "Yes. You can set any invoice to repeat on a daily, weekly, monthly, or custom schedule, and Invoicezy will generate and send it automatically on the date you choose. This is built for retainer clients, subscriptions, and ongoing service contracts where the amount rarely changes. You'll get a notification before each recurring invoice goes out, so you can adjust line items when needed before it reaches your client.",
  },
  {
    id: "invoice-numbering",
    category: "Invoices",
    question: "How does automatic invoice numbering work?",
    answer:
      "Invoicezy assigns each invoice a sequential number automatically, following the format you configure, such as prefixes by year or client. This keeps your numbering unbroken and audit-ready, which is a requirement under GST law. You can customize the starting number and prefix per financial year from Settings, and Invoicezy will continue the sequence automatically from there without any manual tracking on your part.",
  },
  {
    id: "what-is-gst-invoice",
    category: "GST",
    question: "What makes an invoice GST-compliant in India?",
    answer:
      "A GST-compliant invoice needs specific fields: your GSTIN, the client's GSTIN (for B2B), a sequential invoice number, HSN or SAC codes, taxable value, applicable CGST, SGST, or IGST rates, and the total tax amount. Invoicezy's [GST invoice software](/features) generates every field automatically based on your business location and the client's state, correctly applying CGST and SGST for intra-state sales or IGST for inter-state sales, so you don't have to calculate it manually.",
  },
  {
    id: "gst-rate-selection",
    category: "GST",
    question: "How does Invoicezy decide which GST rate to apply?",
    answer:
      "You assign an HSN or SAC code and tax rate to each product or service once, and Invoicezy applies it automatically on every future invoice for that item. It also checks your business state against your client's billing state to determine whether CGST and SGST or IGST apply. If your GST rates change for a specific item, you update it once in your product catalog and every new invoice reflects the change immediately.",
  },
  {
    id: "gst-returns-export",
    category: "GST",
    question: "Can I export data from Invoicezy for GST return filing?",
    answer:
      "Yes. Invoicezy lets you export GST reports for any period as CSV or Excel files formatted to match the fields required for GSTR-1 filing, including invoice-wise tax breakdowns by CGST, SGST, and IGST. This significantly reduces the manual work of preparing return data each filing cycle. Many CA firms use Invoicezy specifically for this reason, since it keeps client billing and tax-ready reporting in the same place.",
  },
  {
    id: "non-gst-businesses",
    category: "GST",
    question: "Can I use Invoicezy if my business isn't GST-registered?",
    answer:
      "Absolutely. Invoicezy works equally well for businesses below the GST registration threshold. You can create clean, professional invoices without any tax fields, or with only applicable non-GST charges. As your business grows and you register for GST, you can switch on GST fields in Settings at any time, and all future invoices will include the required tax details without disrupting your existing invoice history.",
  },
  {
    id: "payment-tracking",
    category: "Payments",
    question: "How does Invoicezy track whether an invoice has been paid?",
    answer:
      "Every invoice has a status: draft, sent, viewed, partially paid, or paid, and your dashboard shows this at a glance across all clients. You can mark payments manually when you receive them offline, or record partial payments against a single invoice. Overdue invoices are flagged automatically so unpaid work never slips through, and you can filter your invoice list by status to see exactly what's outstanding at any time.",
  },
  {
    id: "upi-and-payment-links",
    category: "Payments",
    question: "Can clients pay directly from the invoice, including via UPI?",
    answer:
      "Yes. Invoicezy supports UPI invoice payments alongside card and net banking options, so clients can pay directly from the invoice page without you chasing bank transfers manually. Once a payment link is enabled, the invoice status updates automatically the moment payment is received. This is one of the most-used features among freelancers and small businesses who bill Indian clients regularly and want faster settlement.",
  },
  {
    id: "payment-reminders",
    category: "Payments",
    question: "Does Invoicezy send automatic payment reminders?",
    answer:
      "Yes, you can enable automatic reminder emails for overdue invoices, scheduled at intervals you define, such as three, seven, and fourteen days after the due date. This removes the awkward task of manually following up on late payments. Reminders use your business branding and a polite, consistent tone, and you can always send a one-off manual reminder from the invoice page if you'd rather handle a specific client personally.",
  },
  {
    id: "multi-currency",
    category: "Payments",
    question: "Can I invoice international clients in a different currency?",
    answer:
      "Yes, Invoicezy supports multi-currency invoicing, so you can bill international clients in USD, EUR, GBP, or other supported currencies while keeping your domestic invoices in INR. Each client profile stores their preferred currency, and Invoicezy applies it automatically to every invoice for that client. This is especially useful for freelancers and agencies with a mixed client base of domestic and overseas work.",
  },
  {
    id: "managing-clients",
    category: "Clients",
    question: "How does client management work in Invoicezy?",
    answer:
      "Every client gets a profile storing their billing details, GSTIN, preferred currency, and full invoice history in one place. Instead of retyping details each time, you select the client and Invoicezy pre-fills everything on a new invoice. You can also see a client's total billed, total paid, and outstanding balance at a glance, which is useful when deciding who to follow up with or when reviewing a relationship before renewal conversations.",
  },
  {
    id: "unlimited-clients",
    category: "Clients",
    question: "Is there a limit on how many clients or invoices I can add?",
    answer:
      "Limits depend on your plan. The free plan supports a generous number of clients and invoices per month, enough for most freelancers and early-stage businesses to run entirely on Invoicezy at no cost. Paid plans remove these caps for growing teams and agencies handling higher invoice volume. You can compare exact limits on our [pricing page](/pricing), and upgrading or downgrading takes effect immediately without losing any invoice history.",
  },
  {
    id: "pricing-plans",
    category: "Pricing",
    question: "What does Invoicezy cost, and is there a free plan?",
    answer:
      "Invoicezy offers a free-forever plan that covers the essentials most freelancers and small businesses need to get started, with no credit card required to sign up. Paid plans unlock higher invoice and client limits, advanced GST reporting, recurring invoices, and additional team members. Every plan can be started, changed, or cancelled directly from your account. Full details and current pricing are on our [pricing page](/pricing).",
  },
  {
    id: "cancel-anytime",
    category: "Pricing",
    question: "Can I cancel or downgrade my Invoicezy plan at any time?",
    answer:
      "Yes, there are no lock-in contracts. You can upgrade, downgrade, or cancel your subscription at any time from your account settings, and changes take effect immediately or at the end of your current billing cycle, depending on the change. If you downgrade, your existing invoices and client data remain fully intact; you'll simply be limited by the new plan's caps for anything created going forward.",
  },
  {
    id: "data-security",
    category: "Security",
    question: "How does Invoicezy keep my business and client data secure?",
    answer:
      "Invoicezy is built on a secure cloud platform with encrypted data storage and transmission, so your invoices, client details, and payment records are protected both at rest and in transit. Access to your account is protected by authenticated login, and we perform regular backups so your billing history is never at risk of loss. We never sell or share your business data with third parties, and you retain full ownership and export rights over everything you create.",
  },
  {
    id: "custom-invoice-templates",
    category: "Templates",
    question: "Can I customize invoice templates with my own branding?",
    answer:
      "Yes. Invoicezy offers a range of professionally designed [invoice templates](/templates), and every template lets you add your logo, brand colors, and business details once, which then apply automatically to future invoices. You can switch templates per invoice if you want a different layout for a specific client, and download any invoice as a polished, print-ready PDF. This keeps every invoice you send looking consistent and professional, whatever your industry.",
  },
];

export function getFilteredFaqs(category: FAQCategory, query: string): FAQItem[] {
  const q = query.trim().toLowerCase();
  return faqData.filter((item) => {
    const matchesCategory = category === "All" || item.category === category;
    const matchesQuery =
      q.length === 0 ||
      item.question.toLowerCase().includes(q) ||
      item.answer.toLowerCase().includes(q);
    return matchesCategory && matchesQuery;
  });
}

// Strips the [label](/path) markdown-link syntax down to plain text,
// for use in the JSON-LD schema where markup isn't appropriate.
export function toPlainText(answer: string): string {
  return answer.replace(/\[([^\]]+)\]\(([^)]+)\)/g, "$1");
}
