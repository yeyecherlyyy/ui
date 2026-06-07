// src/routes/reports.tsx
import { createFileRoute, Link } from "@tanstack/react-router";
import { useAppStore } from "@/store/useAppStore";

export const Route = createFileRoute("/reports")({
  component: Reports,
});

function Reports() {
  const scans = useAppStore((state) => state.scans);
  const scanList = Object.values(scans).sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );

  return (
    <div className="p-6 max-w-4xl mx-auto pt-24">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-display uppercase tracking-tight">Scan Reports</h1>
        <Link
          to="/scans"
          className="border border-acid text-acid px-4 py-2 font-mono text-xs uppercase tracking-widest hover:bg-acid hover:text-ink transition"
        >
          New Scan +
        </Link>
      </div>

      {scanList.length === 0 ? (
        <div className="border border-border border-dashed p-12 text-center text-bone/40 font-mono text-sm">
          No scans executed yet. Run your first scan to generate a report.
        </div>
      ) : (
        <div className="space-y-4">
          {scanList.map((scan) => (
            <Link
              key={scan.id}
              to="/report/$id"
              params={{ id: scan.id }}
              className="block border border-border bg-card/30 backdrop-blur-md p-6 hover:border-acid transition-colors group"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-acid text-lg group-hover:text-signal transition-colors">
                  #{scan.id}
                </span>
                <span className="font-mono text-xs text-bone/40">
                  {new Date(scan.createdAt).toLocaleString()}
                </span>
              </div>
              <div className="flex items-center gap-6 font-mono text-sm text-bone/70">
                <div>
                  Status:{" "}
                  <span
                    className={
                      scan.status === "completed"
                        ? "text-acid"
                        : scan.status === "failed"
                          ? "text-destructive"
                          : "text-warn"
                    }
                  >
                    {scan.status}
                  </span>
                </div>
                <div>
                  Findings: <span className="text-bone">{scan.findings?.length || 0}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
