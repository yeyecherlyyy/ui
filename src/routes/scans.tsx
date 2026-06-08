import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useAppStore } from "@/store/useAppStore";
import { startScan, pollScanStatus } from "@/api/scanner";
import { toast } from "sonner";
import { motion } from "motion/react";

export const Route = createFileRoute("/scans")({
  component: Scans,
});

function Scans() {
  const { scans, addScan, updateScan, settings } = useAppStore();
  const [spec, setSpec] = useState("");
  const [isScanning, setIsScanning] = useState(false);

  const scanList = Object.values(scans).sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );

  const handleStart = async () => {
    if (!spec.trim()) {
      toast.error("Target payload cannot be empty");
      return;
    }
    setIsScanning(true);
    try {
      const { id } = await startScan(spec, settings.authToken);
      const newScan = {
        id,
        spec,
        status: "pending",
        createdAt: new Date().toISOString(),
      } as const;
      addScan(newScan);
      toast.success(`Sweep initiated [ID: ${id}]`);

      pollScanStatus(id, (status, findings) => {
        updateScan(id, { status, findings });
        if (status === "completed") {
          toast.success(
            `Sweep ${id} completed. ${findings?.length || 0} anomalies detected.`,
          );
          setIsScanning(false);
          setSpec("");
        }
        if (status === "failed") {
          toast.error(`Sweep ${id} aborted due to critical failure.`);
          setIsScanning(false);
        }
      });
    } catch (e) {
      console.error(e);
      toast.error("Initialization failed");
      setIsScanning(false);
    }
  };

  return (
    <div className="p-6 max-w-[1400px] mx-auto pt-32 pb-20">
      <div className="mb-10">
        <h1 className="text-4xl md:text-5xl font-display font-bold tracking-tight text-foreground">
          Active Surface Sweep
        </h1>
        <p className="text-muted-foreground mt-2 font-medium">
          Initialize a new scan to check for security vulnerabilities and regressions.
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="overflow-hidden"
      >
        <div className="flex items-center justify-between border-b border-border/60 pb-4 font-display font-semibold text-xs text-muted-foreground uppercase tracking-wider">
          <div className="flex gap-2">
            <span className="size-3 rounded-full bg-destructive/70" />
            <span className="size-3 rounded-full bg-warn/70" />
            <span className="size-3 rounded-full bg-acid/70" />
          </div>
          <span>Scanner Module</span>
          <span
            className={isScanning ? "text-signal animate-pulse font-bold" : "text-acid font-bold"}
          >
            {isScanning ? "SCANNING" : "STANDBY"}
          </span>
        </div>

        <div className="grid md:grid-cols-[300px_1fr] gap-8 pt-6">
          {/* Left Rail: History */}
          <div className="py-2">
            <div className="font-display font-semibold text-xs text-muted-foreground uppercase tracking-widest mb-6 pb-2 border-b border-border/50">
              Recent Sweeps
            </div>
            <div className="space-y-4">
              {scanList.slice(0, 6).map((scan) => (
                <div key={scan.id} className="group p-3 rounded-lg border border-transparent hover:border-border/60 hover:bg-secondary/30 transition-all cursor-default">
                  <div className="flex items-center justify-between font-mono text-sm mb-2">
                    <span className="text-foreground font-medium group-hover:text-acid transition-colors">
                      #{scan.id}
                    </span>
                    <span
                      className={`text-xs font-semibold ${
                        scan.status === "completed"
                          ? "text-acid"
                          : scan.status === "failed"
                            ? "text-destructive"
                            : "text-signal animate-pulse"
                      }`}
                    >
                      {scan.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-1 flex-1 bg-secondary rounded-full overflow-hidden">
                      {scan.status === "pending" ||
                      scan.status === "running" ? (
                        <motion.div
                          className="h-full bg-signal rounded-full"
                          initial={{ width: "0%" }}
                          animate={{ width: "100%" }}
                          transition={{ duration: 2, repeat: Infinity }}
                        />
                      ) : (
                        <div
                          className={`h-full w-full rounded-full ${scan.status === "completed" ? "bg-acid" : "bg-destructive"}`}
                        />
                      )}
                    </div>
                  </div>
                  <div className="font-medium text-[10px] text-muted-foreground mt-2">
                    {new Date(scan.createdAt).toLocaleTimeString()}
                  </div>
                </div>
              ))}
              {scanList.length === 0 && (
                <div className="font-medium text-sm text-muted-foreground italic p-4 text-center border border-dashed border-border/60 rounded-lg">
                  No history available
                </div>
              )}
            </div>
          </div>

          {/* Main Area: Input */}
          <div className="py-2 relative flex flex-col">
            <div className="flex justify-between items-end mb-8">
              <div>
                <div className="font-display font-semibold text-xs text-muted-foreground uppercase tracking-widest mb-2">
                  Target Payload
                </div>
                <h2 className="font-display font-bold text-2xl tracking-tight text-foreground">
                  OpenAPI / Postman Ingestion
                </h2>
              </div>
              <div className="font-medium text-xs text-muted-foreground bg-secondary px-3 py-1 rounded-full">
                Supported: json, yaml
              </div>
            </div>

            <div className="relative flex-1 min-h-[400px]">
              <textarea
                value={spec}
                onChange={(e) => setSpec(e.target.value)}
                disabled={isScanning}
                placeholder="Paste API specification here to begin surface analysis..."
                className="w-full h-full p-6 border border-border/60 bg-background rounded-xl text-foreground font-mono text-sm resize-none focus:border-acid focus:outline-none focus:ring-4 focus:ring-acid/10 transition-all shadow-inner disabled:opacity-50"
                spellCheck={false}
              />
            </div>

            <div className="mt-8 flex justify-end">
              <button
                onClick={handleStart}
                disabled={isScanning || !spec.trim()}
                className={`
                  relative overflow-hidden px-8 py-3.5 font-display font-semibold text-sm rounded-full shadow-md transition-all
                  ${
                    isScanning || !spec.trim()
                      ? "bg-secondary text-muted-foreground cursor-not-allowed shadow-none"
                      : "bg-acid text-ink hover:shadow-lg hover:-translate-y-0.5"
                  }
                `}
              >
                {isScanning ? (
                  <span className="flex items-center gap-2">
                    <span className="size-2 bg-ink animate-ping rounded-full" />
                    Executing Sweep...
                  </span>
                ) : (
                  "Initiate Scan"
                )}
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
