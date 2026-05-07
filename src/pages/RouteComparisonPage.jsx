import { RouteCard } from "@/components/cards/Cards";
import SkeletonCard from "@/components/loaders/SkeletonCard";
import { usePageTitle } from "@/hooks/usePageTitle";
import { useRouteComparison } from "@/hooks/useTravelData";

export default function RouteComparisonPage() {
  usePageTitle("Route Comparison");
  const routes = useRouteComparison({ from: "Delhi", to: "Jaipur" });

  if (routes.isLoading) return <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">{[1,2,3,4].map((i)=><SkeletonCard key={i} />)}</div>;
  return <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">{routes.data?.map((r) => <RouteCard key={r.mode} {...r} />)}</div>;
}
