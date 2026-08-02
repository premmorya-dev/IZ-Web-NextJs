import type { InvoiceItem, InvoiceState, InvoiceTotals } from "./invoiceTypes";

export const DRAFT_STORAGE_KEY = "izy-invoice-draft-v1";

export const uid = (): string =>
  typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : `id_${Date.now()}_${Math.random().toString(16).slice(2)}`;

export const emptyItem = (): InvoiceItem => ({
  id: uid(),
  description: "",
  qty: 1,
  rate: 0,
  discountPercent: 0,
  taxPercent: 18,
  extra: {},
});

const todayISO = () => new Date().toISOString().slice(0, 10);
const inNDaysISO = (n: number) => {
  const d = new Date();
  d.setDate(d.getDate() + n);
  return d.toISOString().slice(0, 10);
};

export function createDefaultInvoiceState(): InvoiceState {
  return {
    seller: { name: "", address: "", email: "", phone: "", gstin: "" },
    buyer: { name: "", address: "", email: "", phone: "", gstin: "" },
    logoDataUrl: null,
    signatureDataUrl: null,

    invoiceNumber: `INV-${new Date().getFullYear()}-0001`,
    invoiceDate: todayISO(),
    dueDate: inNDaysISO(7),
    currency: "INR",
    language: "English",
    status: "unpaid",
    amountPaid: 0,

    items: [emptyItem()],
    customColumns: [],

    gstMode: "intra",
    shippingCharge: 0,
    otherCharge: 0,
    roundOffEnabled: true,

    notes: "Thank you for your business.",
    terms: "Payment is due within 7 days of the invoice date.",

    payment: {
      bankName: "",
      accountName: "",
      accountNumber: "",
      ifsc: "",
      upiId: "",
    },
    recurring: { enabled: false, frequency: "none", nextRunDate: "" },
    customFields: [],

    design: { template: "premium", accentColor: "#4338CA", fontFamily: "Space Grotesk" },
    optional: {
      showLogo: true,
      showSignature: true,
      showGstin: true,
      showDiscountColumn: true,
      showTaxColumn: true,
      showShipping: true,
      showNotes: true,
      showTerms: true,
      showPaymentDetails: true,
      showQr: true,
    },
  };
}

export function calculateTotals(state: InvoiceState): InvoiceTotals {
  let subtotal = 0;
  let totalDiscount = 0;
  let taxableAmount = 0;
  let totalTax = 0;

  for (const item of state.items) {
    const gross = item.qty * item.rate;
    const discount = (gross * (item.discountPercent || 0)) / 100;
    const taxable = gross - discount;
    const tax = (taxable * (item.taxPercent || 0)) / 100;

    subtotal += gross;
    totalDiscount += discount;
    taxableAmount += taxable;
    totalTax += tax;
  }

  let cgst = 0;
  let sgst = 0;
  let igst = 0;
  if (state.gstMode === "intra") {
    cgst = totalTax / 2;
    sgst = totalTax / 2;
  } else if (state.gstMode === "inter") {
    igst = totalTax;
  } else {
    totalTax = 0;
  }

  const shipping = state.optional.showShipping ? state.shippingCharge || 0 : 0;
  const otherCharge = state.otherCharge || 0;

  const preRoundTotal = taxableAmount + totalTax + shipping + otherCharge;
  const roundedTotal = state.roundOffEnabled ? Math.round(preRoundTotal) : preRoundTotal;
  const roundOff = roundedTotal - preRoundTotal;

  const grandTotal = roundedTotal;
  const balanceDue =
    state.status === "paid"
      ? 0
      : state.status === "partial"
      ? Math.max(grandTotal - (state.amountPaid || 0), 0)
      : grandTotal;

  return {
    subtotal,
    totalDiscount,
    taxableAmount,
    cgst,
    sgst,
    igst,
    totalTax,
    shipping,
    otherCharge,
    roundOff,
    grandTotal,
    balanceDue,
  };
}

const CURRENCY_LOCALE: Record<string, string> = {
  INR: "en-IN",
  USD: "en-US",
  EUR: "de-DE",
  GBP: "en-GB",
  AED: "ar-AE",
};

export function formatCurrency(amount: number, currency: string): string {
  const locale = CURRENCY_LOCALE[currency] || "en-IN";
  try {
    return amount.toLocaleString(locale, { style: "currency", currency });
  } catch {
    return `${currency} ${amount.toFixed(2)}`;
  }
}

// --- Amount in words (Indian numbering system: lakh / crore) ---
const ONES = [
  "", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine",
  "Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen",
  "Seventeen", "Eighteen", "Nineteen",
];
const TENS = [
  "", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety",
];

function twoDigitsToWords(n: number): string {
  if (n < 20) return ONES[n];
  const tens = Math.floor(n / 10);
  const ones = n % 10;
  return `${TENS[tens]}${ones ? " " + ONES[ones] : ""}`;
}

function threeDigitsToWords(n: number): string {
  const hundred = Math.floor(n / 100);
  const rest = n % 100;
  const parts: string[] = [];
  if (hundred) parts.push(`${ONES[hundred]} Hundred`);
  if (rest) parts.push(twoDigitsToWords(rest));
  return parts.join(" ");
}

export function numberToWordsIndian(amount: number, currency = "INR"): string {
  const rupees = Math.floor(Math.abs(amount));
  const paise = Math.round((Math.abs(amount) - rupees) * 100);

  if (rupees === 0 && paise === 0) return "Zero";

  let n = rupees;
  const crore = Math.floor(n / 10000000);
  n %= 10000000;
  const lakh = Math.floor(n / 100000);
  n %= 100000;
  const thousand = Math.floor(n / 1000);
  n %= 1000;
  const hundred = n;

  const segments: string[] = [];
  if (crore) segments.push(`${threeDigitsToWords(crore)} Crore`);
  if (lakh) segments.push(`${threeDigitsToWords(lakh)} Lakh`);
  if (thousand) segments.push(`${threeDigitsToWords(thousand)} Thousand`);
  if (hundred) segments.push(threeDigitsToWords(hundred));

  const unitLabel = currency === "INR" ? "Rupees" : currency;
  let words = `${unitLabel} ${segments.join(" ")}`.trim();

  if (paise > 0) {
    words += ` and ${twoDigitsToWords(paise)} Paise`;
  }
  return `${words} Only`;
}

// --- Local draft persistence ---
export function saveDraftToLocalStorage(state: InvoiceState) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(DRAFT_STORAGE_KEY, JSON.stringify(state));
  } catch {
    // storage full or unavailable — fail silently, draft saving is a convenience only
  }
}

export function loadDraftFromLocalStorage(): InvoiceState | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(DRAFT_STORAGE_KEY);
    return raw ? (JSON.parse(raw) as InvoiceState) : null;
  } catch {
    return null;
  }
}

export function clearDraftFromLocalStorage() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(DRAFT_STORAGE_KEY);
}

// --- Shareable link (no backend needed: state is encoded straight into the URL) ---
export function encodeStateToShareParam(state: InvoiceState): string {
  const json = JSON.stringify(state);
  if (typeof window === "undefined") return "";
  return window.btoa(encodeURIComponent(json));
}

export function decodeStateFromShareParam(param: string): InvoiceState | null {
  try {
    const json = decodeURIComponent(window.atob(param));
    return JSON.parse(json) as InvoiceState;
  } catch {
    return null;
  }
}

// --- File -> data URL (logo / signature uploads) ---
export function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

// --- UPI QR payload ---
export function buildUpiLink(upiId: string, payeeName: string, amount: number, note: string): string {
  if (!upiId) return "";
  const params = new URLSearchParams({
    pa: upiId,
    pn: payeeName || "Merchant",
    am: amount > 0 ? amount.toFixed(2) : "",
    cu: "INR",
    tn: note || "",
  });
  return `upi://pay?${params.toString()}`;
}

/**
 * Renders a QR image via a public QR-generation endpoint so no extra npm
 * dependency (e.g. qrcode.react) is required for this marketing-page tool.
 * Swap for a local QR library if you'd rather not call a third-party API.
 */
export function buildQrImageUrl(data: string, size = 200): string {
  if (!data) return "";
  return `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(
    data
  )}`;
}
