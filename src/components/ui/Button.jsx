import { cn } from "@/utils/cn";

const variants = {
  primary: "bg-brand-500 hover:bg-brand-600 text-white",
  ghost: "border border-white/10 bg-white/5 hover:bg-white/10 text-white",
};

export default function Button({ className, variant = "primary", ...props }) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-medium transition",
        variants[variant],
        className,
      )}
      {...props}
    />
  );
}
