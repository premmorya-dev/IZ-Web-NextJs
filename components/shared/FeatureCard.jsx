"use client";

import PropTypes from "prop-types";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BarChart2,
  Calculator,
  CheckCircle,
  FileText,
  Globe,
  Package,
  QrCode,
  TrendingDown,
  Palette,
  FileBarChart,
  BellRing,
  Send,
  List,
} from "lucide-react";
import { cn } from "@/lib/utils";

const icons = {
  BarChart2,
  Calculator,
  CheckCircle,
  FileText,
  Globe,
  Package,
  QrCode,
  TrendingDown,
  Palette,
  FileBarChart,
  BellRing,
  Send,
  List,
};

const colorMap = {
  indigo: "from-primary/30 to-primary/10 text-primary-light",
  green: "from-success/30 to-success/10 text-success-light",
  cyan: "from-accent/30 to-accent/10 text-accent-light",
  purple: "from-fuchsia-500/30 to-fuchsia-500/10 text-fuchsia-300",
  orange: "from-orange-500/30 to-orange-500/10 text-orange-300",
  blue: "from-sky-500/30 to-sky-500/10 text-sky-300",
};

export default function FeatureCard({ icon, title, desc, color, index = 0 }) {
  const Icon = icons[icon] || FileText;

  return (
    <motion.article
      className="glass-card glass-card-hover group relative overflow-hidden p-6"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      whileHover={{ y: -6 }}
    >
      <div className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <div
        className={cn(
          "mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br shadow-lg shadow-black/20",
          colorMap[color],
        )}
      >
        <Icon className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
      </div>
      <h3 className="text-xl font-semibold text-white light:text-slate-950">
        {title}
      </h3>
      <p className="mt-3 text-sm leading-6 text-slate-400 light:text-slate-600">
        {desc}
      </p>
    </motion.article>
  );
}

FeatureCard.propTypes = {
  color: PropTypes.string.isRequired,
  desc: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  index: PropTypes.number,
  title: PropTypes.string.isRequired,
};
