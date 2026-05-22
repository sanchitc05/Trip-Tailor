import { useState } from "react";
import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import BudgetChart from "@/components/charts/BudgetChart";
import { usePageTitle } from "@/hooks/usePageTitle";
import { useExpenses, useCreateExpense, useDeleteExpense } from "@/hooks/useExpenses";
import { useTrips } from "@/hooks/useTrips";
import { useToast } from "@/context/ToastContext";
import { Trash2 } from "lucide-react";

export default function ExpenseCalculatorPage() {
  usePageTitle("Expense Calculator");
  const { pushToast } = useToast();
  const [form, setForm] = useState({ 
    category: "Food", 
    amount: "", 
    description: "", 
    date: new Date().toISOString().split("T")[0],
    trip_id: ""
  });

  const expenses = useExpenses();
  const trips = useTrips();
  const createExpense = useCreateExpense();
  const deleteExpense = useDeleteExpense();

  const handleAddExpense = () => {
    if (!form.amount || !form.category) return;
    
    createExpense.mutate({
      ...form,
      amount: Number(form.amount),
      trip_id: form.trip_id || null
    }, {
      onSuccess: () => {
        pushToast("Expense added!", "success");
        setForm({ ...form, amount: "", description: "" });
      }
    });
  };

  const handleDelete = (id) => {
    deleteExpense.mutate(id, {
      onSuccess: () => pushToast("Expense deleted", "info")
    });
  };

  // Format data for BudgetChart
  const expenseCategories = expenses.data?.reduce((acc, exp) => {
    acc[exp.category] = (acc[exp.category] || 0) + exp.amount;
    return acc;
  }, {}) || {};

  const chartData = Object.entries(expenseCategories).map(([name, value]) => ({
    name,
    value,
  }));

  const totalExpenses = expenses.data?.reduce((sum, exp) => sum + exp.amount, 0) || 0;

  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="space-y-4">
          <h2 className="text-xl font-semibold">Add New Expense</h2>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-xs text-slate-400">Category</label>
              <select 
                className="w-full rounded-md border border-white/10 bg-slate-900 p-2 text-sm text-white"
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
              >
                <option>Food</option>
                <option>Transport</option>
                <option>Accommodation</option>
                <option>Sightseeing</option>
                <option>Shopping</option>
                <option>Misc</option>
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-xs text-slate-400">Amount (₹)</label>
              <Input type="number" value={form.amount} onChange={(e) => setForm({ ...form, amount: e.target.value })} />
            </div>
          </div>
          
          <div className="space-y-1">
            <label className="text-xs text-slate-400">Description</label>
            <Input value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-xs text-slate-400">Date</label>
              <Input type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} />
            </div>
            <div className="space-y-1">
              <label className="text-xs text-slate-400">Link to Trip (Optional)</label>
              <select 
                className="w-full rounded-md border border-white/10 bg-slate-900 p-2 text-sm text-white"
                value={form.trip_id}
                onChange={(e) => setForm({ ...form, trip_id: e.target.value })}
              >
                <option value="">None</option>
                {trips.data?.map(t => (
                  <option key={t.id} value={t.id}>{t.title}</option>
                ))}
              </select>
            </div>
          </div>
          
          <Button onClick={handleAddExpense} disabled={createExpense.isPending} className="w-full mt-2">
            {createExpense.isPending ? "Adding..." : "Add Expense"}
          </Button>
        </Card>

        <Card>
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Category Breakdown</h2>
            <span className="text-lg font-bold text-brand-200">Total: ₹{totalExpenses}</span>
          </div>
          <div className="mt-4 flex h-[300px] items-center justify-center">
            {chartData.length > 0 ? (
              <BudgetChart data={chartData} />
            ) : (
              <p className="text-slate-400">No data to display. Add an expense to see the breakdown.</p>
            )}
          </div>
        </Card>
      </div>

      <Card>
        <h2 className="text-xl font-semibold mb-4">Recent Expenses</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-white/10 text-slate-400">
                <th className="pb-2 font-medium">Date</th>
                <th className="pb-2 font-medium">Category</th>
                <th className="pb-2 font-medium">Description</th>
                <th className="pb-2 font-medium">Amount</th>
                <th className="pb-2 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {expenses.data?.length > 0 ? (
                expenses.data.map((exp) => (
                  <tr key={exp.id} className="text-slate-300">
                    <td className="py-3">{new Date(exp.date).toLocaleDateString()}</td>
                    <td className="py-3">
                      <span className="rounded-full bg-brand-500/10 px-2 py-0.5 text-xs text-brand-400">
                        {exp.category}
                      </span>
                    </td>
                    <td className="py-3">{exp.description || "-"}</td>
                    <td className="py-3 font-medium text-white">₹{exp.amount}</td>
                    <td className="py-3 text-right">
                      <button 
                        onClick={() => handleDelete(exp.id)}
                        className="text-rose-400 hover:text-rose-300 transition"
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="py-8 text-center text-slate-500">
                    No expenses recorded yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
