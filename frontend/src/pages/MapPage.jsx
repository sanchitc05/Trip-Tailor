import MapWrapper from "@/components/map/MapWrapper";
import JourneyTimeline from "@/components/timeline/JourneyTimeline";
import { usePageTitle } from "@/hooks/usePageTitle";

export default function MapPage() {
  usePageTitle("Interactive Map");
  return (
    <div className="space-y-4">
      <MapWrapper />
      <JourneyTimeline
        points={[
          { time: "08:30", title: "Depart Delhi" },
          { time: "10:40", title: "Arrive Jaipur" },
          { time: "12:20", title: "Check-in + Lunch" },
        ]}
      />
    </div>
  );
}
