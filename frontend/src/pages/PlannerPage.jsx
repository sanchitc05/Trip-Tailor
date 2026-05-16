import { useMemo, useRef, useState } from "react";
import { ArrowRight, Compass, MapPinned, Sparkles } from "lucide-react";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import { usePageTitle } from "@/hooks/usePageTitle";
import heroImage from "@/assets/hero-bg.png";
import keralaImage from "@/assets/kerala.png";
import ladakhImage from "@/assets/ladakh.png";
import andamanImage from "@/assets/andaman.png";

const recommendationRules = [
  {
    key: "beach",
    destination: "Andaman and Nicobar Islands",
    image: andamanImage,
    highlights: ["Radhanagar Beach", "Neil Island", "Snorkeling day trip"],
  },
  {
    key: "mountain",
    destination: "Ladakh",
    image: ladakhImage,
    highlights: ["Pangong Lake", "Leh markets", "Scenic monastery route"],
  },
  {
    key: "nature",
    destination: "Kerala",
    image: keralaImage,
    highlights: ["Alleppey backwaters", "Munnar tea gardens", "Local food trail"],
  },
];

function pickRecommendation(preferences) {
  const lowerPreferences = preferences.toLowerCase();
  return (
    recommendationRules.find((rule) => lowerPreferences.includes(rule.key)) ||
    recommendationRules[2]
  );
}

export default function PlannerPage() {
  usePageTitle("Planner");

  const resultRef = useRef(null);
  const [form, setForm] = useState({
    location: "",
    budget: "",
    days: "",
    preferences: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const recommendation = useMemo(
    () => pickRecommendation(form.preferences),
    [form.preferences],
  );

  const updateField = (field) => (event) => {
    setForm((current) => ({ ...current, [field]: event.target.value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true);
    window.setTimeout(() => {
      resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
  };

  const budget = Number(form.budget) || 0;
  const days = Number(form.days) || 1;
  const dailyBudget = Math.max(Math.round(budget / days), 0);

  return (
    <div className="space-y-10 py-8 sm:py-12">
      <section className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950">
        <img
          src={heroImage}
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-30"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-slate-950/75" />
        <div className="relative grid gap-8 p-6 sm:p-10 lg:grid-cols-[0.85fr_1.15fr] lg:p-12">
          <div className="space-y-5">
            <p className="inline-flex items-center gap-2 rounded-full border border-brand-400/30 bg-brand-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-brand-200">
              <Sparkles size={14} />
              Travel Recommendation
            </p>
            <h1 className="text-4xl font-black tracking-tight text-white sm:text-5xl">
              Get a personalized travel plan.
            </h1>
            <p className="max-w-xl text-sm leading-7 text-slate-300 sm:text-base">
              This React version ports the legacy recommendation form without exposing any client-side API keys.
            </p>
          </div>

          <Card className="border-white/10 bg-white/10 text-white">
            <form className="space-y-4" onSubmit={handleSubmit}>
              <Input
                required
                placeholder="Enter your current location"
                value={form.location}
                onChange={updateField("location")}
              />
              <div className="grid gap-4 sm:grid-cols-2">
                <Input
                  required
                  min="1000"
                  type="number"
                  placeholder="Your budget in INR"
                  value={form.budget}
                  onChange={updateField("budget")}
                />
                <Input
                  required
                  min="1"
                  type="number"
                  placeholder="Number of days"
                  value={form.days}
                  onChange={updateField("days")}
                />
              </div>
              <textarea
                required
                className="min-h-36 w-full rounded-xl border border-white/10 bg-slate-900/70 p-3 text-sm text-white outline-none transition placeholder:text-slate-400 focus:ring-2 focus:ring-brand-500"
                placeholder="Enter your preferences, for example beaches, mountains, food, nature"
                value={form.preferences}
                onChange={updateField("preferences")}
              />
              <Button type="submit" className="w-full gap-2 py-3">
                Get Recommendation
                <ArrowRight size={16} />
              </Button>
            </form>
          </Card>
        </div>
      </section>

      <section ref={resultRef} className="grid gap-6 lg:grid-cols-[1fr_0.85fr]">
        <Card className="overflow-hidden border-white/10 bg-white/5 p-0 text-white">
          <div className="grid gap-0 md:grid-cols-[0.9fr_1.1fr]">
            <img
              src={recommendation.image}
              alt={recommendation.destination}
              className="h-72 w-full object-cover md:h-full"
            />
            <div className="space-y-5 p-6">
              <p className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.2em] text-brand-300">
                <MapPinned size={16} />
                Your Personalized Travel Plan
              </p>
              <h2 className="text-3xl font-bold">
                {submitted ? recommendation.destination : "Recommendation preview"}
              </h2>
              <p className="text-sm leading-7 text-slate-300">
                {submitted
                  ? `Based on your ${days}-day trip from ${form.location}, this route balances your preferences with a daily budget of INR ${dailyBudget.toLocaleString()}.`
                  : "Submit the form to generate a local recommendation preview."}
              </p>
              <div className="grid gap-3">
                {recommendation.highlights.map((highlight) => (
                  <div
                    key={highlight}
                    className="rounded-2xl border border-white/10 bg-slate-950/50 px-4 py-3 text-sm text-slate-200"
                  >
                    {highlight}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Card>

        <Card className="space-y-5 border-white/10 bg-white/5 text-white">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-500/15 text-brand-200">
            <Compass size={26} />
          </div>
          <h2 className="text-2xl font-bold">Recommendation card</h2>
          <p className="text-sm leading-7 text-slate-300">
            The legacy page sent this data to Gemini directly from the browser. Phase 2 keeps the UI complete and local;
            Phase 3 moves the AI call into the FastAPI backend.
          </p>
          <div className="space-y-2 text-sm text-slate-300">
            <p>Budget: {budget ? `INR ${budget.toLocaleString()}` : "Not entered"}</p>
            <p>Days: {form.days || "Not entered"}</p>
            <p>Preferences: {form.preferences || "Not entered"}</p>
          </div>
        </Card>
      </section>
    </div>
  );
}
