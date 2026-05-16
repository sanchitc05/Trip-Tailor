import Card from "@/components/ui/Card";
import BudgetChart from "@/components/charts/BudgetChart";
import { TripCard } from "@/components/cards/Cards";
import SkeletonCard from "@/components/loaders/SkeletonCard";
import { usePageTitle } from "@/hooks/usePageTitle";
import { useExpenseBreakdown, useUpcomingTrips } from "@/hooks/useTravelData";

export default function DashboardPage() {
  usePageTitle("Dashboard");
  const trips = useUpcomingTrips();
  const expenses = useExpenseBreakdown({ scope: "dashboard" });

  return (
    <div className="space-y-5">
      <h1 className="text-2xl font-semibold">Welcome back, Explorer</h1>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {trips.isLoading
          ? [1, 2, 3].map((i) => <SkeletonCard key={i} />)
          : trips.data?.map((t) => (
              <TripCard key={t.id || t.title} title={t.title} date={t.date} budget={t.budget} />
            ))}
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <h3 className="text-lg font-medium">Upcoming Trips</h3>
          <p className="mt-2 text-slate-300">Live itinerary data connected through query-backed services.</p>
        </Card>
        <Card>
          <h3 className="text-lg font-medium">Budget Overview</h3>
          <BudgetChart data={expenses.data || []} />
        </Card>
      </div>
    </div>
  );
}
