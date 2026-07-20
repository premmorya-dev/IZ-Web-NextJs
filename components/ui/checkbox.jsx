import React from "react";
import { cn } from "@/lib/utils";

const Checkbox = React.forwardRef(function Checkbox({ className, ...props }, ref) {
  return (
    <input
      ref={ref}
      type="checkbox"
      className={cn(
        "h-4 w-4 rounded border border-white/15 bg-white/5 text-primary focus:ring-primary/60 light:border-slate-300 light:bg-white",
        className
      )}
      {...props}
    />
  );
});

export { Checkbox };
