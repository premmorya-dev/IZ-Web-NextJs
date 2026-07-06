"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Mail,
  User,
  MessageSquare,
  Send,
  BadgeCheck,
  ShieldCheck,
  Rocket,
  Headphones
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const benefits = [
  "Quick response within 24 hours",
  "Dedicated support team",
  "Secure & private communication",
  "Trusted by 50,000+ users"
];

const benefitIcons = [BadgeCheck, Rocket, ShieldCheck, Headphones];


export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    let nextErrors = {};

    if (!form.name.trim()) nextErrors.name = "Enter your name";
    if (!form.email.includes("@")) nextErrors.email = "Enter valid email";
    if (!form.subject.trim()) nextErrors.subject = "Enter subject";
    if (!form.message.trim()) nextErrors.message = "Enter message";

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    try {
      setLoading(true);
 
      const res = await fetch("https://pro.invoicezy.com/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      });

      const data = await res.json();

      if (!data.status) {
        setErrors(data.errors || {});
        return;
      }

      // ✅ success
      setSuccess("Message sent successfully 🎉");
      setForm({
        name: "",
        email: "",
        subject: "",
        message: ""
      });

    } catch (err) {
      console.error(err);
      setErrors({
        general: "Something went wrong. Try again."
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
        >
          <div className="relative z-10 space-y-8 text-white">
            <div>
              <p className="text-sm uppercase tracking-[0.25em] text-indigo-100">
                Contact Invoicezy
              </p>
              <h2 className="mt-3 text-4xl font-semibold">
                We’re here to help you grow 🚀
              </h2>
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
                    <p className="mt-3 text-sm font-medium">
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
        >
          <div className="mb-8">
            <p className="text-sm uppercase tracking-[0.25em] text-primary-light">
              Get in touch
            </p>
            <h1 className="mt-3 text-3xl font-semibold text-white light:text-slate-950">
              Send us a message
            </h1>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit}>
            
            {/* Name */}
            <div className="space-y-2">
              <label className="text-sm text-slate-300">Name</label>
              <div className="relative">
                <Input
                  className="pl-11"
                  value={form.name}
                  onChange={(e) =>
                    setForm((c) => ({ ...c, name: e.target.value }))
                  }
                />
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
              </div>
              {errors.name && <p className="text-rose-300 text-sm">{errors.name}</p>}
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label className="text-sm text-slate-300">Email</label>
              <div className="relative">
                <Input
                  className="pl-11"
                  type="email"
                  value={form.email}
                  onChange={(e) =>
                    setForm((c) => ({ ...c, email: e.target.value }))
                  }
                />
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
              </div>
              {errors.email && <p className="text-rose-300 text-sm">{errors.email}</p>}
            </div>

            {/* Subject */}
            <div className="space-y-2">
              <label className="text-sm text-slate-300">Subject</label>
              <div className="relative">
                <Input
                  className="pl-11"
                  value={form.subject}
                  onChange={(e) =>
                    setForm((c) => ({ ...c, subject: e.target.value }))
                  }
                />
                <MessageSquare className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
              </div>
              {errors.subject && <p className="text-rose-300 text-sm">{errors.subject}</p>}
            </div>

            {/* Message */}
            <div className="space-y-2">
              <label className="text-sm text-slate-300">Message</label>
              <textarea
                className="w-full rounded-xl border border-white/10 bg-white/5 p-4 text-sm text-white outline-none"
                rows={4}
                value={form.message}
                onChange={(e) =>
                  setForm((c) => ({ ...c, message: e.target.value }))
                }
              />
              {errors.message && <p className="text-rose-300 text-sm">{errors.message}</p>}
            </div>

            {errors.general && (
              <p className="text-rose-300 text-sm">{errors.general}</p>
            )}

            {success && (
              <p className="text-green-400 text-sm">{success}</p>
            )}

            <Button fullWidth size="lg" type="submit" disabled={loading}>
              {loading ? "Sending..." : "Send Message"}
            </Button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}