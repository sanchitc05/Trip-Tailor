import { RecommendationCard } from "@/components/cards/Cards";
import { usePageTitle } from "@/hooks/usePageTitle";
import { useRecommendations, useToggleRecommendationSave } from "@/hooks/useTravelData";

export default function RecommendationsPage() {
  usePageTitle("Recommendations");
  const recommendations = useRecommendations();
  const toggleSave = useToggleRecommendationSave();
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {recommendations.data?.map((item) => (
        <RecommendationCard
          key={item.id || item.title}
          title={item.title}
          description={item.description}
          saved={Boolean(item.saved)}
          onToggleSave={() =>
            toggleSave.mutate({ id: item.id, saved: !item.saved })
          }
        />
      ))}
    </div>
  );
}
