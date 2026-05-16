import { usePageTitle } from "@/hooks/usePageTitle";
import { useEffect, useState } from "react";
import Card from "@/components/ui/Card";

const owner = "sanchitc05";
const repo = "Trip-Tailor";
const fallbackContributors = [
  {
    id: "fallback-sanchit",
    login: "sanchitc05",
    contributions: "Project maintainer",
    html_url: "https://github.com/sanchitc05",
    avatar_url: "https://github.com/sanchitc05.png",
  },
];

export default function ContributorsPage() {
  usePageTitle("Contributors");

  const [contributors, setContributors] = useState([]);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    let isMounted = true;

    async function loadContributors() {
      try {
        const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/contributors`);
        if (!response.ok) {
          throw new Error("Failed to fetch contributors");
        }
        const data = await response.json();
        if (isMounted) {
          setContributors(data);
          setStatus("ready");
        }
      } catch {
        if (isMounted) {
          setContributors(fallbackContributors);
          setStatus("ready");
        }
      }
    }

    loadContributors();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="py-8 sm:py-12">
      <div className="max-w-3xl space-y-4">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-300">Contributors</p>
        <h1 className="text-3xl font-semibold text-white sm:text-4xl">Meet the people behind the repo.</h1>
        <p className="text-sm leading-7 text-slate-300 sm:text-base">
          This page mirrors the old GitHub-powered contributor view and keeps the layout focused on the people who helped build Trip Tailor.
        </p>
      </div>

      <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {status === "loading" && <p className="text-sm text-slate-300">Loading contributors...</p>}
        {contributors.map((contributor) => (
          <Card key={contributor.id} className="border-white/10 bg-white/5 text-white shadow-lg shadow-black/10">
            <img
              src={contributor.avatar_url}
              alt={contributor.login}
              className="h-24 w-24 rounded-3xl object-cover"
            />
            <h2 className="mt-4 text-xl font-semibold">{contributor.login}</h2>
            <p className="mt-1 text-sm text-slate-400">{contributor.contributions} contributions</p>
            <a
              href={contributor.html_url}
              target="_blank"
              rel="noreferrer"
              className="mt-4 inline-flex text-sm font-medium text-brand-200 transition hover:text-white"
            >
              GitHub profile
            </a>
          </Card>
        ))}
      </div>
    </div>
  );
}
