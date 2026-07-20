export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/features", label: "Features" },
  { href: "/templates", label: "Templates" },
  { href: "/pricing", label: "Pricing" }, 
  { href: "/about", label: "About" },
   { href: "/contact", label: "Contact Us" },
   { href: "/faq", label: "FAQ" },
    { href: "blog", label: "Blogs" },
];

export const STATS = [
  { value: 50000, suffix: "+", label: "Businesses" },
  { value: 500, prefix: "\u20B9", suffix: "Cr+", label: "Invoiced" },
  { value: 99.9, suffix: "%", label: "Uptime" },
  { value: 4.9, suffix: "\u2605", label: "Rating" },
];

export const FEATURES = [
  {
    icon: "FileText",
    title: "GST Invoice Generator",
    color: "indigo",
    desc: "Create professional GST-compliant invoices online with automatic tax calculations, custom branding, and PDF export in seconds.",
  },
  {
    icon: "QrCode",
    title: "UPI & QR Code Payments",
    color: "green",
    desc: "Accept instant payments using UPI QR codes and provide customers with a faster, secure, and seamless payment experience.",
  },
  {
    icon: "List",
    title: "Unlimited Line Items",
    color: "indigo",
    desc: "Add unlimited products or services with detailed descriptions, quantities, taxes, discounts, and pricing for every invoice.",
  },
  {
    icon: "Calculator",
    title: "Automatic GST Calculation",
    color: "cyan",
    desc: "Automatically calculate CGST, SGST, and IGST with accurate tax computation to generate GST-ready invoices effortlessly.",
  },
  {
    icon: "Globe",
    title: "Multi-Currency Billing",
    color: "purple",
    desc: "Invoice international clients in multiple currencies while maintaining accurate exchange-ready business records.",
  },
  {
    icon: "TrendingDown",
    title: "Expense Management",
    color: "orange",
    desc: "Record, categorize, and monitor business expenses to improve financial planning and profitability.",
  },
  {
    icon: "CheckCircle",
    title: "Payment Tracking",
    color: "green",
    desc: "Track paid, unpaid, partial, and overdue invoices in real time to improve cash flow and payment collection.",
  },
  {
    icon: "Package",
    title: "Inventory Management",
    color: "blue",
    desc: "Manage products, monitor stock availability, and automatically update inventory after every sale or invoice.",
  },
  {
    icon: "Palette",
    title: "Custom Branded Invoices",
    color: "purple",
    desc: "Personalize invoices with your business logo, brand colors, payment terms, and professional business identity.",
  },
  {
    icon: "FileBarChart",
    title: "Business Reports & Analytics",
    color: "cyan",
    desc: "Generate powerful reports for revenue, expenses, taxes, invoices, and business performance with real-time insights.",
  },
  {
    icon: "BellRing",
    title: "Automatic Payment Reminders",
    color: "orange",
    desc: "Send automated payment reminders to clients and reduce overdue invoices while improving collection efficiency.",
  },
  {
    icon: "Send",
    title: "Estimates & Quotations",
    color: "blue",
    desc: "Create professional quotations, share them with clients, and convert approved estimates into invoices with one click.",
  },
];

export const PRICING = [
  {
    name: "Free",
    price: 0,
    yearlyPrice: 0,
    features: ["5 Invoices/month", "1 User", "Basic Templates", "PDF Download"],
  },
 
  {
    name: "Basic",
    price: 599,
    yearlyPrice: 359,
    features: [
      "Unlimited Invoices",
      "5 Users",
      "Expense Tracking",
      "Reports",
      "Priority Support",
    ],
  },
  {
    name: "Professional",
    price: 999,
    yearlyPrice: 599,
    popular: true,
    features: [
      "Everything in Basic",
      "Inventory",
      "Recurring Invoices",
      "API Access",
      "Custom Domain",
    ],
  },
  {
    name: "Enterprise",
    price: null,
    yearlyPrice: null,
    features: [
      "Everything + White Label",
      "Dedicated Manager",
      "Custom Integrations",
      "SLA 99.99%",
    ],
  },
];

export const TESTIMONIALS = [
  {
    name: "Rajesh Kumar",
    role: "CA, Mumbai",
    rating: 5,
    text: "Invoicezy saved us 10 hours/week on billing. GST reports are perfect.",
    company: "LedgerBloom Advisors",
    avatar: "/images/avatar-rajesh.svg",
  },
  {
    name: "Priya Sharma",
    role: "Freelancer, Delhi",
    rating: 5,
    text: "Best invoicing tool for freelancers. My clients pay faster now!",
    company: "Priya Design Studio",
    avatar: "/images/avatar-priya.svg",
  },
  {
    name: "Amit Patel",
    role: "Retailer, Surat",
    rating: 5,
    text: "Inventory + invoicing in one place. Exactly what my shop needed.",
    company: "Patel Home Mart",
    avatar: "/images/avatar-amit.svg",
  },
];

export const CHART_DATA = [
  { month: "Jan", revenue: 42000, expenses: 18000 },
  { month: "Feb", revenue: 58000, expenses: 21000 },
  { month: "Mar", revenue: 51000, expenses: 19500 },
  { month: "Apr", revenue: 73000, expenses: 24000 },
  { month: "May", revenue: 89000, expenses: 28000 },
  { month: "Jun", revenue: 95000, expenses: 31000 },
];

export const HERO_TRUST_POINTS = [
  "No credit card",
  "Free forever plan",
  "Setup in 2 min",
];

export const HERO_FLOATING_METRICS = [
  {
    title: "Revenue",
    value: "\u20B92,40,000",
    position: "right-0 top-10 lg:-right-8",
  },
  {
    title: "Growth",
    value: "+34%",
    position: "left-0 top-4 lg:-left-10",
  },
  {
    title: "Payment received",
    value: "2 mins ago",
    position: "bottom-6 left-2 lg:-left-6",
  },
];

export const HOW_IT_WORKS_STEPS = [
  {
    number: "01",
    title: "Create Your Invoice",
    description:
      "Start with a clean invoice builder that fills GST, items, taxes, and branding in one smooth flow.",
    bullets: [
      "Choose GST-ready invoice layouts",
      "Add products, services, or retainers",
      "Auto-calculate tax, due date, and totals",
    ],
    visual: "form",
  },
  {
    number: "02",
    title: "Send to Your Client",
    description:
      "Effortlessly deliver branded, professional invoices via email and automate timely payment reminders.",
    bullets: [
      "Instantly send invoices directly via email",
      "Download and share professionally formatted PDF invoices",
      "Automate polite reminders for overdue payments",
    ],
    visual: "share",
  },
  {
    number: "03",
    title: "Get Paid Faster",
    description:
      "Accelerate your cash flow with seamless UPI and QR-based payments, automatically tracked and reconciled.",
    bullets: [
      "Enable UPI and QR payments on every invoice",
      "Update and manage payment status with flexibility",
      "Track paid and unpaid invoices with real-time insights",
    ],
    visual: "payment",
  },
];

export const HOME_TEMPLATE_FILTERS = [
  "All",
  "GST",
  "Service",
  "Product",
  "Freelance",
];

export const TEMPLATE_FILTERS = [
  "All",
  "GST Invoice",
  "Service",
  "Product",
  "Freelance",
  "Proforma",
  "Credit Note",
  "Quotation",
];

export const TEMPLATE_SORT_OPTIONS = ["Popular", "New", "Category"];

export const TEMPLATE_PREVIEW_IMAGES = [
  "/images/template/classic.jpg",
  "/images/template/split.jpg",
  "/images/template/standard.jpg",
];

export const TEMPLATES = [
  {
    id: 1,
    name: "Standard",
    category: "GST Invoice",
    shortCategory: "GST",
    access: "Free",
    downloads: 12400,
    accent: "indigo",
    description:
      "A clean and standard grey-themed invoice template for professional use.",
    featured: true,
    image: "standard.jpg",
  },
  {
    id: 2,
    name: "Classic",
    category: "Freelance",
    shortCategory: "Freelance",
    access: "Free",
    downloads: 9100,
    accent: "cyan",
    description:
      "A clean and professional invoice template with a minimal blue theme, sharp typography, and structured sections for billing, itemization, totals, and digital verification using QR and signature. Ideal for formal business transactions.",
    image: "classic.jpg",
  },
  {
    id: 3,
    name: "Split",
    category: "Product",
    shortCategory: "Product",
    access: "Free",
    downloads: 8700,
    accent: "green",
    description:
      "A clean and professional invoice template with a modern blue-green color scheme, ideal for PDF export. Includes company branding, client info, itemized billing, tax/discount calculations, QR code, digital signature, and terms.",
    featured: true,
    image: "split.jpg",
  },
  {
    id: 4,
    name: "Ocean Gradient",
    category: "Service",
    shortCategory: "Service",
    access: "Free",
    downloads: 7600,
    accent: "purple",
    description:
      "A sleek and vibrant invoice template with a blue ocean gradient header, modern layout, shadow effects, and clear itemized billing. Perfect for professional branding with logo, QR code, digital signature, and payment summary..",
    image: "ocean.jpg",
  },
];

export const VALUE_PROPS = [
  {
    title: "Simplicity",
    description:
      "Clear workflows that let founders bill, reconcile, and report without training.",
  },
  {
    title: "Transparency",
    description:
      "Every rupee, reminder, and payment status is visible in real time.",
  },
  {
    title: "Innovation",
    description:
      "Modern payments, automation, and insights designed for India-first operations.",
  },
  {
    title: "Trust",
    description:
      "Security, compliance, and uptime are built into every workflow by default.",
  },
];

export const ABOUT_METRICS = [
  {
    title: "Mission",
    description: "Make invoicing faster, smarter and stress-free.",
  },
  {
    title: "Vision",
    description: "We believe every business deserves powerful billing software without complicated accounting tools. ",
  },
];

export const TEAM_MEMBERS = [
  {
    name: "Prem Morya",
    role: "Founder & CEO",
    image: "/images/team-naina.svg",
  },
  {
    name: "Prem Morya",
    role: "Head of Product",
    image: "/images/team-vikram.svg",
  },
  {
    name: "Prem Morya",
    role: "Design Lead",
    image: "/images/team-sara.svg",
  },
  {
    name: "Prem Morya",
    role: "Engineering Lead",
    image: "/images/team-arjun.svg",
  },
];

export const TRUST_INDICATORS = [
  "Preferred by Freelancers & Professionals",
  "Trusted by Leading CA Firms",
  "100% GST Compliant Solution",
  "Widely Used by Growing Startups",
];

export const PRESS_LOGOS = [
  { name: "Inc42", src: "/images/press-inc42.svg" },
  { name: "YourStory", src: "/images/press-yourstory.svg" },
  { name: "Economic Times", src: "/images/press-et.svg" },
  { name: "Finshots", src: "/images/press-finshots.svg" },
];

export const LOGIN_BENEFITS = [
  "Track invoices, collections, and receivables from one dashboard",
  "Accept UPI and online payments with instant status sync",
  "Stay GST-ready with exportable reports and reminders",
];

export const REGISTER_BENEFITS = [
  "Free forever plan available",
  "No credit card required",
  "Setup in under 2 minutes",
  "Bank-grade security",
];

export const SOCIAL_PROOF_AVATARS = [
  "/images/avatar-rajesh.svg",
  "/images/avatar-priya.svg",
  "/images/avatar-amit.svg",
];

export const FOOTER_LINKS = {
  product: ["Features", "Pricing", "Templates"],
  company: ["About", "Contact", "Careers"],
  
};

export const BUSINESS_TYPES = ["Freelancer", "Retailer", "Service", "Other"];

export const INVOICE_DEFAULT = {
  businessName: "Invoicezy Studio LLP",
  clientName: "PixelCraft Labs",
  currency: "INR",
  taxRate: 18,
  dueDate: "2026-04-15",
  items: [
    { id: 1, name: "Website Design", qty: 1, rate: 18000 },
    { id: 2, name: "SEO Setup", qty: 1, rate: 7000 },
  ],
};

export const CURRENCIES = [
  { label: "INR (\u20B9)", value: "INR" },
  { label: "USD ($)", value: "USD" },
  { label: "EUR (\u20AC)", value: "EUR" },
  { label: "GBP (\u00A3)", value: "GBP" },
];

export const TAX_RATES = [0, 5, 12, 18];

export const COMPARISON_ROWS = [
  {
    feature: "Invoices per month",
    values: ["5", "Unlimited", "Unlimited", "Unlimited"],
  },
  { feature: "Users", values: ["1",  "5", "10+", "Unlimited"] },
  {
    feature: "GST invoicing",
    values: ["Basic",  "\u2713", "\u2713", "\u2713"],
  },
  {
    feature: "UPI payments",
    values: ["\u2717",  "\u2713", "\u2713", "\u2713"],
  },
  {
    feature: "Expense tracking",
    values: ["\u2717",  "\u2713", "\u2713", "\u2713"],
  },
  {
    feature: "Inventory",
    values: ["\u2717",  "\u2717", "\u2713", "\u2713"],
  },
  {
    feature: "Recurring invoices",
    values: ["\u2717",  "\u2717", "\u2713", "\u2713"],
  },
  {
    feature: "API access",
    values: ["\u2717",  "\u2717", "\u2713", "Custom"],
  },
  {
    feature: "Support",
    values: ["Community","Priority", "Priority", "Dedicated"],
  },
];
