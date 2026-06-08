// src/routes/integrations.tsx
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useAppStore } from "@/store/useAppStore";

export const Route = createFileRoute("/integrations")({
  component: Integrations,
});

const TABS = ["GitHub", "Jenkins", "Postman", "Swagger", "OpenAPI"] as const;
type Tab = (typeof TABS)[number];

function Integrations() {
  const [activeTab, setActiveTab] = useState<Tab>("GitHub");
  const { setModal } = useAppStore();

  const integrationDetails: Record<
    Tab,
    {
      desc: string;
      features: string[];
      status: "connected" | "disconnected" | "polling";
    }
  > = {
    GitHub: {
      desc: "Auto-pull OpenAPI specs from PRs. Wire GitHub Actions for CI security gates. Annotate commits with scan results.",
      features: [
        "Pull Request Comments",
        "CI/CD Blockers",
        "Auto-sync from main branch",
        "Secret scanning integration",
      ],
      status: "connected",
    },
    Jenkins: {
      desc: "Trigger security scans from build pipelines. Ingest test results. Fail builds on critical findings before they reach staging.",
      features: [
        "Pipeline Integration (Jenkinsfile)",
        "Pass/Fail Thresholds",
        "Artifact uploading",
        "Audit logs",
      ],
      status: "connected",
    },
    Postman: {
      desc: "Import collections, environments and test suites. Sync changes bidirectionally. Export generated tests back to Postman.",
      features: [
        "Collection Sync",
        "Environment variables mapping",
        "Test script generation",
        "Newman CLI support",
      ],
      status: "connected",
    },
    Swagger: {
      desc: "Ingest Swagger 2.0 specs. Auto-detect drift between documented and deployed contracts.",
      features: [
        "Format translation",
        "Drift detection",
        "Auto-mock generation",
      ],
      status: "polling",
    },
    OpenAPI: {
      desc: "Native support for OpenAPI 3.x specs. Full support for schema validation, request/response mocking, and dynamic testing.",
      features: [
        "OpenAPI 3.1 Support",
        "Schema Validation",
        "Test Case Generation",
        "Contract enforcement",
      ],
      status: "disconnected",
    },
  };

  const active = integrationDetails[activeTab];

  return (
    <div className="p-6 max-w-6xl mx-auto pt-32 pb-20 min-h-screen">
      <div className="mb-12">
        <h1 className="text-4xl font-display font-bold tracking-tight mb-4 text-foreground">
          Integrations Hub
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl">
          Connect your existing stack to APIGUARD.os. Automate your security
          posture across the SDLC.
        </p>
      </div>

      <div className="grid md:grid-cols-[250px_1fr] gap-8 border-t border-border/60 pt-10">
        {/* Sidebar Tabs */}
        <div className="flex flex-col gap-2">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`text-left px-5 py-3 font-medium text-sm rounded-lg transition-all ${
                activeTab === tab
                  ? "bg-acid text-ink shadow-sm"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="min-h-[400px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="h-full flex flex-col justify-between py-2"
            >
              <div>
                <div className="flex items-center justify-between mb-8 pb-6 border-b border-border/50">
                  <h2 className="text-3xl font-display font-bold tracking-tight text-foreground">
                    {activeTab} <span className="text-muted-foreground font-normal">Integration</span>
                  </h2>
                  <span
                    className={`font-semibold text-xs px-3 py-1 rounded-full uppercase tracking-wider ${
                      active.status === "connected"
                        ? "text-acid bg-acid/10"
                        : active.status === "polling"
                          ? "text-warn bg-warn/10"
                          : "text-muted-foreground bg-secondary"
                    }`}
                  >
                    {active.status}
                  </span>
                </div>

                <p className="text-foreground text-lg leading-relaxed mb-10 max-w-2xl">
                  {active.desc}
                </p>

                <div className="mb-12">
                  <div className="font-display font-semibold text-xs text-muted-foreground uppercase tracking-widest mb-4">
                    Features
                  </div>
                  <ul className="grid sm:grid-cols-2 gap-4">
                    {active.features.map((feature, i) => (
                      <li
                        key={i}
                        className="flex items-center gap-3 font-medium text-sm text-foreground bg-secondary/30 px-4 py-3 rounded-lg"
                      >
                        <span className="text-acid">✔</span> {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="flex gap-4 pt-8 border-t border-border/50">
                <button
                  onClick={() => {
                    const kindMap: Record<string, string> = {
                      GitHub: "github",
                      Jenkins: "jenkins",
                      Postman: "postman",
                      Swagger: "swagger",
                      OpenAPI: "swagger",
                    };
                    setModal(kindMap[activeTab]);
                  }}
                  className="bg-acid text-ink px-6 py-2.5 rounded-full font-display font-semibold shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all"
                >
                  Configure
                </button>
                {active.status === "connected" && (
                  <button className="border border-border bg-card text-foreground px-6 py-2.5 rounded-full font-display font-semibold shadow-sm hover:border-destructive hover:text-destructive transition-all">
                    Disconnect
                  </button>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
