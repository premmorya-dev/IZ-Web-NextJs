import { cn } from "@/lib/utils";

export function Separator({ className = "" }) {
  return <div className={cn("h-px w-full bg-white/10 light:bg-slate-200", className)} />;
}
