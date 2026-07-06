"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  BadgeCheck,
  CheckCircle2,
  Chrome,
  Eye,
  EyeOff,
  Lock,
  Mail,
  Quote,
  Zap
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { LOGIN_BENEFITS, SOCIAL_PROOF_AVATARS, TESTIMONIALS } from "@/lib/constants";

export default function LoginPageClient() {
  const [form, setForm] = useState({ email: "", password: "", remember: false });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const testimonial = useMemo(() => TESTIMONIALS[0], []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const nextErrors = {};

    if (!form.email.includes("@")) {
      nextErrors.email = "Enter a valid email address.";
    }

    if (form.password.length < 6) {
      nextErrors.password = "Password must be at least 6 characters.";
    }

    setErrors(nextErrors);
  };

  return (
    <div className="section-shell pb-24 pt-32 sm:pb-28">
      <div className="overflow-hidden rounded-[32px] border border-white/10 bg-slate-950/40 shadow-soft light:border-slate-200 light:bg-white lg:grid lg:grid-cols-2">
        <motion.div
          className="border-b border-white/10 bg-slate-950/70 p-8 light:border-slate-200 light:bg-white sm:p-10 lg:border-b-0 lg:border-r"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.45 }}
        >
          <div className="mb-8 flex items-center gap-3">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-gradient text-white shadow-lg shadow-primary/30">
              <Zap className="h-5 w-5" />
            </span>
            <div>
              <h1 className="text-lg font-semibold text-white light:text-slate-950">Welcome back</h1>
              <p className="text-sm text-slate-400">Sign in to continue managing your billing.</p>
            </div>
          </div>
          <form className="space-y-5" onSubmit={handleSubmit}>
            {[
              {
                id: "email",
                icon: Mail,
                label: "Email",
                type: "email",
                value: form.email,
                error: errors.email
              },
              {
                id: "password",
                icon: Lock,
                label: "Password",
                type: showPassword ? "text" : "password",
                value: form.password,
                error: errors.password
              }
            ].map((field, index) => {
              const Icon = field.icon;
              return (
                <motion.div
                  key={field.id}
                  className="space-y-2"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: index * 0.08 }}
                >
                  <label className="text-sm text-slate-300 light:text-slate-700">{field.label}</label>
                  <div className="relative">
                    <Input
                      className="pl-11 pr-12"
                      type={field.type}
                      value={field.value}
                      onChange={(event) => setForm((current) => ({ ...current, [field.id]: event.target.value }))}
                    />
                    <Icon className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                    {field.id === "password" ? (
                      <button
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500"
                        onClick={() => setShowPassword((value) => !value)}
                        type="button"
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    ) : null}
                  </div>
                  {field.error ? <p className="text-sm text-rose-300">{field.error}</p> : null}
                </motion.div>
              );
            })}
            <motion.div
              className="flex flex-col gap-4 text-sm text-slate-400 sm:flex-row sm:items-center sm:justify-between"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.16 }}
            >
              <label className="inline-flex items-center gap-3">
                <Checkbox checked={form.remember} onChange={(event) => setForm((current) => ({ ...current, remember: event.target.checked }))} />
                <span>Remember me</span>
              </label>
              <button className="text-primary-light light:text-primary" type="button">Forgot password?</button>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, delay: 0.24 }}>
              <Button fullWidth size="lg" type="submit">Sign In</Button>
            </motion.div>
            <div className="relative py-2 text-center text-sm text-slate-500">
              <span className="bg-slate-950/70 px-4 light:bg-white">or continue with</span>
              <div className="absolute inset-x-0 top-1/2 -z-10 h-px bg-white/10 light:bg-slate-200" />
            </div>
            <Button fullWidth size="lg" type="button" variant="ghost">
              <Chrome className="h-5 w-5" />
              Continue with Google
            </Button>
          </form>
          <p className="mt-6 text-sm text-slate-400">
            Don&apos;t have account? <Link className="text-primary-light light:text-primary" href="/register">Register free</Link>
          </p>
        </motion.div>

        <motion.div
          className="relative overflow-hidden bg-primary-gradient p-8 sm:p-10"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.45 }}
        >
          <div className="mesh-overlay absolute inset-0 opacity-20" />
          <div className="hero-orb -top-10 right-10 h-40 w-40 bg-white/25" />
          <div className="relative z-10 space-y-8 text-white">
            <div>
              <p className="text-sm uppercase tracking-[0.25em] text-indigo-100">Your Business Finance, Simplified</p>
              <h2 className="mt-3 text-4xl font-semibold">One workspace for invoices, collections, and reports.</h2>
            </div>
            <div className="space-y-4">
              {LOGIN_BENEFITS.map((benefit) => (
                <div key={benefit} className="flex items-start gap-3 rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur-xl">
                  <CheckCircle2 className="mt-1 h-5 w-5 text-white" />
                  <span className="text-sm leading-6 text-indigo-50">{benefit}</span>
                </div>
              ))}
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {["Invoice ready", "Payment reminder", "GST export", "Paid instantly"].map((item, index) => (
                <motion.div
                  key={item}
                  animate={{ y: [0, -6, 0] }}
                  className="rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur-xl"
                  transition={{ duration: 4 + index * 0.2, repeat: Infinity }}
                >
                  <BadgeCheck className="h-5 w-5 text-white" />
                  <p className="mt-3 text-sm font-medium">{item}</p>
                </motion.div>
              ))}
            </div>
            <div className="rounded-3xl border border-white/15 bg-white/10 p-5 backdrop-blur-xl">
              <Quote className="h-6 w-6 text-indigo-100" />
              <p className="mt-4 text-base leading-7 text-indigo-50">{testimonial.text}</p>
              <div className="mt-5 flex items-center gap-3">
                <div className="overflow-hidden rounded-full border border-white/20">
                  <Image alt={testimonial.name} height={48} src={testimonial.avatar} width={48} />
                </div>
                <div>
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-sm text-indigo-100">{testimonial.role}</p>
                </div>
              </div>
              <div className="mt-6 flex -space-x-2">
                {SOCIAL_PROOF_AVATARS.map((avatar) => (
                  <div key={avatar} className="overflow-hidden rounded-full border-2 border-white/30">
                    <Image alt="Customer avatar" height={36} src={avatar} width={36} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}


