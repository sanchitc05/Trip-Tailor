import { cn } from "@/utils/cn";

export default function Card({ className, children }) {
  return (
    <div className={cn("glass-panel rounded-2xl p-5 shadow-xl shadow-black/20", className)}>
      {children}
    </div>
  );
}
