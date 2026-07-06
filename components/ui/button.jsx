import PropTypes from "prop-types";
import { cn } from "@/lib/utils";

const variantClasses = {
  primary:
    "primary-button text-white shadow-[0_20px_60px_rgba(79,70,229,0.35)] hover:shadow-[0_25px_70px_rgba(79,70,229,0.45)]",
  secondary: "secondary-button hover:text-white",
  ghost:
    "border border-white/10 bg-white/5 text-slate-200 hover:border-primary/40 hover:bg-white/10 dark:text-slate-100 light:border-slate-200 light:bg-white light:text-slate-800 light:hover:bg-slate-50",
  light: "bg-white text-slate-950 hover:bg-slate-100",
  outline:
    "border border-primary/40 bg-transparent text-primary-light hover:bg-primary/10 dark:text-primary-light light:text-primary"
};

const sizeClasses = {
  sm: "h-10 px-4 text-sm",
  md: "h-12 px-6 text-sm sm:text-base",
  lg: "h-14 px-8 text-base"
};

export function buttonVariants({ variant = "primary", size = "md", fullWidth = false, className = "" } = {}) {
  return cn(
    "inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 disabled:pointer-events-none disabled:opacity-60",
    variantClasses[variant],
    sizeClasses[size],
    fullWidth && "w-full",
    className
  );
}

export function Button({ className, variant, size, fullWidth, type = "button", ...props }) {
  return (
    <button
      className={buttonVariants({ variant, size, fullWidth, className })}
      type={type}
      {...props}
    />
  );
}

Button.propTypes = {
  className: PropTypes.string,
  variant: PropTypes.oneOf(["primary", "secondary", "ghost", "light", "outline"]),
  size: PropTypes.oneOf(["sm", "md", "lg"]),
  fullWidth: PropTypes.bool,
  type: PropTypes.oneOf(["button", "submit", "reset"])
};
