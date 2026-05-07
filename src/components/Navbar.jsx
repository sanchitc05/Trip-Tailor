import { Link } from "react-router-dom";
import { mainNavigation } from "@/constants/navigation";
import Button from "@/components/ui/Button";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-slate-950/85 backdrop-blur-xl">
      <div className="page-shell flex items-center justify-between py-4">
        <Link to="/" className="text-lg font-semibold tracking-tight">
          Trip Tailor
        </Link>
        <nav className="hidden gap-6 lg:flex">
          {mainNavigation.slice(0, 6).map((item) => (
            <Link key={item.path} className="text-sm text-slate-300 hover:text-white" to={item.path}>
              {item.label}
            </Link>
          ))}
        </nav>
        <Link to="/auth/sign-in">
          <Button variant="ghost">Sign In</Button>
        </Link>
      </div>
    </header>
  );
}
