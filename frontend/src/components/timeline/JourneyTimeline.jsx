import Card from "@/components/ui/Card";

export default function JourneyTimeline({ points = [] }) {
  return (
    <Card>
      <h3 className="text-lg font-medium">Journey Timeline</h3>
      <div className="mt-4 space-y-4">
        {points.map((point, index) => (
          <div key={point.title} className="flex gap-3">
            <div className="flex flex-col items-center">
              <div className="h-2.5 w-2.5 rounded-full bg-brand-500" />
              {index !== points.length - 1 && <div className="h-10 w-px bg-white/20" />}
            </div>
            <div>
              <p className="text-sm text-slate-400">{point.time}</p>
              <p className="font-medium">{point.title}</p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
