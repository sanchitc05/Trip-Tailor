import { Loader } from "lucide-react";

export default function FullPageSpinner() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-slate-950/80 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-4">
        <Loader className="h-12 w-12 animate-spin text-brand-400" />
        <p className="text-sm font-medium tracking-widest text-slate-300 uppercase">
          Verifying Session
        </p>
      </div>
    </div>
  );
}
