import Image from "next/image";
import { ShieldCheck } from "lucide-react";
import SectionHeader from "@/components/shared/SectionHeader";
import { ABOUT_METRICS, PRESS_LOGOS, TEAM_MEMBERS, TRUST_INDICATORS, VALUE_PROPS } from "@/lib/constants";

export const metadata = {
  title: "About Invoicezy - Online Invoice & Billing Software",
  description:
    "Learn about Invoicezy, India's modern GST invoice software built for freelancers, startups and businesses to create invoices, track payments and grow faster.",
  alternates: {
    canonical: "/about"
  },
    keywords: "invoice, invoice generator, online invoice, free invoice maker, professional invoice, invoice template, invoicezy, create invoice, billing software"
};

export default function AboutPage() {
  return (
    <div className="pb-24 pt-32 sm:pb-28">
      <section className="section-shell">
        <SectionHeader
          align="left"
          as="h1"
          badge="About Invoicezy"
          description="Invoicezy is a cloud-based invoice software designed to help freelancers, startups, agencies and growing businesses create professional GST invoices, accept UPI payments, track expenses and manage clients from one simple dashboard.

Whether you send 5 invoices every month or thousands, Invoicezy helps you automate billing so you can focus on growing your business."
          title="Smart Invoicing Built for Modern Businesse"
        />
        <div className="glass-card p-8 sm:p-10">
          <p className="max-w-4xl text-lg leading-8 text-slate-300 light:text-slate-600">
            Invoicezy began with a clear frustration: founders were still toggling between spreadsheets, generic invoice tools, and manual reminders to get paid. We set out to build a finance operating system that feels as polished as the best SaaS products in the world, yet grounded in the day-to-day reality of Indian businesses. Every workflow is designed to reduce friction, improve collections, and help teams look more professional with every invoice they send.
          </p>
        </div>
      </section>

      <section className="section-shell mt-20 grid gap-6 lg:grid-cols-2">
        {ABOUT_METRICS.map((item) => (
          <div key={item.title} className="glass-card p-8">
            <p className="text-sm uppercase tracking-[0.22em] text-primary-light">{item.title}</p>
            <p className="mt-4 text-2xl font-semibold text-white light:text-slate-950">{item.description}</p>
          </div>
        ))}
      </section>

      <section className="section-shell mt-20">
        <SectionHeader
          badge="Our Values"
          description="How we design, build, and support the people who trust us with their business operations."
          title="The principles behind every product decision"
        />
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {VALUE_PROPS.map((value) => (
            <div key={value.title} className="glass-card p-6">
              <h3 className="text-xl font-semibold text-white light:text-slate-950">{value.title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-400 light:text-slate-600">{value.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section-shell mt-20">
        <SectionHeader
          badge="Team"
          description="A focused team of product, design, and engineering leaders building better finance workflows."
          title="People shaping the next generation of business software"
        />
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {TEAM_MEMBERS.map((member) => (
            <div key={member.name} className="glass-card overflow-hidden">
              <Image alt={member.name} className="h-56 w-full object-cover" height={280} src={member.image} width={320} />
              <div className="p-5">
                <p className="text-lg font-semibold text-white light:text-slate-950">{member.name}</p>
                <p className="mt-1 text-sm text-slate-400 light:text-slate-600">{member.role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="section-shell mt-20">
        <SectionHeader
          badge="Trust"
          description="Confidence markers and ecosystem signals that matter when businesses choose financial software."
          title="Built on trust, compliance, and reliability"
        />
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {TRUST_INDICATORS.map((item) => (
            <div key={item} className="glass-card flex items-center gap-4 p-5">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary-light">
                <ShieldCheck className="h-5 w-5" />
              </span>
              <span className="text-base font-medium text-white light:text-slate-950">{item}</span>
            </div>
          ))}
        </div>
       
      </section>
    </div>
  );
}
