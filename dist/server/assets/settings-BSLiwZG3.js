import { jsxs, jsx } from "react/jsx-runtime";
import { useState } from "react";
import { u as useAppStore } from "./router-DwgKz4jV.js";
import { toast } from "sonner";
import { motion } from "motion/react";
import "@tanstack/react-query";
import "@tanstack/react-router";
import "zustand";
import "zustand/middleware";
function Settings() {
  const {
    settings,
    setSettings
  } = useAppStore();
  const [openAIApiKey, setOpenAIApiKey] = useState(settings.openAIApiKey);
  const [scanServiceUrl, setScanServiceUrl] = useState(settings.scanServiceUrl);
  const [authToken, setAuthToken] = useState(settings.authToken ?? "");
  const [isSaving, setIsSaving] = useState(false);
  const handleSave = async () => {
    setIsSaving(true);
    await new Promise((resolve) => setTimeout(resolve, 800));
    setSettings({
      openAIApiKey,
      scanServiceUrl,
      authToken: authToken || void 0
    });
    setIsSaving(false);
    toast.success("Configuration successfully updated");
  };
  return /* @__PURE__ */ jsxs("div", { className: "p-6 max-w-3xl mx-auto pt-24", children: [
    /* @__PURE__ */ jsxs("div", { className: "mb-8 border-b border-border pb-6", children: [
      /* @__PURE__ */ jsx("div", { className: "font-mono text-xs text-acid uppercase tracking-widest mb-3", children: "[ sys.settings ]" }),
      /* @__PURE__ */ jsx("h1", { className: "text-4xl md:text-5xl font-display uppercase tracking-tight", children: "Configuration" })
    ] }),
    /* @__PURE__ */ jsxs(motion.div, { initial: {
      opacity: 0,
      y: 20
    }, animate: {
      opacity: 1,
      y: 0
    }, transition: {
      duration: 0.5
    }, className: "space-y-8", children: [
      /* @__PURE__ */ jsxs("div", { className: "border border-border bg-card/20 backdrop-blur-md", children: [
        /* @__PURE__ */ jsx("div", { className: "border-b border-border px-6 py-3 font-mono text-[10px] uppercase tracking-widest text-bone/50 bg-background/50", children: "// Core Infrastructure" }),
        /* @__PURE__ */ jsxs("div", { className: "p-6 space-y-6", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block font-mono text-xs text-bone/60 uppercase tracking-widest mb-2", children: "Scan Service URL" }),
            /* @__PURE__ */ jsx("input", { type: "text", value: scanServiceUrl, onChange: (e) => setScanServiceUrl(e.target.value), placeholder: "https://scan-service.example.com", className: "w-full bg-background/60 border border-border focus:border-acid outline-none px-4 py-3 text-bone font-mono text-sm transition-colors" }),
            /* @__PURE__ */ jsx("p", { className: "mt-2 font-mono text-[10px] text-bone/40", children: "Target endpoint for offloading heavy surface analysis." })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block font-mono text-xs text-bone/60 uppercase tracking-widest mb-2", children: "Service Authentication Token" }),
            /* @__PURE__ */ jsx("input", { type: "password", value: authToken, onChange: (e) => setAuthToken(e.target.value), placeholder: "Bearer ••••••••••••", className: "w-full bg-background/60 border border-border focus:border-acid outline-none px-4 py-3 text-bone font-mono text-sm transition-colors" }),
            /* @__PURE__ */ jsx("p", { className: "mt-2 font-mono text-[10px] text-bone/40", children: "Required if your designated scan service is protected." })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "border border-border bg-card/20 backdrop-blur-md", children: [
        /* @__PURE__ */ jsx("div", { className: "border-b border-border px-6 py-3 font-mono text-[10px] uppercase tracking-widest text-bone/50 bg-background/50", children: "// Intelligence Layer" }),
        /* @__PURE__ */ jsx("div", { className: "p-6 space-y-6", children: /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "block font-mono text-xs text-bone/60 uppercase tracking-widest mb-2", children: "OpenAI API Key" }),
          /* @__PURE__ */ jsx("input", { type: "password", value: openAIApiKey, onChange: (e) => setOpenAIApiKey(e.target.value), placeholder: "sk-proj-...", className: "w-full bg-background/60 border border-border focus:border-acid outline-none px-4 py-3 text-bone font-mono text-sm transition-colors" }),
          /* @__PURE__ */ jsx("p", { className: "mt-2 font-mono text-[10px] text-bone/40", children: "Required for test case synthesis and auto-documentation features." })
        ] }) })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "flex justify-end pt-4", children: /* @__PURE__ */ jsx("button", { onClick: handleSave, disabled: isSaving, className: `
              border px-8 py-3 font-mono text-xs uppercase tracking-[0.25em] transition-all
              ${isSaving ? "border-acid text-acid bg-acid/10 cursor-wait" : "border-acid text-acid hover:bg-acid hover:text-ink shadow-[0_0_15px_rgba(var(--acid-rgb),0.1)] hover:shadow-[0_0_20px_rgba(var(--acid-rgb),0.3)]"}
            `, children: isSaving ? "Persisting..." : "Apply Config" }) })
    ] })
  ] });
}
export {
  Settings as component
};
