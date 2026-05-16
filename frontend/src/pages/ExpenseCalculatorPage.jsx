import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import BudgetChart from "@/components/charts/BudgetChart";
import { usePageTitle } from "@/hooks/usePageTitle";
import { useExpenseBreakdown } from "@/hooks/useTravelData";

export default function ExpenseCalculatorPage() {
  usePageTitle("Expense Calculator");
  const expense = useExpenseBreakdown({ destination: "Jaipur" });

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card>
        <h2 className="text-xl font-semibold">Dynamic Budget Calculator</h2>
        <div className="mt-4 space-y-3">
          <label className="text-sm text-slate-300">Trip length</label>
          <Input type="range" min={2} max={30} />
          <label className="text-sm text-slate-300">Accommodation class</label>
          <Input type="range" min={1} max={5} />
        </div>
      </Card>
      <Card>
        <h2 className="text-xl font-semibold">Category Breakdown</h2>
        <BudgetChart data={expense.data || []} />
      </Card>
    </div>
  );
}
