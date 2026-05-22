import { useState } from "react";
import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { usePageTitle } from "@/hooks/usePageTitle";
import { useGenerateItinerary } from "@/hooks/useTravelData";
import { useCreateTrip } from "@/hooks/useTrips";
import { useToast } from "@/context/ToastContext";

export default function TripPlannerPage() {
  usePageTitle("Trip Planner");
  const { pushToast } = useToast();
  const [form, setForm] = useState({ 
    destination: "", 
    startDate: "", 
    endDate: "", 
    interests: "", 
    budget: 1200,
    travelStyle: "balanced",
    groupSize: 1
  });
  
  const itinerary = useGenerateItinerary();
  const createTrip = useCreateTrip();

  const handleGenerate = () => {
    // Calculate duration
    let duration = 1;
    if (form.startDate && form.endDate) {
      const start = new Date(form.startDate);
      const end = new Date(form.endDate);
      duration = Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1;
    }
    
    itinerary.mutate({ ...form, duration });
  };

  const handleSaveTrip = () => {
    if (!itinerary.data) return;
    
    createTrip.mutate({
      title: `Trip to ${itinerary.data.destination}`,
      origin: "Current Location", // Placeholder or add to form
      destination: itinerary.data.destination,
      travel_mode: "flight", // Placeholder
      start_date: form.startDate,
      end_date: form.endDate,
      notes: `AI generated itinerary. Estimated cost: ₹${itinerary.data.estimated_cost}`,
    }, {
      onSuccess: () => {
        pushToast("Trip saved to your dashboard!", "success");
      }
    });
  };

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card className="space-y-3">
        <h2 className="text-xl font-semibold">Trip Inputs</h2>
        <Input placeholder="Destination" value={form.destination} onChange={(e) => setForm({ ...form, destination: e.target.value })} />
        <div className="grid grid-cols-2 gap-3">
          <Input type="date" value={form.startDate} onChange={(e) => setForm({ ...form, startDate: e.target.value })} />
          <Input type="date" value={form.endDate} onChange={(e) => setForm({ ...form, endDate: e.target.value })} />
        </div>
        <div className="space-y-1">
          <label className="text-sm text-slate-400">Budget: ₹{form.budget}</label>
          <Input type="range" min={200} max={20000} step={100} value={form.budget} onChange={(e) => setForm({ ...form, budget: Number(e.target.value) })} />
        </div>
        <Input placeholder="Interests: food, beaches, adventure" value={form.interests} onChange={(e) => setForm({ ...form, interests: e.target.value })} />
        <Button onClick={handleGenerate} disabled={itinerary.isPending} className="w-full">
          {itinerary.isPending ? "Generating..." : "Generate Itinerary"}
        </Button>
      </Card>
      
      <Card className="flex flex-col">
        <h2 className="text-xl font-semibold">AI Itinerary Generator</h2>
        <div className="mt-4 flex-grow overflow-auto max-h-[500px] space-y-4">
          {itinerary.isPending ? (
            <div className="flex h-40 items-center justify-center">
              <p className="animate-pulse text-slate-400">Tailoring your perfect trip...</p>
            </div>
          ) : itinerary.data ? (
            <div className="space-y-4">
              <div className="rounded-lg bg-white/5 p-4">
                <h3 className="font-medium text-brand-200">Destination: {itinerary.data.destination}</h3>
                <p className="text-sm text-slate-300">Duration: {itinerary.data.duration} days | Estimated Cost: ₹{itinerary.data.estimated_cost}</p>
              </div>
              
              <div className="space-y-3">
                {itinerary.data.itinerary?.map((day) => (
                  <div key={day.day} className="border-l-2 border-brand-500 pl-4 py-1">
                    <h4 className="font-medium">Day {day.day}</h4>
                    <ul className="mt-1 list-inside list-disc text-sm text-slate-300">
                      {day.activities.map((activity, idx) => (
                        <li key={idx}>{activity}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              
              <div className="mt-4">
                <h4 className="text-sm font-medium text-brand-200">Travel Tips</h4>
                <ul className="mt-1 list-inside list-disc text-xs text-slate-400">
                  {itinerary.data.tips?.map((tip, idx) => (
                    <li key={idx}>{tip}</li>
                  ))}
                </ul>
              </div>
              
              <Button variant="secondary" onClick={handleSaveTrip} disabled={createTrip.isPending} className="w-full mt-4">
                {createTrip.isPending ? "Saving..." : "Save to Dashboard"}
              </Button>
            </div>
          ) : (
            <p className="text-slate-400 italic">Generated schedule appears here with route suggestions and optimized time windows.</p>
          )}
        </div>
      </Card>
    </div>
  );
}
