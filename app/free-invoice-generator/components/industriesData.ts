export interface IndustryItem {
  name: string;
  slug: string;
  blurb: string;
}

// Unique, non-templated copy per industry so this section reads as
// genuine segmentation rather than a repeated mad-lib.
export const industriesData: IndustryItem[] = [
  {
    name: "Freelancers",
    slug: "freelancers",
    blurb:
      "Bill clients by project or by hour, add your own branding, and get paid faster with a clean, professional invoice every time.",
  },
  {
    name: "Agencies",
    slug: "agencies",
    blurb:
      "Manage dozens of clients and retainers from one dashboard, and issue GST-compliant invoices without juggling spreadsheets.",
  },
  {
    name: "Consultants",
    slug: "consultants",
    blurb:
      "Invoice for advisory hours, milestones, or fixed-fee engagements with itemized breakdowns your clients can approve quickly.",
  },
  {
    name: "Retail Shops",
    slug: "retail-shops",
    blurb:
      "Generate quick, itemized bills at the counter with GST, discounts, and multiple products on a single invoice.",
  },
  {
    name: "Medical Stores",
    slug: "medical-stores",
    blurb:
      "Create compliant bills with HSN codes and applicable GST slabs for pharmaceutical and healthcare product sales.",
  },
  {
    name: "Traders",
    slug: "traders",
    blurb:
      "Handle high invoice volumes with saved product lists and client records so repeat billing takes seconds, not minutes.",
  },
  {
    name: "Manufacturers",
    slug: "manufacturers",
    blurb:
      "Issue detailed tax invoices with HSN codes, batch quantities, and shipping details for B2B dispatch and supply.",
  },
  {
    name: "Wholesalers",
    slug: "wholesalers",
    blurb:
      "Bill bulk orders with tiered quantities and discounts, and keep a running record of every distributor and retailer you supply.",
  },
  {
    name: "Contractors",
    slug: "contractors",
    blurb:
      "Bill by phase or milestone for construction and renovation work, with clear labor, material, and tax line items.",
  },
  {
    name: "Interior Designers",
    slug: "interior-designers",
    blurb:
      "Combine design fees, material costs, and vendor charges into one polished invoice that reflects your studio's brand.",
  },
  {
    name: "Photographers",
    slug: "photographers",
    blurb:
      "Invoice for shoots, packages, and add-ons like albums or prints, with your logo and signature on every client-facing PDF.",
  },
  {
    name: "Developers",
    slug: "developers",
    blurb:
      "Bill for sprints, fixed-scope projects, or hourly development work with line items your clients can map straight to the SOW.",
  },
  {
    name: "Education & Coaching",
    slug: "education",
    blurb:
      "Send fee receipts and course invoices to students or corporate clients, with recurring billing for ongoing batches.",
  },
  {
    name: "Restaurants",
    slug: "restaurants",
    blurb:
      "Generate GST-compliant bills for dine-in, takeaway, and catering orders with tax breakdowns customers expect.",
  },
  {
    name: "Travel Agencies",
    slug: "travel-agencies",
    blurb:
      "Invoice package tours, bookings, and service fees with itemized components for flights, stays, and add-ons.",
  },
  {
    name: "Export Businesses",
    slug: "export-businesses",
    blurb:
      "Create multi-currency invoices with export-specific tax treatment for overseas buyers and international shipments.",
  },
];
