/** @type {import("tailwindcss").Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./lib/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#4F46E5",
          hover: "#4338CA",
          light: "#818CF8"
        },
        success: {
          DEFAULT: "#22C55E",
          hover: "#16A34A",
          light: "#86EFAC"
        },
        accent: {
          DEFAULT: "#06B6D4",
          hover: "#0891B2",
          light: "#67E8F9"
        },
        surface: {
          DEFAULT: "#0B1120",
          card: "#111827",
          border: "#1F2937"
        },
        slate: {
          800: "#1E293B",
          900: "#0F172A"
        }
      },
      fontFamily: {
        sans: ["var(--font-inter)"],
        heading: ["var(--font-poppins)"]
      },
      boxShadow: {
        soft: "0 4px 24px rgba(0, 0, 0, 0.3)",
        glow: "0 8px 40px rgba(79, 70, 229, 0.2)",
        badge: "0 0 30px rgba(79, 70, 229, 0.2)"
      },
      backgroundImage: {
        "hero-gradient": "linear-gradient(135deg, #0B1120 0%, #1E293B 100%)",
        "primary-gradient": "linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%)",
        "mesh-gradient": "radial-gradient(circle at 20% 20%, rgba(129, 140, 248, 0.35) 0, transparent 28%), radial-gradient(circle at 80% 0%, rgba(6, 182, 212, 0.3) 0, transparent 24%), radial-gradient(circle at 50% 80%, rgba(124, 58, 237, 0.3) 0, transparent 30%)"
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" }
        },
        shimmer: {
          "0%": { left: "-100%" },
          "100%": { left: "150%" }
        },
        "pulse-ring": {
          "0%": { transform: "scale(0.9)", opacity: "0.8" },
          "70%, 100%": { transform: "scale(1.4)", opacity: "0" }
        },
        drift: {
          "0%, 100%": { transform: "translate3d(0, 0, 0)" },
          "50%": { transform: "translate3d(10px, -12px, 0)" }
        }
      },
      animation: {
        float: "float 5s ease-in-out infinite",
        shimmer: "shimmer 0.5s ease forwards",
        "pulse-ring": "pulse-ring 2s ease-out infinite",
        drift: "drift 8s ease-in-out infinite"
      }
    }
  },
  plugins: [
    function ({ addVariant }) {
      addVariant("light", ".light &");
    }
  ]
};

