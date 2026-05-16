import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";

export default function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const nextProgress = scrollHeight > 0 ? (scrollTop / scrollHeight) * 360 : 0;

      setVisible(scrollTop > 100);
      setProgress(nextProgress);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      type="button"
      className="fixed bottom-6 right-6 z-50 grid h-14 w-14 place-items-center rounded-full text-slate-950 shadow-lg shadow-slate-900/20 transition hover:scale-105 dark:text-white"
      style={{
        background: `conic-gradient(#f59e0b ${progress}deg, rgba(148, 163, 184, 0.35) ${progress}deg)`,
      }}
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Scroll to top"
    >
      <span className="grid h-11 w-11 place-items-center rounded-full bg-white dark:bg-slate-950">
        <ArrowUp size={20} />
      </span>
    </button>
  );
}
