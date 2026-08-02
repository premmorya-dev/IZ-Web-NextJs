// Shared types for the invoice generator tool.
// Kept in its own file so the builder component and utils don't duplicate shapes.

export type GstMode = "intra" | "inter" | "none";
export type PaymentStatus = "unpaid" | "partial" | "paid";
export type TemplateId = "premium" | "modern" | "minimal";
export type RecurringFrequency = "none" | "weekly" | "monthly" | "quarterly" | "yearly";

export interface PartyInfo {
  name: string;
  address: string;
  email: string;
  phone: string;
  gstin: string;
}

export interface InvoiceItem {
  id: string;
  description: string;
  qty: number;
  rate: number;
  discountPercent: number;
  taxPercent: number;
  /** value per custom column id, e.g. { "col_1": "Batch A" } */
  extra: Record<string, string>;
}

export interface CustomColumn {
  id: string;
  label: string;
}

export interface CustomField {
  id: string;
  label: string;
  value: string;
}

export interface PaymentDetails {
  bankName: string;
  accountName: string;
  accountNumber: string;
  ifsc: string;
  upiId: string;
}

export interface RecurringConfig {
  enabled: boolean;
  frequency: RecurringFrequency;
  nextRunDate: string;
}

export interface OptionalFieldToggles {
  showLogo: boolean;
  showSignature: boolean;
  showGstin: boolean;
  showDiscountColumn: boolean;
  showTaxColumn: boolean;
  showShipping: boolean;
  showNotes: boolean;
  showTerms: boolean;
  showPaymentDetails: boolean;
  showQr: boolean;
}

export interface DesignConfig {
  template: TemplateId;
  accentColor: string;
  fontFamily: string;
}

export interface InvoiceState {
  seller: PartyInfo;
  buyer: PartyInfo;
  logoDataUrl: string | null;
  signatureDataUrl: string | null;

  invoiceNumber: string;
  invoiceDate: string;
  dueDate: string;
  currency: string;
  language: string;
  status: PaymentStatus;
  amountPaid: number;

  items: InvoiceItem[];
  customColumns: CustomColumn[];

  gstMode: GstMode;
  shippingCharge: number;
  otherCharge: number;
  roundOffEnabled: boolean;

  notes: string;
  terms: string;

  payment: PaymentDetails;
  recurring: RecurringConfig;
  customFields: CustomField[];

  design: DesignConfig;
  optional: OptionalFieldToggles;
}

export interface InvoiceTotals {
  subtotal: number;
  totalDiscount: number;
  taxableAmount: number;
  cgst: number;
  sgst: number;
  igst: number;
  totalTax: number;
  shipping: number;
  otherCharge: number;
  roundOff: number;
  grandTotal: number;
  balanceDue: number;
}
