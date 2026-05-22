import { useState } from "react";
import * as Tabs from "@radix-ui/react-tabs";
import Card from "@/components/ui/Card";
import ExpenseBarChart from "@/components/charts/ExpenseBarChart";
import { TripCard } from "@/components/cards/Cards";
import SkeletonCard from "@/components/loaders/SkeletonCard";
import EmptyState from "@/components/common/EmptyState";
import { usePageTitle } from "@/hooks/usePageTitle";
import { useAuthStore } from "@/store/authStore";
import { useTrips } from "@/hooks/useTrips";
import { useExpenses } from "@/hooks/useExpenses";
import { Plane, Wallet, ChevronLeft, ChevronRight } from "lucide-react";
import Button from "@/components/ui/Button";

export default function DashboardPage() {
  usePageTitle("Dashboard");
  const { user } = useAuthStore();
  
  const [tripsPage, setTripsPage] = useState(0);
  const [expensesPage, setExpensesPage] = useState(0);
  const LIMIT = 6;

  const trips = useTrips({ skip: tripsPage * LIMIT, limit: LIMIT });
  const expenses = useExpenses({ skip: expensesPage * LIMIT, limit: LIMIT });

  const tripsData = trips.data?.items || [];
  const expensesData = expenses.data?.items || [];

  const totalExpenses = expenses.data?.total_amount || expensesData.reduce((sum, exp) => sum + exp.amount, 0) || 0;
  
  const categoryTotals = expensesData.reduce((acc, exp) => {
    acc[exp.category] = (acc[exp.category] || 0) + exp.amount;
    return acc;
  }, {}) || {};

  const barChartData = Object.entries(categoryTotals).map(([category, total]) => ({
    category: category.charAt(0).toUpperCase() + category.slice(1),
    total,
  }));

  const plannedTrips = tripsData.filter(t => t.status === "planned");
  const ongoingTrips = tripsData.filter(t => t.status === "ongoing");
  const completedTrips = tripsData.filter(t => t.status === "completed");

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-white">
          Welcome back, {user?.full_name?.split(" ")[0] || "Explorer"} ✈️
        </h1>
      </div>

      {tripsData.length === 0 && !trips.isLoading && tripsPage === 0 ? (
        <EmptyState
          icon={Plane}
          title="No trips yet"
          description="Start planning your first adventure with our AI trip planner."
          ctaLabel="Plan a Trip"
          ctaHref="/plan"
        />
      ) : (
        <div className="space-y-6">
          <Tabs.Root defaultValue="planned" className="flex flex-col">
            <Tabs.List className="flex border-b border-white/10" aria-label="Manage your trips">
              <Tabs.Trigger
                value="planned"
                className="px-5 py-3 text-sm font-medium text-slate-400 transition-all hover:text-white data-[state=active]:border-b-2 data-[state=active]:border-brand-500 data-[state=active]:text-white"
              >
                Upcoming ({plannedTrips.length})
              </Tabs.Trigger>
              <Tabs.Trigger
                value="ongoing"
                className="px-5 py-3 text-sm font-medium text-slate-400 transition-all hover:text-white data-[state=active]:border-b-2 data-[state=active]:border-brand-500 data-[state=active]:text-white"
              >
                Ongoing ({ongoingTrips.length})
              </Tabs.Trigger>
              <Tabs.Trigger
                value="completed"
                className="px-5 py-3 text-sm font-medium text-slate-400 transition-all hover:text-white data-[state=active]:border-b-2 data-[state=active]:border-brand-500 data-[state=active]:text-white"
              >
                Completed ({completedTrips.length})
              </Tabs.Trigger>
            </Tabs.List>
            
            <Tabs.Content value="planned" className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {trips.isLoading ? [1, 2, 3].map(i => <SkeletonCard key={i} />) : plannedTrips.map((t) => (
                <TripCard 
                  key={t.id} 
                  title={t.title} 
                  date={new Date(t.start_date).toLocaleDateString()} 
                  budget={t.budget || 0} 
                />
              ))}
              {!trips.isLoading && plannedTrips.length === 0 && (
                <div className="col-span-full py-8 text-center text-slate-400">
                  No upcoming trips found.
                </div>
              )}
            </Tabs.Content>
            
            <Tabs.Content value="ongoing" className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {trips.isLoading ? [1, 2, 3].map(i => <SkeletonCard key={i} />) : ongoingTrips.map((t) => (
                <TripCard 
                  key={t.id} 
                  title={t.title} 
                  date={new Date(t.start_date).toLocaleDateString()} 
                  budget={t.budget || 0} 
                />
              ))}
              {!trips.isLoading && ongoingTrips.length === 0 && (
                <div className="col-span-full py-8 text-center text-slate-400">
                  No trips currently in progress.
                </div>
              )}
            </Tabs.Content>
            
            <Tabs.Content value="completed" className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {trips.isLoading ? [1, 2, 3].map(i => <SkeletonCard key={i} />) : completedTrips.map((t) => (
                <TripCard 
                  key={t.id} 
                  title={t.title} 
                  date={new Date(t.start_date).toLocaleDateString()} 
                  budget={t.budget || 0} 
                />
              ))}
              {!trips.isLoading && completedTrips.length === 0 && (
                <div className="col-span-full py-8 text-center text-slate-400">
                  No completed trips in your history.
                </div>
              )}
            </Tabs.Content>
          </Tabs.Root>

          <div className="flex items-center justify-end gap-2 pt-2">
            <Button
              variant="ghost"
              size="sm"
              disabled={tripsPage === 0 || trips.isLoading}
              onClick={() => setTripsPage(p => p - 1)}
              className="h-8 w-8 p-0"
            >
              <ChevronLeft size={16} />
            </Button>
            <span className="text-xs font-medium text-slate-500">Page {tripsPage + 1}</span>
            <Button
              variant="ghost"
              size="sm"
              disabled={tripsData.length < LIMIT || trips.isLoading}
              onClick={() => setTripsPage(p => p + 1)}
              className="h-8 w-8 p-0"
            >
              <ChevronRight size={16} />
            </Button>
          </div>
        </div>
      )}

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <h3 className="mb-6 text-xl font-semibold text-white">
            Expense Breakdown (Total: ₹{totalExpenses.toLocaleString("en-IN")})
          </h3>
          {expensesData.length > 0 ? (
            <ExpenseBarChart data={barChartData} />
          ) : (
            <div className="flex h-72 items-center justify-center rounded-xl bg-white/5">
              <EmptyState
                icon={Wallet}
                title="No expenses tracked"
                description="Add your travel costs to see a visual breakdown of your spending."
                ctaLabel="Track Expenses"
                ctaHref="/expenses"
              />
            </div>
          )}
          
          <div className="mt-4 flex items-center justify-end gap-2">
            <Button
              variant="ghost"
              size="sm"
              disabled={expensesPage === 0 || expenses.isLoading}
              onClick={() => setExpensesPage(p => p - 1)}
              className="h-8 w-8 p-0"
            >
              <ChevronLeft size={16} />
            </Button>
            <span className="text-xs font-medium text-slate-500">Page {expensesPage + 1}</span>
            <Button
              variant="ghost"
              size="sm"
              disabled={expensesData.length < LIMIT || expenses.isLoading}
              onClick={() => setExpensesPage(p => p + 1)}
              className="h-8 w-8 p-0"
            >
              <ChevronRight size={16} />
            </Button>
          </div>
        </Card>

        <Card>
          <h3 className="mb-4 text-xl font-semibold text-white">Recent Activity</h3>
          <div className="space-y-4">
            {tripsData.slice(0, 5).map(t => (
              <div key={t.id} className="flex flex-col border-b border-white/5 pb-3 last:border-0">
                <span className="font-medium text-slate-200">{t.title}</span>
                <span className="text-xs text-slate-500 uppercase tracking-wider mt-1">
                  {t.status} • {new Date(t.created_at).toLocaleDateString()}
                </span>
              </div>
            ))}
            {tripsData.length === 0 && !trips.isLoading && (
              <p className="text-sm text-slate-400">No recent activity.</p>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}
