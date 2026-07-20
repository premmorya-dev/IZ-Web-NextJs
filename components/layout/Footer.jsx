"use client";

import { useState } from "react";
import Link from "next/link";
import { Instagram, Facebook, Mail, MoveRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { FOOTER_LINKS } from "@/lib/constants";
import Image from "next/image";

function resolveHref(label) {
  const routes = {
    About: "/about",
    Features: "/features",
    Pricing: "/pricing",
    Templates: "/templates",
    Contact: "/contact",
    Privacy: "/privacy",
    Terms: "/terms",
    Refund: "/refund",
    Cookie: "/cookie",
  };

  return routes[label] || "/";
}

export default function Footer() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const subscribe = (event) => {
    event.preventDefault();
    if (!email.trim()) {
      return;
    }

    setSubmitted(true);
    setEmail("");
  };

  return (
    <footer className="relative border-t border-white/10 pb-10 pt-20 light:border-slate-200">
      <div className="section-shell">
        <div className="glass-card grid gap-10 p-8 lg:grid-cols-[1.2fr_1fr]">
          <div className="space-y-4">
            <p className="text-sm uppercase tracking-[0.25em] text-primary-light">
              Invoicezy Newsletter
            </p>

            <h2 className="max-w-xl text-3xl font-semibold text-white light:text-slate-950">
              Learn GST Billing, Invoicing & Business Management
            </h2>

            <p className="max-w-lg text-slate-400 light:text-slate-600">
              Receive the latest GST updates, invoicing best practices, payment
              reminders, inventory tips and business insights to help your
              business grow.
            </p>
            <form
              className="flex flex-col gap-3 sm:flex-row"
              onSubmit={subscribe}
            >
              <Input
                placeholder="Enter your work email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
              <Button type="submit">
                Subscribe
                <MoveRight className="h-4 w-4" />
              </Button>
            </form>
            {submitted ? (
              <p className="text-sm text-success-light">
                Thanks. We will send the next edition soon.
              </p>
            ) : null}
          </div>
          <div className="grid gap-8 sm:grid-cols-3">
            {Object.entries(FOOTER_LINKS).map(([title, items]) => (
              <div key={title}>
                <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
                  {title}
                </h3>
                <div className="mt-4 space-y-3">
                  {items.map((item) => (
                    <Link
                      key={item}
                      className="block text-sm text-slate-400 transition-colors hover:text-white light:hover:text-slate-950"
                      href={resolveHref(item)}
                    >
                      {item}
                    </Link>
                  ))}
                </div>
              </div>
            ))}

            <div key="resources">
              <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
                Resources
              </h3>
              <div className="mt-4 space-y-3">
                <Link
                  key="help-center"
                  className="block text-sm text-slate-400 transition-colors hover:text-white light:hover:text-slate-950"
                  href="/"
                >
                  Help Center
                </Link>
              </div>

              <div className="mt-4 space-y-3">
                <Link
                  key="free-invoice-software"
                  className="block text-sm text-slate-400 transition-colors hover:text-white light:hover:text-slate-950"
                  href="/free-invoice-software"
                >
                  Free Invoice Software
                </Link>
              </div>

              <div className="mt-4 space-y-3">
                <Link
                  key="website-development"
                  className="block text-sm text-slate-400 transition-colors hover:text-white light:hover:text-slate-950"
                  href="/website-development"
                >
                  Website Development
                </Link>
              </div>
            </div>
          </div>
        </div>
        <Separator className="my-8" />
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <Image
              src="/invoicezy.jpeg"
              alt="Invoicezy Logo"
              width={80}
              height={80}
              className="rounded-lg object-contain"
            />
            <div>
              <p className="text-lg font-semibold text-white light:text-slate-950">
                Invoicezy
              </p>
              <p className="text-sm leading-6 text-slate-500">
                India's smart GST Billing Software with online invoicing,
                inventory management, expense tracking, UPI QR payments and
                cloud-based business management.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Link
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-300 light:border-slate-200 light:bg-white light:text-slate-700"
              href="mailto:hello@invoicezy.com"
            >
              <Mail className="h-4 w-4" />
            </Link>
            <Link
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-300 light:border-slate-200 light:bg-white light:text-slate-700"
              href="https://www.instagram.com/official_invoicezy?igsh=NWE4ejNlaXR0emJu"
              rel="noreferrer"
              target="_blank"
            >
              <Instagram className="h-4 w-4" />
            </Link>

            <Link
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-300 light:border-slate-200 light:bg-white light:text-slate-700"
              href="https://www.facebook.com/profile.php?id=61576216396524"
              rel="noreferrer"
              target="_blank"
            >
              <Facebook className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
