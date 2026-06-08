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
    <div className="p-6 max-w-5xl mx-auto pt-32 pb-20">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-10 gap-6">
        <div>
          <h1 className="text-4xl md:text-5xl font-display font-bold tracking-tight text-foreground">
            Scan Intelligence
          </h1>
          <p className="text-muted-foreground mt-2 font-medium">
            Review historical vulnerability scans and compliance reports.
          </p>
        </div>
        <Link
          to="/scans"
          className="bg-acid text-ink px-6 py-3 font-display font-semibold rounded-full shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all text-center whitespace-nowrap"
        >
          New Scan +
        </Link>
      </div>

      {scanList.length === 0 ? (
        <div className="border border-border/60 border-dashed rounded-3xl p-20 text-center bg-card/50 shadow-inner">
          <span className="font-display font-bold text-muted-foreground/30 text-6xl block mb-4">∅</span>
          <span className="font-medium text-muted-foreground text-lg">
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
                  className="block bg-background hover:bg-secondary/30 rounded-2xl p-6 transition-all group relative"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <span className="font-mono text-foreground text-xl font-bold group-hover:text-acid transition-colors">
                          {scan.id.toUpperCase()}
                        </span>
                        <span
                          className={`font-semibold text-xs px-2.5 py-0.5 rounded-md uppercase tracking-wider ${
                            scan.status === "completed"
                              ? "text-acid bg-acid/10"
                              : scan.status === "failed"
                                ? "text-destructive bg-destructive/10"
                                : "text-warn bg-warn/10"
                          }`}
                        >
                          {scan.status}
                        </span>
                      </div>
                      <span className="font-medium text-sm text-muted-foreground block">
                        {new Date(scan.createdAt).toLocaleString()}
                      </span>
                    </div>

                    {scan.status === "completed" && (
                      <div className="flex items-center gap-6">
                        <div className="text-right hidden md:block">
                          <div className="font-display font-bold text-3xl text-foreground leading-none">
                            {total}
                          </div>
                          <div className="font-medium text-xs text-muted-foreground uppercase tracking-wider mt-1">
                            Total Findings
                          </div>
                        </div>

                        <div className="flex gap-2">
                          {counts.critical > 0 && (
                            <div className="flex flex-col items-center bg-destructive/10 rounded-lg px-4 py-2 min-w-[64px]">
                              <span className="text-destructive font-bold text-lg">
                                {counts.critical}
                              </span>
                              <span className="text-[10px] font-semibold text-destructive uppercase">
                                Crit
                              </span>
                            </div>
                          )}
                          {counts.high > 0 && (
                            <div className="flex flex-col items-center bg-signal/10 rounded-lg px-4 py-2 min-w-[64px]">
                              <span className="text-signal font-bold text-lg">
                                {counts.high}
                              </span>
                              <span className="text-[10px] font-semibold text-signal uppercase">
                                High
                              </span>
                            </div>
                          )}
                          {counts.medium > 0 && (
                            <div className="flex flex-col items-center bg-warn/10 rounded-lg px-4 py-2 min-w-[64px]">
                              <span className="text-warn font-bold text-lg">
                                {counts.medium}
                              </span>
                              <span className="text-[10px] font-semibold text-warn uppercase">
                                Med
                              </span>
                            </div>
                          )}
                          {(counts.low > 0 || total === 0) && (
                            <div className="flex flex-col items-center bg-acid/10 rounded-lg px-4 py-2 min-w-[64px]">
                              <span className="text-acid font-bold text-lg">
                                {counts.low}
                              </span>
                              <span className="text-[10px] font-semibold text-acid uppercase">
                                Low
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {scan.status === "failed" && (
                      <div className="font-medium text-sm text-destructive bg-destructive/10 rounded-lg px-4 py-2">
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
