"use client";

import PropTypes from "prop-types";
import { motion } from "framer-motion";
import GradientBadge from "@/components/shared/GradientBadge";
import { scrollReveal } from "@/lib/animations";
import { cn } from "@/lib/utils";

export default function SectionHeader({ badge, title, description, align = "center", icon, as = "h2" }) {
  const HeadingTag = as;

  return (
    <motion.div
      {...scrollReveal}
      className={cn(
        "mx-auto mb-14 max-w-3xl space-y-4",
        align === "center" ? "text-center" : "text-left"
      )}
    >
      {badge ? (
        <GradientBadge
          className={align === "center" ? "mx-auto" : "mx-0"}
          icon={icon}
          text={badge}
        />
      ) : null}
      <HeadingTag className="text-balance text-4xl font-semibold tracking-tight text-white sm:text-5xl light:text-slate-950">
        {title}
      </HeadingTag>
      {description ? (
        <p className="text-balance text-base leading-7 text-slate-400 sm:text-lg light:text-slate-600">
          {description}
        </p>
      ) : null}
    </motion.div>
  );
}

SectionHeader.propTypes = {
  align: PropTypes.oneOf(["center", "left"]),
  as: PropTypes.oneOf(["h1", "h2", "h3"]),
  badge: PropTypes.string,
  description: PropTypes.string,
  icon: PropTypes.elementType,
  title: PropTypes.string.isRequired
};
