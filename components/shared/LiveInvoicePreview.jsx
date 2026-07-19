"use client";

import { useMemo, useState } from "react";
import { CalendarDays, Download, Plus, Send, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { CURRENCIES, INVOICE_DEFAULT, TAX_RATES } from "@/lib/constants";
import { useRouter } from "next/navigation";

const currencySymbols = {
  EUR: "\u20AC",
  GBP: "\u00A3",
  INR: "\u20B9",
  USD: "$",
};

function formatMoney(currency, value) {
  return new Intl.NumberFormat("en-IN", {
    currency,
    maximumFractionDigits: 0,
    style: "currency",
  }).format(value);
}

export default function LiveInvoicePreview() {
  const [invoice, setInvoice] = useState(INVOICE_DEFAULT);

  const subtotal = useMemo(
    () =>
      invoice.items.reduce(
        (sum, item) => sum + Number(item.qty || 0) * Number(item.rate || 0),
        0,
      ),
    [invoice.items],
  );
  const taxAmount = useMemo(
    () => subtotal * (invoice.taxRate / 100),
    [invoice.taxRate, subtotal],
  );
  const total = subtotal + taxAmount;

  const updateField = (field, value) => {
    setInvoice((current) => ({ ...current, [field]: value }));
  };

  const updateItem = (id, field, value) => {
    setInvoice((current) => ({
      ...current,
      items: current.items.map((item) =>
        item.id === id
          ? { ...item, [field]: field === "name" ? value : Number(value) }
          : item,
      ),
    }));
  };

  const addItem = () => {
    setInvoice((current) => ({
      ...current,
      items: [...current.items, { id: Date.now(), name: "", qty: 1, rate: 0 }],
    }));
  };

  const removeItem = (id) => {
    setInvoice((current) => ({
      ...current,
      items:
        current.items.length > 1
          ? current.items.filter((item) => item.id !== id)
          : current.items,
    }));
  };

  const router = useRouter();

  return (
    <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
      <div className="glass-card p-6 sm:p-8">
        <div className="mb-6 flex items-center justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-[0.25em] text-primary-light">
              Live Invoice Builder
            </p>
            <h3 className="mt-2 text-2xl font-semibold text-white light:text-slate-950">
              Build and preview in real time
            </h3>
          </div>
          <div className="rounded-2xl border border-primary/20 bg-primary/10 px-4 py-2 text-xs text-primary-light light:text-primary">
            Auto GST ready
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <label className="text-sm text-slate-300 light:text-slate-600">
              Business name
            </label>
            <Input
              value={invoice.businessName}
              onChange={(event) =>
                updateField("businessName", event.target.value)
              }
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm text-slate-300 light:text-slate-600">
              Client name
            </label>
            <Input
              value={invoice.clientName}
              onChange={(event) =>
                updateField("clientName", event.target.value)
              }
            />
          </div>
        </div>
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          <div className="space-y-2">
            <label className="text-sm text-slate-300 dark:text-slate-600">
              Tax rate
            </label>

            <Select
              className="text-white"
              options={TAX_RATES.map((rate) => ({
                label: `${rate}% GST`,
                value: rate,
              }))}
              value={invoice.taxRate}
              onChange={(event) =>
                updateField("taxRate", Number(event.target.value))
              }
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm text-slate-300 light:text-slate-600">
              Currency
            </label>
            <Select
              options={CURRENCIES}
              value={invoice.currency}
              onChange={(event) => updateField("currency", event.target.value)}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm text-slate-300 light:text-slate-600">
              Due date
            </label>
            <div className="relative">
              <Input
                type="date"
                value={invoice.dueDate}
                onChange={(event) => updateField("dueDate", event.target.value)}
              />
              <CalendarDays className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
            </div>
          </div>
        </div>
        <div className="mt-8 space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-lg font-semibold text-white light:text-slate-950">
              Line items
            </h4>
            <Button size="sm" onClick={addItem}>
              <Plus className="h-4 w-4" />
              Add item
            </Button>
          </div>
          <div className="space-y-4">
            {invoice.items.map((item) => (
              <div
                key={item.id}
                className="grid gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-4 light:border-slate-200 light:bg-slate-50 sm:grid-cols-[1.8fr_0.6fr_0.7fr_auto]"
              >
                <Input
                  placeholder="Service or product"
                  value={item.name}
                  onChange={(event) =>
                    updateItem(item.id, "name", event.target.value)
                  }
                />
                <Input
                  min="1"
                  type="number"
                  value={item.qty}
                  onChange={(event) =>
                    updateItem(item.id, "qty", event.target.value)
                  }
                />
                <Input
                  min="0"
                  type="number"
                  value={item.rate}
                  onChange={(event) =>
                    updateItem(item.id, "rate", event.target.value)
                  }
                />
                <button
                  className="inline-flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-400 transition-colors hover:border-rose-500/40 hover:text-rose-300 light:border-slate-200 light:bg-white"
                  onClick={() => removeItem(item.id)}
                  type="button"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="glass-card p-4 sm:p-6">
        <div className="rounded-[28px] border border-white/10 bg-slate-950/85 p-5 shadow-2xl light:border-slate-200 light:bg-white">
          <div className="flex items-start justify-between gap-4 border-b border-white/10 pb-5 light:border-slate-200">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-primary-light">
                Invoicezy
              </p>
              <h3 className="mt-2 text-2xl font-semibold text-white light:text-slate-950">
                Invoice #INV-2026
              </h3>
              <p className="mt-1 text-sm text-slate-400">
                Issued for {invoice.clientName || "your client"}
              </p>
            </div>
            <div className="rounded-2xl border border-success/30 bg-success/10 px-4 py-2 text-right text-sm text-success-light">
              <p>Due on</p>
              <p className="font-semibold text-white light:text-slate-950">
                {invoice.dueDate}
              </p>
            </div>
          </div>
          <div className="grid gap-4 py-5 sm:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 light:border-slate-200 light:bg-slate-50">
              <p className="text-xs uppercase tracking-[0.25em] text-slate-500">
                From
              </p>
              <p className="mt-3 text-lg font-semibold text-white light:text-slate-950">
                {invoice.businessName || "Your business"}
              </p>
              <p className="mt-1 text-sm text-slate-400">
                GST-ready billing workspace
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 light:border-slate-200 light:bg-slate-50">
              <p className="text-xs uppercase tracking-[0.25em] text-slate-500">
                Bill To
              </p>
              <p className="mt-3 text-lg font-semibold text-white light:text-slate-950">
                {invoice.clientName || "Client name"}
              </p>
              <p className="mt-1 text-sm text-slate-400">
                Preferred currency: {currencySymbols[invoice.currency]}
              </p>
            </div>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] light:border-slate-200 light:bg-slate-50">
            <div className="grid grid-cols-[1.6fr_0.5fr_0.7fr_0.8fr] gap-4 border-b border-white/10 px-4 py-3 text-xs uppercase tracking-[0.2em] text-slate-500 light:border-slate-200">
              <span>Item</span>
              <span>Qty</span>
              <span>Rate</span>
              <span className="text-right">Amount</span>
            </div>
            {invoice.items.map((item) => (
              <div
                key={`preview-${item.id}`}
                className="grid grid-cols-[1.6fr_0.5fr_0.7fr_0.8fr] gap-4 border-b border-white/10 px-4 py-4 text-sm last:border-b-0 light:border-slate-200"
              >
                <span className="text-slate-200 light:text-slate-700">
                  {item.name || "Untitled item"}
                </span>
                <span className="text-slate-400">{item.qty}</span>
                <span className="text-slate-400">
                  {formatMoney(invoice.currency, item.rate || 0)}
                </span>
                <span className="text-right font-medium text-white light:text-slate-950">
                  {formatMoney(
                    invoice.currency,
                    Number(item.qty || 0) * Number(item.rate || 0),
                  )}
                </span>
              </div>
            ))}
          </div>
          <div className="mt-5 space-y-3 rounded-2xl border border-white/10 bg-gradient-to-br from-primary/15 to-accent/10 p-4 light:border-slate-200">
            <div className="flex items-center justify-between text-sm text-slate-400">
              <span>Subtotal</span>
              <span>{formatMoney(invoice.currency, subtotal)}</span>
            </div>
            <div className="flex items-center justify-between text-sm text-slate-400">
              <span>GST ({invoice.taxRate}%)</span>
              <span>{formatMoney(invoice.currency, taxAmount)}</span>
            </div>
            <div className="flex items-center justify-between border-t border-white/10 pt-3 text-lg font-semibold text-white light:border-slate-200 light:text-slate-950">
              <span>Total</span>
              <span>{formatMoney(invoice.currency, total)}</span>
            </div>
          </div>
          <div className="mt-5 flex flex-col gap-3 sm:flex-row">
            <Button
              fullWidth
              variant="secondary"
              onClick={() => router.push("/register")}
            >
              <Download className="h-4 w-4" />
              Download PDF
            </Button>
            <Button fullWidth onClick={() => router.push("/register")}>
              <Send className="h-4 w-4" />
              Share
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
