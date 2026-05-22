import { Link } from "react-router-dom";
import Button from "../ui/Button";

export default function EmptyState({ icon: Icon, title, description, ctaLabel, ctaHref }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-white/10 bg-white/5 p-12 text-center">
      <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-brand-500/10 text-brand-400">
        {typeof Icon === "string" ? (
          <span className="text-4xl">{Icon}</span>
        ) : (
          <Icon size={40} />
        )}
      </div>
      <h3 className="mb-2 text-xl font-semibold text-white">{title}</h3>
      <p className="mb-8 max-w-xs text-sm text-slate-400">
        {description}
      </p>
      {ctaLabel && ctaHref && (
        <Link to={ctaHref}>
          <Button className="px-8">{ctaLabel}</Button>
        </Link>
      )}
    </div>
  );
}
