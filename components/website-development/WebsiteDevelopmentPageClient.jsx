"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  Globe,
  Server,
  ShieldCheck,
  Check,
  ArrowRight,
  Star,
  Smartphone,
  Sparkles,
  MessageSquare,
  Code2,
  Rocket,
  Headphones,
  Atom,
  FileCode2,
  Database,
  MonitorSmartphone,
  ServerCog,
  BadgeCheck,
  LayoutDashboard,
  CreditCard,
  Eye,
  x
} from "lucide-react";


import Image from "next/image";
import { X } from "lucide-react";


import project1 from "@/public/projects/project1.png";
import project2 from "@/public/projects/project2.png";
import project3 from "@/public/projects/project3.png";



const projects = [
  {
    image: project1,
    title: "Business Website",
    category: "Company",
  },
  {
    image: project2,
    title: "Education Website",
    category: "Coaching",
  },
  {
    image: project3,
    title: "Digital Agency",
    category: "Business",
  },
];



const whatsappLink =
  "https://wa.me/918750101087?text=Hello%20Prem,%20I%20want%20website%20development%20consultation";

const packages = [
  {
    title: "Starter Website",
    payment_link: "https://rzp.io/rzp/5j8Ic5A",
    price: "₹9,999",
    badge: "Best For Startup",
    badgeColor: "bg-emerald-500/10 text-emerald-400",

    features: [
      "Up To 5 Pages Website",
      "100% Mobile Responsive",
      "Free Domain (1 Year)",
      "Free Hosting (1 Year)",
      "Free SSL Certificate",
      "WhatsApp Integration",
      "Contact Form",
      "Basic SEO Setup",
      "Social Media Links",
      "Support After Delivery",
      "Delivery In 2-5 Days",
    ],
  },

  {
    title: "Business Website",
    payment_link: "https://rzp.io/rzp/0smJxXM",
    price: "₹19,999",
    badge: "🔥 Most Popular",
    badgeColor: "bg-cyan-500/10 text-cyan-400",

    highlight: true,

    features: [
      "Up To 15 Pages",
      "Dynamic Website",
      "Admin Panel",
      "Blog System",
      "WhatsApp Integration",
      "Inquiry Management",
      "Gallery / Portfolio",
      "Google Map Integration",
      "Free Domain",
      "Free Hosting",
      "Free SSL",
      "SEO Setup",
      "30 Days Support",
      "Delivery In 7–10 Days",
    ],
  },

  {
    title: "Premium Solution",
    payment_link: "https://rzp.io/rzp/5K8ro7g",
    price: "₹59,999+",
    badge: "Enterprise",
    badgeColor: "bg-amber-500/10 text-amber-400",

    features: [
      "Custom Website / Web App",
      "Admin Dashboard",
      "User Login System",
      "Payment Gateway",
      "CRM / ERP Features",
      "API Integration",
      "Reports & Analytics",
      "Free Domain",
      "Free Hosting",
      "Free SSL",
      "Priority Support",
      "Delivery In 15–20 Days",
    ],
  },
];

const technologies = [
  {
    name: "Laravel",
    icon: FileCode2,
  },
  {
    name: "React",
    icon: Atom,
  },
  {
    name: "Next.js",
    icon: MonitorSmartphone,
  },
  {
    name: "Node.js",
    icon: ServerCog,
  },
  {
    name: "MySQL",
    icon: Database,
  },
  {
    name: "MongoDb",
    icon: Database,
  },
];

const process = [
  {
    title: "Discussion",
    icon: MessageSquare,
    desc: "Understanding business requirements",
  },
  {
    title: "Design",
    icon: Sparkles,
    desc: "UI/UX planning & wireframing",
  },
  {
    title: "Development",
    icon: Code2,
    desc: "Website development process",
  },
  {
    title: "Testing",
    icon: ShieldCheck,
    desc: "Testing & quality check",
  },
  {
    title: "Delivery",
    icon: Rocket,
    desc: "Project deployment",
  },
  {
    title: "Support",
    icon: Headphones,
    desc: "Support after delivery",
  },
];

const reviews = [
  {
    name: "Rahul Sharma",
    review:
      "Professional service and timely delivery. Website exceeded expectations.",
  },
  {
    name: "Anjali Verma",
    review:
      "Excellent support and communication throughout the project journey.",
  },
  {
    name: "Amit Kumar",
    review: "Modern design and smooth user experience. Highly recommended.",
  },
];

const faq = [
  {
    q: "Do you provide domain and hosting?",
    a: "Yes. Domain, hosting and SSL are included in every package.",
  },
  {
    q: "Will website work on mobile devices?",
    a: "Yes. Every website is fully mobile responsive.",
  },
  {
    q: "Do you provide support after delivery?",
    a: "Yes. Post delivery support is available.",
  },
  {
    q: "Can you develop custom software?",
    a: "Yes. CRM, ERP, dashboards and custom software solutions are available.",
  },
];




export default function WebsiteDevelopmentPageClient() {
    const [selectedProject, setSelectedProject] =  useState(null);
  return (
    <div className="bg-slate-950 text-white pb-24">
      {/* HERO */}

      <section className="pt-32 pb-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{
              opacity: 0,
              y: 30,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            className="max-w-5xl mx-auto text-center"
          >
            <span className="inline-flex rounded-full border border-cyan-500/20 bg-cyan-500/10 px-5 py-3 text-cyan-400 text-sm">
              Website & Software Development Services By InvoiceZy
            </span>

            <h1 className="mt-8 text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
              Professional Websites
              <span className="text-cyan-400"> That Grow Businesses</span>
            </h1>

            <p className="mt-8 text-slate-400 text-lg max-w-3xl mx-auto">
              We build professional websites, web applications and custom
              software solutions with free domain, hosting, SSL and post
              delivery support.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-2xl bg-cyan-500 px-8 py-4 font-semibold transition hover:scale-105"
              >
                Get Free Consultation
              </a>

              <a
                href="#packages"
                className="rounded-2xl border border-slate-700 px-8 py-4 hover:border-cyan-500 transition"
              >
                View Packages
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* TRUST */}

      <section className="container mx-auto px-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            {
              title: "Free Domain",
              icon: Globe,
            },
            {
              title: "Free Hosting",
              icon: Server,
            },
            {
              title: "Free SSL",
              icon: ShieldCheck,
            },
            {
              title: "100% Responsive",
              icon: Smartphone,
            },
          ].map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="rounded-3xl border border-slate-800 bg-slate-900 p-6 text-center"
              >
                <Icon className="mx-auto text-cyan-400 h-8 w-8" />

                <h3 className="mt-4 font-semibold">{item.title}</h3>
              </div>
            );
          })}
        </div>
      </section>

      {/* TECHNOLOGIES */}

      <section className="container mx-auto px-4 mt-24">
        <div className="text-center">
          <h2 className="text-4xl font-bold">Technologies We Use</h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mt-12">
          {technologies.map((tech) => {
            const Icon = tech.icon;

            return (
              <div
                key={tech.name}
                className="rounded-3xl border border-slate-800 bg-slate-900 p-8 text-center hover:border-cyan-500 transition"
              >
                <Icon className="mx-auto h-10 w-10 text-cyan-400" />

                <h3 className="mt-5 font-semibold">{tech.name}</h3>

                <p className="mt-2 text-sm text-slate-400">Development Stack</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* PROCESS */}

      {/* PROCESS */}

      <section className="container mx-auto px-4 mt-24">
        <div className="text-center">
          <h2 className="text-4xl font-bold">Our Development Process</h2>

          <p className="mt-4 text-slate-400">
            Simple workflow from planning to delivery
          </p>
        </div>

        <div className="mt-14">
          <div className="hidden xl:flex items-center justify-between gap-2">
            {process.map((item, index) => {
              const Icon = item.icon;

              return (
                <div key={item.title} className="flex items-center flex-1">
                  <div className="flex-1">
                    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5 text-center relative hover:border-cyan-500 transition">
                      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-500/10">
                        <Icon className="h-5 w-5 text-cyan-400" />
                      </div>

                      <div className="mt-4">
                        <span className="text-xs text-cyan-400">
                          Step {index + 1}
                        </span>
                      </div>

                      <h3 className="mt-2 font-semibold text-sm">
                        {item.title}
                      </h3>

                      <p className="mt-2 text-xs text-slate-400">{item.desc}</p>
                    </div>
                  </div>

                  {index !== process.length - 1 && (
                    <div className="px-3">
                      <ArrowRight className="text-cyan-400 h-5 w-5" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* MOBILE + TABLET */}

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:hidden gap-5">
            {process.map((item, index) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="rounded-2xl border border-slate-800 bg-slate-900 p-5 hover:border-cyan-500 transition"
                >
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-xl bg-cyan-500/10 flex items-center justify-center">
                      <Icon className="text-cyan-400 h-5 w-5" />
                    </div>

                    <div>
                      <span className="text-xs text-cyan-400">
                        Step {index + 1}
                      </span>

                      <h3 className="font-semibold">{item.title}</h3>
                    </div>
                  </div>

                  <p className="mt-4 text-sm text-slate-400">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* PACKAGES */}

      <section
        id="packages"
        className="container mx-auto px-4 mt-24 scroll-mt-28"
      >
        <h2 className="text-center text-4xl font-bold">Website Packages</h2>

        <div className="grid lg:grid-cols-3 gap-8 mt-12">
          {packages.map((pkg) => (
            <div
              key={pkg.title}
              className={`rounded-3xl p-8 bg-slate-900 border ${
                pkg.highlight ? "border-cyan-500 scale-105" : "border-slate-800"
              }`}
            >
              <div className="flex items-center justify-between">
                <span
                  className={`rounded-full px-4 py-2 text-sm font-medium ${pkg.badgeColor}`}
                >
                  {pkg.badge}
                </span>

                {pkg.highlight && (
                  <span className="rounded-full bg-green-500/10 px-3 py-1 text-xs text-green-400">
                    Recommended
                  </span>
                )}
              </div>
              <p className="mt-4 text-sm text-slate-400">
                Free Domain • Hosting • SSL Included
              </p>

              <h3 className="mt-6 text-2xl font-bold">{pkg.title}</h3>

              <div className="mt-4 text-5xl font-bold text-cyan-400">
                {pkg.price}
              </div>

              <div className="space-y-4 mt-8">
                {pkg.features.map((feature) => (
                  <div key={feature} className="flex gap-3">
                    <Check className="w-5 h-5 text-green-500 shrink-0 mt-1" />

                    <span>{feature}</span>
                  </div>
                ))}
              </div>

              <a
                href={whatsappLink}
                target="_blank"
                className="mt-8 flex justify-center gap-3 rounded-2xl bg-cyan-500 py-4 font-semibold"
              >
                Send Inquiry
                <ArrowRight />
              </a>

              <a
                href={pkg.payment_link}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 block rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-5 transition hover:scale-[1.02] hover:border-emerald-500"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-500/15">
                    <CreditCard className="h-6 w-6 text-emerald-400" />
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-semibold text-emerald-400">
                        Pay Booking Amount
                      </h4>

                      <ShieldCheck className="h-4 w-4 text-emerald-400" />
                    </div>

                    <p className="mt-2 text-sm text-slate-300">
                      Reserve your project by paying only ₹
                      {(
                        Number(pkg.price.replace(/[₹,+]/g, "")) / 2
                      ).toLocaleString("en-IN")}{" "}
                      50% booking amount. Remaining payment after project
                      completion.
                    </p>

                    <div className="mt-3 inline-flex rounded-full bg-emerald-500/15 px-3 py-1 text-xs text-emerald-300">
                      Secure Token Payment • Project Booking
                    </div>
                  </div>
                </div>
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* EXTRA TRUST */}

      <section className="container mx-auto px-4 mt-24">
        <div className="grid md:grid-cols-3 gap-6">
          {[
            "Support After Delivery",
            "No Hidden Charges",
            "Custom Business Solutions",
          ].map((item) => (
            <div
              key={item}
              className="rounded-3xl bg-slate-900 border border-slate-800 p-8 text-center"
            >
              <BadgeCheck className="mx-auto text-cyan-400" />

              <h3 className="mt-5 font-semibold">{item}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* PORTFOLIO */}

<div className="grid md:grid-cols-3 gap-8 mt-12">

  {projects.map((project, index) => (

    <div
      key={index}
      onClick={() =>
        setSelectedProject(project)
      }
      className="group cursor-pointer overflow-hidden rounded-3xl border border-slate-800 bg-slate-900 hover:border-cyan-500 transition"
    >

     <div className="relative h-[420px] overflow-hidden">

  <Image
    src={project.image}
    alt={project.title}
    fill
    className="object-cover object-top transition duration-700 group-hover:scale-105"
  />

  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition duration-300" />

  {/* Preview Button */}

  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300">

    <button className="flex items-center gap-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 px-6 py-3 text-white font-medium">

      <Eye className="h-5 w-5 text-cyan-400" />

      Preview Website

    </button>

  </div>

</div>

      <div className="p-6">

        <span className="rounded-full bg-cyan-500/10 px-3 py-1 text-xs text-cyan-400">

          {project.category}

        </span>

        <h3 className="mt-4 text-xl font-semibold">

          {project.title}

        </h3>

      </div>

    </div>

  ))}

</div>

{
  selectedProject && (

    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm p-4">

      <div className="mx-auto max-w-5xl h-[95vh] rounded-3xl bg-slate-950 border border-slate-800 overflow-hidden">

        <div className="flex items-center justify-between border-b border-slate-800 p-5">

          <div>

            <h3 className="text-2xl font-bold">

              {selectedProject.title}

            </h3>

            <p className="text-slate-400">

              {selectedProject.category}

            </p>

          </div>

          <button
            onClick={() =>
              setSelectedProject(null)
            }
            className="rounded-xl p-2 hover:bg-slate-800"
          >

            <X />

          </button>

        </div>

        <div className="h-[calc(95vh-90px)] overflow-y-auto p-5">

          <Image
            src={selectedProject.image}
            alt={selectedProject.title}
            className="w-full h-auto rounded-2xl"
          />

        </div>

      </div>

    </div>

  )
}
      {/* REVIEWS */}

      <section className="container mx-auto px-4 mt-24">
        <h2 className="text-center text-4xl font-bold">Client Reviews</h2>

        <div className="grid md:grid-cols-3 gap-8 mt-14">
          {reviews.map((review) => {
            const initials = review.name
              .split(" ")
              .map((n) => n[0])
              .join("");

            return (
              <div
                key={review.name}
                className="rounded-3xl border border-slate-800 bg-slate-900 p-8 hover:border-cyan-500 transition"
              >
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-cyan-500 flex items-center justify-center font-bold text-lg">
                    {initials}
                  </div>

                  <div>
                    <h3 className="font-semibold">{review.name}</h3>

                    <div className="flex gap-1 mt-1">
                      {[1, 2, 3, 4, 5].map((item) => (
                        <Star
                          key={item}
                          size={16}
                          fill="currentColor"
                          className="text-yellow-400"
                        />
                      ))}
                    </div>
                  </div>
                </div>

                <p className="mt-6 text-slate-400 leading-7">{review.review}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* FAQ */}

      <section className="container mx-auto px-4 mt-24">
        <h2 className="text-center text-4xl font-bold">
          Frequently Asked Questions
        </h2>

        <div className="max-w-4xl mx-auto mt-12 space-y-5">
          {faq.map((item) => (
            <div
              key={item.q}
              className="rounded-3xl border border-slate-800 bg-slate-900 p-8"
            >
              <h3 className="font-semibold text-lg">{item.q}</h3>

              <p className="mt-4 text-slate-400">{item.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}

      <section className="container mx-auto px-4 mt-24">
        <div className="rounded-3xl border border-cyan-500/20 bg-cyan-500/10 p-12 text-center">
          <Sparkles className="mx-auto text-cyan-400" />

          <h2 className="mt-6 text-4xl md:text-5xl font-bold">
            Ready To Build Your Website?
          </h2>

          <p className="mt-5 text-slate-400">
            Get free consultation and project estimation today.
          </p>

          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-8 rounded-2xl bg-cyan-500 px-10 py-4 font-semibold"
          >
            Send Inquiry
          </a>
        </div>
      </section>
    </div>
  );
}
