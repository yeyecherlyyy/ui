// src/routes/monitor.tsx
import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";

export const Route = createFileRoute("/monitor")({
  component: Monitor,
});

function Monitor() {
  return (
    <div className="p-6 max-w-6xl mx-auto pt-24">
      <h1 className="text-3xl font-display uppercase tracking-tight mb-8">System Monitor</h1>
      <div className="grid md:grid-cols-3 gap-6">
        {[
          { n: "auth-svc", v: 99.99, ms: 42, status: "healthy" },
          { n: "billing-api", v: 99.91, ms: 118, status: "healthy" },
          { n: "search-cluster", v: 98.4, ms: 312, status: "degraded" },
          { n: "feed-stream", v: 99.97, ms: 67, status: "healthy" },
          { n: "payments-webhook", v: 100, ms: 12, status: "healthy" },
          { n: "legacy-export", v: 95.2, ms: 840, status: "failing" },
        ].map((s, i) => (
          <motion.div
            key={s.n}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="border border-border bg-card/40 backdrop-blur-xl p-6"
          >
            <div className="flex justify-between font-mono text-sm mb-4">
              <span className="text-bone">{s.n}</span>
              <span
                className={
                  s.status === "healthy"
                    ? "text-acid"
                    : s.status === "degraded"
                      ? "text-warn"
                      : "text-destructive"
                }
              >
                {s.status}
              </span>
            </div>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between font-mono text-xs text-bone/60 mb-1">
                  <span>Uptime (30d)</span>
                  <span>{s.v}%</span>
                </div>
                <div className="h-1.5 bg-bone/10 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${s.v}%` }}
                    transition={{ duration: 1, delay: 0.2 }}
                    className={`h-full ${
                      s.status === "healthy"
                        ? "bg-acid"
                        : s.status === "degraded"
                          ? "bg-warn"
                          : "bg-destructive"
                    }`}
                  />
                </div>
              </div>
              <div className="flex justify-between font-mono text-xs border-t border-border/50 pt-3">
                <span className="text-bone/40">Latency p50</span>
                <span className="text-bone">{s.ms}ms</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
