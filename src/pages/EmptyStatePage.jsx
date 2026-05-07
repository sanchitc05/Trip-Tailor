import { Link } from "react-router-dom";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { usePageTitle } from "@/hooks/usePageTitle";

export default function EmptyStatePage() {
  usePageTitle("Empty");
  return (
    <Card className="mx-auto mt-10 max-w-xl text-center">
      <h2 className="text-2xl font-semibold">No Trips Yet</h2>
      <p className="mt-2 text-slate-300">Start by creating your first intelligent itinerary.</p>
      <div className="mt-4"><Link to="/trip-planner"><Button>Create Trip</Button></Link></div>
    </Card>
  );
}
