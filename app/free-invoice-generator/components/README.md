# /free-invoice-generator — single-folder version

Everything for this page lives in **one flat folder**:
`app/free-invoice-generator/`. No nested `components/`, `data/`, or `lib/`
subfolders — every file sits at the same level. Copy this one folder into
your Next.js app; delete this one folder later if you ever retire the page.
Nothing outside it is touched.

Next.js only treats `page.tsx` (and `layout`/`loading`/`error`/etc.) as
special filenames — every other `.tsx`/`.ts` file here is a normal module
Next.js ignores for routing, so flattening is safe.

## Files

```
app/free-invoice-generator/
  page.tsx                   — metadata, JSON-LD injection, page assembly
  InvoiceGeneratorHero.tsx   — H1, single CTA, rating + trust line
  InvoiceToolSection.tsx     — above-the-fold invoice builder (tabs, toolbar)
  InvoicePreview.tsx         — the live invoice preview / 3 templates
  invoiceTypes.ts            — shared TypeScript types for the builder
  invoiceUtils.ts            — totals, number-to-words, draft/share/QR helpers
  TestimonialsSection.tsx    — social proof, placed right after the tool
  HowItWorksSection.tsx      — 3-step process
  FeaturesGrid.tsx           — 24 feature cards
  IndustriesSection.tsx      — 16 industry segments, unique copy each
  ComparisonSection.tsx      — vs Excel / Word / Manual / Traditional software
  TrustSection.tsx           — fast/secure/cloud/no-install/free badges
  FAQSection.tsx             — 20-question accordion (client component)
  StickyCTA.tsx              — mobile sticky bottom CTA bar
  ExitIntentModal.tsx        — one-time desktop exit-intent nudge
  faqData.ts                 — FAQ copy — feeds both the UI and the schema
  industriesData.ts          — industries copy
  schema.ts                  — all 5 JSON-LD builders
```

## The invoice tool (`InvoiceToolSection.tsx` + `InvoicePreview.tsx`)

Rebuilt as a full builder, not a basic form. Five tabs: **Business**, **Items
& Tax**, **Design**, **Payment**, **Notes & Advanced**.

| # | Feature | Where |
|---|---|---|
| 1–4 | Seller + buyer info | Business tab |
| 5–9 | Unlimited items, description, qty, rate, per-item discount % and tax % | Items & Tax tab |
| 10 | GST config (intra-state CGST+SGST / inter-state IGST / none) | Items & Tax tab |
| 11 | Shipping / other charges | Items & Tax tab |
| 12–13 | Notes, terms | Notes & Advanced tab |
| 14–15 | Logo + signature upload (stored as data URLs) | Business / Advanced tabs |
| 16–17 | Currency, language | Business tab |
| 18–20 | Invoice number, invoice date, due date | Business tab |
| 21–22 | Bank details + UPI ID | Payment tab |
| 23 | QR payment section (via a public QR image API — see note below) | Payment tab → preview |
| 24 | Live preview | Right panel, updates on every keystroke |
| 25 | Template switching | Design tab — **Premium** (indigo `#4338CA`) and **Modern** (blue `#2563EB`) match your existing DomPDF templates by name and color; **Minimal** is a third cyan option |
| 26–27 | Accent color + font customization | Design tab |
| 28 | Optional field toggles (logo, signature, GSTIN, discount/tax columns, shipping, notes, terms, payment details, QR) | Design tab |
| 29 | Custom fields (label/value pairs) | Notes & Advanced tab |
| 30 | Custom item columns | Items & Tax tab |
| 31 | Download PDF | Toolbar — opens the browser print dialog (any browser can "Save as PDF" from there); see note below |
| 32 | Print | Same button — a `@media print` rule shows only the preview card |
| 33 | Share | Toolbar — uses the native share sheet on mobile, or copies a link that re-opens with the invoice restored (state is base64-encoded into `?draft=...`, no backend needed) |
| 34 | Save as JSON | Toolbar — downloads the current draft as a `.json` file |
| 35 | Restore JSON | Toolbar — reloads a previously saved `.json` draft |
| 36 | Local draft persistence | Auto-saves to `localStorage` on every change; restored on next visit |
| 37 | Responsive | Two-column on desktop, stacked on mobile |
| 38–47 | Subtotal, discount, taxable amount, CGST, SGST, IGST, total tax, shipping, round-off, grand total | Totals panel in the preview, all computed in `invoiceUtils.ts` |
| 48 | Amount in words | Preview, Indian numbering (lakh/crore) via `numberToWordsIndian()` |
| 49 | Paid / partial / unpaid status | Business tab — partial adds an "amount paid" field and shows balance due |
| 50 | Recurring invoice config | Payment tab — captures frequency + next run date; actual scheduled sending needs a backend job once wired to your Laravel cron |

### Why the text was invisible before

The old version relied on a container's `text-[#0A0E1A]` cascading down to
child elements. That's normally fine, but if any global stylesheet in your
app sets `color` on specific tags (`input`, `button`, `td`, etc.) — common in
dark-theme design systems — it can win the cascade and override it per
element. The rebuild sets an explicit Tailwind text-color class on every
individual text node in both the dark form panel (`text-white`,
`text-white/60`, etc.) and the light preview panel (`text-gray-900`,
`text-gray-500`, etc.) instead of relying on inheritance from a parent. This
was verified with a real `next build` + `next start` and inspecting the
rendered HTML — every text node carries its own color class.

### QR code note

Feature 23 calls a free public QR-image API
(`api.qrserver.com`) rather than adding an `npm install qrcode.react` — keeps
this tool dependency-free for a page anonymous ad traffic hits before
registering. Swap `buildQrImageUrl()` in `invoiceUtils.ts` for a local QR
library any time.

### PDF note

"Download PDF" opens the browser's print dialog rather than generating a PDF
client-side with a new library (`jspdf`/`html2canvas`) — same reasoning as
above. It works in every browser via "Save as PDF" and needed zero new
dependencies. Once someone registers, route them to your real Laravel/DomPDF
pipeline (Premium/Modern templates) for the stored, authenticated version —
this tool's only job is to get them to that point.



## This is a paid-traffic (Google Ads) landing page — what changed for that

A page you're sending ad spend to needs one job: get the click to register.
A few deliberate choices reflect that:

- **One CTA, repeated, never competing with a second option.** The Hero
  dropped the earlier "Create Free Account" secondary button — on a PPC
  page, two competing CTAs measurably lower conversion vs. one CTA repeated
  at every scroll depth (Hero → tool → sticky bar → exit-intent).
- **Testimonials sit right after the tool**, not buried at the bottom —
  that's the moment someone has just seen the product work and is deciding
  whether to trust it enough to sign up.
- **Exit-intent modal** catches desktop visitors about to leave with a
  low-friction save-your-work nudge (skipped on mobile — no reliable
  mouse-leave signal there, so the sticky bar covers that instead).
- **Headline is a concrete promise** ("Send your first GST invoice in the
  next 60 seconds") instead of a generic tagline — ad visitors decide to
  stay or bounce in seconds, so the H1 has to match ad intent immediately.

### One thing to decide before you launch ads

If your shared site header/footer (with links to pricing, blog, other
pages) renders on every route including this one, **consider suppressing it
for this specific page** or swapping it for a minimal logo-only bar. Every
link away from a paid landing page is a leak in the funnel — this is worth
more to conversion than any copy tweak. Wire it via a route-group layout
(`app/(landing)/free-invoice-generator/`) or a conditional in your existing
layout if you want this without touching the main site's layout elsewhere.

## Before deploying

1. **Fonts** — `font-[Space_Grotesk]` / `font-[IBM_Plex_Mono]` assume these
   are already loaded globally via `next/font` in your root layout, matching
   your other marketing pages. This folder doesn't load its own fonts.
2. **Domain** — update `SITE_URL` in `schema.ts` to your real production
   domain (currently `https://invoicezy.com`).
3. **`/register`** — used as the single conversion link everywhere. Point it
   at your real signup route if different.
4. **Invoice tool** — `InvoiceToolSection.tsx` / `InvoicePreview.tsx` /
   `invoiceTypes.ts` / `invoiceUtils.ts` together are a self-contained,
   client-side builder (see the full feature table above) so visitors can
   try it immediately with zero login. It hands off to `/register` via the
   footer note under the tool. If you already have a full invoice-builder
   flow in the admin panel, you can point ambitious visitors there instead —
   see the comment at the top of `InvoiceToolSection.tsx`.
5. **OG image** — add a real 1200×630 image at
   `https://invoicezy.com/og/free-invoice-generator.png`, or update the URL
   in `page.tsx`.
6. **Testimonials** — the three quotes in `TestimonialsSection.tsx` are
   placeholders written in a realistic Indian-SMB voice. Swap in real
   customer quotes as soon as you have them — real names/photos convert
   meaningfully better than placeholder ones on ad traffic.

## SEO notes (unchanged from spec)

- Single `<h1>` (Hero). Everything else is `<h2>`/`<h3>` in order.
- All 5 requested schemas (SoftwareApplication, FAQPage, BreadcrumbList,
  Organization, WebSite) inject server-side in `page.tsx`. Validate with
  Google's Rich Results Test after deploying.
- `FAQSection` and `FAQPage` schema both read from `faqData.ts`, so they
  can't drift out of sync.
- Only `InvoiceToolSection`, `FAQSection`, `StickyCTA`, and
  `ExitIntentModal` are client components — everything else is server-side
  for speed, which matters directly for Quality Score on Google Ads.
