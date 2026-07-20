import React from "react";
import { cn } from "@/lib/utils";

const Input = React.forwardRef(function Input({ className, ...props }, ref) {
  return (
    <input
      ref={ref}
      className={cn(
        "flex h-12 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-slate-500 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 light:border-slate-200 light:bg-white light:text-slate-900 light:placeholder:text-slate-400",
        className
      )}
      {...props}
    />
  );
});

export { Input };
