import { usePageTitle } from "@/hooks/usePageTitle";
import DestinationCard from "@/components/cards/DestinationCard";
import keralaImage from "@/assets/kerala.png";
import ladakhImage from "@/assets/ladakh.png";
import shimlaImage from "@/assets/shimla.png";
import ootyImage from "@/assets/ooty.png";
import mysoreImage from "@/assets/mysore.png";
import andamanImage from "@/assets/andaman.png";

const destinations = [
  {
    title: "Kerala",
    label: "Backwaters",
    image: keralaImage,
    description: "Cruise the backwaters, stay in serene houseboats, and unwind with lush green views everywhere you go.",
  },
  {
    title: "Ladakh",
    label: "Adventure",
    image: ladakhImage,
    description: "High-altitude landscapes, dramatic passes, and clear skies make Ladakh a bucket-list road trip.",
  },
  {
    title: "Shimla",
    label: "Hill Station",
    image: shimlaImage,
    description: "Classic mountain town charm with cool weather, scenic walks, and easy access to Himachal getaways.",
  },
  {
    title: "Ooty",
    label: "Tea Country",
    image: ootyImage,
    description: "Rolling hills, tea gardens, and quiet weather make Ooty a relaxed escape for every kind of traveler.",
  },
  {
    title: "Mysore",
    label: "Heritage",
    image: mysoreImage,
    description: "Palaces, culture, and well-planned streets give Mysore a polished heritage experience.",
  },
  {
    title: "Andaman & Nicobar",
    label: "Island Escape",
    image: andamanImage,
    description: "Clear water, coral reefs, and island energy make this one of India's strongest coastal trips.",
  },
];

export default function DestinationsPage() {
  usePageTitle("Destinations");

  return (
    <div className="py-8 sm:py-12">
      <div className="mb-8 max-w-3xl space-y-4">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-300">Destinations</p>
        <h1 className="text-3xl font-semibold text-white sm:text-4xl">Popular Indian destinations to start with.</h1>
        <p className="text-sm leading-7 text-slate-300 sm:text-base">
          A simple starting point for inspiration while the planner works out the details.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {destinations.map((destination) => (
          <DestinationCard key={destination.title} {...destination} />
        ))}
      </div>
    </div>
  );
}
