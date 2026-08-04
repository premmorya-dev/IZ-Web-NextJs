"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  BadgeCheck,
  CreditCard,
  Lock,
  Mail,
  Rocket,
  ShieldCheck,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { REGISTER_BENEFITS, SOCIAL_PROOF_AVATARS } from "@/lib/constants";

const benefitIcons = [BadgeCheck, CreditCard, Rocket, ShieldCheck];

function getPasswordStrength(password) {
  if (!password) return { label: "", score: 0 };

  let score = 0;
  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  const levels = [
    { label: "Too weak", color: "#F87171" },
    { label: "Weak", color: "#FB923C" },
    { label: "Okay", color: "#FBBF24" },
    { label: "Good", color: "#34D399" },
    { label: "Strong", color: "#22C55E" },
  ];

  return { ...levels[score], score };
}

export default function RegisterPageClient() {
  const pushAnalyticsEvent = (eventName, extra = {}) => {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: eventName, ...extra });
  };
  useEffect(() => {
    pushAnalyticsEvent("register_click");
  }, []);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const strength = useMemo(
    () => getPasswordStrength(form.password),
    [form.password],
  );

  const updateField = (id) => (e) => {
    const value =
      e?.target?.type === "checkbox" ? e.target.checked : e.target.value;
    setForm((c) => ({ ...c, [id]: value }));
    if (errors[id]) setErrors((c) => ({ ...c, [id]: undefined }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const nextErrors = {};

    if (!form.firstName.trim()) nextErrors.firstName = "Enter your first name.";
    if (!form.lastName.trim()) nextErrors.lastName = "Enter your last name.";
    if (!/^\S+@\S+\.\S+$/.test(form.email))
      nextErrors.email = "Enter a valid email address.";
    if (form.password.length < 8)
      nextErrors.password = "Use at least 8 characters.";
    if (form.password !== form.confirmPassword)
      nextErrors.confirmPassword = "Passwords do not match.";

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      pushAnalyticsEvent("register_validation_error");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch("https://pro.invoicezy.com/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          first_name: form.firstName,
          last_name: form.lastName,
          email: form.email,
          password: form.password,
          password_confirmation: form.confirmPassword,
        }),
      });

      const data = await response.json();

      if (!data.status) {
        const apiErrors = {};

        if (data.errors) {
          Object.keys(data.errors).forEach((key) => {
            const message = data.errors[key][0];
            if (key === "first_name") apiErrors.firstName = message;
            else if (key === "last_name") apiErrors.lastName = message;
            else if (key === "email") apiErrors.email = message;
            else if (key === "password") apiErrors.password = message;
            else apiErrors.general = message;
          });
        }

        setErrors(apiErrors);
        return;
      }

      // ✅ Fire the conversion event only on a real, successful signup
      pushAnalyticsEvent("signup_success");

      const redirectUrl = data?.data?.url;
      if (redirectUrl) {
        window.location.href = redirectUrl;
      }
    } catch (error) {
      console.error(error);
      setErrors({
        general: "Something went wrong on our end. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  const fields = [
    {
      id: "firstName",
      label: "First name",
      icon: User,
      type: "text",
      autoComplete: "given-name",
    },
    {
      id: "lastName",
      label: "Last name",
      icon: User,
      type: "text",
      autoComplete: "family-name",
    },
    {
      id: "email",
      label: "Work email",
      icon: Mail,
      type: "email",
      autoComplete: "email",
    },
  ];

  return (
    <div className="section-shell pb-24 pt-32 sm:pb-28">
      <div className="flex flex-col overflow-hidden rounded-[32px] border border-white/10 bg-slate-950/40 shadow-soft light:border-slate-200 light:bg-white lg:grid lg:grid-cols-2">
        {/* LEFT — brand + real, verifiable trust signals */}
        <motion.div
          className="order-2 lg:order-1 relative overflow-hidden bg-primary-gradient p-8 sm:p-10"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.45 }}
        >
          <div className="mesh-overlay absolute inset-0 opacity-20" />
          <div className="hero-orb left-0 top-10 h-44 w-44 bg-white/20" />
          <div className="relative z-10 space-y-8 text-white">
            <div>
              <p className="text-sm uppercase tracking-[0.25em] text-indigo-100">
                Built for Indian businesses
              </p>
              <h2 className="mt-3 text-4xl font-semibold">
                GST-compliant invoicing, set up in minutes.
              </h2>
              <p className="mt-4 text-sm leading-6 text-indigo-100">
                Made for freelancers, CA firms, startups and agencies who need
                invoices that are correct the first time — every time.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {REGISTER_BENEFITS.map((benefit, index) => {
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

            <div className="rounded-3xl border border-white/15 bg-white/10 p-5 backdrop-blur-xl">
              <div className="flex items-center gap-2 text-sm uppercase tracking-[0.2em] text-indigo-100">
                <ShieldCheck className="h-4 w-4" />
                Secure by default
              </div>
              <ul className="mt-4 space-y-2 text-sm leading-6 text-indigo-50">
                <li>256-bit SSL encryption on every request</li>
                <li>Your data is never sold or shared with third parties</li>
                <li>Cancel anytime, no lock-in contracts</li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* RIGHT — form */}
        <motion.div
          className="order-1 lg:order-2 border-t border-white/10 bg-slate-950/70 p-8 light:border-slate-200 light:bg-white sm:p-10 lg:border-l lg:border-t-0"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.45 }}
        >
          <div className="mb-8">
            <p className="text-sm uppercase tracking-[0.25em] text-primary-light">
              Free, no credit card required
            </p>
            <h1 className="mt-3 text-3xl font-semibold text-white light:text-slate-950">
              Create your InvoiceZy account
            </h1>
            <p className="mt-2 text-sm text-slate-400 light:text-slate-600">
              Already have thousands of invoices to send. Get set up in under
              one minutes.
            </p>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit} noValidate>
            <div className="grid gap-5 sm:grid-cols-2">
              {fields.slice(0, 2).map((field) => (
                <FormField
                  key={field.id}
                  field={field}
                  value={form[field.id]}
                  error={errors[field.id]}
                  onChange={updateField(field.id)}
                />
              ))}
            </div>

            <div className="grid gap-5 sm:grid-cols-1">
              {fields.slice(2).map((field) => (
                <FormField
                  key={field.id}
                  field={field}
                  value={form[field.id]}
                  error={errors[field.id]}
                  onChange={updateField(field.id)}
                />
              ))}
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              {/* Password */}
              <div className="space-y-2">
                <label
                  htmlFor="password"
                  className="text-sm text-slate-300 light:text-slate-700"
                >
                  Password
                </label>

                <div className="relative">
                  <Input
                    id="password"
                    className="pl-11"
                    type="password"
                    autoComplete="new-password"
                    value={form.password}
                    onChange={updateField("password")}
                    aria-invalid={Boolean(errors.password)}
                    aria-describedby={
                      errors.password ? "password-error" : undefined
                    }
                  />
                  <Lock className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                </div>

                {form.password && (
                  <div className="flex items-center gap-2">
                    <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/10 light:bg-slate-200">
                      <div
                        className="h-full rounded-full transition-all"
                        style={{
                          width: `${(strength.score / 4) * 100}%`,
                          backgroundColor: strength.color,
                        }}
                      />
                    </div>
                    <span className="text-xs text-slate-400">
                      {strength.label}
                    </span>
                  </div>
                )}

                {errors.password && (
                  <p id="password-error" className="text-sm text-rose-300">
                    {errors.password}
                  </p>
                )}
              </div>

              {/* Confirm Password */}
              <div className="space-y-2">
                <label
                  htmlFor="confirmPassword"
                  className="text-sm text-slate-300 light:text-slate-700"
                >
                  Confirm password
                </label>

                <div className="relative">
                  <Input
                    id="confirmPassword"
                    className="pl-11"
                    type="password"
                    autoComplete="new-password"
                    value={form.confirmPassword}
                    onChange={updateField("confirmPassword")}
                    aria-invalid={Boolean(errors.confirmPassword)}
                  />
                  <Lock className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                </div>

                {errors.confirmPassword && (
                  <p className="text-sm text-rose-300">
                    {errors.confirmPassword}
                  </p>
                )}
              </div>
            </div>

            <p className="text-center text-xs text-slate-500 leading-5">
              By creating an account, you agree to our{" "}
              <Link
                href="/terms"
                className="text-primary-light underline hover:no-underline light:text-primary"
              >
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                href="/privacy"
                className="text-primary-light underline hover:no-underline light:text-primary"
              >
                Privacy Policy
              </Link>
              .
            </p>

            {errors.general && (
              <p className="text-sm text-rose-300">{errors.general}</p>
            )}

            <Button
              fullWidth
              size="lg"
              type="submit"
              className="mt-4"
              disabled={loading}
            >
              {loading ? "Creating your account..." : "Create free account"}
            </Button>

            <p className="text-center text-xs text-slate-500">
              No credit card required. Start invoicing in minutes.
            </p>
          </form>

          <p className="mt-6 text-sm text-slate-400">
            Already have an account?{" "}
            <Link
              className="text-primary-light light:text-primary"
              href="https://pro.invoicezy.com"
            >
              Sign in
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}

function FormField({ field, value, error, onChange }) {
  const Icon = field.icon;
  return (
    <div className="space-y-2">
      <label
        htmlFor={field.id}
        className="text-sm text-slate-300 light:text-slate-700"
      >
        {field.label}
      </label>
      <div className="relative">
        <Input
          id={field.id}
          className="pl-11"
          type={field.type}
          autoComplete={field.autoComplete}
          value={value}
          onChange={onChange}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${field.id}-error` : undefined}
        />
        <Icon className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
      </div>
      {error && (
        <p id={`${field.id}-error`} className="text-sm text-rose-300">
          {error}
        </p>
      )}
    </div>
  );
}