import type { InvoiceState, InvoiceTotals } from "./invoiceTypes";
import { buildQrImageUrl, buildUpiLink, formatCurrency, numberToWordsIndian } from "./invoiceUtils";

interface Props {
  state: InvoiceState;
  totals: InvoiceTotals;
}

const TEMPLATE_META: Record<
  InvoiceState["design"]["template"],
  { titleStyle: "underline" | "bold" | "caps"; cardStyle: "accent-bar" | "boxed" }
> = {
  premium: { titleStyle: "underline", cardStyle: "accent-bar" },
  modern: { titleStyle: "bold", cardStyle: "boxed" },
  minimal: { titleStyle: "caps", cardStyle: "accent-bar" },
};

export default function InvoicePreview({ state, totals }: Props) {
  const accent = state.design.accentColor;
  const meta = TEMPLATE_META[state.design.template];
  const fontFamily = state.design.fontFamily;

  const upiLink = buildUpiLink(
    state.payment.upiId,
    state.seller.name,
    totals.balanceDue,
    state.invoiceNumber
  );
  const qrUrl = state.optional.showQr && state.payment.upiId ? buildQrImageUrl(upiLink) : "";

  const statusLabel: Record<InvoiceState["status"], string> = {
    paid: "PAID",
    partial: "PARTIALLY PAID",
    unpaid: "UNPAID",
  };
  const statusColor: Record<InvoiceState["status"], string> = {
    paid: "#16A34A",
    partial: "#D97706",
    unpaid: "#DC2626",
  };

  return (
    <div
      id="izy-invoice-print-area"
      className="mx-auto w-full max-w-[720px] bg-white p-6 text-gray-900 sm:p-8"
      style={{ fontFamily: `${fontFamily}, sans-serif` }}
    >
      {/* Status ribbon */}
      <div className="mb-4 flex justify-end">
        <span
          className="rounded-full px-3 py-1 text-[11px] font-bold tracking-wide"
          style={{ color: statusColor[state.status], backgroundColor: `${statusColor[state.status]}1A` }}
        >
          {statusLabel[state.status]}
        </span>
      </div>

      {/* Header */}
      <div
        className="flex items-start justify-between border-b pb-5"
        style={{ borderBottomWidth: 3, borderBottomColor: accent }}
      >
        <div className="flex items-center gap-3">
          {state.optional.showLogo && state.logoDataUrl && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={state.logoDataUrl}
              alt={`${state.seller.name || "Business"} logo`}
              className="h-12 w-12 rounded object-contain"
            />
          )}
          <div>
            <p className="text-base font-semibold text-gray-900">
              {state.seller.name || "Your Business Name"}
            </p>
            <p className="mt-0.5 max-w-[220px] text-xs text-gray-500">
              {state.seller.address || "Business address"}
            </p>
            {state.optional.showGstin && state.seller.gstin && (
              <p className="mt-0.5 text-xs text-gray-500">GSTIN: {state.seller.gstin}</p>
            )}
          </div>
        </div>

        <div className="text-right">
          <p
            className="text-2xl font-bold tracking-wide text-gray-900"
            style={{
              textDecoration: meta.titleStyle === "underline" ? "underline" : "none",
              textDecorationColor: accent,
              textUnderlineOffset: "6px",
              letterSpacing: meta.titleStyle === "caps" ? "0.15em" : undefined,
              color: meta.titleStyle === "bold" ? accent : "#111827",
            }}
          >
            INVOICE
          </p>
          <p className="mt-1 text-xs text-gray-500"># {state.invoiceNumber}</p>
        </div>
      </div>

      {/* Amount due strip */}
      <div
        className="mt-4 flex items-center justify-between rounded-lg px-4 py-2.5"
        style={{ backgroundColor: `${accent}12` }}
      >
        <span className="text-xs font-medium text-gray-600">Amount Due</span>
        <span className="text-base font-bold" style={{ color: accent }}>
          {formatCurrency(totals.balanceDue, state.currency)}
        </span>
      </div>

      {/* Dates */}
      <div className="mt-4 grid grid-cols-2 gap-3 text-xs text-gray-500 sm:grid-cols-3">
        <p>
          <span className="block text-gray-400">Invoice Date</span>
          <span className="font-medium text-gray-900">{state.invoiceDate || "—"}</span>
        </p>
        <p>
          <span className="block text-gray-400">Due Date</span>
          <span className="font-medium text-gray-900">{state.dueDate || "—"}</span>
        </p>
        {state.recurring.enabled && (
          <p>
            <span className="block text-gray-400">Recurring</span>
            <span className="font-medium text-gray-900 capitalize">
              {state.recurring.frequency}
            </span>
          </p>
        )}
      </div>

      {/* Bill To / Ship To style cards */}
      <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div
          className={
            meta.cardStyle === "boxed"
              ? "rounded-lg border border-gray-200 bg-gray-50 p-4"
              : "rounded-lg border border-gray-100 p-4"
          }
          style={meta.cardStyle === "accent-bar" ? { borderLeft: `3px solid ${accent}` } : undefined}
        >
          <p className="text-[11px] font-semibold uppercase tracking-wide text-gray-400">
            Bill To
          </p>
          <p className="mt-1 text-sm font-semibold text-gray-900">
            {state.buyer.name || "Client Name"}
          </p>
          <p className="mt-0.5 text-xs text-gray-500">{state.buyer.address || "Client address"}</p>
          {state.optional.showGstin && state.buyer.gstin && (
            <p className="mt-0.5 text-xs text-gray-500">GSTIN: {state.buyer.gstin}</p>
          )}
          {state.buyer.email && <p className="mt-0.5 text-xs text-gray-500">{state.buyer.email}</p>}
        </div>
      </div>

      {/* Items table */}
      <div className="mt-6 overflow-x-auto">
        <table className="w-full border-collapse text-left text-xs">
          <thead>
            <tr style={{ backgroundColor: accent }}>
              <th className="rounded-l-md px-3 py-2 font-semibold text-white">Item</th>
              <th className="px-3 py-2 text-right font-semibold text-white">Qty</th>
              <th className="px-3 py-2 text-right font-semibold text-white">Rate</th>
              {state.optional.showDiscountColumn && (
                <th className="px-3 py-2 text-right font-semibold text-white">Disc %</th>
              )}
              {state.optional.showTaxColumn && (
                <th className="px-3 py-2 text-right font-semibold text-white">Tax %</th>
              )}
              {state.customColumns.map((col) => (
                <th key={col.id} className="px-3 py-2 text-right font-semibold text-white">
                  {col.label}
                </th>
              ))}
              <th className="rounded-r-md px-3 py-2 text-right font-semibold text-white">Amount</th>
            </tr>
          </thead>
          <tbody>
            {state.items.map((item, idx) => {
              const gross = item.qty * item.rate;
              const discount = (gross * (item.discountPercent || 0)) / 100;
              const lineTotal = gross - discount;
              return (
                <tr key={item.id} className={idx % 2 === 1 ? "bg-gray-50" : undefined}>
                  <td className="px-3 py-2 text-gray-800">{item.description || "—"}</td>
                  <td className="px-3 py-2 text-right text-gray-800">{item.qty}</td>
                  <td className="px-3 py-2 text-right text-gray-800">
                    {formatCurrency(item.rate, state.currency)}
                  </td>
                  {state.optional.showDiscountColumn && (
                    <td className="px-3 py-2 text-right text-gray-800">{item.discountPercent}%</td>
                  )}
                  {state.optional.showTaxColumn && (
                    <td className="px-3 py-2 text-right text-gray-800">{item.taxPercent}%</td>
                  )}
                  {state.customColumns.map((col) => (
                    <td key={col.id} className="px-3 py-2 text-right text-gray-800">
                      {item.extra[col.id] || "—"}
                    </td>
                  ))}
                  <td className="px-3 py-2 text-right font-medium text-gray-900">
                    {formatCurrency(lineTotal, state.currency)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Totals summary */}
      <div className="mt-5 flex justify-end">
        <div className="w-full max-w-xs rounded-lg border border-gray-200 p-4">
          <Row label="Subtotal" value={formatCurrency(totals.subtotal, state.currency)} />
          {totals.totalDiscount > 0 && (
            <Row label="Discount" value={`- ${formatCurrency(totals.totalDiscount, state.currency)}`} />
          )}
          <Row label="Taxable Amount" value={formatCurrency(totals.taxableAmount, state.currency)} />
          {totals.cgst > 0 && <Row label="CGST" value={formatCurrency(totals.cgst, state.currency)} />}
          {totals.sgst > 0 && <Row label="SGST" value={formatCurrency(totals.sgst, state.currency)} />}
          {totals.igst > 0 && <Row label="IGST" value={formatCurrency(totals.igst, state.currency)} />}
          {state.optional.showShipping && totals.shipping > 0 && (
            <Row label="Shipping" value={formatCurrency(totals.shipping, state.currency)} />
          )}
          {totals.otherCharge > 0 && (
            <Row label="Other Charges" value={formatCurrency(totals.otherCharge, state.currency)} />
          )}
          {state.roundOffEnabled && totals.roundOff !== 0 && (
            <Row label="Round Off" value={formatCurrency(totals.roundOff, state.currency)} />
          )}
          <div className="mt-2 flex items-center justify-between border-t border-gray-200 pt-2">
            <span className="text-sm font-semibold text-gray-900">Total Due</span>
            <span className="text-sm font-bold text-white rounded px-2 py-1" style={{ backgroundColor: accent }}>
              {formatCurrency(totals.grandTotal, state.currency)}
            </span>
          </div>
          {state.status === "partial" && (
            <Row
              label="Balance Due"
              value={formatCurrency(totals.balanceDue, state.currency)}
              emphasis
            />
          )}
        </div>
      </div>

      {/* Amount in words */}
      <p className="mt-4 text-xs italic text-gray-500">
        Amount in words: {numberToWordsIndian(totals.grandTotal, state.currency)}
      </p>

      {/* Custom fields */}
      {state.customFields.length > 0 && (
        <div className="mt-5 grid grid-cols-2 gap-2 text-xs">
          {state.customFields.map((field) => (
            <p key={field.id}>
              <span className="text-gray-400">{field.label}: </span>
              <span className="text-gray-800">{field.value}</span>
            </p>
          ))}
        </div>
      )}

      {/* Payment details + QR */}
      {state.optional.showPaymentDetails &&
        (state.payment.bankName || state.payment.upiId) && (
          <div className="mt-6 flex flex-wrap items-start justify-between gap-4 rounded-lg border border-gray-100 p-4">
            <div className="text-xs text-gray-600">
              <p className="text-[11px] font-semibold uppercase tracking-wide text-gray-400">
                Payment Details
              </p>
              {state.payment.bankName && (
                <p className="mt-1 text-gray-700">Bank: {state.payment.bankName}</p>
              )}
              {state.payment.accountNumber && (
                <p className="text-gray-700">A/C No: {state.payment.accountNumber}</p>
              )}
              {state.payment.ifsc && <p className="text-gray-700">IFSC: {state.payment.ifsc}</p>}
              {state.payment.upiId && <p className="text-gray-700">UPI: {state.payment.upiId}</p>}
            </div>
            {qrUrl && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={qrUrl} alt="Scan to pay via UPI" className="h-24 w-24 rounded border border-gray-100" />
            )}
          </div>
        )}

      {/* Notes / Terms */}
      {(state.optional.showNotes && state.notes) || (state.optional.showTerms && state.terms) ? (
        <div className="mt-6 grid grid-cols-1 gap-4 border-t border-gray-100 pt-4 sm:grid-cols-2">
          {state.optional.showNotes && state.notes && (
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-wide text-gray-400">Notes</p>
              <p className="mt-1 text-xs text-gray-600">{state.notes}</p>
            </div>
          )}
          {state.optional.showTerms && state.terms && (
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-wide text-gray-400">
                Terms &amp; Conditions
              </p>
              <p className="mt-1 text-xs text-gray-600">{state.terms}</p>
            </div>
          )}
        </div>
      ) : null}

      {/* Signature */}
      {state.optional.showSignature && state.signatureDataUrl && (
        <div className="mt-8 flex justify-end">
          <div className="text-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={state.signatureDataUrl} alt="Authorized signature" className="h-14 object-contain" />
            <p className="mt-1 border-t border-gray-300 pt-1 text-[11px] text-gray-500">
              Authorized Signatory
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

function Row({ label, value, emphasis }: { label: string; value: string; emphasis?: boolean }) {
  return (
    <div className="flex items-center justify-between py-0.5 text-xs">
      <span className="text-gray-500">{label}</span>
      <span className={emphasis ? "font-semibold text-red-600" : "text-gray-800"}>{value}</span>
    </div>
  );
}
