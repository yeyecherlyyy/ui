import { createFileRoute, Link } from "@tanstack/react-router";
import { useAppStore } from "@/store/useAppStore";
import { motion } from "motion/react";

export const Route = createFileRoute("/reports")({
  component: Reports,
});

function Reports() {
  const scans = useAppStore((state) => state.scans);
  const scanList = Object.values(scans).sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );

  const getSeverityCounts = (findings: { severity: string }[] = []) => {
    return {
      critical: findings.filter((f) => f.severity === "critical").length,
      high: findings.filter((f) => f.severity === "high").length,
      medium: findings.filter((f) => f.severity === "medium").length,
      low: findings.filter((f) => f.severity === "low").length,
    };
  };

  return (
    <div className="p-6 max-w-5xl mx-auto pt-24">
      <div className="flex items-center justify-between mb-8 border-b border-border pb-6">
        <div>
          <div className="font-mono text-xs text-acid uppercase tracking-widest mb-3">
            [ reports.index ]
          </div>
          <h1 className="text-4xl md:text-5xl font-display uppercase tracking-tight">
            Scan Intelligence
          </h1>
        </div>
        <Link
          to="/scans"
          className="border border-acid bg-acid/10 text-acid px-6 py-3 font-mono text-sm uppercase tracking-widest hover:bg-acid hover:text-ink transition shadow-[0_0_15px_rgba(var(--acid-rgb),0.2)]"
        >
          New Scan +
        </Link>
      </div>

      {scanList.length === 0 ? (
        <div className="border border-border border-dashed p-16 text-center bg-card/10 backdrop-blur-md">
          <span className="font-mono text-acid text-2xl block mb-2">∅</span>
          <span className="font-mono text-sm text-bone/40 uppercase tracking-widest">
            No scans executed yet.
          </span>
        </div>
      ) : (
        <div className="space-y-4">
          {scanList.map((scan, i) => {
            const counts = getSeverityCounts(scan.findings);
            const total = scan.findings?.length || 0;
            return (
              <motion.div
                key={scan.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.4 }}
              >
                <Link
                  to="/report/$id"
                  params={{ id: scan.id }}
                  className="block border border-border bg-card/30 backdrop-blur-md p-6 hover:border-acid transition-colors group relative overflow-hidden"
                >
                  <div className="absolute top-0 left-0 w-1 h-full bg-border group-hover:bg-acid transition-colors" />

                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pl-4">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <span className="font-mono text-acid text-xl font-bold group-hover:text-signal transition-colors">
                          {scan.id.toUpperCase()}
                        </span>
                        <span
                          className={`font-mono text-[10px] uppercase px-2 py-0.5 border ${
                            scan.status === "completed"
                              ? "border-acid text-acid bg-acid/10"
                              : scan.status === "failed"
                                ? "border-destructive text-destructive bg-destructive/10"
                                : "border-warn text-warn bg-warn/10"
                          }`}
                        >
                          {scan.status}
                        </span>
                      </div>
                      <span className="font-mono text-xs text-bone/40 uppercase tracking-widest block">
                        {new Date(scan.createdAt).toLocaleString()}
                      </span>
                    </div>

                    {scan.status === "completed" && (
                      <div className="flex items-center gap-4">
                        <div className="text-right mr-4 hidden md:block">
                          <div className="font-display text-3xl text-bone leading-none">
                            {total}
                          </div>
                          <div className="font-mono text-[10px] text-bone/40 uppercase tracking-widest">
                            Total Findings
                          </div>
                        </div>

                        <div className="flex gap-2 font-mono text-xs">
                          {counts.critical > 0 && (
                            <div className="flex flex-col items-center border border-destructive/30 bg-destructive/5 px-3 py-2 min-w-[60px]">
                              <span className="text-destructive font-bold">
                                {counts.critical}
                              </span>
                              <span className="text-[9px] text-destructive/60 uppercase mt-1">
                                Crit
                              </span>
                            </div>
                          )}
                          {counts.high > 0 && (
                            <div className="flex flex-col items-center border border-signal/30 bg-signal/5 px-3 py-2 min-w-[60px]">
                              <span className="text-signal font-bold">
                                {counts.high}
                              </span>
                              <span className="text-[9px] text-signal/60 uppercase mt-1">
                                High
                              </span>
                            </div>
                          )}
                          {counts.medium > 0 && (
                            <div className="flex flex-col items-center border border-warn/30 bg-warn/5 px-3 py-2 min-w-[60px]">
                              <span className="text-warn font-bold">
                                {counts.medium}
                              </span>
                              <span className="text-[9px] text-warn/60 uppercase mt-1">
                                Med
                              </span>
                            </div>
                          )}
                          {(counts.low > 0 || total === 0) && (
                            <div className="flex flex-col items-center border border-acid/30 bg-acid/5 px-3 py-2 min-w-[60px]">
                              <span className="text-acid font-bold">
                                {counts.low}
                              </span>
                              <span className="text-[9px] text-acid/60 uppercase mt-1">
                                Low
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {scan.status === "failed" && (
                      <div className="font-mono text-xs text-destructive border border-destructive/20 bg-destructive/5 px-4 py-2 uppercase tracking-widest">
                        Analysis Halted — Execution Error
                      </div>
                    )}
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}
