import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { HotelCard } from "@/components/cards/Cards";
import { usePageTitle } from "@/hooks/usePageTitle";
import { useHotels } from "@/hooks/useTravelData";

export default function AccommodationPage() {
  usePageTitle("Accommodations");
  const hotels = useHotels({ city: "Jaipur" });

  return (
    <div className="space-y-4">
      <Card className="grid gap-3 md:grid-cols-4">
        <Input placeholder="City or hotel" />
        <Input type="date" />
        <Input placeholder="Price range" />
        <Button>Apply Filters</Button>
      </Card>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {hotels.data?.map((hotel) => (
          <HotelCard key={hotel.id || hotel.name} name={hotel.name} price={hotel.price} rating={hotel.rating} />
        ))}
      </div>
    </div>
  );
}
