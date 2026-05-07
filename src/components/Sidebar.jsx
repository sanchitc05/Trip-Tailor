import { NavLink } from "react-router-dom";
import { mainNavigation } from "@/constants/navigation";

export default function Sidebar() {
  return (
    <aside className="hidden w-64 border-r border-white/10 bg-slate-900/50 p-4 lg:block">
      <p className="mb-4 text-xs uppercase tracking-[0.2em] text-slate-400">Workspace</p>
      <nav className="space-y-1">
        {mainNavigation.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `block rounded-lg px-3 py-2 text-sm ${isActive ? "bg-brand-500 text-white" : "text-slate-300 hover:bg-white/5"}`
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
