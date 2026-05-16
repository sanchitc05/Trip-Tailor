import Card from "@/components/ui/Card";
import { usePageTitle } from "@/hooks/usePageTitle";

export default function ProfilePage() {
  usePageTitle("Profile");
  return (
    <div className="grid gap-5 lg:grid-cols-3">
      <Card><h3 className="text-lg font-semibold">Preferences</h3><p className="mt-2 text-slate-300">Adventure travel, eco stays, train-first routes.</p></Card>
      <Card><h3 className="text-lg font-semibold">Saved Trips</h3><p className="mt-2 text-slate-300">8 itineraries saved and synced.</p></Card>
      <Card><h3 className="text-lg font-semibold">Wishlist</h3><p className="mt-2 text-slate-300">Iceland, Peru, Georgia, New Zealand.</p></Card>
    </div>
  );
}
