// src/components/site/ActionModal.tsx
import { motion, AnimatePresence } from "motion/react";
import { useAppStore } from "@/store/useAppStore";

export function ActionModal() {
  const { modal, setModal } = useAppStore();
  const kind = modal;
  const onClose = () => setModal(null);

  const actionConfig = {
    deploy: {
      tag: "[ agent.deploy ]",
      title: "Deploy Edge Agent",
      desc: "Drop a lightweight sentinel into your cluster. Auto-discovers endpoints, streams telemetry back to apiguard.os in under 60 seconds.",
      fields: [
        { label: "cluster.name", placeholder: "prod-us-east-1", value: "" },
        {
          label: "runtime",
          placeholder: "kubernetes | ecs | nomad | docker",
          value: "kubernetes",
        },
        { label: "region", placeholder: "global·edge", value: "us-east-1" },
      ],
      cta: "▶ deploy_agent",
      accent: "var(--acid)",
    },
    scan: {
      tag: "[ scan.initiate ]",
      title: "Start Surface Scan",
      desc: "Aim at a base URL or upload an OpenAPI spec. Full CVE + OWASP-API top-10 sweep typically completes in ~90 seconds.",
      fields: [
        { label: "target.url", placeholder: "https://api.acme.io", value: "" },
        {
          label: "depth",
          placeholder: "shallow | standard | deep",
          value: "standard",
        },
        { label: "auth.token", placeholder: "Bearer ••••••••", value: "" },
      ],
      cta: "▶ start.scan()",
      accent: "var(--acid)",
    },
    demo: {
      tag: "[ demo.book ]",
      title: "Book a Live Demo",
      desc: "30 minutes with an engineer. Bring your real API — we'll scan it, mock it, and stress it together.",
      fields: [
        { label: "name", placeholder: "Ada Lovelace", value: "" },
        { label: "work.email", placeholder: "ada@yourco.com", value: "" },
        { label: "company", placeholder: "Yourco Inc.", value: "" },
      ],
      cta: "▶ confirm.slot",
      accent: "var(--signal)",
    },
  } as const;

  const integrationConfig: Record<
    string,
    {
      tag: string;
      title: string;
      desc: string;
      meta: { label: string; value: string }[];
      actions: string[];
      accent: string;
    }
  > = {
    github: {
      tag: "[ repo.bridge ]",
      title: "GitHub Integration",
      desc: "Auto-pull OpenAPI specs from PRs. Wire GitHub Actions for CI security gates. Annotate commits with scan results.",
      meta: [
        { label: "connection", value: "● authenticated" },
        { label: "repos.synced", value: "3" },
        { label: "webhooks", value: "push, pull_request" },
        { label: "last.payload", value: "2m ago" },
      ],
      actions: ["sync_repos()", "view_actions_logs()", "configure_webhook()"],
      accent: "var(--acid)",
    },
    jenkins: {
      tag: "[ ci.bridge ]",
      title: "Jenkins Integration",
      desc: "Trigger security scans from build pipelines. Ingest test results. Fail builds on critical findings before they reach staging.",
      meta: [
        { label: "connection", value: "● authenticated" },
        { label: "jobs.wired", value: "7" },
        { label: "build.trigger", value: "post-build step" },
        { label: "last.run", value: "#892 — passed" },
      ],
      actions: ["add_build_step()", "view_pipeline()", "configure_node()"],
      accent: "var(--warn)",
    },
    postman: {
      tag: "[ collection.bridge ]",
      title: "Postman Integration",
      desc: "Import collections, environments and test suites. Sync changes bidirectionally. Export generated tests back to Postman.",
      meta: [
        { label: "connection", value: "● authenticated" },
        { label: "collections", value: "12 imported" },
        { label: "env.vars", value: "47 synced" },
        { label: "last.sync", value: "14m ago" },
      ],
      actions: ["import_collection()", "sync_environment()", "export_tests()"],
      accent: "var(--signal)",
    },
    swagger: {
      tag: "[ spec.bridge ]",
      title: "Swagger / OpenAPI",
      desc: "Ingest Swagger 2.0 and OpenAPI 3.x specs. Auto-detect drift between documented and deployed contracts.",
      meta: [
        { label: "connection", value: "● polling" },
        { label: "specs.tracked", value: "8" },
        { label: "format", value: "openapi 3.0.3" },
        { label: "last.diff", value: "1 finding" },
      ],
      actions: ["upload_spec()", "run_diff()", "generate_client()"],
      accent: "var(--acid)",
    },
  };

  const isAction = kind && ["deploy", "scan", "demo"].includes(kind);
  const isIntegration =
    kind && ["github", "jenkins", "postman", "swagger"].includes(kind);
  const actionKind = isAction ? (kind as "deploy" | "scan" | "demo") : null;
  const integrationKind = isIntegration
    ? (kind as "github" | "jenkins" | "postman" | "swagger")
    : null;

  return (
    <AnimatePresence>
      {kind && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-[100] bg-bone/40 backdrop-blur-sm flex items-center justify-center p-6"
        >
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            transition={{ duration: 0.18 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-lg border border-border bg-card shadow-2xl rounded-2xl overflow-hidden"
          >
            <div className="flex items-center justify-between border-b border-border px-4 py-3 bg-secondary/50 font-mono text-[10px] uppercase tracking-widest text-bone/60">
              <span>
                ~/apiguard
                {isAction
                  ? kind === "deploy"
                    ? "/agent"
                    : kind === "scan"
                      ? "/scanner"
                      : "/demo"
                  : `/integrations/${kind}`}
              </span>
              <button onClick={onClose} className="hover:text-acid">
                [ esc ]
              </button>
            </div>
            <div className="p-6 space-y-5">
              {isAction && actionKind && (
                <>
                  <div
                    className="font-mono text-xs font-semibold tracking-widest mb-2"
                    style={{ color: actionConfig[actionKind].accent }}
                  >
                    {actionConfig[actionKind].tag}
                  </div>
                  <h3 className="font-display text-3xl md:text-4xl font-bold tracking-tight mb-2">
                    {actionConfig[actionKind].title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                    {actionConfig[actionKind].desc}
                  </p>
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      onClose();
                    }}
                    className="space-y-3 font-mono text-xs"
                  >
                    {actionConfig[actionKind].fields.map(
                      (f: {
                        label: string;
                        placeholder: string;
                        value: string;
                      }) => (
                        <label key={f.label} className="block">
                          <span className="text-muted-foreground font-medium block mb-1">
                            {f.label}
                          </span>
                          <input
                            defaultValue={f.value}
                            placeholder={f.placeholder}
                            className="w-full bg-background border border-border focus:border-acid focus:ring-1 focus:ring-acid rounded-md outline-none px-3 py-2 text-bone transition-shadow"
                          />
                        </label>
                      ),
                    )}
                    <div className="flex items-center gap-3 pt-6">
                      <button
                        type="submit"
                        className="bg-acid text-ink font-medium px-5 py-2.5 rounded-full hover:shadow-md transition-all"
                      >
                        {actionConfig[actionKind].cta}
                      </button>
                      <button
                        type="button"
                        onClick={onClose}
                        className="text-muted-foreground hover:text-bone font-medium px-4 py-2"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </>
              )}
              {isIntegration && integrationKind && (
                <>
                  <div
                    className="font-mono text-xs font-semibold tracking-widest mb-2"
                    style={{ color: integrationConfig[integrationKind].accent }}
                  >
                    {integrationConfig[integrationKind].tag}
                  </div>
                  <h3 className="font-display text-3xl md:text-4xl font-bold tracking-tight mb-2">
                    {integrationConfig[integrationKind].title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                    {integrationConfig[integrationKind].desc}
                  </p>
                  <div className="space-y-2 font-mono text-xs">
                    {integrationConfig[integrationKind].meta.map((m) => (
                      <div
                        key={m.label}
                        className="flex justify-between border-b border-border py-3 text-sm"
                      >
                        <span className="text-muted-foreground font-medium">{m.label}</span>
                        <span className="text-bone font-semibold">{m.value}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-3 pt-4">
                    {integrationConfig[integrationKind].actions.map((a) => (
                      <button
                        key={a}
                        onClick={onClose}
                        className="bg-secondary text-bone border border-border px-4 py-2 rounded-full font-medium text-xs hover:border-acid hover:text-acid transition-colors"
                      >
                        {a}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
