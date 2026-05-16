import { usePageTitle } from "@/hooks/usePageTitle";

export default function ContributorsPage() {
  usePageTitle("Contributors");

  return (
    <div className="rounded-lg border border-slate-200 bg-white p-8 shadow-sm dark:border-white/10 dark:bg-white/5">
      <h1 className="text-3xl font-semibold">Contributors Page</h1>
      <p className="mt-3 text-slate-600 dark:text-slate-300">
        React route stub for Trip Tailor contributors.
      </p>
    </div>
  );
}
