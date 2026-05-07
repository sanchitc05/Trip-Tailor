import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

export function TripCard({ title, date, budget }) {
  return (
    <Card>
      <p className="text-sm text-slate-300">{date}</p>
      <h4 className="mt-1 text-lg font-medium">{title}</h4>
      <p className="mt-2 text-sm text-brand-50">Budget: ${budget}</p>
    </Card>
  );
}

export function RouteCard({ mode, time, cost, emissions }) {
  return (
    <Card>
      <h4 className="text-lg font-medium">{mode}</h4>
      <p className="mt-2 text-sm text-slate-300">Time: {time}</p>
      <p className="text-sm text-slate-300">Cost: ${cost}</p>
      <p className="text-sm text-slate-300">CO2: {emissions}kg</p>
    </Card>
  );
}

export function HotelCard({ name, price, rating }) {
  return (
    <Card>
      <div className="h-32 rounded-xl bg-gradient-to-br from-brand-900 to-slate-800" />
      <h4 className="mt-3 text-lg font-medium">{name}</h4>
      <p className="text-sm text-slate-300">${price}/night</p>
      <p className="text-sm text-amber-300">Rating: {rating}</p>
    </Card>
  );
}

export function RecommendationCard({ title, description, saved, onToggleSave }) {
  return (
    <Card>
      <h4 className="text-lg font-medium">{title}</h4>
      <p className="mt-2 text-sm text-slate-300">{description}</p>
      <Button variant="ghost" className="mt-4" onClick={onToggleSave}>
        {saved ? "Saved" : "Save"}
      </Button>
    </Card>
  );
}
