"use client";

import { useState, type CSSProperties } from "react";

/**
 * NOTE FOR PREM:
 * This version uses ONLY inline React styles (style={{...}}) — zero
 * Tailwind classes, zero styled-jsx. Nothing here depends on your
 * tailwind.config.js content globs, a build cache, or any CSS pipeline at
 * all, so it will render identically no matter what's happening elsewhere
 * in your app's CSS setup. This is the most defensive option after the
 * repeated "styling isn't showing up" issue — worth still checking your
 * tailwind.config.js `content` array for the other page files, since those
 * still use Tailwind classes and need to be scanned correctly.
 *
 * Responsive behavior (stacking on mobile, side-by-side on desktop) is done
 * with CSS flexbox `flexWrap` + `flexBasis` instead of @media breakpoints,
 * since inline styles can't express media queries — this achieves the same
 * reflow without needing any external stylesheet.
 */

const COLORS = {
  bg: "#0A0E1A",
  card: "#0F1524",
  cyan: "#22D3EE",
  violet: "#8B5CF6",
  amber: "#FBBF24",
  emerald: "#34D399",
  indigo: "#4338CA",
};

export default function InvoiceGeneratorHero() {
  const [hovering, setHovering] = useState(false);

  return (
    <section style={styles.hero}>
      {/* keyframes only — plain <style> tag, not styled-jsx, so it renders
          in any Next.js setup without a special compiler transform */}
      <style>{`
        @keyframes izyPing {
          75%, 100% { transform: scale(2.2); opacity: 0; }
        }
      `}</style>

      <div aria-hidden="true" style={styles.glow} />
      <div aria-hidden="true" style={styles.fade} />

      <div style={styles.inner}>
        {/* Copy column */}
        <div style={styles.copyCol}>
          <div style={styles.badge}>
            <span style={styles.pingWrap}>
              <span style={styles.pingPulse} />
              <span style={styles.pingDot} />
            </span>
            ✨ &nbsp;·&nbsp; GST Compliant • UPI Ready • Professional PDFs
          </div>

          <h1 style={styles.h1}>
            Send Your First <span style={styles.gradientText}>GST Invoice</span> in the Next 60
            Seconds
          </h1>

          <p style={styles.sub}>
            Fill in your items, watch GST and totals calculate automatically, and get a
            client-ready PDF instantly. Free forever, no credit card, no invoice-design skills
            needed.
          </p>

          <div style={styles.ctaWrap}>
            <a
              href="#invoice-tool"
              style={{ ...styles.ctaBtn, transform: hovering ? "scale(1.02)" : "scale(1)" }}
              onMouseEnter={() => setHovering(true)}
              onMouseLeave={() => setHovering(false)}
            >
              Create My Invoice Free
              <span style={{ transform: hovering ? "translateX(2px)" : "none" }}>→</span>
            </a>
            <p style={styles.ctaNote}>Takes under a minute · No signup needed to try it</p>
          </div>

          <ul style={styles.trustList}>
            <li style={styles.trustItem}>
              <CheckIcon /> No credit card required
            </li>
            <li style={styles.trustItem}>
              <CheckIcon /> Free forever plan
            </li>
            <li style={styles.trustItem}>
              <CheckIcon /> GST &amp; HSN ready
            </li>
          </ul>
        </div>

        {/* Product visual */}
        <div style={styles.visualCol}>
          <div style={styles.card}>
            <div style={styles.cardHead}>
              <div>
                <p style={styles.cardBiz}>Sharma Enterprises</p>
                <p style={styles.cardBill}>Bill To: Verma Traders</p>
              </div>
              <p style={styles.cardLabel}>INVOICE</p>
            </div>

            <div style={styles.cardItems}>
              <div style={styles.cardRow}>
                <span>Web Design Services</span>
                <span style={styles.mono}>₹25,000.00</span>
              </div>
              <div style={styles.cardRow}>
                <span>Hosting Setup</span>
                <span style={styles.mono}>₹3,500.00</span>
              </div>
            </div>

            <div style={styles.cardTotals}>
              <div style={styles.cardRow}>
                <span>Subtotal</span>
                <span style={styles.mono}>₹28,500.00</span>
              </div>
              <div style={styles.cardRow}>
                <span>GST (18%)</span>
                <span style={styles.mono}>₹5,130.00</span>
              </div>
              <div style={styles.totalRow}>
                <span>Total Due</span>
                <span style={styles.mono}>₹33,630.00</span>
              </div>
            </div>
          </div>

          <div style={styles.floatingBadge}>
            <span style={styles.floatingCheck}>
              <CheckIcon />
            </span>
            <div>
              <p style={styles.floatingTitle}>PDF Ready</p>
              <p style={styles.floatingSub}>in 2.4 seconds</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" width="14" height="14" aria-hidden="true">
      <circle cx="10" cy="10" r="10" fill="rgba(52,211,153,0.2)" />
      <path
        d="M6 10.5 8.5 13 14 7.5"
        stroke={COLORS.emerald}
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const styles: Record<string, CSSProperties> = {
  hero: {
    position: "relative",
    overflow: "hidden",
    backgroundColor: COLORS.bg,
    padding: "clamp(64px, 9vw, 96px) 0 clamp(56px, 7vw, 80px)",
  },
  glow: {
    position: "absolute",
    left: "50%",
    top: "-220px",
    width: "clamp(420px, 45vw, 620px)",
    height: "clamp(420px, 45vw, 620px)",
    transform: "translateX(-50%)",
    borderRadius: "9999px",
    opacity: 0.25,
    filter: "blur(130px)",
    background: `radial-gradient(circle, ${COLORS.cyan} 0%, ${COLORS.violet} 60%, transparent 75%)`,
    pointerEvents: "none",
  },
  fade: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: 160,
    background: `linear-gradient(to top, ${COLORS.bg}, transparent)`,
    pointerEvents: "none",
  },
  inner: {
    position: "relative",
    margin: "0 auto",
    maxWidth: "72rem",
    padding: "0 20px",
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
    gap: "48px",
  },
  copyCol: {
    flex: "1 1 460px",
    maxWidth: "560px",
    textAlign: "center",
  },
  badge: {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    borderRadius: "9999px",
    border: "1px solid rgba(251, 191, 36, 0.3)",
    background: "rgba(251, 191, 36, 0.1)",
    padding: "6px 16px",
    fontSize: 12,
    fontWeight: 500,
    letterSpacing: "0.02em",
    color: COLORS.amber,
  },
  pingWrap: { position: "relative", display: "inline-flex", height: 6, width: 6 },
  pingPulse: {
    position: "absolute",
    inset: 0,
    borderRadius: "9999px",
    background: COLORS.amber,
    opacity: 0.75,
    animation: "izyPing 1.6s cubic-bezier(0,0,0.2,1) infinite",
  },
  pingDot: {
    position: "relative",
    display: "block",
    height: 6,
    width: 6,
    borderRadius: "9999px",
    background: COLORS.amber,
  },
  h1: {
    margin: "24px auto 0",
    fontFamily: "'Space Grotesk', sans-serif",
    fontSize: "clamp(2.25rem, 4.5vw, 3.4rem)",
    fontWeight: 600,
    lineHeight: 1.12,
    color: "#ffffff",
  },
  gradientText: {
    background: `linear-gradient(to right, ${COLORS.cyan}, ${COLORS.violet})`,
    WebkitBackgroundClip: "text",
    backgroundClip: "text",
    color: "transparent",
  },
  sub: {
    margin: "20px auto 0",
    maxWidth: "32rem",
    fontSize: "clamp(1rem, 1.4vw, 1.125rem)",
    color: "rgba(255,255,255,0.6)",
  },
  ctaWrap: {
    marginTop: 32,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 12,
  },
  ctaBtn: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    borderRadius: 12,
    background: `linear-gradient(to right, ${COLORS.cyan}, ${COLORS.violet})`,
    padding: "16px 36px",
    fontSize: 14,
    fontWeight: 600,
    color: COLORS.bg,
    boxShadow: "0 10px 40px -10px rgba(34,211,238,0.55)",
    transition: "transform 0.2s ease",
    textDecoration: "none",
    cursor: "pointer",
  },
  ctaNote: { fontSize: 12, color: "rgba(255,255,255,0.4)" },
  trustList: {
    margin: "32px auto 0",
    display: "flex",
    maxWidth: "28rem",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px 20px",
    fontSize: 12,
    color: "rgba(255,255,255,0.4)",
    listStyle: "none",
    padding: 0,
  },
  trustItem: { display: "flex", alignItems: "center", gap: 6 },
  visualCol: {
    position: "relative",
    flex: "1 1 340px",
    maxWidth: "420px",
    margin: "0 auto",
  },
  card: {
    position: "relative",
    borderRadius: 16,
    border: "1px solid rgba(255,255,255,0.1)",
    background: "#ffffff",
    padding: "22px",
    boxShadow: "0 25px 50px -12px rgba(0,0,0,0.5)",
  },
  cardHead: {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "space-between",
    borderBottom: "1px solid #f3f4f6",
    paddingBottom: 12,
  },
  cardBiz: { fontFamily: "'Space Grotesk', sans-serif", fontSize: 14, fontWeight: 600, color: "#111827", margin: 0 },
  cardBill: { fontSize: 11, color: "#9ca3af", margin: "2px 0 0" },
  cardLabel: {
    fontFamily: "'Space Grotesk', sans-serif",
    fontSize: 12,
    fontWeight: 700,
    letterSpacing: "0.05em",
    color: "#9ca3af",
    margin: 0,
  },
  cardItems: { marginTop: 12, display: "flex", flexDirection: "column", gap: 8, fontSize: 12 },
  cardRow: { display: "flex", justifyContent: "space-between", color: "#6b7280" },
  mono: { fontFamily: "'IBM Plex Mono', monospace", color: "#1f2937" },
  cardTotals: {
    marginTop: 12,
    display: "flex",
    flexDirection: "column",
    gap: 6,
    borderTop: "1px solid #f3f4f6",
    paddingTop: 12,
    fontSize: 12,
  },
  totalRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 8,
    background: "#eef2ff",
    padding: "8px 10px",
    fontSize: 14,
    fontWeight: 700,
    color: COLORS.indigo,
  },
  floatingBadge: {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    marginTop: 14,
    borderRadius: 12,
    border: "1px solid rgba(255,255,255,0.1)",
    backgroundColor: COLORS.card,
    padding: "10px 14px",
    boxShadow: "0 20px 25px -5px rgba(0,0,0,0.4)",
  },
  floatingCheck: {
    display: "flex",
    height: 28,
    width: 28,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "9999px",
    background: "rgba(52,211,153,0.15)",
  },
  floatingTitle: { fontSize: 11, fontWeight: 600, color: "#ffffff", margin: 0 },
  floatingSub: { fontSize: 10, color: "rgba(255,255,255,0.4)", margin: 0 },
};
