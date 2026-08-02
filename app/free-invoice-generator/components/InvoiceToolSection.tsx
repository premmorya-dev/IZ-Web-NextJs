"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import InvoicePreview from "./InvoicePreview";
import type {
  CustomColumn,
  CustomField,
  InvoiceState,
  OptionalFieldToggles,
  TemplateId,
} from "./invoiceTypes";
import {
  calculateTotals,
  clearDraftFromLocalStorage,
  createDefaultInvoiceState,
  decodeStateFromShareParam,
  emptyItem,
  encodeStateToShareParam,
  fileToDataUrl,
  loadDraftFromLocalStorage,
  saveDraftToLocalStorage,
  uid,
} from "./invoiceUtils";

/**
 * NOTE FOR PREM:
 * This is a self-contained, client-side invoice builder meant to sit above
 * the fold so ad traffic can start immediately with zero login. It covers
 * business/client details, unlimited items, discount/tax/GST, design
 * (3 templates matching your DomPDF "Premium"/"Modern" variants + a
 * "Minimal" one), payment/UPI/QR, notes/terms, custom fields & columns,
 * a local draft (auto-saved to localStorage), JSON export/import, a
 * no-backend shareable link (state is base64-encoded into the URL), and
 * print/"download PDF" via the browser's native print dialog.
 *
 * "Download PDF" currently opens the print dialog (any browser can
 * "Save as PDF" from there) so there's no new npm dependency for a page
 * anonymous visitors hit before registering. Once a visitor registers,
 * hand off to your real Laravel/DomPDF invoice pipeline for the
 * authenticated, stored version — this tool's job is just to convert.
 */

const TABS = ["Business", "Items & Tax", "Payment", "Notes & Advanced"] as const;
type Tab = (typeof TABS)[number];

const CURRENCIES = ["INR", "USD", "EUR", "GBP", "AED"];
const LANGUAGES = ["English", "Hindi"];
const FONTS = ["Space Grotesk", "Inter", "IBM Plex Mono", "Georgia", "Arial"];
const TEMPLATES: { id: TemplateId; label: string; color: string }[] = [
  { id: "premium", label: "Premium", color: "#4338CA" },
  { id: "modern", label: "Modern", color: "#2563EB" },
  { id: "minimal", label: "Minimal", color: "#0E7490" },
];

export default function InvoiceToolSection() {
  const [state, setState] = useState<InvoiceState>(createDefaultInvoiceState);
  const [activeTab, setActiveTab] = useState<Tab>("Business");
  const [shareCopied, setShareCopied] = useState(false);
  const jsonFileInputRef = useRef<HTMLInputElement>(null);
  const hydrated = useRef(false);

  // Restore from a shared link (?draft=...) first, else fall back to the
  // locally saved draft. Runs once, client-side only.
  useEffect(() => {
    if (hydrated.current) return;
    hydrated.current = true;

    const params = new URLSearchParams(window.location.search);
    const shared = params.get("draft");
    if (shared) {
      const restored = decodeStateFromShareParam(shared);
      if (restored) {
        setState(restored);
        return;
      }
    }
    const draft = loadDraftFromLocalStorage();
    if (draft) setState(draft);
  }, []);

  // Auto-save the working draft locally (debounced).
  useEffect(() => {
    const timeout = setTimeout(() => saveDraftToLocalStorage(state), 500);
    return () => clearTimeout(timeout);
  }, [state]);

  const totals = useMemo(() => calculateTotals(state), [state]);

  const patch = (p: Partial<InvoiceState>) => setState((prev) => ({ ...prev, ...p }));

  const updateItem = (id: string, p: Partial<InvoiceState["items"][number]>) =>
    setState((prev) => ({
      ...prev,
      items: prev.items.map((item) => (item.id === id ? { ...item, ...p } : item)),
    }));

  const addItem = () => setState((prev) => ({ ...prev, items: [...prev.items, emptyItem()] }));
  const removeItem = (id: string) =>
    setState((prev) => ({
      ...prev,
      items: prev.items.length > 1 ? prev.items.filter((i) => i.id !== id) : prev.items,
    }));

  const toggleOptional = (key: keyof OptionalFieldToggles) =>
    setState((prev) => ({
      ...prev,
      optional: { ...prev.optional, [key]: !prev.optional[key] },
    }));

  const addCustomColumn = () => {
    const col: CustomColumn = { id: uid(), label: "New Column" };
    setState((prev) => ({ ...prev, customColumns: [...prev.customColumns, col] }));
  };
  const removeCustomColumn = (id: string) =>
    setState((prev) => ({
      ...prev,
      customColumns: prev.customColumns.filter((c) => c.id !== id),
      items: prev.items.map((item) => {
        const { [id]: _removed, ...rest } = item.extra;
        return { ...item, extra: rest };
      }),
    }));

  const addCustomField = () => {
    const field: CustomField = { id: uid(), label: "Field", value: "" };
    setState((prev) => ({ ...prev, customFields: [...prev.customFields, field] }));
  };
  const removeCustomField = (id: string) =>
    setState((prev) => ({ ...prev, customFields: prev.customFields.filter((f) => f.id !== id) }));

  const handleLogoUpload = async (file: File | null) => {
    if (!file) return;
    patch({ logoDataUrl: await fileToDataUrl(file) });
  };
  const handleSignatureUpload = async (file: File | null) => {
    if (!file) return;
    patch({ signatureDataUrl: await fileToDataUrl(file) });
  };

  const handlePrintOrDownload = () => window.print();

  const handleShare = async () => {
    const url = `${window.location.origin}${window.location.pathname}?draft=${encodeStateToShareParam(
      state
    )}`;
    if (navigator.share) {
      try {
        await navigator.share({ title: `Invoice ${state.invoiceNumber}`, url });
        return;
      } catch {
        // user cancelled the share sheet — fall through to clipboard copy
      }
    }
    await navigator.clipboard.writeText(url);
    setShareCopied(true);
    setTimeout(() => setShareCopied(false), 2000);
  };

  const handleSaveJson = () => {
    const blob = new Blob([JSON.stringify(state, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${state.invoiceNumber || "invoice"}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleLoadJson = async (file: File | null) => {
    if (!file) return;
    const text = await file.text();
    try {
      const restored = JSON.parse(text) as InvoiceState;
      setState(restored);
    } catch {
      // eslint-disable-next-line no-alert
      alert("That file doesn't look like a valid Invoicezy draft.");
    }
  };

  const handleClearDraft = () => {
    clearDraftFromLocalStorage();
    setState(createDefaultInvoiceState());
  };

  return (
    <section
      id="invoice-tool"
      className="izy-invoice-tool px-4 pb-20 pt-4 sm:px-6"
      aria-label="Free invoice generator tool"
    >
      {/* Print styles: only the preview card is visible when printing / saving as PDF */}
      <style jsx global>{`
        @media print {
          body * {
            visibility: hidden;
          }
          #izy-invoice-print-area,
          #izy-invoice-print-area * {
            visibility: visible;
            color: black !important;
          }
          #izy-invoice-print-area {
            position: absolute;
            inset: 0;
            width: 100%;
          }
        }
      `}</style>

      <div className="mx-auto max-w-6xl">
        {/* Toolbar */}
        <div className="mb-4 flex flex-wrap items-center justify-end gap-2 no-print">

          <ToolbarButton onClick={handleClearDraft}>Clear Draft</ToolbarButton>
          <ToolbarButton
            onClick={() => {
              (window as any).dataLayer = (window as any).dataLayer || [];

              (window as any).dataLayer.push({
                event: "download_pdf_click",
              });

              window.location.href = "/register";
            }}
            primary
          >
            Print / Download PDF
          </ToolbarButton>
        </div>

        <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-sm">
          <div className="grid gap-0 lg:grid-cols-2">
            {/* Form side */}
            <div className="border-b border-white/10 p-6 lg:border-b-0 lg:border-r sm:p-8">
              <nav className="flex flex-wrap gap-1.5" aria-label="Invoice sections">
                {TABS.map((tab) => (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => setActiveTab(tab)}
                    aria-current={activeTab === tab}
                    className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${activeTab === tab
                      ? "bg-gradient-to-r from-cyan-400 to-violet-500 text-[#0A0E1A]"
                      : "border border-white/10 text-white/60 hover:text-white/90"
                      }`}
                  >
                    {tab}
                  </button>
                ))}
              </nav>

              <div className="mt-6">
                {activeTab === "Business" && (
                  <BusinessTab state={state} patch={patch} onLogoUpload={handleLogoUpload} />
                )}
                {activeTab === "Items & Tax" && (
                  <ItemsTab
                    state={state}
                    patch={patch}
                    updateItem={updateItem}
                    addItem={addItem}
                    removeItem={removeItem}
                    addCustomColumn={addCustomColumn}
                    removeCustomColumn={removeCustomColumn}
                  />
                )}

                {activeTab === "Payment" && <PaymentTab state={state} patch={patch} />}
                {activeTab === "Notes & Advanced" && (
                  <AdvancedTab
                    state={state}
                    patch={patch}
                    onSignatureUpload={handleSignatureUpload}
                    addCustomField={addCustomField}
                    removeCustomField={removeCustomField}
                  />
                )}
              </div>
            </div>

            {/* Preview side */}
            <div className="overflow-x-auto bg-gray-100 p-4 sm:p-6 " style={{ color: "black" }}>
              <InvoicePreview state={state} totals={totals} />
              <div className="mt-4 text-center text-[11px] text-gray-500 no-print">
                Live preview — updates as you type
              </div>
            </div>
          </div>
        </div>

        <p className="mt-4 text-center text-xs text-white/40 no-print">
          Your invoice is saved privately to this browser as a draft. Create a
          free account to store it in the cloud, reuse clients, and access it
          from any device.
        </p>
      </div>
    </section>
  );
}

/* ---------------------------------- Tabs --------------------------------- */

function BusinessTab({
  state,
  patch,
  onLogoUpload,
}: {
  state: InvoiceState;
  patch: (p: Partial<InvoiceState>) => void;
  onLogoUpload: (file: File | null) => void;
}) {
  return (
    <div className="space-y-6">
      <FieldGroup title="Your Business (Seller)">
        <div className="grid gap-3 sm:grid-cols-2">
          <TextField
            label="Business Name"
            value={state.seller.name}
            onChange={(v) => patch({ seller: { ...state.seller, name: v } })}
            placeholder="e.g. Sharma Enterprises"
          />
          <TextField
            label="GSTIN"
            value={state.seller.gstin}
            onChange={(v) => patch({ seller: { ...state.seller, gstin: v } })}
            placeholder="22AAAAA0000A1Z5"
          />
          <TextField
            label="Email"
            value={state.seller.email}
            onChange={(v) => patch({ seller: { ...state.seller, email: v } })}
            placeholder="you@business.com"
          />
          <TextField
            label="Phone"
            value={state.seller.phone}
            onChange={(v) => patch({ seller: { ...state.seller, phone: v } })}
            placeholder="+91 98765 43210"
          />
        </div>
        <TextArea
          label="Business Address"
          value={state.seller.address}
          onChange={(v) => patch({ seller: { ...state.seller, address: v } })}
          rows={2}
        />
        <FileField label="Business Logo" onChange={onLogoUpload} preview={state.logoDataUrl} />
      </FieldGroup>

      <FieldGroup title="Bill To (Client)">
        <div className="grid gap-3 sm:grid-cols-2">
          <TextField
            label="Client Name"
            value={state.buyer.name}
            onChange={(v) => patch({ buyer: { ...state.buyer, name: v } })}
            placeholder="e.g. Verma Traders"
          />
          <TextField
            label="Client GSTIN"
            value={state.buyer.gstin}
            onChange={(v) => patch({ buyer: { ...state.buyer, gstin: v } })}
          />
          <TextField
            label="Client Email"
            value={state.buyer.email}
            onChange={(v) => patch({ buyer: { ...state.buyer, email: v } })}
          />
          <TextField
            label="Client Phone"
            value={state.buyer.phone}
            onChange={(v) => patch({ buyer: { ...state.buyer, phone: v } })}
          />
        </div>
        <TextArea
          label="Client Address"
          value={state.buyer.address}
          onChange={(v) => patch({ buyer: { ...state.buyer, address: v } })}
          rows={2}
        />
      </FieldGroup>

      <FieldGroup title="Invoice Details">
        <div className="grid gap-3 sm:grid-cols-2">
          <TextField
            label="Invoice Number"
            value={state.invoiceNumber}
            onChange={(v) => patch({ invoiceNumber: v })}
          />
          <SelectField
            label="Currency"
            value={state.currency}
            options={CURRENCIES}
            onChange={(v) => patch({ currency: v })}
          />
          <TextField
            label="Invoice Date"
            type="date"
            value={state.invoiceDate}
            onChange={(v) => patch({ invoiceDate: v })}
          />
          <TextField
            label="Due Date"
            type="date"
            value={state.dueDate}
            onChange={(v) => patch({ dueDate: v })}
          />
          <SelectField
            label="Language"
            value={state.language}
            options={LANGUAGES}
            onChange={(v) => patch({ language: v })}
          />
          <SelectField
            label="Payment Status"
            value={state.status}
            options={["unpaid", "partial", "paid"]}
            onChange={(v) => patch({ status: v as InvoiceState["status"] })}
          />
          {state.status === "partial" && (
            <TextField
              label="Amount Already Paid"
              type="number"
              value={String(state.amountPaid)}
              onChange={(v) => patch({ amountPaid: Number(v) || 0 })}
            />
          )}
        </div>
      </FieldGroup>
    </div>
  );
}

function ItemsTab({
  state,
  patch,
  updateItem,
  addItem,
  removeItem,
  addCustomColumn,
  removeCustomColumn,
}: {
  state: InvoiceState;
  patch: (p: Partial<InvoiceState>) => void;
  updateItem: (id: string, p: Partial<InvoiceState["items"][number]>) => void;
  addItem: () => void;
  removeItem: (id: string) => void;
  addCustomColumn: () => void;
  removeCustomColumn: (id: string) => void;
}) {
  return (
    <div className="space-y-6">
      <FieldGroup title="GST Configuration">
        <SelectField
          label="GST Type"
          value={state.gstMode}
          options={["intra", "inter", "none"]}
          labels={{ intra: "Intra-state (CGST + SGST)", inter: "Inter-state (IGST)", none: "No GST" }}
          onChange={(v) => patch({ gstMode: v as InvoiceState["gstMode"] })}
        />
      </FieldGroup>

      <FieldGroup title="Items">
        <div className="space-y-3">
          {state.items.map((item) => (
            <div key={item.id} className="rounded-lg border border-white/10 bg-white/[0.03] p-3">
              <div className="flex gap-2">
                <input
                  value={item.description}
                  onChange={(e) => updateItem(item.id, { description: e.target.value })}
                  placeholder="Item / service description"
                  className="izy-input min-w-0 flex-1 rounded-lg border border-white/10 bg-white/[0.06] px-3 py-2 text-sm text-white placeholder:text-white/30 focus:border-cyan-400/50 focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => removeItem(item.id)}
                  aria-label="Remove item"
                  className="rounded-lg px-2 text-white/40 hover:bg-white/5 hover:text-white/80"
                >
                  ×
                </button>
              </div>
              <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-4">
                <MiniNumberField label="Qty" value={item.qty} onChange={(v) => updateItem(item.id, { qty: v })} />
                <MiniNumberField label="Rate" value={item.rate} onChange={(v) => updateItem(item.id, { rate: v })} />
                <MiniNumberField
                  label="Disc %"
                  value={item.discountPercent}
                  onChange={(v) => updateItem(item.id, { discountPercent: v })}
                />
                <MiniNumberField
                  label="Tax %"
                  value={item.taxPercent}
                  onChange={(v) => updateItem(item.id, { taxPercent: v })}
                />
              </div>
              {state.customColumns.length > 0 && (
                <div className="mt-2 grid grid-cols-2 gap-2">
                  {state.customColumns.map((col) => (
                    <div key={col.id}>
                      <span className="mb-1 block text-[10px] text-white/40">{col.label}</span>
                      <input
                        value={item.extra[col.id] || ""}
                        onChange={(e) =>
                          updateItem(item.id, { extra: { ...item.extra, [col.id]: e.target.value } })
                        }
                        className="w-full rounded-md border border-white/10 bg-white/[0.06] px-2 py-1.5 text-xs text-white focus:border-cyan-400/50 focus:outline-none"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-3 flex flex-wrap gap-3">
          <button type="button" onClick={addItem} className="text-xs font-medium text-cyan-300 hover:text-cyan-200">
            + Add item
          </button>
          <button
            type="button"
            onClick={addCustomColumn}
            className="text-xs font-medium text-cyan-300 hover:text-cyan-200"
          >
            + Add custom column
          </button>
        </div>

        {state.customColumns.length > 0 && (
          <div className="mt-3 space-y-1.5">
            {state.customColumns.map((col) => (
              <div key={col.id} className="flex items-center gap-2">
                <input
                  value={col.label}
                  onChange={(e) =>
                    patch({
                      customColumns: state.customColumns.map((c) =>
                        c.id === col.id ? { ...c, label: e.target.value } : c
                      ),
                    })
                  }
                  className="w-40 rounded-md border border-white/10 bg-white/[0.06] px-2 py-1 text-xs text-white focus:border-cyan-400/50 focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => removeCustomColumn(col.id)}
                  className="text-xs text-white/40 hover:text-white/70"
                >
                  Remove column
                </button>
              </div>
            ))}
          </div>
        )}
      </FieldGroup>

      <FieldGroup title="Additional Charges">
        <div className="grid gap-3 sm:grid-cols-2">
          <TextField
            label="Shipping Charge"
            type="number"
            value={String(state.shippingCharge)}
            onChange={(v) => patch({ shippingCharge: Number(v) || 0 })}
          />
          <TextField
            label="Other Charges"
            type="number"
            value={String(state.otherCharge)}
            onChange={(v) => patch({ otherCharge: Number(v) || 0 })}
          />
        </div>
        <Checkbox
          label="Round off total to nearest rupee"
          checked={state.roundOffEnabled}
          onChange={(v) => patch({ roundOffEnabled: v })}
        />
      </FieldGroup>
    </div>
  );
}

function DesignTab({
  state,
  patch,
  toggleOptional,
}: {
  state: InvoiceState;
  patch: (p: Partial<InvoiceState>) => void;
  toggleOptional: (key: keyof OptionalFieldToggles) => void;
}) {
  const optionalLabels: { key: keyof OptionalFieldToggles; label: string }[] = [
    { key: "showLogo", label: "Show logo" },
    { key: "showSignature", label: "Show signature" },
    { key: "showGstin", label: "Show GSTIN" },
    { key: "showDiscountColumn", label: "Show discount column" },
    { key: "showTaxColumn", label: "Show tax column" },
    { key: "showShipping", label: "Show shipping charge" },
    { key: "showNotes", label: "Show notes" },
    { key: "showTerms", label: "Show terms & conditions" },
    { key: "showPaymentDetails", label: "Show payment details" },
    { key: "showQr", label: "Show UPI QR code" },
  ];

  return (
    <div className="space-y-6">
      <FieldGroup title="Template">
        <div className="grid grid-cols-3 gap-2">
          {TEMPLATES.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => patch({ design: { ...state.design, template: t.id, accentColor: t.color } })}
              className={`rounded-lg border p-3 text-left transition-colors ${state.design.template === t.id
                ? "border-cyan-400/60 bg-white/[0.06]"
                : "border-white/10 hover:border-white/25"
                }`}
            >
              <span className="block h-2 w-full rounded-full" style={{ backgroundColor: t.color }} aria-hidden="true" />
              <span className="mt-2 block text-xs font-medium text-white">{t.label}</span>
            </button>
          ))}
        </div>
      </FieldGroup>

      <FieldGroup title="Colors & Typography">
        <div className="grid gap-3 sm:grid-cols-2">
          <div>
            <span className="mb-1.5 block text-xs font-medium text-white/60">Accent Color</span>
            <input
              type="color"
              value={state.design.accentColor}
              onChange={(e) => patch({ design: { ...state.design, accentColor: e.target.value } })}
              className="h-9 w-full cursor-pointer rounded-lg border border-white/10 bg-white/[0.06]"
            />
          </div>
          <SelectField
            label="Font"
            value={state.design.fontFamily}
            options={FONTS}
            onChange={(v) => patch({ design: { ...state.design, fontFamily: v } })}
          />
        </div>
      </FieldGroup>

      <FieldGroup title="Optional Fields">
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          {optionalLabels.map(({ key, label }) => (
            <Checkbox key={key} label={label} checked={state.optional[key]} onChange={() => toggleOptional(key)} />
          ))}
        </div>
      </FieldGroup>
    </div>
  );
}

function PaymentTab({ state, patch }: { state: InvoiceState; patch: (p: Partial<InvoiceState>) => void }) {
  return (
    <div className="space-y-6">
      <FieldGroup title="Bank Details">
        <div className="grid gap-3 sm:grid-cols-2">
          <TextField
            label="Bank Name"
            value={state.payment.bankName}
            onChange={(v) => patch({ payment: { ...state.payment, bankName: v } })}
          />
          <TextField
            label="Account Holder Name"
            value={state.payment.accountName}
            onChange={(v) => patch({ payment: { ...state.payment, accountName: v } })}
          />
          <TextField
            label="Account Number"
            value={state.payment.accountNumber}
            onChange={(v) => patch({ payment: { ...state.payment, accountNumber: v } })}
          />
          <TextField
            label="IFSC Code"
            value={state.payment.ifsc}
            onChange={(v) => patch({ payment: { ...state.payment, ifsc: v } })}
          />
        </div>
      </FieldGroup>

      <FieldGroup title="UPI">
        <TextField
          label="UPI ID"
          value={state.payment.upiId}
          onChange={(v) => patch({ payment: { ...state.payment, upiId: v } })}
          placeholder="yourname@upi"
        />
        <p className="mt-1.5 text-[11px] text-white/40">
          A scannable payment QR is generated automatically on the invoice when a UPI ID is set.
        </p>
      </FieldGroup>

      <FieldGroup title="Recurring Invoice">
        <Checkbox
          label="Make this a recurring invoice"
          checked={state.recurring.enabled}
          onChange={(v) => patch({ recurring: { ...state.recurring, enabled: v } })}
        />
        {state.recurring.enabled && (
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            <SelectField
              label="Frequency"
              value={state.recurring.frequency}
              options={["weekly", "monthly", "quarterly", "yearly"]}
              onChange={(v) =>
                patch({
                  recurring: { ...state.recurring, frequency: v as InvoiceState["recurring"]["frequency"] },
                })
              }
            />
            <TextField
              label="Next Run Date"
              type="date"
              value={state.recurring.nextRunDate}
              onChange={(v) => patch({ recurring: { ...state.recurring, nextRunDate: v } })}
            />
          </div>
        )}
        <p className="mt-2 text-[11px] text-white/40">
          Saved with this draft. Actually sending invoices on a schedule needs a backend job — wire this
          config to your scheduler once a visitor registers.
        </p>
      </FieldGroup>
    </div>
  );
}

function AdvancedTab({
  state,
  patch,
  onSignatureUpload,
  addCustomField,
  removeCustomField,
}: {
  state: InvoiceState;
  patch: (p: Partial<InvoiceState>) => void;
  onSignatureUpload: (file: File | null) => void;
  addCustomField: () => void;
  removeCustomField: (id: string) => void;
}) {
  return (
    <div className="space-y-6">
      <FieldGroup title="Notes & Terms">
        <TextArea label="Notes" value={state.notes} onChange={(v) => patch({ notes: v })} rows={2} />
        <TextArea label="Terms & Conditions" value={state.terms} onChange={(v) => patch({ terms: v })} rows={2} />
      </FieldGroup>

      <FieldGroup title="Signature">
        <FileField label="Signature Image" onChange={onSignatureUpload} preview={state.signatureDataUrl} />
      </FieldGroup>

      <FieldGroup title="Custom Fields">
        <div className="space-y-2">
          {state.customFields.map((field) => (
            <div key={field.id} className="flex items-center gap-2">
              <input
                value={field.label}
                onChange={(e) =>
                  patch({
                    customFields: state.customFields.map((f) =>
                      f.id === field.id ? { ...f, label: e.target.value } : f
                    ),
                  })
                }
                placeholder="Label"
                className="w-28 rounded-md border border-white/10 bg-white/[0.06] px-2 py-1.5 text-xs text-white placeholder:text-white/30 focus:border-cyan-400/50 focus:outline-none"
              />
              <input
                value={field.value}
                onChange={(e) =>
                  patch({
                    customFields: state.customFields.map((f) =>
                      f.id === field.id ? { ...f, value: e.target.value } : f
                    ),
                  })
                }
                placeholder="Value"
                className="min-w-0 flex-1 rounded-md border border-white/10 bg-white/[0.06] px-2 py-1.5 text-xs text-white placeholder:text-white/30 focus:border-cyan-400/50 focus:outline-none"
              />
              <button
                type="button"
                onClick={() => removeCustomField(field.id)}
                className="text-xs text-white/40 hover:text-white/70"
              >
                ×
              </button>
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={addCustomField}
          className="mt-3 text-xs font-medium text-cyan-300 hover:text-cyan-200"
        >
          + Add custom field
        </button>
      </FieldGroup>
    </div>
  );
}

/* ------------------------------ Small building blocks ------------------------------ */

function FieldGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="font-[Space_Grotesk] text-sm font-semibold text-white">{title}</h3>
      <div className="mt-3 space-y-3">{children}</div>
    </div>
  );
}

function TextField({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-medium text-white/60">{label}</span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-lg border border-white/10 bg-white/[0.06] px-3 py-2 text-sm text-white placeholder:text-white/30 focus:border-cyan-400/50 focus:outline-none"
      />
    </label>
  );
}

function MiniNumberField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-[10px] text-white/40">{label}</span>
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(Number(e.target.value) || 0)}
        className="w-full rounded-md border border-white/10 bg-white/[0.06] px-2 py-1.5 text-xs text-white focus:border-cyan-400/50 focus:outline-none"
      />
    </label>
  );
}

function TextArea({
  label,
  value,
  onChange,
  rows = 3,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  rows?: number;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-medium text-white/60">{label}</span>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={rows}
        className="w-full rounded-lg border border-white/10 bg-white/[0.06] px-3 py-2 text-sm text-white placeholder:text-white/30 focus:border-cyan-400/50 focus:outline-none"
      />
    </label>
  );
}

function SelectField({
  label,
  value,
  options,
  labels,
  onChange,
}: {
  label: string;
  value: string;
  options: string[];
  labels?: Record<string, string>;
  onChange: (v: string) => void;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-medium text-white/60">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg border border-white/10 bg-[#0F1524] px-3 py-2 text-sm text-white focus:border-cyan-400/50 focus:outline-none"
      >
        {options.map((opt) => (
          <option key={opt} value={opt} className="bg-[#0F1524] text-white">
            {labels?.[opt] ?? opt}
          </option>
        ))}
      </select>
    </label>
  );
}

function Checkbox({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <label className="flex cursor-pointer items-center gap-2 text-xs text-white/70">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="h-3.5 w-3.5 rounded border-white/20 bg-white/10 accent-cyan-400"
      />
      {label}
    </label>
  );
}

function FileField({
  label,
  onChange,
  preview,
}: {
  label: string;
  onChange: (file: File | null) => void;
  preview: string | null;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-medium text-white/60">{label}</span>
      <div className="flex items-center gap-3">
        {preview && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={preview} alt="" className="h-10 w-10 rounded object-contain bg-white/10" />
        )}
        <input
          type="file"
          accept="image/*"
          onChange={(e) => onChange(e.target.files?.[0] ?? null)}
          className="block w-full text-xs text-white/60 file:mr-3 file:rounded-lg file:border-0 file:bg-white/10 file:px-3 file:py-1.5 file:text-xs file:font-medium file:text-white hover:file:bg-white/20"
        />
      </div>
    </label>
  );
}

function ToolbarButton({
  children,
  onClick,
  primary,
}: {
  children: React.ReactNode;
  onClick: () => void;
  primary?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={
        primary
          ? "rounded-lg bg-gradient-to-r from-cyan-400 to-violet-500 px-4 py-2 text-xs font-semibold text-[#0A0E1A] transition-transform hover:scale-[1.02]"
          : "rounded-lg border border-white/15 px-3.5 py-2 text-xs font-medium text-white/75 transition-colors hover:bg-white/5"
      }
    >
      {children}
    </button>
  );
}
