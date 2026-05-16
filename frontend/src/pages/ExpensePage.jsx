import { useMemo, useState } from "react";
import { Calculator, Car, Plane, TrainFront, BusFront } from "lucide-react";
import BudgetChart from "@/components/charts/BudgetChart";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import { usePageTitle } from "@/hooks/usePageTitle";

const transportRates = {
  flight: 5200,
  bus: 1200,
  train: 1800,
  car: 2600,
};

const accommodationRates = {
  budget: 1200,
  midrange: 2800,
  luxury: 6800,
};

const modeConfig = {
  flight: { label: "Flight", icon: Plane },
  bus: { label: "Bus", icon: BusFront },
  train: { label: "Train", icon: TrainFront },
  car: { label: "Car", icon: Car },
};

export default function ExpensePage() {
  usePageTitle("Expenses");

  const [form, setForm] = useState({
    source: "",
    destination: "",
    mode: "flight",
    departureDate: "",
    returnDate: "",
    fuelType: "petrol",
    busType: "State Transport",
    trainClass: "3AC",
    accommodation: "midrange",
    days: 4,
    travelers: 2,
  });
  const [calculated, setCalculated] = useState(false);

  const totals = useMemo(() => {
    const days = Math.max(Number(form.days) || 1, 1);
    const travelers = Math.max(Number(form.travelers) || 1, 1);
    const modeMultiplier = {
      flight: 1,
      bus: form.busType === "Private_AC" ? 1.5 : form.busType === "Private_Non-AC" ? 1.2 : 1,
      train: form.trainClass === "1AC" ? 2.1 : form.trainClass === "2AC" ? 1.6 : form.trainClass === "Sleeper" ? 0.75 : 1,
      car: form.fuelType === "diesel" ? 0.9 : 1,
    }[form.mode];

    const transport = Math.round(transportRates[form.mode] * modeMultiplier * travelers);
    const accommodation = accommodationRates[form.accommodation] * days;
    const food = 900 * days * travelers;
    const buffer = Math.round((transport + accommodation + food) * 0.08);

    return {
      transport,
      accommodation,
      food,
      buffer,
      total: transport + accommodation + food + buffer,
    };
  }, [form]);

  const chartData = [
    { name: "Transport", value: totals.transport },
    { name: "Accommodation", value: totals.accommodation },
    { name: "Food", value: totals.food },
    { name: "Buffer", value: totals.buffer },
  ];

  const updateField = (field) => (event) => {
    setForm((current) => ({ ...current, [field]: event.target.value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setCalculated(true);
  };

  const ActiveModeIcon = modeConfig[form.mode].icon;

  return (
    <div className="space-y-8 py-8 sm:py-12">
      <div className="max-w-3xl space-y-4">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-300">
          Travel Expense Calculator
        </p>
        <h1 className="text-3xl font-semibold text-white sm:text-4xl">
          Estimate fares, stays, food, and trip buffer.
        </h1>
        <p className="text-sm leading-7 text-slate-300 sm:text-base">
          A React port of the legacy calculator with mode-specific fields and a Recharts cost breakdown.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_0.9fr]">
        <Card className="border-white/10 bg-white/5 text-white shadow-lg shadow-black/10">
          <form className="space-y-5" onSubmit={handleSubmit}>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="space-y-2 text-sm text-slate-300">
                <span>Source City</span>
                <Input required placeholder="Mumbai" value={form.source} onChange={updateField("source")} />
              </label>
              <label className="space-y-2 text-sm text-slate-300">
                <span>Destination City</span>
                <Input required placeholder="Kerala" value={form.destination} onChange={updateField("destination")} />
              </label>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <label className="space-y-2 text-sm text-slate-300">
                <span>Mode of Transport</span>
                <select
                  className="w-full rounded-xl border border-white/10 bg-slate-900/70 px-3 py-3 text-white outline-none focus:ring-2 focus:ring-brand-500"
                  value={form.mode}
                  onChange={updateField("mode")}
                >
                  {Object.entries(modeConfig).map(([value, config]) => (
                    <option key={value} value={value}>
                      {config.label}
                    </option>
                  ))}
                </select>
              </label>
              <label className="space-y-2 text-sm text-slate-300">
                <span>Accommodation Type</span>
                <select
                  className="w-full rounded-xl border border-white/10 bg-slate-900/70 px-3 py-3 text-white outline-none focus:ring-2 focus:ring-brand-500"
                  value={form.accommodation}
                  onChange={updateField("accommodation")}
                >
                  <option value="budget">Budget</option>
                  <option value="midrange">Mid-range</option>
                  <option value="luxury">Luxury</option>
                </select>
              </label>
            </div>

            {form.mode === "flight" && (
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="space-y-2 text-sm text-slate-300">
                  <span>Departure Date</span>
                  <Input required type="date" value={form.departureDate} onChange={updateField("departureDate")} />
                </label>
                <label className="space-y-2 text-sm text-slate-300">
                  <span>Return Date</span>
                  <Input type="date" value={form.returnDate} onChange={updateField("returnDate")} />
                </label>
              </div>
            )}

            {form.mode === "car" && (
              <label className="block space-y-2 text-sm text-slate-300">
                <span>Fuel Type</span>
                <select
                  className="w-full rounded-xl border border-white/10 bg-slate-900/70 px-3 py-3 text-white outline-none focus:ring-2 focus:ring-brand-500"
                  value={form.fuelType}
                  onChange={updateField("fuelType")}
                >
                  <option value="petrol">Petrol</option>
                  <option value="diesel">Diesel</option>
                </select>
              </label>
            )}

            {form.mode === "bus" && (
              <label className="block space-y-2 text-sm text-slate-300">
                <span>Bus Type</span>
                <select
                  className="w-full rounded-xl border border-white/10 bg-slate-900/70 px-3 py-3 text-white outline-none focus:ring-2 focus:ring-brand-500"
                  value={form.busType}
                  onChange={updateField("busType")}
                >
                  <option value="State Transport">State Transport</option>
                  <option value="Private_AC">Private AC</option>
                  <option value="Private_Non-AC">Private Non-AC</option>
                </select>
              </label>
            )}

            {form.mode === "train" && (
              <label className="block space-y-2 text-sm text-slate-300">
                <span>Train Class</span>
                <select
                  className="w-full rounded-xl border border-white/10 bg-slate-900/70 px-3 py-3 text-white outline-none focus:ring-2 focus:ring-brand-500"
                  value={form.trainClass}
                  onChange={updateField("trainClass")}
                >
                  <option value="1AC">1AC</option>
                  <option value="2AC">2AC</option>
                  <option value="3AC">3AC</option>
                  <option value="Sleeper">Sleeper</option>
                  <option value="General">General</option>
                </select>
              </label>
            )}

            <div className="grid gap-4 sm:grid-cols-2">
              <label className="space-y-2 text-sm text-slate-300">
                <span>Days</span>
                <Input required min="1" type="number" value={form.days} onChange={updateField("days")} />
              </label>
              <label className="space-y-2 text-sm text-slate-300">
                <span>Travelers</span>
                <Input required min="1" type="number" value={form.travelers} onChange={updateField("travelers")} />
              </label>
            </div>

            <Button type="submit" className="w-full gap-2 py-3">
              <Calculator size={16} />
              Calculate Expense
            </Button>
          </form>
        </Card>

        <div className="space-y-6">
          <Card className="space-y-5 border-white/10 bg-white/5 text-white shadow-lg shadow-black/10">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-500/15 text-brand-200">
                <ActiveModeIcon size={26} />
              </div>
              <div>
                <p className="text-sm uppercase tracking-[0.2em] text-brand-200">Calculation Result</p>
                <h2 className="mt-1 text-4xl font-semibold">INR {totals.total.toLocaleString()}</h2>
              </div>
            </div>

            <div className="space-y-3 text-sm text-slate-300">
              {chartData.map((item) => (
                <div
                  key={item.name}
                  className="flex items-center justify-between rounded-2xl border border-white/10 bg-slate-950/50 px-4 py-3"
                >
                  <span>{item.name}</span>
                  <span className="font-medium text-white">INR {item.value.toLocaleString()}</span>
                </div>
              ))}
            </div>
            <p className="text-sm leading-6 text-slate-400">
              {calculated
                ? `Planning ${form.mode} travel from ${form.source} to ${form.destination}.`
                : "Fill the form and calculate to preview your route estimate."}
            </p>
          </Card>

          <Card className="border-white/10 bg-white/5 text-white shadow-lg shadow-black/10">
            <h3 className="text-lg font-semibold">Cost Breakdown</h3>
            <BudgetChart data={chartData} />
          </Card>
        </div>
      </div>
    </div>
  );
}
