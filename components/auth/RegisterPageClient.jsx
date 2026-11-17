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

import { GoogleOAuthProvider, useGoogleLogin } from "@react-oauth/google";

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

export function RegisterPageInner() {
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
const handleGoogleToken = async (accessToken) => {
  try {
    setLoading(true);
    setErrors({});

    const response = await fetch("https://staging.invoicezy.com/api/google-login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ access_token: accessToken }),
    });
    const data = await response.json();

    if (!data.status) {
      setErrors({ general: data.message || "Google sign-in failed. Please try again." });
      return;
    }

    pushAnalyticsEvent("signup_success", {
      method: "google",
      is_new_user: data.data.is_new_user,
    });

    if (data?.data?.url) window.location.href = data.data.url;
  } catch (error) {
    console.error(error);
    setErrors({ general: "Something went wrong on our end. Please try again." });
  } finally {
    setLoading(false);
  }
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


        <GoogleButton
          disabled={loading}
          onToken={handleGoogleToken}
          onError={() => setErrors({ general: "Google sign-in was cancelled or failed." })}
          onClick={() => pushAnalyticsEvent("google_signup_click")}
        />

        <div className="my-6 flex items-center gap-3">
          <div className="h-px flex-1 bg-white/10 light:bg-slate-200" />
          <span className="text-xs uppercase tracking-widest text-slate-500">
            or sign up with email
          </span>
          <div className="h-px flex-1 bg-white/10 light:bg-slate-200" />
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

export default function RegisterPageClient() {
  return (
    <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}>
      <RegisterPageInner />
    </GoogleOAuthProvider>
  );
}
function GoogleButton({ onToken, onError, onClick, disabled }) {
  const login = useGoogleLogin({
    flow: "implicit",
    onSuccess: (res) => onToken(res.access_token),
    onError,
    onNonOAuthError: onError,
  });

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={() => {
        onClick?.();
        login();
      }}
      className="group flex w-full items-center justify-center gap-3 rounded-2xl border border-slate-200 bg-white px-5 py-3.5 text-sm font-semibold text-slate-800 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-indigo-500/20 active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-60"
    >
      <svg viewBox="0 0 48 48" className="h-5 w-5" aria-hidden="true">
        <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
        <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
        <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
        <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
      </svg>
      Continue with Google
    </button>
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