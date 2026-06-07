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
      const newScan = { id, spec, status: "pending", createdAt: new Date().toISOString() } as const;
      addScan(newScan);
      toast.success(`Sweep initiated [ID: ${id}]`);
      
      pollScanStatus(id, (status, findings) => {
        updateScan(id, { status, findings });
        if (status === "completed") {
          toast.success(`Sweep ${id} completed. ${findings?.length || 0} anomalies detected.`);
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
    <div className="p-6 max-w-[1400px] mx-auto pt-24">
      <div className="mb-8">
        <div className="font-mono text-xs text-acid uppercase tracking-widest mb-3">[ control.plane ]</div>
        <h1 className="text-4xl md:text-5xl font-display uppercase tracking-tight">Active Surface Sweep</h1>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="border border-border bg-card/40 backdrop-blur-xl overflow-hidden"
      >
        <div className="flex items-center justify-between border-b border-border px-4 py-3 font-mono text-[10px] text-bone/50 uppercase tracking-widest bg-background/50">
          <div className="flex gap-2">
            <span className="size-2.5 rounded-full bg-destructive/70" />
            <span className="size-2.5 rounded-full bg-warn/70" />
            <span className="size-2.5 rounded-full bg-acid/70" />
          </div>
          <span>~/apiguard/scanner_module</span>
          <span className={isScanning ? "text-signal animate-pulse" : "text-acid"}>
            {isScanning ? "SCANNING" : "STANDBY"}
          </span>
        </div>

        <div className="grid md:grid-cols-[300px_1fr] gap-px bg-border">
          {/* Left Rail: History */}
          <div className="bg-card/30 backdrop-blur-md p-6">
            <div className="font-mono text-[10px] text-bone/40 uppercase tracking-widest mb-6 border-b border-border/50 pb-2">
              Recent Sweeps
            </div>
            <div className="space-y-4">
              {scanList.slice(0, 6).map((scan) => (
                <div key={scan.id} className="group">
                  <div className="flex items-center justify-between font-mono text-xs mb-1">
                    <span className="text-bone/80 group-hover:text-acid transition-colors">#{scan.id}</span>
                    <span className={
                      scan.status === "completed" ? "text-acid" :
                      scan.status === "failed" ? "text-destructive" : "text-signal animate-pulse"
                    }>
                      {scan.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-0.5 flex-1 bg-border overflow-hidden">
                      {scan.status === "pending" || scan.status === "running" ? (
                        <motion.div
                          className="h-full bg-signal"
                          initial={{ width: "0%" }}
                          animate={{ width: "100%" }}
                          transition={{ duration: 2, repeat: Infinity }}
                        />
                      ) : (
                        <div className={`h-full w-full ${scan.status === "completed" ? "bg-acid" : "bg-destructive"}`} />
                      )}
                    </div>
                  </div>
                  <div className="font-mono text-[9px] text-bone/30 uppercase mt-1">
                    {new Date(scan.createdAt).toLocaleTimeString()}
                  </div>
                </div>
              ))}
              {scanList.length === 0 && (
                <div className="font-mono text-xs text-bone/40 italic">No history available</div>
              )}
            </div>
          </div>

          {/* Main Area: Input */}
          <div className="bg-card/30 backdrop-blur-md p-8 relative flex flex-col">
            <div className="flex justify-between items-end mb-6">
              <div>
                <div className="font-mono text-[10px] text-bone/40 uppercase tracking-widest mb-2">Target Payload</div>
                <h2 className="font-display text-2xl uppercase tracking-tight">OpenAPI / Postman Ingestion</h2>
              </div>
              <div className="font-mono text-[10px] text-bone/40 uppercase">
                Supported: json, yaml
              </div>
            </div>

            <div className="relative flex-1 min-h-[400px]">
              <textarea
                value={spec}
                onChange={(e) => setSpec(e.target.value)}
                disabled={isScanning}
                placeholder="Paste API specification here to begin surface analysis..."
                className="w-full h-full p-6 border border-border bg-background/50 text-bone font-mono text-sm resize-none focus:border-acid focus:outline-none focus:ring-1 focus:ring-acid/20 transition-all disabled:opacity-50"
                spellCheck={false}
              />
              
              {/* Corner Accents */}
              <div className="absolute top-0 left-0 size-2 border-t border-l border-acid pointer-events-none" />
              <div className="absolute top-0 right-0 size-2 border-t border-r border-acid pointer-events-none" />
              <div className="absolute bottom-0 left-0 size-2 border-b border-l border-acid pointer-events-none" />
              <div className="absolute bottom-0 right-0 size-2 border-b border-r border-acid pointer-events-none" />
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={handleStart}
                disabled={isScanning || !spec.trim()}
                className={`
                  relative overflow-hidden px-8 py-4 font-mono text-sm uppercase tracking-widest transition-all
                  ${isScanning || !spec.trim() 
                    ? "bg-border text-bone/30 cursor-not-allowed border border-border" 
                    : "bg-acid text-ink hover:bg-acid/90 hover:shadow-[0_0_20px_rgba(var(--acid-rgb),0.3)]"}
                `}
              >
                {isScanning ? (
                  <span className="flex items-center gap-3">
                    <span className="size-2 bg-ink animate-ping rounded-full" />
                    Executing Sweep...
                  </span>
                ) : (
                  "initiate.scan()"
                )}
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
