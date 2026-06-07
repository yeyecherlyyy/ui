import { jsxs, jsx } from "react/jsx-runtime";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { u as useAppStore } from "./router-DwgKz4jV.js";
import "@tanstack/react-query";
import "@tanstack/react-router";
import "zustand";
import "zustand/middleware";
const TABS = ["GitHub", "Jenkins", "Postman", "Swagger", "OpenAPI"];
function Integrations() {
  const [activeTab, setActiveTab] = useState("GitHub");
  const {
    setModal
  } = useAppStore();
  const integrationDetails = {
    GitHub: {
      desc: "Auto-pull OpenAPI specs from PRs. Wire GitHub Actions for CI security gates. Annotate commits with scan results.",
      features: ["Pull Request Comments", "CI/CD Blockers", "Auto-sync from main branch", "Secret scanning integration"],
      status: "connected"
    },
    Jenkins: {
      desc: "Trigger security scans from build pipelines. Ingest test results. Fail builds on critical findings before they reach staging.",
      features: ["Pipeline Integration (Jenkinsfile)", "Pass/Fail Thresholds", "Artifact uploading", "Audit logs"],
      status: "connected"
    },
    Postman: {
      desc: "Import collections, environments and test suites. Sync changes bidirectionally. Export generated tests back to Postman.",
      features: ["Collection Sync", "Environment variables mapping", "Test script generation", "Newman CLI support"],
      status: "connected"
    },
    Swagger: {
      desc: "Ingest Swagger 2.0 specs. Auto-detect drift between documented and deployed contracts.",
      features: ["Format translation", "Drift detection", "Auto-mock generation"],
      status: "polling"
    },
    OpenAPI: {
      desc: "Native support for OpenAPI 3.x specs. Full support for schema validation, request/response mocking, and dynamic testing.",
      features: ["OpenAPI 3.1 Support", "Schema Validation", "Test Case Generation", "Contract enforcement"],
      status: "disconnected"
    }
  };
  const active = integrationDetails[activeTab];
  return /* @__PURE__ */ jsxs("div", { className: "p-6 max-w-6xl mx-auto pt-24 min-h-screen", children: [
    /* @__PURE__ */ jsxs("div", { className: "mb-12", children: [
      /* @__PURE__ */ jsx("h1", { className: "text-4xl font-display uppercase tracking-tight mb-4", children: "Integrations Hub" }),
      /* @__PURE__ */ jsx("p", { className: "font-mono text-sm text-bone/60", children: "Connect your existing stack to APIGUARD.os. Automate your security posture across the SDLC." })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-[250px_1fr] gap-8 border-t border-border pt-8", children: [
      /* @__PURE__ */ jsx("div", { className: "flex flex-col gap-2", children: TABS.map((tab) => /* @__PURE__ */ jsx("button", { onClick: () => setActiveTab(tab), className: `text-left px-4 py-3 font-mono text-sm uppercase tracking-widest transition-colors border-l-2 ${activeTab === tab ? "border-acid text-acid bg-acid/5" : "border-transparent text-bone/50 hover:text-bone hover:bg-bone/5"}`, children: tab }, tab)) }),
      /* @__PURE__ */ jsx("div", { className: "min-h-[400px]", children: /* @__PURE__ */ jsx(AnimatePresence, { mode: "wait", children: /* @__PURE__ */ jsxs(motion.div, { initial: {
        opacity: 0,
        x: 10
      }, animate: {
        opacity: 1,
        x: 0
      }, exit: {
        opacity: 0,
        x: -10
      }, transition: {
        duration: 0.2
      }, className: "border border-border bg-card/40 backdrop-blur-xl p-8 h-full flex flex-col justify-between", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-8 pb-6 border-b border-border/50", children: [
            /* @__PURE__ */ jsxs("h2", { className: "text-3xl font-display uppercase tracking-tight text-bone", children: [
              activeTab,
              " ",
              /* @__PURE__ */ jsx("span", { className: "text-acid", children: "Integration" })
            ] }),
            /* @__PURE__ */ jsx("span", { className: `font-mono text-xs px-3 py-1 border uppercase tracking-widest ${active.status === "connected" ? "border-acid text-acid bg-acid/10" : active.status === "polling" ? "border-warn text-warn bg-warn/10" : "border-bone/20 text-bone/50 bg-bone/5"}`, children: active.status })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-bone/80 leading-relaxed mb-10 max-w-2xl", children: active.desc }),
          /* @__PURE__ */ jsxs("div", { className: "mb-12", children: [
            /* @__PURE__ */ jsx("div", { className: "font-mono text-xs text-bone/40 uppercase tracking-widest mb-4", children: "// Features" }),
            /* @__PURE__ */ jsx("ul", { className: "grid sm:grid-cols-2 gap-4", children: active.features.map((feature, i) => /* @__PURE__ */ jsxs("li", { className: "flex items-center gap-3 font-mono text-sm text-bone", children: [
              /* @__PURE__ */ jsx("span", { className: "text-acid", children: "▸" }),
              " ",
              feature
            ] }, i)) })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex gap-4 pt-8 border-t border-border/50", children: [
          /* @__PURE__ */ jsx("button", { onClick: () => {
            const kindMap = {
              GitHub: "github",
              Jenkins: "jenkins",
              Postman: "postman",
              Swagger: "swagger",
              OpenAPI: "swagger"
            };
            setModal(kindMap[activeTab]);
          }, className: "bg-acid text-ink px-6 py-2 font-mono text-xs uppercase tracking-widest hover:bg-bone transition-colors", children: "Configure" }),
          active.status === "connected" && /* @__PURE__ */ jsx("button", { className: "border border-bone/20 text-bone px-6 py-2 font-mono text-xs uppercase tracking-widest hover:border-destructive hover:text-destructive transition-colors", children: "Disconnect" })
        ] })
      ] }, activeTab) }) })
    ] })
  ] });
}
export {
  Integrations as component
};
