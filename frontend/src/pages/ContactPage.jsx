import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { usePageTitle } from "@/hooks/usePageTitle";

export default function ContactPage() {
  usePageTitle("Contact");
  return (
    <div className="mx-auto max-w-2xl">
      <Card className="space-y-3">
        <h1 className="text-2xl font-semibold">Contact Trip Tailor</h1>
        <Input placeholder="Name" />
        <Input placeholder="Email" />
        <textarea className="min-h-32 w-full rounded-xl border border-white/10 bg-slate-900/70 p-3" placeholder="Message" />
        <Button>Send Message</Button>
      </Card>
    </div>
  );
}
