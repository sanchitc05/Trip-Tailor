import * as Dialog from "@radix-ui/react-dialog";
import * as Slider from "@radix-ui/react-slider";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Card from "@/components/ui/Card";

export function SearchBar({ placeholder = "Search destination..." }) {
  return (
    <div className="flex gap-2">
      <Input placeholder={placeholder} />
      <Button>Search</Button>
    </div>
  );
}

export function BaseModal({ triggerText = "Open", title = "Modal", children }) {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <Button variant="ghost">{triggerText}</Button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50" />
        <Dialog.Content className="fixed left-1/2 top-1/2 w-[90vw] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-white/10 bg-slate-900 p-5">
          <Dialog.Title className="text-lg font-semibold">{title}</Dialog.Title>
          <div className="mt-3">{children}</div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

export function PricingSlider() {
  return (
    <Card>
      <p className="mb-3 text-sm text-slate-300">Budget Priority</p>
      <Slider.Root defaultValue={[50]} max={100} step={1} className="relative flex h-5 w-full items-center">
        <Slider.Track className="relative h-1 w-full grow rounded-full bg-white/20">
          <Slider.Range className="absolute h-full rounded-full bg-brand-500" />
        </Slider.Track>
        <Slider.Thumb className="block h-4 w-4 rounded-full bg-white shadow" />
      </Slider.Root>
    </Card>
  );
}
