"use client";

import { useState } from "react";
import PropTypes from "prop-types";
import { motion, AnimatePresence } from "framer-motion";
import { Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function TemplateCard({ template, compact = false }) {
  const [previewOpen, setPreviewOpen] = useState(false);

  return (
    <>
      <motion.article
        className="glass-card glass-card-hover group overflow-hidden"
        whileHover={{ y: -6 }}
        transition={{ duration: 0.25 }}
      >
        <div className="relative p-4">
          <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

          {/* CARD BOX */}
          <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-slate-950/70 p-4 light:border-slate-200 light:bg-white h-56">
            
            {/* BACKGROUND IMAGE */}
            <img
              src={"images/template/" + template.image}
              alt={template.name}
              className="absolute inset-0 h-full w-full object-cover opacity-30 group-hover:opacity-40 transition-opacity duration-300"
            />

            {/* hover overlay */}
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-slate-950/70 opacity-0 transition-opacity duration-300 group-hover:pointer-events-auto group-hover:opacity-100 light:bg-white/80">
              <div className="flex gap-3">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setPreviewOpen(true)}
                >
                  <Eye className="h-4 w-4" />
                  Preview
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* bottom content */}
        <div className="space-y-3 px-5 pb-5">
          <div className="flex items-center justify-between gap-3">
            <h3 className="text-lg font-semibold text-white light:text-slate-950">
              {template.name}
            </h3>
            <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-slate-300 light:border-slate-200 light:text-slate-600">
              {template.shortCategory}
            </span>
          </div>

          {!compact && (
            <p className="text-sm leading-6 text-slate-400 light:text-slate-600">
              {template.description}
            </p>
          )}

          <div className="flex items-center justify-between text-sm text-slate-400 light:text-slate-600">
            <span
              className={cn(
                "rounded-full px-3 py-1 text-xs font-medium",
                template.access === "Pro"
                  ? "bg-primary/15 text-primary-light light:bg-primary/10 light:text-primary"
                  : "bg-success/15 text-success-light light:bg-success/10 light:text-success-hover"
              )}
            >
              {template.access}
            </span>
          </div>
        </div>
      </motion.article>

      {/* ✅ PREVIEW MODAL */}
      <AnimatePresence>
        {previewOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* click outside to close */}
            <div
              className="absolute inset-0"
              onClick={() => setPreviewOpen(false)}
            />

            {/* modal content */}
            <motion.div
              className="relative z-10 w-full max-w-5xl max-h-[90vh] overflow-auto p-4"
              initial={{ scale: 0.85 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.85 }}
            >
              {/* close button */}
              <button
                onClick={() => setPreviewOpen(false)}
                className="sticky top-0 ml-auto block text-white text-2xl z-20"
              >
                ✕
              </button>

              {/* image wrapper */}
              <div className="flex justify-center">
                <img
                  src={"images/template/" + template.image}
                  alt={template.name}
                  className="w-auto h-auto max-w-full rounded-xl shadow-lg"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

TemplateCard.propTypes = {
  compact: PropTypes.bool,
  template: PropTypes.shape({
    access: PropTypes.string.isRequired,
    accent: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    downloads: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    shortCategory: PropTypes.string.isRequired,
    image: PropTypes.string
  }).isRequired
};