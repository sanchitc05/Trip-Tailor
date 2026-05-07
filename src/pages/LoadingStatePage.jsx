import SkeletonCard from "@/components/loaders/SkeletonCard";
import { usePageTitle } from "@/hooks/usePageTitle";

export default function LoadingStatePage() {
  usePageTitle("Loading");
  return <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">{[1, 2, 3, 4, 5, 6].map((i) => <SkeletonCard key={i} />)}</div>;
}
