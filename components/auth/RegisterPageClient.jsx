"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  BadgeCheck,
  Building2,
  Chrome,
  CreditCard,
  Lock,
  Mail,
  Phone,
  Rocket,
  ShieldCheck,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import {
  BUSINESS_TYPES,
  REGISTER_BENEFITS,
  SOCIAL_PROOF_AVATARS,
} from "@/lib/constants";

const benefitIcons = [BadgeCheck, CreditCard, Rocket, ShieldCheck];

export default function RegisterPageClient() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    businessName: "",
    phone: "",
    businessType: BUSINESS_TYPES[0],
    terms: false,
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    let nextErrors = {};

    // ✅ frontend validation
    if (!form.firstName.trim()) nextErrors.firstName = "Enter first name.";
    if (!form.lastName.trim()) nextErrors.lastName = "Enter last name.";
    if (!form.email.includes("@")) nextErrors.email = "Enter valid email.";
    if (form.password.length < 6)
      nextErrors.password = "Min 6 characters.";
    if (form.password !== form.confirmPassword)
      nextErrors.confirmPassword = "Passwords do not match.";

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    try {
      setLoading(true);

      // ✅ FIXED API URL
      const response = await fetch(
        "https://pro.invoicezy.com/api/register",
        {
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
            phone: form.phone,
          }),
        }
      );

      const data = await response.json();

      // ❌ API validation errors
      if (!data.status) {
        let apiErrors = {};

        if (data.errors) {
          Object.keys(data.errors).forEach((key) => {
            const message = data.errors[key][0];

            if (key === "first_name") apiErrors.firstName = message;
            else if (key === "last_name") apiErrors.lastName = message;
            else if (key === "email") apiErrors.email = message;
            else if (key === "password") apiErrors.password = message;
            else if (key === "phone") apiErrors.phone = message;
          });
        }

        setErrors(apiErrors);
        return;
      }

      // ✅ SUCCESS → redirect using API URL
      const redirectUrl = data?.data?.url;
      if (redirectUrl) {
        window.location.href = redirectUrl;
      }
    } catch (error) {
      console.error(error);
      setErrors({
        general: "Something went wrong. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="section-shell pb-24 pt-32 sm:pb-28">
      <div className="overflow-hidden rounded-[32px] border border-white/10 bg-slate-950/40 shadow-soft light:border-slate-200 light:bg-white lg:grid lg:grid-cols-2">
        
        {/* LEFT SIDE SAME */}
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
                Join 50,000+ Smart Businesses
              </p>
              <h2 className="mt-3 text-4xl font-semibold">
                Start billing professionally in minutes.
              </h2>
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
              <p className="text-sm uppercase tracking-[0.2em] text-indigo-100">
                Social proof
              </p>
              <div className="mt-4 flex -space-x-3">
                {SOCIAL_PROOF_AVATARS.map((avatar) => (
                  <div
                    key={avatar}
                    className="overflow-hidden rounded-full border-2 border-white/30"
                  >
                    <Image
                      alt="Customer avatar"
                      height={44}
                      src={avatar}
                      width={44}
                    />
                  </div>
                ))}
              </div>
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
              Create your free account
            </p>
            <h1 className="mt-3 text-3xl font-semibold text-white light:text-slate-950">
              Create your free account
            </h1>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit}>
            {[
              { id: "firstName", label: "First Name", icon: User, type: "text" },
              { id: "lastName", label: "Last Name", icon: User, type: "text" },
              { id: "email", label: "Email", icon: Mail, type: "email" },
              { id: "password", label: "Password", icon: Lock, type: "password" },
              { id: "confirmPassword", label: "Confirm Password", icon: Lock, type: "password" },
              { id: "phone", label: "Phone", icon: Phone, type: "tel" },
            ].map((field) => {
              const Icon = field.icon;
              return (
                <div key={field.id} className="space-y-2">
                  <label className="text-sm text-slate-300 light:text-slate-700">
                    {field.label}
                  </label>
                  <div className="relative">
                    <Input
                      className="pl-11"
                      type={field.type}
                      value={form[field.id]}
                      onChange={(e) =>
                        setForm((c) => ({ ...c, [field.id]: e.target.value }))
                      }
                    />
                    <Icon className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                  </div>
                  {errors[field.id] && (
                    <p className="text-sm text-rose-300">{errors[field.id]}</p>
                  )}
                </div>
              );
            })}

            {errors.general && (
              <p className="text-sm text-rose-300">{errors.general}</p>
            )}

            <Button fullWidth size="lg" type="submit" className="mt-4" disabled={loading}>
              {loading ? "Creating..." : "Create Account"}
            </Button>
          </form>

          <p className="mt-6 text-sm text-slate-400">
            Already have an account?{" "}
            <Link
              className="text-primary-light light:text-primary"
              href="/login"
            >
              Sign in
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}