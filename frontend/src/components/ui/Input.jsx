import { forwardRef } from "react";
import { cn } from "@/utils/cn";

const Input = forwardRef(function Input({ className, ...props }, ref) {
  return (
    <input
      ref={ref}
      className={cn(
        "w-full rounded-xl border border-white/10 bg-slate-900/70 px-3 py-2 text-sm outline-none ring-brand-500 placeholder:text-slate-400 focus:ring-2",
        className,
      )}
      {...props}
    />
  );
});

export default Input;
