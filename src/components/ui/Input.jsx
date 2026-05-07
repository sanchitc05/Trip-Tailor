import { cn } from "@/utils/cn";

export default function Input({ className, ...props }) {
  return (
    <input
      className={cn(
        "w-full rounded-xl border border-white/10 bg-slate-900/70 px-3 py-2 text-sm outline-none ring-brand-500 placeholder:text-slate-400 focus:ring-2",
        className,
      )}
      {...props}
    />
  );
}
