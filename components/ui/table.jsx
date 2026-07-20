import React from "react";
import { cn } from "@/lib/utils";

const Table = React.forwardRef(function Table({ className, ...props }, ref) {
  return (
    <div className="w-full overflow-x-auto rounded-2xl border border-white/10 light:border-slate-200">
      <table ref={ref} className={cn("w-full caption-bottom text-sm", className)} {...props} />
    </div>
  );
});

const TableHeader = React.forwardRef(function TableHeader({ className, ...props }, ref) {
  return <thead ref={ref} className={cn("bg-white/5 light:bg-slate-50", className)} {...props} />;
});

const TableBody = React.forwardRef(function TableBody({ className, ...props }, ref) {
  return <tbody ref={ref} className={cn("[&_tr:last-child]:border-0", className)} {...props} />;
});

const TableRow = React.forwardRef(function TableRow({ className, ...props }, ref) {
  return (
    <tr
      ref={ref}
      className={cn(
        "border-b border-white/10 transition-colors hover:bg-white/5 light:border-slate-200 light:hover:bg-slate-50",
        className
      )}
      {...props}
    />
  );
});

const TableHead = React.forwardRef(function TableHead({ className, ...props }, ref) {
  return (
    <th
      ref={ref}
      className={cn(
        "h-12 px-4 text-left align-middle font-semibold text-slate-200 light:text-slate-800",
        className
      )}
      {...props}
    />
  );
});

const TableCell = React.forwardRef(function TableCell({ className, ...props }, ref) {
  return (
    <td
      ref={ref}
      className={cn("p-4 align-middle text-slate-300 light:text-slate-600", className)}
      {...props}
    />
  );
});

export { Table, TableBody, TableCell, TableHead, TableHeader, TableRow };
