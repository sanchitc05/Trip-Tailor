import Card from "@/components/ui/Card";

export default function DestinationCard({ image, title, description, label }) {
  return (
    <Card className="overflow-hidden border-white/10 bg-white/5 p-0 text-white shadow-lg shadow-black/10">
      <div className="relative h-56 overflow-hidden">
        <img src={image} alt={title} className="h-full w-full object-cover transition duration-500 hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/30 to-transparent" />
        <div className="absolute bottom-4 left-4 right-4">
          <span className="inline-flex rounded-full bg-white/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.2em] text-white/90 backdrop-blur">
            {label}
          </span>
          <h3 className="mt-3 text-2xl font-semibold">{title}</h3>
        </div>
      </div>
      <div className="space-y-4 p-5">
        <p className="text-sm leading-6 text-slate-300">{description}</p>
      </div>
    </Card>
  );
}