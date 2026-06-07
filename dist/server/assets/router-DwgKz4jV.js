import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { Link, createRootRouteWithContext, useRouter, Outlet, HeadContent, Scripts, createFileRoute, lazyRouteComponent, notFound, createRouter } from "@tanstack/react-router";
import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { useEffect } from "react";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { AnimatePresence, motion } from "motion/react";
const appCss = "/assets/styles-GWIdxmmJ.css";
function reportLovableError(error, context = {}) {
  if (typeof window === "undefined") return;
  window.__lovableEvents?.captureException?.(
    error,
    {
      source: "react_error_boundary",
      route: window.location.pathname,
      ...context
    },
    {
      mechanism: "react_error_boundary",
      handled: false,
      severity: "error"
    }
  );
}
const useAppStore = create()(
  persist(
    (set, get) => ({
      scans: {
        "s-9281": {
          id: "s-9281",
          status: "completed",
          spec: "{}",
          createdAt: new Date(Date.now() - 1e3 * 60 * 5).toISOString(),
          findings: [
            {
              severity: "critical",
              description: "BOLA vulnerability in /api/v1/users/{id}/profile"
            },
            {
              severity: "high",
              description: "JWT signature validation bypass possible on POST /auth"
            },
            {
              severity: "medium",
              description: "Rate limit not strictly enforced on /search endpoint"
            }
          ]
        },
        "s-9280": {
          id: "s-9280",
          status: "completed",
          spec: "{}",
          createdAt: new Date(Date.now() - 1e3 * 60 * 60 * 24).toISOString(),
          findings: [
            {
              severity: "medium",
              description: "Information exposure via overly verbose error responses"
            },
            {
              severity: "low",
              description: "Missing Content-Security-Policy header"
            }
          ]
        },
        "s-9279": {
          id: "s-9279",
          status: "failed",
          spec: "{}",
          createdAt: new Date(Date.now() - 1e3 * 60 * 60 * 48).toISOString(),
          findings: []
        }
      },
      settings: {
        openAIApiKey: "",
        scanServiceUrl: "https://scan-service.example.com",
        authToken: void 0
      },
      modal: null,
      addScan: (scan) => set((state) => ({ scans: { ...state.scans, [scan.id]: scan } })),
      updateScan: (id, partial) => set((state) => ({
        scans: { ...state.scans, [id]: { ...state.scans[id], ...partial } }
      })),
      setSettings: (s) => set(() => ({ settings: s })),
      setModal: (m) => set(() => ({ modal: m }))
    }),
    {
      name: "apiguard-storage",
      // key in localStorage
      // we only persist settings; scans stay in memory for session simplicity
      partialize: (state) => ({ settings: state.settings })
    }
  )
);
function Header() {
  const { setModal } = useAppStore();
  return /* @__PURE__ */ jsx("header", { className: "fixed top-0 inset-x-0 z-50 border-b border-border/60 bg-background/70 backdrop-blur-xl", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between px-6 py-3 font-mono text-xs tracking-widest uppercase", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
      /* @__PURE__ */ jsx("span", { className: "size-2 bg-acid animate-pulse rounded-full" }),
      /* @__PURE__ */ jsxs(Link, { to: "/", className: "text-bone hover:text-acid transition-colors", children: [
        "APIGUARD/",
        /* @__PURE__ */ jsx("span", { className: "text-acid", children: "api.os" })
      ] }),
      /* @__PURE__ */ jsx("span", { className: "text-bone/40 hidden md:inline", children: "// v4.2 · 47ms · all systems nominal" })
    ] }),
    /* @__PURE__ */ jsxs("nav", { className: "hidden md:flex items-center gap-6 text-bone/70", children: [
      /* @__PURE__ */ jsx(Link, { to: "/monitor", className: "hover:text-acid", children: "monitor" }),
      /* @__PURE__ */ jsx(Link, { to: "/integrations", className: "hover:text-acid", children: "integrations" }),
      /* @__PURE__ */ jsx(Link, { to: "/scans", className: "hover:text-acid", children: "scans" }),
      /* @__PURE__ */ jsx(Link, { to: "/reports", className: "hover:text-acid", children: "reports" }),
      /* @__PURE__ */ jsx(Link, { to: "/settings", className: "hover:text-acid", children: "settings" })
    ] }),
    /* @__PURE__ */ jsx(
      "button",
      {
        onClick: () => setModal("deploy"),
        className: "border border-acid text-acid px-3 py-1 hover:bg-acid hover:text-ink transition",
        children: "deploy_agent →"
      }
    )
  ] }) });
}
function ActionModal() {
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
          value: "kubernetes"
        },
        { label: "region", placeholder: "global·edge", value: "us-east-1" }
      ],
      cta: "▶ deploy_agent",
      accent: "var(--acid)"
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
          value: "standard"
        },
        { label: "auth.token", placeholder: "Bearer ••••••••", value: "" }
      ],
      cta: "▶ start.scan()",
      accent: "var(--acid)"
    },
    demo: {
      tag: "[ demo.book ]",
      title: "Book a Live Demo",
      desc: "30 minutes with an engineer. Bring your real API — we'll scan it, mock it, and stress it together.",
      fields: [
        { label: "name", placeholder: "Ada Lovelace", value: "" },
        { label: "work.email", placeholder: "ada@yourco.com", value: "" },
        { label: "company", placeholder: "Yourco Inc.", value: "" }
      ],
      cta: "▶ confirm.slot",
      accent: "var(--signal)"
    }
  };
  const integrationConfig = {
    github: {
      tag: "[ repo.bridge ]",
      title: "GitHub Integration",
      desc: "Auto-pull OpenAPI specs from PRs. Wire GitHub Actions for CI security gates. Annotate commits with scan results.",
      meta: [
        { label: "connection", value: "● authenticated" },
        { label: "repos.synced", value: "3" },
        { label: "webhooks", value: "push, pull_request" },
        { label: "last.payload", value: "2m ago" }
      ],
      actions: ["sync_repos()", "view_actions_logs()", "configure_webhook()"],
      accent: "var(--acid)"
    },
    jenkins: {
      tag: "[ ci.bridge ]",
      title: "Jenkins Integration",
      desc: "Trigger security scans from build pipelines. Ingest test results. Fail builds on critical findings before they reach staging.",
      meta: [
        { label: "connection", value: "● authenticated" },
        { label: "jobs.wired", value: "7" },
        { label: "build.trigger", value: "post-build step" },
        { label: "last.run", value: "#892 — passed" }
      ],
      actions: ["add_build_step()", "view_pipeline()", "configure_node()"],
      accent: "var(--warn)"
    },
    postman: {
      tag: "[ collection.bridge ]",
      title: "Postman Integration",
      desc: "Import collections, environments and test suites. Sync changes bidirectionally. Export generated tests back to Postman.",
      meta: [
        { label: "connection", value: "● authenticated" },
        { label: "collections", value: "12 imported" },
        { label: "env.vars", value: "47 synced" },
        { label: "last.sync", value: "14m ago" }
      ],
      actions: ["import_collection()", "sync_environment()", "export_tests()"],
      accent: "var(--signal)"
    },
    swagger: {
      tag: "[ spec.bridge ]",
      title: "Swagger / OpenAPI",
      desc: "Ingest Swagger 2.0 and OpenAPI 3.x specs. Auto-detect drift between documented and deployed contracts.",
      meta: [
        { label: "connection", value: "● polling" },
        { label: "specs.tracked", value: "8" },
        { label: "format", value: "openapi 3.0.3" },
        { label: "last.diff", value: "1 finding" }
      ],
      actions: ["upload_spec()", "run_diff()", "generate_client()"],
      accent: "var(--acid)"
    }
  };
  const isAction = kind && ["deploy", "scan", "demo"].includes(kind);
  const isIntegration = kind && ["github", "jenkins", "postman", "swagger"].includes(kind);
  const actionKind = isAction ? kind : null;
  const integrationKind = isIntegration ? kind : null;
  return /* @__PURE__ */ jsx(AnimatePresence, { children: kind && /* @__PURE__ */ jsx(
    motion.div,
    {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
      onClick: onClose,
      className: "fixed inset-0 z-[100] bg-ink/70 backdrop-blur-md flex items-center justify-center p-6",
      children: /* @__PURE__ */ jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 20, scale: 0.98 },
          animate: { opacity: 1, y: 0, scale: 1 },
          exit: { opacity: 0, y: 10, scale: 0.98 },
          transition: { duration: 0.18 },
          onClick: (e) => e.stopPropagation(),
          className: "relative w-full max-w-lg border border-border bg-card/80 backdrop-blur-xl",
          children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between border-b border-border px-4 py-2 font-mono text-[10px] uppercase tracking-widest text-bone/50", children: [
              /* @__PURE__ */ jsxs("span", { children: [
                "~/apiguard",
                isAction ? kind === "deploy" ? "/agent" : kind === "scan" ? "/scanner" : "/demo" : `/integrations/${kind}`
              ] }),
              /* @__PURE__ */ jsx("button", { onClick: onClose, className: "hover:text-acid", children: "[ esc ]" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "p-6 space-y-5", children: [
              isAction && actionKind && /* @__PURE__ */ jsxs(Fragment, { children: [
                /* @__PURE__ */ jsx(
                  "div",
                  {
                    className: "font-mono text-xs uppercase tracking-[0.3em]",
                    style: { color: actionConfig[actionKind].accent },
                    children: actionConfig[actionKind].tag
                  }
                ),
                /* @__PURE__ */ jsx("h3", { className: "font-display text-3xl md:text-4xl uppercase tracking-tighter leading-[0.95]", children: actionConfig[actionKind].title }),
                /* @__PURE__ */ jsx("p", { className: "text-bone/60 text-sm leading-relaxed", children: actionConfig[actionKind].desc }),
                /* @__PURE__ */ jsxs(
                  "form",
                  {
                    onSubmit: (e) => {
                      e.preventDefault();
                      onClose();
                    },
                    className: "space-y-3 font-mono text-xs",
                    children: [
                      actionConfig[actionKind].fields.map(
                        (f) => /* @__PURE__ */ jsxs("label", { className: "block", children: [
                          /* @__PURE__ */ jsxs("span", { className: "text-bone/40 block mb-1", children: [
                            "// ",
                            f.label
                          ] }),
                          /* @__PURE__ */ jsx(
                            "input",
                            {
                              defaultValue: f.value,
                              placeholder: f.placeholder,
                              className: "w-full bg-background/60 border border-bone/20 focus:border-acid outline-none px-3 py-2 text-bone"
                            }
                          )
                        ] }, f.label)
                      ),
                      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 pt-4", children: [
                        /* @__PURE__ */ jsx(
                          "button",
                          {
                            type: "submit",
                            className: "border px-5 py-2 uppercase tracking-[0.25em] transition",
                            style: {
                              borderColor: actionConfig[actionKind].accent,
                              color: actionConfig[actionKind].accent
                            },
                            children: actionConfig[actionKind].cta
                          }
                        ),
                        /* @__PURE__ */ jsx(
                          "button",
                          {
                            type: "button",
                            onClick: onClose,
                            className: "text-bone/50 hover:text-bone uppercase tracking-[0.25em]",
                            children: "cancel"
                          }
                        )
                      ] })
                    ]
                  }
                )
              ] }),
              isIntegration && integrationKind && /* @__PURE__ */ jsxs(Fragment, { children: [
                /* @__PURE__ */ jsx(
                  "div",
                  {
                    className: "font-mono text-xs uppercase tracking-[0.3em]",
                    style: { color: integrationConfig[integrationKind].accent },
                    children: integrationConfig[integrationKind].tag
                  }
                ),
                /* @__PURE__ */ jsx("h3", { className: "font-display text-3xl md:text-4xl uppercase tracking-tighter leading-[0.95]", children: integrationConfig[integrationKind].title }),
                /* @__PURE__ */ jsx("p", { className: "text-bone/60 text-sm leading-relaxed", children: integrationConfig[integrationKind].desc }),
                /* @__PURE__ */ jsx("div", { className: "space-y-2 font-mono text-xs", children: integrationConfig[integrationKind].meta.map((m) => /* @__PURE__ */ jsxs(
                  "div",
                  {
                    className: "flex justify-between border-b border-border/50 py-2",
                    children: [
                      /* @__PURE__ */ jsxs("span", { className: "text-bone/40", children: [
                        "// ",
                        m.label
                      ] }),
                      /* @__PURE__ */ jsx("span", { className: "text-bone", children: m.value })
                    ]
                  },
                  m.label
                )) }),
                /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-2 pt-2", children: integrationConfig[integrationKind].actions.map((a) => /* @__PURE__ */ jsx(
                  "button",
                  {
                    onClick: onClose,
                    className: "border border-border px-3 py-1.5 font-mono text-[10px] uppercase tracking-widest text-bone/70 hover:border-acid hover:text-acid transition",
                    children: a
                  },
                  a
                )) })
              ] })
            ] })
          ]
        }
      )
    }
  ) });
}
function NotFoundComponent() {
  return /* @__PURE__ */ jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsx("h1", { className: "text-7xl font-bold text-foreground", children: "404" }),
    /* @__PURE__ */ jsx("h2", { className: "mt-4 text-xl font-semibold text-foreground", children: "Page not found" }),
    /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "The page you're looking for doesn't exist or has been moved." }),
    /* @__PURE__ */ jsx("div", { className: "mt-6", children: /* @__PURE__ */ jsx(
      Link,
      {
        to: "/",
        className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
        children: "Go home"
      }
    ) })
  ] }) });
}
function ErrorComponent({ error, reset }) {
  console.error(error);
  const router2 = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);
  return /* @__PURE__ */ jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsx("h1", { className: "text-xl font-semibold tracking-tight text-foreground", children: "This page didn't load" }),
    /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "Something went wrong on our end. You can try refreshing or head back home." }),
    /* @__PURE__ */ jsxs("div", { className: "mt-6 flex flex-wrap justify-center gap-2", children: [
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => {
            router2.invalidate();
            reset();
          },
          className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
          children: "Try again"
        }
      ),
      /* @__PURE__ */ jsx(
        "a",
        {
          href: "/",
          className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
          children: "Go home"
        }
      )
    ] })
  ] }) });
}
const Route$b = createRootRouteWithContext()(
  {
    head: () => ({
      meta: [
        { charSet: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { title: "apiguard" },
        {
          name: "description",
          content: "API Gurad is an API security and testing platform that automates vulnerability detection and performance analysis."
        },
        { name: "author", content: "Lovable" },
        { property: "og:title", content: "apiguard" },
        {
          property: "og:description",
          content: "API Gurad is an API security and testing platform that automates vulnerability detection and performance analysis."
        },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary" },
        { name: "twitter:site", content: "@Lovable" },
        { name: "twitter:title", content: "apiguard" },
        {
          name: "twitter:description",
          content: "API Gurad is an API security and testing platform that automates vulnerability detection and performance analysis."
        },
        {
          property: "og:image",
          content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/23fe50d5-f682-4ed6-a0a3-61d53413efd4/id-preview-207bc44e--bc296c8a-1de7-4f15-ad21-c9b743b7127a.lovable.app-1780769366032.png"
        },
        {
          name: "twitter:image",
          content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/23fe50d5-f682-4ed6-a0a3-61d53413efd4/id-preview-207bc44e--bc296c8a-1de7-4f15-ad21-c9b743b7127a.lovable.app-1780769366032.png"
        }
      ],
      links: [
        { rel: "stylesheet", href: appCss },
        { rel: "preconnect", href: "https://fonts.googleapis.com" },
        {
          rel: "preconnect",
          href: "https://fonts.gstatic.com",
          crossOrigin: "anonymous"
        },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&family=Inter:wght@400;500;600;700;800&display=swap"
        }
      ]
    }),
    shellComponent: GlassShell,
    component: RootComponent,
    notFoundComponent: NotFoundComponent,
    errorComponent: ErrorComponent
  }
);
function GlassShell({ children }) {
  return /* @__PURE__ */ jsxs("html", { lang: "en", children: [
    /* @__PURE__ */ jsx("head", { children: /* @__PURE__ */ jsx(HeadContent, {}) }),
    /* @__PURE__ */ jsxs("body", { className: "relative", children: [
      /* @__PURE__ */ jsx("div", { className: "fixed inset-0 -z-10 bg-background" }),
      /* @__PURE__ */ jsxs("div", { className: "fixed inset-0 -z-10", children: [
        /* @__PURE__ */ jsx("div", { className: "absolute top-[-20%] left-[-10%] h-[60vh] w-[60vw] rounded-full bg-acid/5 blur-[120px]" }),
        /* @__PURE__ */ jsx("div", { className: "absolute bottom-[-20%] right-[-10%] h-[60vh] w-[60vw] rounded-full bg-signal/5 blur-[120px]" }),
        /* @__PURE__ */ jsx("div", { className: "absolute top-[40%] left-[30%] h-[40vh] w-[40vw] rounded-full bg-warn/5 blur-[100px]" })
      ] }),
      children,
      /* @__PURE__ */ jsx(Scripts, {})
    ] })
  ] });
}
function RootComponent() {
  const { queryClient } = Route$b.useRouteContext();
  return /* @__PURE__ */ jsxs(QueryClientProvider, { client: queryClient, children: [
    /* @__PURE__ */ jsx(Header, {}),
    /* @__PURE__ */ jsx("div", { className: "pt-[57px]", children: /* @__PURE__ */ jsx(Outlet, {}) }),
    /* @__PURE__ */ jsx(ActionModal, {})
  ] });
}
const $$splitComponentImporter$a = () => import("./settings-BSLiwZG3.js");
const Route$a = createFileRoute("/settings")({
  component: lazyRouteComponent($$splitComponentImporter$a, "component")
});
const $$splitComponentImporter$9 = () => import("./scans-CvFu8bRL.js");
const Route$9 = createFileRoute("/scans")({
  component: lazyRouteComponent($$splitComponentImporter$9, "component")
});
const $$splitComponentImporter$8 = () => import("./reports-Bb16UzhX.js");
const Route$8 = createFileRoute("/reports")({
  component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
const $$splitComponentImporter$7 = () => import("./monitor-zYeF_nDz.js");
const Route$7 = createFileRoute("/monitor")({
  component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
const $$splitComponentImporter$6 = () => import("./integrations-CFfYuE5f.js");
const Route$6 = createFileRoute("/integrations")({
  component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
const $$splitComponentImporter$5 = () => import("./index-CWBsQWfK.js");
const Route$5 = createFileRoute("/")({
  head: () => ({
    meta: [{
      title: "APIGUARD // API Security & Observability OS"
    }, {
      name: "description",
      content: "Scan, document, mock, monitor and stress-test every API in your stack. One brutally fast control plane."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
const $$splitComponentImporter$4 = () => import("./report._id-T8oKFVUz.js");
const Route$4 = createFileRoute("/report/$id")({
  component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
const MODULES = {
  "surface-scanner": {
    code: "01",
    title: "Surface Scanner",
    glyph: "◉",
    tag: "scan.surface",
    accent: "var(--acid)",
    tagline: "Continuous CVE + OWASP API top-10 sweeps. Live security score per endpoint.",
    body: "A perpetually-running adversary. Probes every endpoint against OWASP API Top 10, known CVEs, auth weaknesses, IDOR patterns, rate-limit absence, and silent data exfiltration paths. Outputs a single twitchy security score per endpoint, per service, per fleet.",
    metrics: [{
      label: "endpoints under watch",
      value: "12,481",
      sub: "across 38 services"
    }, {
      label: "rules engine",
      value: "2,140",
      sub: "owasp + cve + custom"
    }, {
      label: "mean time to detect",
      value: "47s",
      sub: "p50 across last 7d"
    }, {
      label: "false positive rate",
      value: "0.6%",
      sub: "tuned weekly"
    }],
    ops: [{
      k: "policy.profile",
      v: "STRICT/PROD"
    }, {
      k: "schedule",
      v: "every 5m · drift mode"
    }, {
      k: "auth.simulation",
      v: "bearer · oauth2 · mtls"
    }, {
      k: "rate.budget",
      v: "120 rps · adaptive"
    }],
    capabilities: [{
      title: "OWASP API Top 10",
      desc: "BOLA, broken auth, excessive data, mass assignment, SSRF — all mapped to endpoint contracts."
    }, {
      title: "CVE Cross-Match",
      desc: "Continuously diffs your runtime dependencies against NVD + GitHub advisories."
    }, {
      title: "Auth Bypass Probes",
      desc: "Token replay, scope confusion, IDOR walks, JWT alg-none, expired-token acceptance."
    }, {
      title: "Live Severity Score",
      desc: "0–100 per endpoint with decay curve. Score drops the moment a regression lands."
    }],
    feed: [{
      t: "00:01",
      line: "BOLA suspected · GET /v3/users/{id}/orders",
      tone: "var(--signal)"
    }, {
      t: "00:04",
      line: "missing rate-limit · POST /auth/login",
      tone: "var(--warn)"
    }, {
      t: "00:09",
      line: "tls/ok · cipher TLS_AES_256_GCM_SHA384",
      tone: "var(--acid)"
    }, {
      t: "00:14",
      line: "owasp-api-02 · weak token rotation policy",
      tone: "var(--warn)"
    }, {
      t: "00:19",
      line: "cve-2025-19023 · package undici < 6.21",
      tone: "var(--signal)"
    }, {
      t: "00:23",
      line: "scan #4192 · 12,481/12,481 · 94 score",
      tone: "var(--acid)"
    }],
    cli: ["▸ apiguard scan --profile strict --diff main", "▪ resolving service mesh · 38 svcs", "▪ inhaling openapi · 12,481 endpoints", "▪ executing 2,140 rules · concurrency 64", "▪ correlating cve feed · nvd + ghsa", "✓ surface mapped · score 94/100 · 2 high · 7 med"]
  },
  "openapi-inhaler": {
    code: "02",
    title: "OpenAPI Inhaler",
    glyph: "⬢",
    tag: "spec.ingest",
    accent: "var(--signal)",
    tagline: "Drop a Swagger/OpenAPI/Postman file. We crawl, diff, normalize.",
    body: "Throw any spec at it — OpenAPI 2/3/3.1, Postman v2.1, HAR captures, Insomnia exports, raw curl logs. The inhaler normalizes, diffs against the last known good, and emits a single canonical contract your whole stack can pivot on.",
    metrics: [{
      label: "specs ingested",
      value: "1,847",
      sub: "lifetime"
    }, {
      label: "formats supported",
      value: "9",
      sub: "openapi · postman · har · curl…"
    }, {
      label: "normalization time",
      value: "1.2s",
      sub: "avg per 500 ops"
    }, {
      label: "diff precision",
      value: "99.4%",
      sub: "vs hand-audited baseline"
    }],
    ops: [{
      k: "input.formats",
      v: "openapi · postman · har · curl · graphql"
    }, {
      k: "schema.target",
      v: "openapi 3.1 canonical"
    }, {
      k: "dedupe",
      v: "structural · semantic"
    }, {
      k: "secret.scrub",
      v: "auto · 38 patterns"
    }],
    capabilities: [{
      title: "Universal Importer",
      desc: "Drag, drop, paste, or webhook. Inhales OpenAPI 2/3/3.1, Postman 2.1, HAR, curl logs."
    }, {
      title: "Canonical Normalizer",
      desc: "Collapses synonyms, infers missing schemas, resolves $refs, scrubs PII."
    }, {
      title: "Spec Diff Engine",
      desc: "Structural + semantic diff. Knows the difference between rename and remove."
    }, {
      title: "Auto-Reconciliation",
      desc: "When two specs disagree, picks the one your runtime actually serves."
    }],
    feed: [{
      t: "now",
      line: "openapi.v3.1 · 412 ops parsed",
      tone: "var(--acid)"
    }, {
      t: "1s",
      line: "postman.collection.json · 89 requests merged",
      tone: "var(--signal)"
    }, {
      t: "2s",
      line: "$ref resolved · 1,204 schema nodes",
      tone: "var(--acid)"
    }, {
      t: "3s",
      line: "secret scrubbed · 2 bearer tokens removed",
      tone: "var(--warn)"
    }, {
      t: "4s",
      line: "diff vs baseline · +14 / -3 / ~22",
      tone: "var(--signal)"
    }, {
      t: "5s",
      line: "canonical contract emitted · sha 9af3…",
      tone: "var(--acid)"
    }],
    cli: ["▸ apiguard inhale ./specs/*.yaml ./postman/*.json", "▪ detecting formats · 7 files", "▪ normalizing → openapi 3.1", "▪ resolving $refs · 1,204 nodes", "▪ scrubbing secrets · 2 redacted", "✓ canonical contract @ sha 9af3a1c · ready to publish"]
  },
  "repo-bridge": {
    code: "03",
    title: "Repo Bridge",
    glyph: "⟁",
    tag: "ci.bridge",
    accent: "var(--acid)",
    tagline: "Connect GitHub. Auto-pull specs from PRs. Wire Actions or Jenkins.",
    body: "The umbilical between source-of-truth and APIGUARD. Watches every PR, pulls specs as they land, runs the gauntlet, posts results inline as PR checks. Speaks GitHub Actions, Jenkins, GitLab CI, CircleCI, Buildkite.",
    metrics: [{
      label: "repos connected",
      value: "147",
      sub: "across 6 orgs"
    }, {
      label: "pr checks/day",
      value: "3,402",
      sub: "median 11s each"
    }, {
      label: "blocked merges",
      value: "82",
      sub: "this quarter"
    }, {
      label: "ci providers",
      value: "6",
      sub: "actions · jenkins · gitlab · circle · buildkite · drone"
    }],
    ops: [{
      k: "trigger",
      v: "pr.opened · pr.sync · push:main"
    }, {
      k: "auth.mode",
      v: "github app · least scope"
    }, {
      k: "policy.gate",
      v: "block on HIGH+ findings"
    }, {
      k: "comment.style",
      v: "inline · sticky · diff-aware"
    }],
    capabilities: [{
      title: "GitHub Native App",
      desc: "Installed once per org. PR checks, inline annotations, suggested patches."
    }, {
      title: "Jenkins Step",
      desc: "Drop-in pipeline step: apiguardScan(profile: 'strict'). Junit + sarif output."
    }, {
      title: "Branch Protection",
      desc: "Block merges below your security score floor. No exceptions, no DMs."
    }, {
      title: "Spec Drift Bot",
      desc: "Opens a PR when shipped runtime diverges from the committed spec."
    }],
    feed: [{
      t: "12s",
      line: "pr #4421 · payments-svc · check started",
      tone: "var(--bone)"
    }, {
      t: "15s",
      line: "spec diff · +2 endpoints · 0 breaking",
      tone: "var(--acid)"
    }, {
      t: "18s",
      line: "scan · 0 critical · 1 medium",
      tone: "var(--warn)"
    }, {
      t: "19s",
      line: "annotation posted · line 84 · openapi.yaml",
      tone: "var(--signal)"
    }, {
      t: "22s",
      line: "status · success · score 96",
      tone: "var(--acid)"
    }],
    cli: ["▸ apiguard ci bind --provider github --org acme", "▪ installing app · scope: contents:read pull_requests:write", "▪ subscribing · 147 repos", "▪ provisioning webhook · /hooks/gh", "▪ deploying pr-check workflow", "✓ bridge live · first check in 12s"]
  },
  "forensic-pdf": {
    code: "04",
    title: "Forensic PDF",
    glyph: "▤",
    tag: "report.export",
    accent: "var(--warn)",
    tagline: "One-click signed report. Auditors love it. Lawyers tolerate it.",
    body: "Generates a courtroom-grade PDF: every finding with evidence, request/response capture, reproduction steps, CVSS, OWASP mapping, remediation. Cryptographically signed, timestamped, watermarked. Optional SOC2 + ISO 27001 templates.",
    metrics: [{
      label: "reports issued",
      value: "9,118",
      sub: "last 12 months"
    }, {
      label: "avg generation time",
      value: "3.4s",
      sub: "300-page bundle"
    }, {
      label: "sign + timestamp",
      value: "PAdES-LTA",
      sub: "long-term archival"
    }, {
      label: "templates",
      value: "12",
      sub: "soc2 · iso · pci · hipaa · custom"
    }],
    ops: [{
      k: "format",
      v: "pdf/a-3 · machine-readable annex"
    }, {
      k: "signature",
      v: "ecdsa p-256 · tsa rfc 3161"
    }, {
      k: "evidence",
      v: "har · curl · screenshot · stack trace"
    }, {
      k: "redaction",
      v: "policy-driven · per audience"
    }],
    capabilities: [{
      title: "Evidence Bundling",
      desc: "Each finding ships with the exact request, response, headers, and replay curl."
    }, {
      title: "CVSS + OWASP Mapping",
      desc: "Cross-referenced to OWASP API Top 10, CWE, MITRE ATT&CK technique IDs."
    }, {
      title: "Compliance Templates",
      desc: "SOC2, ISO 27001 Annex A, PCI-DSS, HIPAA Security Rule — sectioned and indexed."
    }, {
      title: "Cryptographic Signing",
      desc: "PAdES-LTA with RFC 3161 timestamp. Auditors verify offline."
    }],
    feed: [{
      t: "0.1s",
      line: "collecting findings · 23 items",
      tone: "var(--bone)"
    }, {
      t: "0.4s",
      line: "rendering evidence pages · 86",
      tone: "var(--bone)"
    }, {
      t: "1.1s",
      line: "embedding machine-readable annex (json+sarif)",
      tone: "var(--signal)"
    }, {
      t: "2.8s",
      line: "signing pades-lta · tsa: digicert",
      tone: "var(--warn)"
    }, {
      t: "3.4s",
      line: "report-2026-06-07-#4192.pdf · 4.2mb · ready",
      tone: "var(--acid)"
    }],
    cli: ["▸ apiguard report --scan 4192 --template soc2 --sign", "▪ aggregating 23 findings · 86 evidence artifacts", "▪ rendering 314 pages · pdf/a-3", "▪ embedding sarif + json annex", "▪ signing pades-lta · timestamping", "✓ report-2026-06-07-#4192.pdf · sha 41bc…"]
  },
  "change-radar": {
    code: "05",
    title: "Change Radar",
    glyph: "⟴",
    tag: "diff.radar",
    accent: "var(--signal)",
    tagline: "Endpoint added, auth changed, contract broken — pinged before users notice.",
    body: "Watches your runtime AND your spec. The instant a new endpoint slips into production, an auth header silently mutates, or a required field appears in a response — radar pings the channel of your choosing with a structural diff and blast radius.",
    metrics: [{
      label: "events/day",
      value: "1,204",
      sub: "across all envs"
    }, {
      label: "detection latency",
      value: "8s",
      sub: "runtime → notification"
    }, {
      label: "blast radius engine",
      value: "v2.3",
      sub: "graph-based dep walk"
    }, {
      label: "channels",
      value: "slack · pagerduty · teams · webhook",
      sub: ""
    }],
    ops: [{
      k: "sources",
      v: "runtime taps · spec repo · gateway logs"
    }, {
      k: "diff.kinds",
      v: "added · removed · auth-changed · contract-break"
    }, {
      k: "noise.filter",
      v: "ml-grouped · 92% reduction"
    }, {
      k: "ack.flow",
      v: "owner ping · 5m escalation"
    }],
    capabilities: [{
      title: "Runtime Taps",
      desc: "Sidecar or eBPF probe captures shipped behavior, not just declared spec."
    }, {
      title: "Semantic Diff",
      desc: "Knows that renaming `user_id` → `userId` is one change, not two."
    }, {
      title: "Blast Radius",
      desc: "Walks the consumer graph and tells you exactly which clients will break."
    }, {
      title: "Triage Channels",
      desc: "Routes by service owner — Slack thread, PagerDuty incident, GitHub issue."
    }],
    feed: [{
      t: "now",
      line: "ADDED · POST /v3/checkout/express",
      tone: "var(--acid)"
    }, {
      t: "11m",
      line: "REMOVED · GET /legacy/users/{id}/profile",
      tone: "var(--signal)"
    }, {
      t: "1h",
      line: "AUTH·CHG · PATCH /admin/billing → Bearer",
      tone: "var(--warn)"
    }, {
      t: "3h",
      line: "BREAK · GET /search?q now required",
      tone: "var(--signal)"
    }, {
      t: "6h",
      line: "FIELD · response.user.email now nullable",
      tone: "var(--warn)"
    }],
    cli: ["▸ apiguard radar tail --env prod", "▪ subscribing to runtime tap · gateway-east-1", "▪ pulling spec baseline @ sha 9af3a1c", "▪ correlating · graph nodes 12,481", "✓ radar hot · 1,204 events/d · pinging #api-watch"]
  },
  "health-pulse": {
    code: "06",
    title: "Health Pulse",
    glyph: "♡",
    tag: "uptime.pulse",
    accent: "var(--acid)",
    tagline: "Uptime, latency, error rates rolled into a single twitchy heartbeat.",
    body: "Three numbers that actually matter, fused into one waveform. p50/p95/p99 latency, 5xx + 4xx-by-intent error budget burn, and synthetic uptime probes from 14 regions. When the heartbeat skips, on-call knows before the dashboard refreshes.",
    metrics: [{
      label: "probes/min",
      value: "82,400",
      sub: "14 regions"
    }, {
      label: "p95 latency",
      value: "118ms",
      sub: "fleet rolling 5m"
    }, {
      label: "error budget",
      value: "94%",
      sub: "remaining this 30d"
    }, {
      label: "slo violations",
      value: "0",
      sub: "last 14d"
    }],
    ops: [{
      k: "regions",
      v: "us-east · us-west · eu-west · eu-north · ap-south · sa-east · …"
    }, {
      k: "method.set",
      v: "GET · POST · WS handshake · long-poll"
    }, {
      k: "burn.alerting",
      v: "multi-window · multi-burn-rate"
    }, {
      k: "synthetic.flows",
      v: "login · checkout · search · upload"
    }],
    capabilities: [{
      title: "Multi-Region Probes",
      desc: "14 PoPs. Real TCP, real TLS, real DNS — not just ICMP. Anycast-aware."
    }, {
      title: "Latency Histograms",
      desc: "Full distribution. p50, p95, p99, p99.9. Tail latency, not just averages."
    }, {
      title: "Error Budget Burn",
      desc: "Multi-window, multi-burn-rate alerts. Pages on slope, not just symptom."
    }, {
      title: "Synthetic Journeys",
      desc: "Scripted user flows — login → search → checkout — run every 60s."
    }],
    feed: [{
      t: "now",
      line: "auth-svc · p95 42ms · 99.99% · ok",
      tone: "var(--acid)"
    }, {
      t: "now",
      line: "billing · p95 118ms · 99.91% · ok",
      tone: "var(--acid)"
    }, {
      t: "now",
      line: "search · p95 312ms · 98.40% · degraded",
      tone: "var(--warn)"
    }, {
      t: "12s",
      line: "feed · p95 67ms · 99.97% · ok",
      tone: "var(--acid)"
    }, {
      t: "30s",
      line: "synthetic checkout · 1.4s · pass",
      tone: "var(--acid)"
    }],
    cli: ["▸ apiguard pulse --service '*' --window 5m", "▪ polling 14 regions · 82,400 probes/min", "▪ aggregating histograms · t-digest", "▪ computing burn rates · 1h/6h/3d windows", "✓ heartbeat steady · 0 slo violations · 14d"]
  }
};
const $$splitComponentImporter$3 = () => import("./module._slug-BdSv3kAl.js");
const $$splitNotFoundComponentImporter = () => import("./module._slug-LzLUhlkX.js");
const Route$3 = createFileRoute("/module/$slug")({
  head: ({
    params
  }) => {
    const m = MODULES[params.slug];
    return {
      meta: [{
        title: `${m?.title ?? "Module"} // APIGUARD`
      }, {
        name: "description",
        content: m?.tagline ?? "APIGUARD module."
      }]
    };
  },
  loader: ({
    params
  }) => {
    if (!MODULES[params.slug]) throw notFound();
    return {
      slug: params.slug
    };
  },
  notFoundComponent: lazyRouteComponent($$splitNotFoundComponentImporter, "notFoundComponent"),
  component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
const $$splitComponentImporter$2 = () => import("./ai.test-synth-DhL3Zb3m.js");
const Route$2 = createFileRoute("/ai/test-synth")({
  head: () => ({
    meta: [{
      title: "Test Case Synthesizer // APIGUARD"
    }, {
      name: "description",
      content: "Generate negative, fuzz, boundary and auth-bypass test cases from any OpenAPI spec. Export to Jest, Pytest, k6."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
const $$splitComponentImporter$1 = () => import("./ai.mock-server-eKrI-CCE.js");
const Route$1 = createFileRoute("/ai/mock-server")({
  head: () => ({
    meta: [{
      title: "One-Click Mock Server // APIGUARD"
    }, {
      name: "description",
      content: "Spin up a realistic fake of any API in one click. Faker-backed payloads, latency profiles, failure injection."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
const $$splitComponentImporter = () => import("./ai.docs-gen-Bw5xZTw7.js");
const Route = createFileRoute("/ai/docs-gen")({
  head: () => ({
    meta: [{
      title: "Documentation Generator // APIGUARD"
    }, {
      name: "description",
      content: "Point at a base URL. Get a fully-narrated, sectioned docs site in 90 seconds — endpoints, examples, edge cases."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter, "component")
});
const SettingsRoute = Route$a.update({
  id: "/settings",
  path: "/settings",
  getParentRoute: () => Route$b
});
const ScansRoute = Route$9.update({
  id: "/scans",
  path: "/scans",
  getParentRoute: () => Route$b
});
const ReportsRoute = Route$8.update({
  id: "/reports",
  path: "/reports",
  getParentRoute: () => Route$b
});
const MonitorRoute = Route$7.update({
  id: "/monitor",
  path: "/monitor",
  getParentRoute: () => Route$b
});
const IntegrationsRoute = Route$6.update({
  id: "/integrations",
  path: "/integrations",
  getParentRoute: () => Route$b
});
const IndexRoute = Route$5.update({
  id: "/",
  path: "/",
  getParentRoute: () => Route$b
});
const ReportIdRoute = Route$4.update({
  id: "/report/$id",
  path: "/report/$id",
  getParentRoute: () => Route$b
});
const ModuleSlugRoute = Route$3.update({
  id: "/module/$slug",
  path: "/module/$slug",
  getParentRoute: () => Route$b
});
const AiTestSynthRoute = Route$2.update({
  id: "/ai/test-synth",
  path: "/ai/test-synth",
  getParentRoute: () => Route$b
});
const AiMockServerRoute = Route$1.update({
  id: "/ai/mock-server",
  path: "/ai/mock-server",
  getParentRoute: () => Route$b
});
const AiDocsGenRoute = Route.update({
  id: "/ai/docs-gen",
  path: "/ai/docs-gen",
  getParentRoute: () => Route$b
});
const rootRouteChildren = {
  IndexRoute,
  IntegrationsRoute,
  MonitorRoute,
  ReportsRoute,
  ScansRoute,
  SettingsRoute,
  AiDocsGenRoute,
  AiMockServerRoute,
  AiTestSynthRoute,
  ModuleSlugRoute,
  ReportIdRoute
};
const routeTree = Route$b._addFileChildren(rootRouteChildren)._addFileTypes();
const getRouter = () => {
  const queryClient = new QueryClient();
  const router2 = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    defaultPreloadStaleTime: 0
  });
  return router2;
};
const router = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  getRouter
}, Symbol.toStringTag, { value: "Module" }));
export {
  MODULES as M,
  Route$4 as R,
  Route$3 as a,
  router as r,
  useAppStore as u
};
