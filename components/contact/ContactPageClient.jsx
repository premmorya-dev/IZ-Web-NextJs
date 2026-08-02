"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  User,
  MessageSquare,
  BadgeCheck,
  ShieldCheck,
  Rocket,
  Headphones,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const benefits = [
  "Real replies from our support team",
  "Usually respond within 24 hours",
  "Your message stays private",
  "No bots — a person reads every email",
];

const benefitIcons = [Headphones, Rocket, ShieldCheck, BadgeCheck];

export default function ContactPageClient() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  const updateField = (id) => (e) => {
    setForm((c) => ({ ...c, [id]: e.target.value }));
    if (errors[id]) setErrors((c) => ({ ...c, [id]: undefined }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const nextErrors = {};

    if (!form.name.trim()) nextErrors.name = "Enter your name.";
    if (!/^\S+@\S+\.\S+$/.test(form.email))
      nextErrors.email = "Enter a valid email address.";
    if (!form.subject.trim()) nextErrors.subject = "Enter a subject.";
    if (!form.message.trim() || form.message.trim().length < 10)
      nextErrors.message = "Message should be at least 10 characters.";

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    try {
      setLoading(true);
      setSuccess("");

      const res = await fetch("https://pro.invoicezy.com/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!data.status) {
        const apiErrors = {};
        if (data.errors) {
          Object.keys(data.errors).forEach((key) => {
            apiErrors[key] = data.errors[key][0];
          });
        }
        setErrors(apiErrors);
        return;
      }

      setSuccess("Message sent. We'll get back to you within 24 hours.");
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      console.error(err);
      setErrors({
        general: "Something went wrong on our end. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="section-shell pb-24 pt-32 sm:pb-28">
      <div className="overflow-hidden rounded-[32px] border border-white/10 bg-slate-950/40 shadow-soft light:border-slate-200 light:bg-white lg:grid lg:grid-cols-2">
        {/* LEFT SIDE */}
        <motion.div
          className="relative overflow-hidden bg-primary-gradient p-8 sm:p-10"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.45 }}
        >
          <div className="mesh-overlay absolute inset-0 opacity-20" />
          <div className="hero-orb left-0 top-10 h-44 w-44 bg-white/20" />
          <div className="relative z-10 space-y-8 text-white">
            <div>
              <p className="text-sm uppercase tracking-[0.25em] text-indigo-100">
                Contact Invoicezy
              </p>
              <h2 className="mt-3 text-4xl font-semibold">
                We&apos;re here to help you grow
              </h2>
              <p className="mt-4 text-sm leading-6 text-indigo-100">
                Questions about GST invoicing, billing, or your account?
                Send us a message and we&apos;ll get back to you personally.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {benefits.map((benefit, index) => {
                const Icon = benefitIcons[index];
                return (
                  <div
                    key={benefit}
                    className="rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur-xl"
                  >
                    <Icon className="h-5 w-5 text-white" />
                    <p className="mt-3 text-sm font-medium leading-6">
                      {benefit}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>

        {/* RIGHT SIDE FORM */}
        <motion.div
          className="border-t border-white/10 bg-slate-950/70 p-8 light:border-slate-200 light:bg-white sm:p-10 lg:border-l lg:border-t-0"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.45 }}
        >
          <div className="mb-8">
            <p className="text-sm uppercase tracking-[0.25em] text-primary-light">
              Get in touch
            </p>
            <h1 className="mt-3 text-3xl font-semibold text-white light:text-slate-950">
              Send us a message
            </h1>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit} noValidate>
            {/* Name */}
            <div className="space-y-2">
              <label
                htmlFor="name"
                className="text-sm text-slate-300 light:text-slate-700"
              >
                Name
              </label>
              <div className="relative">
                <Input
                  id="name"
                  className="pl-11"
                  autoComplete="name"
                  value={form.name}
                  onChange={updateField("name")}
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby={errors.name ? "name-error" : undefined}
                />
                <User className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
              </div>
              {errors.name && (
                <p id="name-error" className="text-sm text-rose-300">
                  {errors.name}
                </p>
              )}
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="text-sm text-slate-300 light:text-slate-700"
              >
                Email
              </label>
              <div className="relative">
                <Input
                  id="email"
                  className="pl-11"
                  type="email"
                  autoComplete="email"
                  value={form.email}
                  onChange={updateField("email")}
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? "email-error" : undefined}
                />
                <Mail className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
              </div>
              {errors.email && (
                <p id="email-error" className="text-sm text-rose-300">
                  {errors.email}
                </p>
              )}
            </div>

            {/* Subject */}
            <div className="space-y-2">
              <label
                htmlFor="subject"
                className="text-sm text-slate-300 light:text-slate-700"
              >
                Subject
              </label>
              <div className="relative">
                <Input
                  id="subject"
                  className="pl-11"
                  value={form.subject}
                  onChange={updateField("subject")}
                  aria-invalid={Boolean(errors.subject)}
                  aria-describedby={errors.subject ? "subject-error" : undefined}
                />
                <MessageSquare className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
              </div>
              {errors.subject && (
                <p id="subject-error" className="text-sm text-rose-300">
                  {errors.subject}
                </p>
              )}
            </div>

            {/* Message */}
            <div className="space-y-2">
              <label
                htmlFor="message"
                className="text-sm text-slate-300 light:text-slate-700"
              >
                Message
              </label>
              <textarea
                id="message"
                className="w-full rounded-xl border border-white/10 bg-white/5 p-4 text-sm text-white outline-none light:border-slate-200 light:bg-slate-50 light:text-slate-900"
                rows={4}
                value={form.message}
                onChange={updateField("message")}
                aria-invalid={Boolean(errors.message)}
                aria-describedby={errors.message ? "message-error" : undefined}
              />
              {errors.message && (
                <p id="message-error" className="text-sm text-rose-300">
                  {errors.message}
                </p>
              )}
            </div>

            {errors.general && (
              <p className="text-sm text-rose-300">{errors.general}</p>
            )}

            {success && <p className="text-sm text-green-400">{success}</p>}

            <Button fullWidth size="lg" type="submit" disabled={loading}>
              {loading ? "Sending..." : "Send message"}
            </Button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}