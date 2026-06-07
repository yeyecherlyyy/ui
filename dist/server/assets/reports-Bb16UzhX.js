import { jsxs, jsx } from "react/jsx-runtime";
import { Link } from "@tanstack/react-router";
import { u as useAppStore } from "./router-DwgKz4jV.js";
import { motion } from "motion/react";
import "@tanstack/react-query";
import "react";
import "zustand";
import "zustand/middleware";
function Reports() {
  const scans = useAppStore((state) => state.scans);
  const scanList = Object.values(scans).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  const getSeverityCounts = (findings = []) => {
    return {
      critical: findings.filter((f) => f.severity === "critical").length,
      high: findings.filter((f) => f.severity === "high").length,
      medium: findings.filter((f) => f.severity === "medium").length,
      low: findings.filter((f) => f.severity === "low").length
    };
  };
  return /* @__PURE__ */ jsxs("div", { className: "p-6 max-w-5xl mx-auto pt-24", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-8 border-b border-border pb-6", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("div", { className: "font-mono text-xs text-acid uppercase tracking-widest mb-3", children: "[ reports.index ]" }),
        /* @__PURE__ */ jsx("h1", { className: "text-4xl md:text-5xl font-display uppercase tracking-tight", children: "Scan Intelligence" })
      ] }),
      /* @__PURE__ */ jsx(Link, { to: "/scans", className: "border border-acid bg-acid/10 text-acid px-6 py-3 font-mono text-sm uppercase tracking-widest hover:bg-acid hover:text-ink transition shadow-[0_0_15px_rgba(var(--acid-rgb),0.2)]", children: "New Scan +" })
    ] }),
    scanList.length === 0 ? /* @__PURE__ */ jsxs("div", { className: "border border-border border-dashed p-16 text-center bg-card/10 backdrop-blur-md", children: [
      /* @__PURE__ */ jsx("span", { className: "font-mono text-acid text-2xl block mb-2", children: "∅" }),
      /* @__PURE__ */ jsx("span", { className: "font-mono text-sm text-bone/40 uppercase tracking-widest", children: "No scans executed yet." })
    ] }) : /* @__PURE__ */ jsx("div", { className: "space-y-4", children: scanList.map((scan, i) => {
      const counts = getSeverityCounts(scan.findings);
      const total = scan.findings?.length || 0;
      return /* @__PURE__ */ jsx(motion.div, { initial: {
        opacity: 0,
        y: 20
      }, animate: {
        opacity: 1,
        y: 0
      }, transition: {
        delay: i * 0.1,
        duration: 0.4
      }, children: /* @__PURE__ */ jsxs(Link, { to: "/report/$id", params: {
        id: scan.id
      }, className: "block border border-border bg-card/30 backdrop-blur-md p-6 hover:border-acid transition-colors group relative overflow-hidden", children: [
        /* @__PURE__ */ jsx("div", { className: "absolute top-0 left-0 w-1 h-full bg-border group-hover:bg-acid transition-colors" }),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col md:flex-row md:items-center justify-between gap-6 pl-4", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 mb-2", children: [
              /* @__PURE__ */ jsx("span", { className: "font-mono text-acid text-xl font-bold group-hover:text-signal transition-colors", children: scan.id.toUpperCase() }),
              /* @__PURE__ */ jsx("span", { className: `font-mono text-[10px] uppercase px-2 py-0.5 border ${scan.status === "completed" ? "border-acid text-acid bg-acid/10" : scan.status === "failed" ? "border-destructive text-destructive bg-destructive/10" : "border-warn text-warn bg-warn/10"}`, children: scan.status })
            ] }),
            /* @__PURE__ */ jsx("span", { className: "font-mono text-xs text-bone/40 uppercase tracking-widest block", children: new Date(scan.createdAt).toLocaleString() })
          ] }),
          scan.status === "completed" && /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
            /* @__PURE__ */ jsxs("div", { className: "text-right mr-4 hidden md:block", children: [
              /* @__PURE__ */ jsx("div", { className: "font-display text-3xl text-bone leading-none", children: total }),
              /* @__PURE__ */ jsx("div", { className: "font-mono text-[10px] text-bone/40 uppercase tracking-widest", children: "Total Findings" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex gap-2 font-mono text-xs", children: [
              counts.critical > 0 && /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center border border-destructive/30 bg-destructive/5 px-3 py-2 min-w-[60px]", children: [
                /* @__PURE__ */ jsx("span", { className: "text-destructive font-bold", children: counts.critical }),
                /* @__PURE__ */ jsx("span", { className: "text-[9px] text-destructive/60 uppercase mt-1", children: "Crit" })
              ] }),
              counts.high > 0 && /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center border border-signal/30 bg-signal/5 px-3 py-2 min-w-[60px]", children: [
                /* @__PURE__ */ jsx("span", { className: "text-signal font-bold", children: counts.high }),
                /* @__PURE__ */ jsx("span", { className: "text-[9px] text-signal/60 uppercase mt-1", children: "High" })
              ] }),
              counts.medium > 0 && /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center border border-warn/30 bg-warn/5 px-3 py-2 min-w-[60px]", children: [
                /* @__PURE__ */ jsx("span", { className: "text-warn font-bold", children: counts.medium }),
                /* @__PURE__ */ jsx("span", { className: "text-[9px] text-warn/60 uppercase mt-1", children: "Med" })
              ] }),
              (counts.low > 0 || total === 0) && /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center border border-acid/30 bg-acid/5 px-3 py-2 min-w-[60px]", children: [
                /* @__PURE__ */ jsx("span", { className: "text-acid font-bold", children: counts.low }),
                /* @__PURE__ */ jsx("span", { className: "text-[9px] text-acid/60 uppercase mt-1", children: "Low" })
              ] })
            ] })
          ] }),
          scan.status === "failed" && /* @__PURE__ */ jsx("div", { className: "font-mono text-xs text-destructive border border-destructive/20 bg-destructive/5 px-4 py-2 uppercase tracking-widest", children: "Analysis Halted — Execution Error" })
        ] })
      ] }) }, scan.id);
    }) })
  ] });
}
export {
  Reports as component
};
