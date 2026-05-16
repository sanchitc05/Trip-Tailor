import { useState } from "react";
import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { usePageTitle } from "@/hooks/usePageTitle";
import { useGenerateItinerary } from "@/hooks/useTravelData";

export default function TripPlannerPage() {
  usePageTitle("Trip Planner");
  const [form, setForm] = useState({ destination: "", startDate: "", endDate: "", interests: "", budget: 1200 });
  const itinerary = useGenerateItinerary();

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card className="space-y-3">
        <h2 className="text-xl font-semibold">Trip Inputs</h2>
        <Input placeholder="Destination" value={form.destination} onChange={(e) => setForm({ ...form, destination: e.target.value })} />
        <div className="grid grid-cols-2 gap-3">
          <Input type="date" value={form.startDate} onChange={(e) => setForm({ ...form, startDate: e.target.value })} />
          <Input type="date" value={form.endDate} onChange={(e) => setForm({ ...form, endDate: e.target.value })} />
        </div>
        <Input type="range" min={200} max={8000} value={form.budget} onChange={(e) => setForm({ ...form, budget: Number(e.target.value) })} />
        <Input placeholder="Interests: food, beaches, adventure" value={form.interests} onChange={(e) => setForm({ ...form, interests: e.target.value })} />
        <Button onClick={() => itinerary.mutate(form)} disabled={itinerary.isPending}>
          {itinerary.isPending ? "Generating..." : "Generate Itinerary"}
        </Button>
      </Card>
      <Card>
        <h2 className="text-xl font-semibold">AI Itinerary Generator</h2>
        <p className="mt-3 text-slate-300">
          {itinerary.data?.summary || "Generated schedule appears here with route suggestions and optimized time windows."}
        </p>
      </Card>
    </div>
  );
}
