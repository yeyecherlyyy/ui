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
        { label: "runtime", placeholder: "kubernetes | ecs | nomad | docker", value: "kubernetes" },
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
        { label: "depth", placeholder: "shallow | standard | deep", value: "standard" },
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
  const isIntegration = kind && ["github", "jenkins", "postman", "swagger"].includes(kind);
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
          className="fixed inset-0 z-[100] bg-ink/70 backdrop-blur-md flex items-center justify-center p-6"
        >
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            transition={{ duration: 0.18 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-lg border border-border bg-card/80 backdrop-blur-xl"
          >
            <div className="flex items-center justify-between border-b border-border px-4 py-2 font-mono text-[10px] uppercase tracking-widest text-bone/50">
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
                    className="font-mono text-xs uppercase tracking-[0.3em]"
                    style={{ color: actionConfig[actionKind].accent }}
                  >
                    {actionConfig[actionKind].tag}
                  </div>
                  <h3 className="font-display text-3xl md:text-4xl uppercase tracking-tighter leading-[0.95]">
                    {actionConfig[actionKind].title}
                  </h3>
                  <p className="text-bone/60 text-sm leading-relaxed">
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
                      (f: { label: string; placeholder: string; value: string }) => (
                        <label key={f.label} className="block">
                          <span className="text-bone/40 block mb-1">// {f.label}</span>
                          <input
                            defaultValue={f.value}
                            placeholder={f.placeholder}
                            className="w-full bg-background/60 border border-bone/20 focus:border-acid outline-none px-3 py-2 text-bone"
                          />
                        </label>
                      ),
                    )}
                    <div className="flex items-center gap-3 pt-4">
                      <button
                        type="submit"
                        className="border px-5 py-2 uppercase tracking-[0.25em] transition"
                        style={{
                          borderColor: actionConfig[actionKind].accent,
                          color: actionConfig[actionKind].accent,
                        }}
                      >
                        {actionConfig[actionKind].cta}
                      </button>
                      <button
                        type="button"
                        onClick={onClose}
                        className="text-bone/50 hover:text-bone uppercase tracking-[0.25em]"
                      >
                        cancel
                      </button>
                    </div>
                  </form>
                </>
              )}
              {isIntegration && integrationKind && (
                <>
                  <div
                    className="font-mono text-xs uppercase tracking-[0.3em]"
                    style={{ color: integrationConfig[integrationKind].accent }}
                  >
                    {integrationConfig[integrationKind].tag}
                  </div>
                  <h3 className="font-display text-3xl md:text-4xl uppercase tracking-tighter leading-[0.95]">
                    {integrationConfig[integrationKind].title}
                  </h3>
                  <p className="text-bone/60 text-sm leading-relaxed">
                    {integrationConfig[integrationKind].desc}
                  </p>
                  <div className="space-y-2 font-mono text-xs">
                    {integrationConfig[integrationKind].meta.map((m) => (
                      <div
                        key={m.label}
                        className="flex justify-between border-b border-border/50 py-2"
                      >
                        <span className="text-bone/40">// {m.label}</span>
                        <span className="text-bone">{m.value}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-2 pt-2">
                    {integrationConfig[integrationKind].actions.map((a) => (
                      <button
                        key={a}
                        onClick={onClose}
                        className="border border-border px-3 py-1.5 font-mono text-[10px] uppercase tracking-widest text-bone/70 hover:border-acid hover:text-acid transition"
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
