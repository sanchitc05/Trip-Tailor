import { useMemo, useRef, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  Loader,
  MapPinned,
  Sparkles,
} from "lucide-react";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import TripMap from "@/components/TripMap";
import { usePageTitle } from "@/hooks/usePageTitle";
import { tripService } from "@/services/tripService";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
} from "recharts";
import heroImage from "@/assets/hero-bg.png";

const TRAVEL_STYLES = ["adventure", "relaxation", "cultural", "luxury"];
const COLORS = ["#3b82f6", "#ef4444", "#f59e0b", "#8b5cf6", "#ec4899"];
const STEPS = ["Destination", "Travel Dates", "Budget", "Preferences", "Review"];

const emptyState = {
  destination: "",
  start_date: "",
  end_date: "",
  budget: "",
  duration: "",
  travel_style: "adventure",
  group_size: "1",
  interests: "",
};

export default function PlannerPage() {
  usePageTitle("Planner");

  const resultRef = useRef(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [form, setForm] = useState(emptyState);

  const updateField = (field) => (event) => {
    setForm((current) => ({ ...current, [field]: event.target.value }));
  };

  const isStepValid = useMemo(() => {
    switch (currentStep) {
      case 0:
        return Boolean(form.destination.trim());
      case 1:
        return Boolean(form.start_date && form.end_date && form.start_date <= form.end_date);
      case 2:
        return Boolean(Number(form.budget) > 0 && Number(form.duration) > 0 && Number(form.group_size) > 0);
      case 3:
        return Boolean(form.travel_style);
      default:
        return true;
    }
  }, [currentStep, form]);

  const mutation = useMutation({
    mutationFn: (formData) =>
      tripService.getRecommendation({
        destination: formData.destination,
        budget: Number(formData.budget),
        duration: Number(formData.duration),
        travel_style: formData.travel_style,
        group_size: Number(formData.group_size),
        interests: formData.interests ? formData.interests.split(",").map(s => s.trim()) : [],
        start_date: formData.start_date,
        end_date: formData.end_date,
      }),
    onSuccess: () => {
      window.setTimeout(() => {
        resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 300);
    },
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    if (currentStep < STEPS.length - 1) {
      if (isStepValid) {
        setCurrentStep((step) => step + 1);
      }
      return;
    }

    mutation.mutate(form);
  };

  const handleBack = () => setCurrentStep((step) => Math.max(step - 1, 0));

  const budget = Number(form.budget) || 0;
  const duration = Number(form.duration) || 1;
  const dailyBudget = Math.max(Math.round(budget / duration), 0);
  const data = mutation.data;
  const mapWaypoints = data?.map_waypoints ?? data?.waypoints ?? [];
  const costBreakdown = data?.cost_breakdown ?? {
    accommodation: Math.round((data?.estimated_cost ?? 0) * 0.35),
    transportation: Math.round((data?.estimated_cost ?? 0) * 0.25),
    food: Math.round((data?.estimated_cost ?? 0) * 0.2),
    activities: Math.round((data?.estimated_cost ?? 0) * 0.15),
    miscellaneous: Math.max(Math.round((data?.estimated_cost ?? 0) * 0.05), 0),
    total: data?.estimated_cost ?? 0,
  };

  const pieData = [
    { name: "Accommodation", value: costBreakdown.accommodation },
    { name: "Transport", value: costBreakdown.transportation },
    { name: "Food", value: costBreakdown.food },
    { name: "Activities", value: costBreakdown.activities },
    { name: "Misc", value: costBreakdown.miscellaneous },
  ];

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
              AI Trip Planner
            </p>
            <h1 className="text-4xl font-black tracking-tight text-white sm:text-5xl">
              Plan your perfect trip with AI.
            </h1>
            <p className="max-w-xl text-sm leading-7 text-slate-300 sm:text-base">
              Follow the five-step flow from the roadmap, then generate a personalized itinerary, cost breakdown, and route suggestions powered by Google Gemini.
            </p>
            <div className="grid gap-3 sm:grid-cols-5">
              {STEPS.map((step, index) => (
                <div
                  key={step}
                  className={`rounded-2xl border px-3 py-2 text-xs font-semibold uppercase tracking-[0.16em] ${
                    index === currentStep
                      ? "border-brand-300 bg-brand-500/15 text-brand-100"
                      : index < currentStep
                        ? "border-emerald-400/30 bg-emerald-500/10 text-emerald-100"
                        : "border-white/10 bg-white/5 text-slate-300"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    {index < currentStep ? <CheckCircle2 size={12} /> : <span className="h-2 w-2 rounded-full bg-current" />}
                    {step}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Card className="border-white/10 bg-white/10 text-white">
            <form className="space-y-4" onSubmit={handleSubmit}>
              {currentStep === 0 && (
                <Input
                  required
                  placeholder="Destination (e.g., Kerala, Ladakh)"
                  value={form.destination}
                  onChange={updateField("destination")}
                />
              )}

              {currentStep === 1 && (
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-xs font-semibold uppercase text-slate-300">Start Date</label>
                    <Input
                      required
                      type="date"
                      value={form.start_date}
                      onChange={updateField("start_date")}
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-xs font-semibold uppercase text-slate-300">End Date</label>
                    <Input
                      required
                      type="date"
                      min={form.start_date || undefined}
                      value={form.end_date}
                      onChange={updateField("end_date")}
                    />
                  </div>
                </div>
              )}

              {currentStep === 2 && (
                <div className="grid gap-4 sm:grid-cols-2">
                  <Input
                    required
                    min="1000"
                    type="number"
                    placeholder="Budget in INR"
                    value={form.budget}
                    onChange={updateField("budget")}
                  />
                  <Input
                    required
                    min="1"
                    max="30"
                    type="number"
                    placeholder="Duration (days)"
                    value={form.duration}
                    onChange={updateField("duration")}
                  />
                </div>
              )}

              {currentStep === 3 && (
                <div className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="mb-2 block text-xs font-semibold uppercase text-slate-300">Travel Style</label>
                      <select
                        required
                        value={form.travel_style}
                        onChange={updateField("travel_style")}
                        className="w-full rounded-xl border border-white/10 bg-slate-900/70 p-3 text-sm text-white outline-none transition focus:ring-2 focus:ring-brand-500"
                      >
                        {TRAVEL_STYLES.map((style) => (
                          <option key={style} value={style} className="bg-slate-900">
                            {style.charAt(0).toUpperCase() + style.slice(1)}
                          </option>
                        ))}
                      </select>
                    </div>
                    <Input
                      required
                      min="1"
                      max="20"
                      type="number"
                      placeholder="Group size"
                      value={form.group_size}
                      onChange={updateField("group_size")}
                    />
                  </div>
                  <textarea
                    className="min-h-28 w-full rounded-xl border border-white/10 bg-slate-900/70 p-3 text-sm text-white outline-none transition placeholder:text-slate-400 focus:ring-2 focus:ring-brand-500"
                    placeholder="Interests (optional, comma-separated: beaches, hiking, food, culture)"
                    value={form.interests}
                    onChange={updateField("interests")}
                  />
                </div>
              )}

              {currentStep === 4 && (
                <div className="space-y-4 rounded-2xl border border-white/10 bg-slate-950/50 p-4 text-sm text-slate-200">
                  <div className="flex items-center gap-2 text-brand-200">
                    <CalendarDays size={16} />
                    Review your trip details
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="rounded-xl bg-white/5 p-3">
                      <p className="text-xs uppercase tracking-[0.16em] text-slate-400">Destination</p>
                      <p className="mt-1 font-semibold">{form.destination || "Not set"}</p>
                    </div>
                    <div className="rounded-xl bg-white/5 p-3">
                      <p className="text-xs uppercase tracking-[0.16em] text-slate-400">Travel Dates</p>
                      <p className="mt-1 font-semibold">
                        {form.start_date && form.end_date ? `${form.start_date} to ${form.end_date}` : "Not set"}
                      </p>
                    </div>
                    <div className="rounded-xl bg-white/5 p-3">
                      <p className="text-xs uppercase tracking-[0.16em] text-slate-400">Budget</p>
                      <p className="mt-1 font-semibold">₹{Number(form.budget || 0).toLocaleString()}</p>
                    </div>
                    <div className="rounded-xl bg-white/5 p-3">
                      <p className="text-xs uppercase tracking-[0.16em] text-slate-400">Duration</p>
                      <p className="mt-1 font-semibold">{form.duration || "0"} days</p>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex items-center justify-between gap-3 pt-2">
                <Button type="button" variant="ghost" onClick={handleBack} disabled={currentStep === 0 || mutation.isPending} className="gap-2">
                  <ArrowLeft size={16} />
                  Back
                </Button>
                <Button type="submit" disabled={mutation.isPending || !isStepValid} className="gap-2 py-3">
                  {currentStep === STEPS.length - 1 ? (
                    mutation.isPending ? (
                      <>
                        <Loader size={16} className="animate-spin" />
                        Generating...
                      </>
                    ) : (
                      <>
                        Get AI Recommendation
                        <ArrowRight size={16} />
                      </>
                    )
                  ) : (
                    <>
                      Next
                      <ArrowRight size={16} />
                    </>
                  )}
                </Button>
              </div>
            </form>
          </Card>
        </div>
      </section>

      {mutation.error && (
        <Card className="border-red-500/30 bg-red-500/10 text-red-200">
          <div className="flex items-start gap-3">
            <AlertCircle size={20} className="mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="font-semibold">Error generating recommendation</h3>
              <p className="mt-1 text-sm">{String(mutation.error)}</p>
            </div>
          </div>
        </Card>
      )}

      {data && (
        <div ref={resultRef} className="space-y-8">
          <Card className="border-white/10 bg-white/5 p-6 sm:p-8 text-white">
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-2">
                <p className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.2em] text-brand-300">
                  <Sparkles size={16} />
                  Your Personalized Itinerary
                </p>
                <h2 className="text-3xl font-bold">{data.destination}</h2>
                <p className="text-sm text-slate-300">
                  {data.duration} days • Travel style: {form.travel_style} • Group: {form.group_size} people
                </p>
              </div>
              <div className="rounded-2xl bg-brand-500/15 px-4 py-2 text-right">
                <p className="text-xs font-semibold uppercase text-slate-400">Total Budget</p>
                <p className="text-2xl font-bold text-brand-200">
                  ₹{(data.estimated_cost ?? costBreakdown.total).toLocaleString()}
                </p>
              </div>
            </div>
          </Card>

          <div className="grid gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <Card className="border-white/10 bg-white/5 p-0 overflow-hidden">
                <TripMap waypoints={mapWaypoints} destination={data.destination} />
              </Card>
            </div>

            <Card className="border-white/10 bg-white/5 p-6 text-white">
              <h3 className="mb-4 text-lg font-bold">Cost Breakdown</h3>
              <ResponsiveContainer width="100%" height={260}>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name} ₹${value}`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {COLORS.map((color, index) => (
                      <Cell key={`cell-${index}`} fill={color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `₹${Number(value).toLocaleString()}`} />
                </PieChart>
              </ResponsiveContainer>
              <div className="mt-4 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-400">Accommodation:</span>
                  <span>₹{costBreakdown.accommodation.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Transport:</span>
                  <span>₹{costBreakdown.transportation.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Food:</span>
                  <span>₹{costBreakdown.food.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Activities:</span>
                  <span>₹{costBreakdown.activities.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Misc:</span>
                  <span>₹{costBreakdown.miscellaneous.toLocaleString()}</span>
                </div>
              </div>
            </Card>
          </div>

          <Card className="border-white/10 bg-white/5 p-6 text-white">
            <h3 className="mb-6 text-lg font-bold">Day-by-Day Itinerary</h3>
            <div className="space-y-4">
              {data.itinerary.map((day, index) => (
                <div
                  key={day.day}
                  className="rounded-xl border border-white/10 bg-slate-900/50 p-4"
                >
                  <div className="mb-3 flex items-center justify-between">
                    <h4 className="text-sm font-bold uppercase tracking-wide text-brand-300">
                      Day {day.day}
                    </h4>
                    <span className="text-xs font-semibold text-slate-400">
                      ₹{day.estimated_cost.toLocaleString()}
                    </span>
                  </div>
                  <ul className="space-y-1 text-sm text-slate-300">
                    {day.activities.map((activity, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-brand-400 flex-shrink-0" />
                        {activity}
                      </li>
                    ))}
                  </ul>
                  {day.meals && (
                    <div className="mt-3 border-t border-white/10 pt-3 text-xs text-slate-400">
                      {day.meals.breakfast && <p>🍳 Breakfast: {day.meals.breakfast}</p>}
                      {day.meals.lunch && <p>🍜 Lunch: {day.meals.lunch}</p>}
                      {day.meals.dinner && <p>🍽️ Dinner: {day.meals.dinner}</p>}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </Card>

          <Card className="border-white/10 bg-white/5 p-6 text-white">
            <h3 className="mb-4 text-lg font-bold">Travel Tips</h3>
            <ul className="space-y-2">
              {data.tips.map((tip, idx) => (
                <li key={idx} className="flex items-start gap-3 text-sm text-slate-300">
                  <span className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-brand-400 flex-shrink-0" />
                  {tip}
                </li>
              ))}
            </ul>
          </Card>
        </div>
      )}
    </div>
  );
}
