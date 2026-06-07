import { jsxs, jsx } from "react/jsx-runtime";
import { useState } from "react";
import { u as useAppStore } from "./router-DwgKz4jV.js";
import { toast } from "sonner";
import { motion } from "motion/react";
import "@tanstack/react-query";
import "@tanstack/react-router";
import "zustand";
import "zustand/middleware";
async function startScan(spec, authToken) {
  const { scanServiceUrl } = useAppStore.getState().settings;
  const response = await fetch(`${scanServiceUrl}/start`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...authToken ? { Authorization: `Bearer ${authToken}` } : {}
    },
    body: JSON.stringify({ spec })
  });
  if (!response.ok) {
    const txt = await response.text();
    throw new Error(`Failed to start scan: ${response.status} ${txt}`);
  }
  const data = await response.json();
  return data;
}
function pollScanStatus(id, onUpdate, intervalMs = 2e3) {
  const { scanServiceUrl, authToken } = useAppStore.getState().settings;
  let stopped = false;
  const fetchStatus = async () => {
    if (stopped) return;
    try {
      const response = await fetch(`${scanServiceUrl}/status/${id}`, {
        headers: {
          ...authToken ? { Authorization: `Bearer ${authToken}` } : {}
        }
      });
      if (!response.ok) {
        const txt = await response.text();
        throw new Error(`Status fetch error ${response.status}: ${txt}`);
      }
      const data = await response.json();
      onUpdate(data.status, data.findings);
      if (data.status === "completed" || data.status === "failed") {
        stopped = true;
        return;
      }
    } catch (e) {
      console.error("pollScanStatus error", e);
      onUpdate("failed");
      stopped = true;
      return;
    }
    setTimeout(fetchStatus, intervalMs);
  };
  fetchStatus();
  return () => {
    stopped = true;
  };
}
function Scans() {
  const {
    scans,
    addScan,
    updateScan,
    settings
  } = useAppStore();
  const [spec, setSpec] = useState("");
  const [isScanning, setIsScanning] = useState(false);
  const scanList = Object.values(scans).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  const handleStart = async () => {
    if (!spec.trim()) {
      toast.error("Target payload cannot be empty");
      return;
    }
    setIsScanning(true);
    try {
      const {
        id
      } = await startScan(spec, settings.authToken);
      const newScan = {
        id,
        spec,
        status: "pending",
        createdAt: (/* @__PURE__ */ new Date()).toISOString()
      };
      addScan(newScan);
      toast.success(`Sweep initiated [ID: ${id}]`);
      pollScanStatus(id, (status, findings) => {
        updateScan(id, {
          status,
          findings
        });
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
  return /* @__PURE__ */ jsxs("div", { className: "p-6 max-w-[1400px] mx-auto pt-24", children: [
    /* @__PURE__ */ jsxs("div", { className: "mb-8", children: [
      /* @__PURE__ */ jsx("div", { className: "font-mono text-xs text-acid uppercase tracking-widest mb-3", children: "[ control.plane ]" }),
      /* @__PURE__ */ jsx("h1", { className: "text-4xl md:text-5xl font-display uppercase tracking-tight", children: "Active Surface Sweep" })
    ] }),
    /* @__PURE__ */ jsxs(motion.div, { initial: {
      opacity: 0,
      y: 40
    }, animate: {
      opacity: 1,
      y: 0
    }, transition: {
      duration: 0.6
    }, className: "border border-border bg-card/40 backdrop-blur-xl overflow-hidden", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between border-b border-border px-4 py-3 font-mono text-[10px] text-bone/50 uppercase tracking-widest bg-background/50", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
          /* @__PURE__ */ jsx("span", { className: "size-2.5 rounded-full bg-destructive/70" }),
          /* @__PURE__ */ jsx("span", { className: "size-2.5 rounded-full bg-warn/70" }),
          /* @__PURE__ */ jsx("span", { className: "size-2.5 rounded-full bg-acid/70" })
        ] }),
        /* @__PURE__ */ jsx("span", { children: "~/apiguard/scanner_module" }),
        /* @__PURE__ */ jsx("span", { className: isScanning ? "text-signal animate-pulse" : "text-acid", children: isScanning ? "SCANNING" : "STANDBY" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-[300px_1fr] gap-px bg-border", children: [
        /* @__PURE__ */ jsxs("div", { className: "bg-card/30 backdrop-blur-md p-6", children: [
          /* @__PURE__ */ jsx("div", { className: "font-mono text-[10px] text-bone/40 uppercase tracking-widest mb-6 border-b border-border/50 pb-2", children: "Recent Sweeps" }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
            scanList.slice(0, 6).map((scan) => /* @__PURE__ */ jsxs("div", { className: "group", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between font-mono text-xs mb-1", children: [
                /* @__PURE__ */ jsxs("span", { className: "text-bone/80 group-hover:text-acid transition-colors", children: [
                  "#",
                  scan.id
                ] }),
                /* @__PURE__ */ jsx("span", { className: scan.status === "completed" ? "text-acid" : scan.status === "failed" ? "text-destructive" : "text-signal animate-pulse", children: scan.status })
              ] }),
              /* @__PURE__ */ jsx("div", { className: "flex items-center gap-2", children: /* @__PURE__ */ jsx("div", { className: "h-0.5 flex-1 bg-border overflow-hidden", children: scan.status === "pending" || scan.status === "running" ? /* @__PURE__ */ jsx(motion.div, { className: "h-full bg-signal", initial: {
                width: "0%"
              }, animate: {
                width: "100%"
              }, transition: {
                duration: 2,
                repeat: Infinity
              } }) : /* @__PURE__ */ jsx("div", { className: `h-full w-full ${scan.status === "completed" ? "bg-acid" : "bg-destructive"}` }) }) }),
              /* @__PURE__ */ jsx("div", { className: "font-mono text-[9px] text-bone/30 uppercase mt-1", children: new Date(scan.createdAt).toLocaleTimeString() })
            ] }, scan.id)),
            scanList.length === 0 && /* @__PURE__ */ jsx("div", { className: "font-mono text-xs text-bone/40 italic", children: "No history available" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-card/30 backdrop-blur-md p-8 relative flex flex-col", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-end mb-6", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("div", { className: "font-mono text-[10px] text-bone/40 uppercase tracking-widest mb-2", children: "Target Payload" }),
              /* @__PURE__ */ jsx("h2", { className: "font-display text-2xl uppercase tracking-tight", children: "OpenAPI / Postman Ingestion" })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "font-mono text-[10px] text-bone/40 uppercase", children: "Supported: json, yaml" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "relative flex-1 min-h-[400px]", children: [
            /* @__PURE__ */ jsx("textarea", { value: spec, onChange: (e) => setSpec(e.target.value), disabled: isScanning, placeholder: "Paste API specification here to begin surface analysis...", className: "w-full h-full p-6 border border-border bg-background/50 text-bone font-mono text-sm resize-none focus:border-acid focus:outline-none focus:ring-1 focus:ring-acid/20 transition-all disabled:opacity-50", spellCheck: false }),
            /* @__PURE__ */ jsx("div", { className: "absolute top-0 left-0 size-2 border-t border-l border-acid pointer-events-none" }),
            /* @__PURE__ */ jsx("div", { className: "absolute top-0 right-0 size-2 border-t border-r border-acid pointer-events-none" }),
            /* @__PURE__ */ jsx("div", { className: "absolute bottom-0 left-0 size-2 border-b border-l border-acid pointer-events-none" }),
            /* @__PURE__ */ jsx("div", { className: "absolute bottom-0 right-0 size-2 border-b border-r border-acid pointer-events-none" })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "mt-6 flex justify-end", children: /* @__PURE__ */ jsx("button", { onClick: handleStart, disabled: isScanning || !spec.trim(), className: `
                  relative overflow-hidden px-8 py-4 font-mono text-sm uppercase tracking-widest transition-all
                  ${isScanning || !spec.trim() ? "bg-border text-bone/30 cursor-not-allowed border border-border" : "bg-acid text-ink hover:bg-acid/90 hover:shadow-[0_0_20px_rgba(var(--acid-rgb),0.3)]"}
                `, children: isScanning ? /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsx("span", { className: "size-2 bg-ink animate-ping rounded-full" }),
            "Executing Sweep..."
          ] }) : "initiate.scan()" }) })
        ] })
      ] })
    ] })
  ] });
}
export {
  Scans as component
};
