// src/components/site/Header.tsx
import { Link } from "@tanstack/react-router";
import { useAppStore } from "@/store/useAppStore";

export function Header() {
  const { setModal } = useAppStore();

  return (
    <header className="fixed top-4 left-1/2 -translate-x-1/2 w-[95%] max-w-[1400px] z-50 border border-border/40 bg-card/80 backdrop-blur-xl shadow-sm rounded-full">
      <div className="flex items-center justify-between px-6 py-3 font-display font-medium text-sm">
        <div className="flex items-center gap-3">
          <span className="size-2 bg-acid animate-pulse rounded-full" />
          <Link to="/" className="text-bone hover:text-acid transition-colors">
            APIGUARD/<span className="text-acid">api.os</span>
          </Link>
          <span className="text-bone/40 hidden md:inline font-mono text-xs">
            // v4.2 · all systems nominal
          </span>
        </div>
        <nav className="hidden md:flex items-center gap-8 text-bone/70">
          <Link to="/monitor" className="hover:text-acid">
            monitor
          </Link>
          <Link to="/integrations" className="hover:text-acid">
            integrations
          </Link>

          <Link to="/scans" className="hover:text-acid">
            scans
          </Link>
          <Link to="/reports" className="hover:text-acid">
            reports
          </Link>
          <Link to="/settings" className="hover:text-acid">
            settings
          </Link>
        </nav>
        <button
          onClick={() => setModal("deploy")}
          className="bg-acid text-ink px-5 py-2 rounded-full hover:shadow-md hover:-translate-y-0.5 transition-all"
        >
          Deploy Agent
        </button>
      </div>
    </header>
  );
}
