import { usePageTitle } from "@/hooks/usePageTitle";
import Card from "@/components/ui/Card";
import heroImage from "@/assets/hero-bg.png";

const values = [
  ["Plan faster", "Reduce the friction of researching trips from scratch."],
  ["Compare smarter", "Surface route, stay, and budget options in one place."],
  ["Travel better", "Keep the experience human while AI handles the heavy lifting."],
];

export default function AboutPage() {
  usePageTitle("About");

  return (
    <div className="py-8 sm:py-12">
      <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        <div className="max-w-4xl space-y-6">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-300">About Trip Tailor</p>
          <h1 className="text-3xl font-semibold text-white sm:text-4xl">A simple idea: make travel planning feel guided, not overwhelming.</h1>
          <p className="max-w-3xl text-sm leading-7 text-slate-300 sm:text-base">
            Trip Tailor started as a way to reduce the noise around trip planning. The goal is to keep the experience approachable while still giving travelers a smarter starting point.
          </p>
        </div>
        <img
          src={heroImage}
          alt="Travel planning collage"
          className="h-72 w-full rounded-3xl border border-white/10 object-cover shadow-2xl shadow-black/20"
        />
      </div>

      <div className="mt-8 grid gap-5 md:grid-cols-3">
        {values.map(([title, description]) => (
          <Card key={title} className="border-white/10 bg-white/5 text-white shadow-lg shadow-black/10">
            <h2 className="text-xl font-semibold">{title}</h2>
            <p className="mt-3 text-sm leading-6 text-slate-300">{description}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}
