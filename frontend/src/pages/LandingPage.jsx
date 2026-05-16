import Card from "@/components/ui/Card";
import HeroSection from "@/components/HeroSection";
import { usePageTitle } from "@/hooks/usePageTitle";

export default function LandingPage() {
  usePageTitle("Home");
  return (
    <div className="space-y-12">
      <HeroSection />
      <section className="grid gap-4 sm:grid-cols-3">
        {["1.2M+ searches", "220+ destinations", "98% satisfaction"].map((stat) => (
          <Card key={stat} className="text-center text-lg font-medium">
            {stat}
          </Card>
        ))}
      </section>
      <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {["Smart planner", "Route intelligence", "AI recommendations", "Expense clarity"].map((f) => (
          <Card key={f}>
            <h3 className="text-lg font-medium">{f}</h3>
            <p className="mt-2 text-sm text-slate-300">Enterprise-grade travel UX for modern explorers.</p>
          </Card>
        ))}
      </section>
    </div>
  );
}
