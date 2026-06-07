// src/components/site/Header.tsx
import { Link } from "@tanstack/react-router";
import { useAppStore } from "@/store/useAppStore";

export function Header() {
  const { setModal } = useAppStore();

  return (
    <header className="fixed top-0 inset-x-0 z-50 border-b border-border/60 bg-background/70 backdrop-blur-xl">
      <div className="flex items-center justify-between px-6 py-3 font-mono text-xs tracking-widest uppercase">
        <div className="flex items-center gap-3">
          <span className="size-2 bg-acid animate-pulse rounded-full" />
          <Link to="/" className="text-bone hover:text-acid transition-colors">
            APIGUARD/<span className="text-acid">api.os</span>
          </Link>
          <span className="text-bone/40 hidden md:inline">
            // v4.2 · 47ms · all systems nominal
          </span>
        </div>
        <nav className="hidden md:flex items-center gap-6 text-bone/70">
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
          className="border border-acid text-acid px-3 py-1 hover:bg-acid hover:text-ink transition"
        >
          deploy_agent →
        </button>
      </div>
    </header>
  );
}
