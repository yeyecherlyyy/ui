// src/routes/report.$id.tsx
import { createFileRoute, Link } from "@tanstack/react-router";
import { useAppStore } from "@/store/useAppStore";
import { useParams } from "@tanstack/react-router";
import { motion } from "motion/react";

export const Route = createFileRoute("/report/$id")({
  component: Report,
});

function Report() {
  const { id } = Route.useParams();
  const scan = useAppStore((state) => state.scans[id]);

  if (!scan) {
    return (
      <div className="p-6 max-w-4xl mx-auto pt-32 pb-20">
        <div className="bg-secondary/10 rounded-3xl p-12 text-center">
          <h1 className="text-3xl font-display font-bold mb-4 text-foreground">Report Not Found</h1>
          <p className="text-muted-foreground text-lg mb-8">
            No scan with ID <code className="bg-background px-2 py-1 rounded font-mono text-sm">{id}</code> was found.
          </p>
          <Link to="/reports" className="bg-acid text-ink px-6 py-2.5 rounded-full font-display font-semibold hover:-translate-y-0.5 transition-all shadow-sm">
            ← Back to Reports
          </Link>
        </div>
      </div>
    );
  }

  const getSeverityCounts = (findings: { severity: string }[] = []) => {
    return {
      critical: findings.filter((f) => f.severity === "critical").length,
      high: findings.filter((f) => f.severity === "high").length,
      medium: findings.filter((f) => f.severity === "medium").length,
      low: findings.filter((f) => f.severity === "low").length,
    };
  };

  const counts = getSeverityCounts(scan.findings);

  return (
    <div className="p-6 max-w-4xl mx-auto pt-32 pb-20">
      <Link to="/reports" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground mb-8 transition-colors">
        ← Back to Reports
      </Link>
      
      <div className="mb-10">
        <h1 className="text-4xl md:text-5xl font-display font-bold tracking-tight text-foreground mb-4">
          Scan Report
        </h1>
        <div className="flex flex-wrap items-center gap-4 text-sm font-medium text-muted-foreground">
          <span className="bg-secondary px-3 py-1 rounded-full text-foreground font-mono">ID: {scan.id}</span>
          <span>•</span>
          <span>{new Date(scan.createdAt).toLocaleString()}</span>
          <span>•</span>
          <span
            className={`px-3 py-1 rounded-full uppercase tracking-wider text-xs font-semibold ${
              scan.status === "completed"
                ? "bg-acid/10 text-acid"
                : scan.status === "failed"
                  ? "bg-destructive/10 text-destructive"
                  : "bg-warn/10 text-warn"
            }`}
          >
            {scan.status}
          </span>
        </div>
      </div>

      <div className="bg-secondary/20 rounded-2xl overflow-hidden mb-8">
        <div className="bg-secondary/30 px-6 py-4 font-display font-semibold text-xs text-muted-foreground uppercase tracking-wider">
          Summary
        </div>
        <div className="p-6 md:p-8">
          <div className="flex flex-wrap gap-4 mb-8">
            <div className="flex-1 min-w-[120px] bg-background rounded-xl p-4 text-center shadow-sm">
              <div className="font-display font-bold text-3xl text-foreground mb-1">
                {scan.findings?.length || 0}
              </div>
              <div className="font-display font-medium text-xs text-muted-foreground uppercase tracking-widest">
                Total
              </div>
            </div>
            <div className="flex-1 min-w-[120px] bg-background rounded-xl p-4 text-center shadow-sm">
              <div className="font-display font-bold text-3xl text-destructive mb-1">
                {counts.critical}
              </div>
              <div className="font-display font-medium text-xs text-muted-foreground uppercase tracking-widest">
                Critical
              </div>
            </div>
            <div className="flex-1 min-w-[120px] bg-background rounded-xl p-4 text-center shadow-sm">
              <div className="font-display font-bold text-3xl text-signal mb-1">
                {counts.high}
              </div>
              <div className="font-display font-medium text-xs text-muted-foreground uppercase tracking-widest">
                High
              </div>
            </div>
            <div className="flex-1 min-w-[120px] bg-background rounded-xl p-4 text-center shadow-sm">
              <div className="font-display font-bold text-3xl text-warn mb-1">
                {counts.medium}
              </div>
              <div className="font-display font-medium text-xs text-muted-foreground uppercase tracking-widest">
                Medium
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="font-display font-semibold text-sm text-foreground">Analyzed Payload</h3>
            <div className="bg-secondary/20 rounded-xl p-4 max-h-64 overflow-y-auto font-mono text-xs text-muted-foreground">
              <pre className="whitespace-pre-wrap">{scan.spec}</pre>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-secondary/10 rounded-3xl overflow-hidden">
        <div className="bg-secondary/20 border-b border-border/40 px-6 py-4 font-display font-semibold text-xs text-muted-foreground uppercase tracking-wider flex justify-between items-center">
          <span>Findings Breakdown</span>
        </div>
        <div className="p-6 md:p-8">
          {scan.findings && scan.findings.length > 0 ? (
            <ul className="space-y-3">
              {scan.findings.map((f, idx) => (
                <motion.li 
                  key={idx}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="flex items-start gap-4 p-4 rounded-xl border border-border/40 hover:bg-secondary/10 transition-colors"
                >
                  <span className={`px-3 py-1 rounded-md text-[10px] font-bold uppercase tracking-widest mt-0.5 ${
                    f.severity === 'critical' ? 'bg-destructive/10 text-destructive' :
                    f.severity === 'high' ? 'bg-signal/10 text-signal' :
                    f.severity === 'medium' ? 'bg-warn/10 text-warn' :
                    'bg-acid/10 text-acid'
                  }`}>
                    {f.severity}
                  </span>
                  <p className="text-foreground text-sm font-medium leading-relaxed">
                    {f.description}
                  </p>
                </motion.li>
              ))}
            </ul>
          ) : (
            <div className="text-center py-12">
              <span className="text-acid font-display font-bold text-6xl block mb-4">✓</span>
              <p className="text-foreground font-medium text-lg mb-2">No Vulnerabilities Detected</p>
              <p className="text-muted-foreground text-sm">Your payload passed all security checks.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
