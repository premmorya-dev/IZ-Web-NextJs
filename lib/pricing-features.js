import {
  BadgeCheck,
  BarChart3,
  BellRing,
  Boxes,
  Building2,
  Cloud,
  Coins,
  FileText,
  Flame,
  Gift,
  Headphones,
  Landmark,
  LayoutTemplate,
  Mail,
  Package,
  Palette,
  PenTool,
  QrCode,
  Receipt,
  Repeat,
  RefreshCw,
  Settings2,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Star,
  TrendingUp,
  Users,
  Wallet,
} from "lucide-react";

/**
 * Every boolean feature key InvoiceZy's API can return, mapped to a
 * human label + icon. "gst_billing" is synthetic (always true, not part
 * of the API payload) because GST-compliant billing is a baseline
 * promise across every plan.
 */
export const FEATURE_META = {
  gst_billing: { label: "GST-Compliant Billing", icon: Landmark },
  qr_code_payments: { label: "UPI / QR Code Payments", icon: QrCode },
  inventory_management: { label: "Inventory Management", icon: Boxes },
  unlimited_client: { label: "Unlimited Clients", icon: Users },
  unlimited_product: { label: "Unlimited Products", icon: Package },
  unlimited_expense: { label: "Unlimited Expense Entries", icon: Receipt },
  recurring_invoice: { label: "Recurring Invoices", icon: RefreshCw },
  recurring_expense: { label: "Recurring Expenses", icon: Repeat },
  schedule_automatic_payment_reminders: {
    label: "Automatic Payment Reminders",
    icon: BellRing,
  },
  priority_customer_support: { label: "Priority Support", icon: Headphones },
  cloud_storage_for_invoices: { label: "Cloud Storage", icon: Cloud },
  custom_branding: { label: "Custom Branding", icon: Palette },
  digital_signature: { label: "Digital Signature", icon: PenTool },
  multi_currency_support: { label: "Multi-Currency Support", icon: Coins },
  multi_device_login: { label: "Multi-Device Login", icon: Smartphone },
  multiple_invoice_templates: {
    label: "Multiple Invoice Templates",
    icon: LayoutTemplate,
  },
  reports_and_statements: { label: "Reports & Statements", icon: BarChart3 },
  track_invoice_payments: { label: "Payment Tracking", icon: TrendingUp },
  track_expenses: { label: "Expense Tracking", icon: Wallet },
  send_invoices_via_email: { label: "Email Invoices", icon: Mail },
  send_unlimited_estimate_and_quotation: {
    label: "Unlimited Estimates & Quotes",
    icon: FileText,
  },
  data_security: { label: "Bank-Grade Data Security", icon: ShieldCheck },
  free_upgrade: { label: "Free Plan Upgrades", icon: Gift },
  client_customization_as_per_requirement: {
    label: "Custom Requirements",
    icon: Settings2,
  },
};

// Order in which features are considered when composing highlight rows,
// locked-feature teasers, and the "view all" list. Most-persuasive first.
const MASTER_PRIORITY = [
  "recurring_invoice",
  "recurring_expense",
  "schedule_automatic_payment_reminders",
  "priority_customer_support",
  "cloud_storage_for_invoices",
  "unlimited_client",
  "unlimited_product",
  "client_customization_as_per_requirement",
  "multi_currency_support",
  "custom_branding",
  "digital_signature",
  "reports_and_statements",
  "multiple_invoice_templates",
  "multi_device_login",
  "send_unlimited_estimate_and_quotation",
  "track_invoice_payments",
  "send_invoices_via_email",
  "data_security",
  "track_expenses",
  "unlimited_expense",
  "qr_code_payments",
  "inventory_management",
  "gst_billing",
  "free_upgrade",
];

// Which boolean features get pulled in (if true) to round each plan's
// highlight list out to 5 rows, after the 3 usage-limit rows.
const PRIORITY_EXTRA_BY_TIER = [
  ["gst_billing", "qr_code_payments", "inventory_management", "data_security"], // Free
  [
    "cloud_storage_for_invoices",
    "custom_branding",
    "digital_signature",
    "reports_and_statements",
  ], // Basic
  [
    "recurring_invoice",
    "schedule_automatic_payment_reminders",
    "multi_currency_support",
    "reports_and_statements",
  ], // Professional
  [
    "priority_customer_support",
    "client_customization_as_per_requirement",
    "cloud_storage_for_invoices",
    "recurring_invoice",
  ], // Enterprise
];

export const PLAN_BADGES = [
  null,
  { label: "Best Value", icon: Flame },
  { label: "Most Popular", icon: Star },
  { label: "Enterprise", icon: Building2 },
];

export const PLAN_TAGLINES = [
  "Everything you need to get started — no card required.",
  null, // computed dynamically from price/day, see getPricePerDay
  "Everything you need to automate your business.",
  "Tailored for growing businesses.",
];

export const CTA_LABELS = [
  "Start Free",
  "Upgrade to Basic",
  "Upgrade to Professional",
  "Talk to Sales",
];

export function hasFeature(plan, key) {
  if (key === "gst_billing") return true;
  return Boolean(plan?.features?.[key]);
}

export function formatDuration(days) {
  const n = Number(days);
  if (n === 30) return "/month";
  if (n === 365 || n === 360) return "/year";
  if (!n) return "";
  return `/${n} days`;
}

export function getPricePerDay(plan) {
  const price = Number(plan.price) || 0;
  const pricePerDay = Math.round(price / 31);

  if (price === 0) return 0;
  return pricePerDay;
}

/** The 3 usage-limit rows every plan leads with (invoices, clients, products). */
export function getLimitBadges(plan) {
  const isFree = plan.plan_id === 1; // ya plan.name === "Free Plan"

  return [
    {
      key: "invoices",
      icon: FileText,
      label: isFree
        ? `${plan.invoice_limit} Invoices${formatDuration(plan.duration_days)}`
        : "Unlimited Invoices",
    },
    {
      key: "clients",
      icon: Users,
      label: isFree
        ? `${plan.client_limit} Clients`
        : "Unlimited Clients",
    },
    {
      key: "products",
      icon: Package,
      label: isFree
        ? `${plan.product_listing_limit}+ Products`
        : "Unlimited Products",
    },
  ];
}

/** 5 headline rows shown above the fold on every card. */
export function getHighlights(plan, index) {
  const limitBadges = getLimitBadges(plan);
  const extraKeys = PRIORITY_EXTRA_BY_TIER[index] ?? PRIORITY_EXTRA_BY_TIER[3];
  const extras = extraKeys
    .filter((key) => hasFeature(plan, key))
    .slice(0, 5 - limitBadges.length)
    .map((key) => ({
      key,
      icon: FEATURE_META[key].icon,
      label: FEATURE_META[key].label,
    }));
  return [...limitBadges, ...extras].slice(0, 5);
}

/**
 * Up to 4 "upgrade to unlock" teaser rows: features this plan lacks that
 * the very next tier grants. Returns [] for the top plan.
 */
export function getLockedFeatures(plans, index) {
  const current = plans[index];
  const next = plans[index + 1];
  if (!current || !next) return [];
  return MASTER_PRIORITY.filter(
    (key) =>
      key !== "gst_billing" &&
      !hasFeature(current, key) &&
      hasFeature(next, key),
  )
    .slice(0, 4)
    .map((key) => ({
      key,
      icon: FEATURE_META[key].icon,
      label: FEATURE_META[key].label,
    }));
}

/** Full feature checklist for the "view all features" expanded panel + comparison table. */
export function getAllFeatureRows(plan) {
  return MASTER_PRIORITY.map((key) => ({
    key,
    icon: FEATURE_META[key].icon,
    label: FEATURE_META[key].label,
    enabled: hasFeature(plan, key),
  }));
}

export function formatPrice(price) {
  const n = Number(price) || 0;
  return n.toLocaleString("en-IN");
}
