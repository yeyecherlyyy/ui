import { jsxs, jsx } from "react/jsx-runtime";
import { motion } from "motion/react";
function Monitor() {
  return /* @__PURE__ */ jsxs("div", { className: "p-6 max-w-6xl mx-auto pt-24", children: [
    /* @__PURE__ */ jsx("h1", { className: "text-3xl font-display uppercase tracking-tight mb-8", children: "System Monitor" }),
    /* @__PURE__ */ jsx("div", { className: "grid md:grid-cols-3 gap-6", children: [{
      n: "auth-svc",
      v: 99.99,
      ms: 42,
      status: "healthy"
    }, {
      n: "billing-api",
      v: 99.91,
      ms: 118,
      status: "healthy"
    }, {
      n: "search-cluster",
      v: 98.4,
      ms: 312,
      status: "degraded"
    }, {
      n: "feed-stream",
      v: 99.97,
      ms: 67,
      status: "healthy"
    }, {
      n: "payments-webhook",
      v: 100,
      ms: 12,
      status: "healthy"
    }, {
      n: "legacy-export",
      v: 95.2,
      ms: 840,
      status: "failing"
    }].map((s, i) => /* @__PURE__ */ jsxs(motion.div, { initial: {
      opacity: 0,
      y: 20
    }, animate: {
      opacity: 1,
      y: 0
    }, transition: {
      delay: i * 0.1
    }, className: "border border-border bg-card/40 backdrop-blur-xl p-6", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex justify-between font-mono text-sm mb-4", children: [
        /* @__PURE__ */ jsx("span", { className: "text-bone", children: s.n }),
        /* @__PURE__ */ jsx("span", { className: s.status === "healthy" ? "text-acid" : s.status === "degraded" ? "text-warn" : "text-destructive", children: s.status })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsxs("div", { className: "flex justify-between font-mono text-xs text-bone/60 mb-1", children: [
            /* @__PURE__ */ jsx("span", { children: "Uptime (30d)" }),
            /* @__PURE__ */ jsxs("span", { children: [
              s.v,
              "%"
            ] })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "h-1.5 bg-bone/10 rounded-full overflow-hidden", children: /* @__PURE__ */ jsx(motion.div, { initial: {
            width: 0
          }, animate: {
            width: `${s.v}%`
          }, transition: {
            duration: 1,
            delay: 0.2
          }, className: `h-full ${s.status === "healthy" ? "bg-acid" : s.status === "degraded" ? "bg-warn" : "bg-destructive"}` }) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex justify-between font-mono text-xs border-t border-border/50 pt-3", children: [
          /* @__PURE__ */ jsx("span", { className: "text-bone/40", children: "Latency p50" }),
          /* @__PURE__ */ jsxs("span", { className: "text-bone", children: [
            s.ms,
            "ms"
          ] })
        ] })
      ] })
    ] }, s.n)) })
  ] });
}
export {
  Monitor as component
};
