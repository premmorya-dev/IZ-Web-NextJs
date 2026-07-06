"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, MoonStar, SunMedium, X, Zap } from "lucide-react";
import { useTheme } from "next-themes";
import { buttonVariants } from "@/components/ui/button";
import { NAV_LINKS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import Image from "next/image";

export default function Navbar() {
  const pathname = usePathname();
  const { setTheme, theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
setTheme('dark');
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 50);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const currentTheme = useMemo(
    () => (mounted ? theme : "dark"),
    [mounted, theme],
  );

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6 lg:px-8">
      <nav
        className={cn(
          "mx-auto flex w-full max-w-7xl items-center justify-between rounded-2xl px-4 py-3 transition-all duration-300 sm:px-6",
          isScrolled
            ? "border border-white/10 bg-slate-950/65 shadow-soft backdrop-blur-2xl light:border-slate-200 light:bg-white/90"
            : "border border-transparent bg-transparent",
        )}
      >
        <Link className="flex items-center gap-3" href="/">
          <div className="flex items-center gap-3">
            <Image
              src="/invoicezy.jpeg"
              alt="Invoicezy Logo"
              width={50}
              height={50}
              className="rounded-lg object-contain"
            />

            <div>
              <p className="text-lg font-semibold text-white light:text-slate-950">
                InvoiceZy
              </p>
              <p className="text-sm text-slate-500">Smart Billing</p>
            </div>
          </div>
        </Link>
        <div className="hidden items-center gap-8 lg:flex">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                className={cn(
                  "relative text-sm font-medium text-slate-400 transition-colors hover:text-white light:hover:text-slate-950",
                  isActive && "text-white light:text-slate-950",
                )}
                href={link.href}
              >
                {link.label}
                <span
                  className={cn(
                    "absolute -bottom-2 left-0 h-0.5 w-full origin-left rounded-full bg-primary transition-transform duration-300",
                    isActive ? "scale-x-100" : "scale-x-0",
                  )}
                />
              </Link>
            );
          })}
        </div>
        <div className="hidden items-center gap-3 lg:flex">
          {/* <button
            className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-300 transition hover:border-primary/40 hover:text-white light:border-slate-200 light:bg-white light:text-slate-700"
            onClick={() => setTheme(currentTheme === "dark" ? "light" : "dark")}
            type="button"
          >
            {currentTheme === "dark" ? (
              <SunMedium className="h-5 w-5" />
            ) : (
              <MoonStar className="h-5 w-5" />
            )}
          </button> */}

          <a
            href="https://pro.invoicezy.com"
            className={buttonVariants({ variant: "ghost", size: "sm" })}
          >
            Login
          </a>
          <Link className={buttonVariants({ size: "sm" })} href="/register">
            Start Free
          </Link>
        </div>
        <div className="flex items-center gap-2 lg:hidden">
          {/* <button
            className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-300 light:border-slate-200 light:bg-white light:text-slate-700"
            onClick={() => setTheme(currentTheme === "dark" ? "light" : "dark")}
            type="button"
          >
            {currentTheme === "dark" ? (
              <SunMedium className="h-5 w-5" />
            ) : (
              <MoonStar className="h-5 w-5" />
            )}
          </button> */}
          <button
            className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-100 light:border-slate-200 light:bg-white light:text-slate-700"
            onClick={() => setMenuOpen((value) => !value)}
            type="button"
          >
            {menuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>
      </nav>
      <AnimatePresence>
        {menuOpen ? (
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            className="section-shell mt-3 lg:hidden"
            exit={{ opacity: 0, y: -12 }}
            initial={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2 }}
          >
            <div className="glass-card overflow-hidden p-4">
              <div className="space-y-2">
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    className={cn(
                      "block rounded-xl px-4 py-3 text-sm font-medium text-slate-300 transition hover:bg-white/5 hover:text-white light:text-slate-700 light:hover:bg-slate-50",
                      pathname === link.href &&
                        "bg-primary/10 text-white light:text-primary",
                    )}
                    href={link.href}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
              <div className="mt-4 grid gap-3">
                <a
                  href="https://pro.invoicezy.com"
                  className={buttonVariants({ variant: "ghost", size: "sm" })}
                >
                  Login
                </a>
                <Link
                  className={buttonVariants({ fullWidth: true })}
                  href="/register"
                >
                  Start Free
                </Link>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
