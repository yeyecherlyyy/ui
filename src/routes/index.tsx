import { motion, useScroll, useTransform, AnimatePresence } from "motion/react";
import { useRef, useState, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { CubeHero } from "@/components/site/CubeHero";
import { TiltCard } from "@/components/site/TiltCard";
import { useLenis } from "@/hooks/use-lenis";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "APIGUARD // API Security & Observability OS" },
      {
        name: "description",
        content:
          "Scan, document, mock, monitor and stress-test every API in your stack. One brutally fast control plane.",
      },
    ],
  }),
  component: Index,
});

const CORE = [
  {
    code: "01",
    slug: "surface-scanner",
    title: "Surface Scanner",
    desc: "Continuous CVE + OWASP API top-10 sweeps. Live security score per endpoint.",
    glyph: "◉",
  },
  {
    code: "02",
    slug: "openapi-inhaler",
    title: "OpenAPI Inhaler",
    desc: "Drop a Swagger/OpenAPI/Postman file. We crawl, diff, normalize.",
    glyph: "⬢",
  },
  {
    code: "03",
    slug: "repo-bridge",
    title: "Repo Bridge",
    desc: "Connect GitHub. Auto-pull specs from PRs. Wire Actions or Jenkins.",
    glyph: "⟁",
  },
  {
    code: "04",
    slug: "forensic-pdf",
    title: "Forensic PDF",
    desc: "One-click signed report. Auditors love it. Lawyers tolerate it.",
    glyph: "▤",
  },
  {
    code: "05",
    slug: "change-radar",
    title: "Change Radar",
    desc: "Endpoint added, auth changed, contract broken — pinged before users notice.",
    glyph: "⟴",
  },
  {
    code: "06",
    slug: "health-pulse",
    title: "Health Pulse",
    desc: "Uptime, latency, error rates rolled into a single twitchy heartbeat.",
    glyph: "♡",
  },
];

const AI_STACK = [
  {
    tag: "AI.DOCS",
    title: "Documentation Generator",
    body: "Point at a base URL. Get a fully-narrated, sectioned docs site in 90 seconds — endpoints, examples, edge cases.",
  },
  {
    tag: "AI.TESTS",
    title: "Test Case Synthesizer",
    body: "Generates negative, fuzz, boundary and auth-bypass cases from spec. Exports to Jest, Pytest, k6.",
  },
  {
    tag: "AI.MOCK",
    title: "One-Click Mock Server",
    body: "Spin up a realistic fake of any API. Faker-backed payloads, latency profiles, failure injection.",
  },
];

const LOAD_TIERS = [
  { users: "100", note: "morning standup", color: "var(--acid)" },
  { users: "1,000", note: "product launch", color: "var(--warn)" },
  { users: "10,000", note: "viral incident", color: "var(--signal)" },
];

const CHANGES = [
  {
    kind: "ADDED",
    path: "POST /v3/checkout/express",
    t: "2s ago",
    tone: "var(--acid)",
  },
  {
    kind: "REMOVED",
    path: "GET /legacy/users/{id}/profile",
    t: "11m ago",
    tone: "var(--signal)",
  },
  {
    kind: "AUTH·CHG",
    path: "PATCH /admin/billing → Bearer",
    t: "1h ago",
    tone: "var(--warn)",
  },
  {
    kind: "BREAK",
    path: "GET /search?q now required",
    t: "3h ago",
    tone: "var(--signal)",
  },
];

import { useAppStore } from "@/store/useAppStore";

function Index() {
  useLenis();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  const titleY = useTransform(scrollYProgress, [0, 0.2], [0, -200]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const { setModal } = useAppStore();

  return (
    <div ref={containerRef} className="relative bg-transparent text-foreground">
      <SideNav />
      {/* HERO */}
      <section
        id="hero"
        className="relative min-h-[100vh] bg-background overflow-hidden pt-32 pb-20"
      >
        <motion.div
          style={{ y: titleY, opacity: titleOpacity }}
          className="relative z-10 px-6 pt-16 max-w-[1400px] mx-auto flex flex-col items-center text-center"
        >
          <div className="font-mono text-xs text-acid font-semibold mb-8 flex items-center justify-center gap-2 bg-acid/10 px-4 py-2 rounded-full">
            <span className="size-2 rounded-full bg-acid animate-pulse" />
            Initializing perimeter sweep...
          </div>

          <h1 className="font-display font-bold text-[clamp(2.5rem,8vw,7rem)] leading-[1.05] tracking-tight text-foreground max-w-5xl mx-auto">
            <span className="block">Every API you ship is</span>
            <span className="block text-muted-foreground">a liability.</span>
            <span className="block text-acid mt-2">We fix that.</span>
          </h1>

          <div className="mt-10 flex flex-col items-center justify-center">
            <p className="text-muted-foreground text-lg md:text-xl max-w-2xl leading-relaxed text-center mb-10">
              APIGUARD is the ultimate control plane for API security,
              observability, mocking, and load testing — wired directly into your repository and CI pipeline.
            </p>
            <div className="font-display text-sm font-medium text-muted-foreground grid grid-cols-3 gap-8 md:gap-16 pt-8 border-t border-border/50">
              <div className="text-center">
                <div className="text-foreground text-3xl font-bold mb-1">12.4k</div>
                Endpoints Scanned
              </div>
              <div className="text-center">
                <div className="text-foreground text-3xl font-bold mb-1">3.1M</div>
                Requests/Min
              </div>
              <div className="text-center">
                <div className="text-foreground text-3xl font-bold mb-1">99.99%</div>
                Uptime SLA
              </div>
            </div>
          </div>
        </motion.div>

        {/* Floating cube removed */}

        {/* Marquee strip */}
        <div className="absolute bottom-0 inset-x-0 border-t border-border bg-card/50 backdrop-blur-md overflow-hidden py-4">
          <div className="flex marquee-track whitespace-nowrap font-display font-medium text-sm text-muted-foreground uppercase tracking-widest">
            {Array.from({ length: 2 }).map((_, k) => (
              <div key={k} className="flex shrink-0">
                {[
                  "Scan",
                  "Diff",
                  "Mock",
                  "Monitor",
                  "Load Test",
                  "Auto Doc",
                  "OpenAPI",
                  "Postman",
                  "Jenkins",
                  "GitHub Actions",
                  "CI/CD",
                  "OWASP Top-10",
                ].map((w) => (
                  <span
                    key={w + k}
                    className="px-8 flex items-center gap-8 text-foreground/70"
                  >
                    {w} <span className="text-acid/40">•</span>
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DASHBOARD MOCK */}
      <section id="scan" className="relative px-6 py-24 max-w-[1400px] mx-auto">
        <SectionHead
          n="01"
          label="Control Plane"
          title="A Dashboard that Talks Back"
        />
        <DashboardMock />
      </section>

      {/* CORE FEATURES BENTO */}
      <section
        id="modules"
        className="relative px-6 py-24 bg-secondary/30"
      >
        <div className="max-w-[1400px] mx-auto">
          <SectionHead
            n="02"
            label="Core Modules"
            title="Six Instruments. One Console."
          />
          <div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12"
          >
            {CORE.map((f) => (
              <TiltCard key={f.code} className="group">
                <Link
                  to="/module/$slug"
                  params={{ slug: f.slug }}
                  className="relative block bg-secondary/10 hover:bg-secondary/20 rounded-3xl p-8 h-[280px] overflow-hidden transition-all duration-300"
                >
                  <div className="absolute top-4 right-6 text-6xl leading-none text-muted-foreground/10 font-display font-bold transition-transform group-hover:scale-110 group-hover:-translate-y-2">
                    {f.code}
                  </div>
                  <div className="relative flex flex-col justify-between h-full">
                    <div className="flex items-center justify-between font-mono text-xs text-muted-foreground">
                      <span className="bg-secondary px-2 py-1 rounded">Mod.{f.code}</span>
                      <span className="text-acid text-2xl drop-shadow-sm">{f.glyph}</span>
                    </div>
                    <div className="mt-4">
                      <h3 className="font-display text-2xl font-bold tracking-tight mb-3 text-foreground group-hover:text-acid transition-colors">
                        {f.title}
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3">
                        {f.desc}
                      </p>
                    </div>
                    <div className="mt-auto font-display font-medium text-xs text-acid flex items-center gap-2">
                      <span className="group-hover:translate-x-1 transition-transform">Explore Module →</span>
                    </div>
                  </div>
                </Link>
              </TiltCard>
            ))}
          </div>
        </div>
      </section>

      {/* AI STACK — sticky scroll */}
      <section id="ai" className="relative">
        <div className="px-6 max-w-[1400px] mx-auto pt-24">
          <SectionHead
            n="02"
            label="intelligence.layer"
            title="The model does the boring half."
          />
        </div>
        {AI_STACK.map((item, i) => (
          <AIPanel key={item.tag} item={item} index={i} />
        ))}
      </section>

      {/* LOAD TEST */}
      <section id="load" className="relative px-6 py-24 max-w-[1400px] mx-auto bg-background">
        <SectionHead
          n="03"
          label="Load Simulation"
          title="Punch your API. See what breaks."
        />
        <div className="grid md:grid-cols-3 gap-8 mt-16">
          {LOAD_TIERS.map((t, i) => (
            <motion.div
              key={t.users}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, delay: i * 0.12 }}
              className="relative p-10 flex flex-col justify-between overflow-hidden bg-secondary/10 rounded-3xl group hover:-translate-y-2 transition-transform duration-300"
              style={{
                background: `radial-gradient(circle at top right, color-mix(in oklab, ${t.color} 15%, transparent), transparent 70%), var(--secondary)`,
              }}
            >
              <div
                className="font-display font-bold text-sm tracking-widest uppercase mb-8"
                style={{ color: t.color }}
              >
                Tier {String(i + 1).padStart(2, "0")}
              </div>
              <div className="mb-12">
                <div
                  className="font-display font-bold text-6xl md:text-7xl tracking-tighter text-foreground mb-2"
                >
                  {t.users}
                </div>
                <div className="text-muted-foreground font-medium uppercase tracking-widest text-xs">
                  Concurrent Users
                </div>
              </div>
              <div className="space-y-4 font-medium text-sm text-muted-foreground">
                <div className="flex justify-between items-center border-b border-border/40 pb-2">
                  <span>Scenario</span>
                  <span className="text-foreground">{t.note}</span>
                </div>
                <div className="flex justify-between items-center border-b border-border/40 pb-2">
                  <span>Duration</span>
                  <span className="text-foreground">5m / 15m / 1h</span>
                </div>
                <div className="h-2 bg-secondary rounded-full mt-6 overflow-hidden">
                  <motion.div
                    className="h-full rounded-full"
                    style={{ background: t.color }}
                    initial={{ width: 0 }}
                    whileInView={{ width: `${30 + i * 30}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, delay: 0.4 }}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CHANGE RADAR */}
      <section
        id="changes"
        className="relative px-6 py-24 max-w-[1400px] mx-auto"
      >
        <SectionHead
          n="04"
          label="Diff Radar"
          title="The World's Most Paranoid Changelog"
        />
        <div className="mt-12 bg-secondary/10 rounded-3xl overflow-hidden">
          <div className="grid grid-cols-[120px_1fr_120px] gap-4 px-8 py-4 border-b border-border/50 bg-secondary/20 font-display font-semibold text-xs text-muted-foreground uppercase tracking-widest">
            <span>Event</span>
            <span>Endpoint</span>
            <span className="text-right">Timestamp</span>
          </div>
          {CHANGES.map((c, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="grid grid-cols-[120px_1fr_120px] gap-4 px-8 py-6 border-b border-border/50 hover:bg-secondary/20 transition-colors items-center group last:border-0"
            >
              <span
                className="font-display text-xs font-bold tracking-wider uppercase px-2 py-1 rounded bg-secondary inline-block text-center w-fit"
                style={{ color: c.tone, backgroundColor: `color-mix(in oklab, ${c.tone} 10%, transparent)` }}
              >
                {c.kind}
              </span>
              <span className="font-mono text-sm text-foreground group-hover:text-acid transition-colors font-medium">
                {c.path}
              </span>
              <span className="font-display font-medium text-xs text-muted-foreground text-right">
                {c.t}
              </span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* INTEGRATIONS RAIL */}
      <section className="relative py-24 bg-secondary/20 border-y border-border overflow-hidden">
        <div className="px-6 max-w-[1400px] mx-auto mb-12 flex justify-center">
          <div className="font-display font-semibold text-sm text-acid bg-acid/10 px-4 py-1 rounded-full uppercase tracking-widest">
            Connected to your stack
          </div>
        </div>
        <div className="flex marquee-track gap-16 font-display font-bold text-6xl md:text-8xl text-muted-foreground/30 whitespace-nowrap">
          {Array.from({ length: 2 }).map((_, k) =>
            [
              "GitHub",
              "Jenkins",
              "Postman",
              "Swagger",
              "OpenAPI",
              "k6",
              "Datadog",
              "Slack",
              "PagerDuty",
            ].map((b) => {
              const clickable = [
                "GitHub",
                "Jenkins",
                "Postman",
                "Swagger",
              ].includes(b);
              const kindMap: Record<
                string,
                "github" | "jenkins" | "postman" | "swagger"
              > = {
                GitHub: "github",
                Jenkins: "jenkins",
                Postman: "postman",
                Swagger: "swagger",
              };
              return (
                <button
                  key={b + k}
                  onClick={() => clickable && setModal(kindMap[b])}
                  className={`hover:text-acid transition-colors flex items-center gap-16 bg-transparent border-none p-0 m-0 font-display ${clickable ? "cursor-pointer" : "cursor-default"}`}
                >
                  {b} <span className="text-acid/20">•</span>
                </button>
              );
            }),
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="relative px-6 py-40 max-w-[1400px] mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="font-display font-bold text-[clamp(2.5rem,8vw,7rem)] leading-[1.05] tracking-tight text-foreground"
        >
          Ship
          <br />
          <span className="text-acid">without</span>
          <br />
          flinching.
        </motion.h2>
        <div className="mt-16 flex flex-wrap justify-center gap-4">
          <button
            onClick={() => setModal("scan")}
            className="bg-acid text-ink px-8 py-4 font-display font-semibold text-lg rounded-full shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all"
          >
            Start Scan
          </button>
          <button
            onClick={() => setModal("demo")}
            className="bg-card border border-border text-foreground px-8 py-4 font-display font-semibold text-lg rounded-full shadow-sm hover:border-acid hover:text-acid transition-all"
          >
            Book Demo
          </button>
        </div>
      </section>

      <footer className="border-t border-border px-8 py-10 font-display font-medium text-sm text-muted-foreground flex flex-col md:flex-row items-center justify-between gap-4 bg-background">
        <div className="flex items-center gap-2">
          <span className="font-bold text-foreground">APIGUARD // api.os</span> · Built for modern engineering teams.
        </div>
        <div className="flex flex-wrap gap-6 items-center">
          <span className="flex items-center gap-2 bg-secondary px-3 py-1 rounded-full text-xs">
            Status: <span className="text-acid font-bold flex items-center gap-1.5"><span className="size-1.5 bg-acid rounded-full animate-pulse"/> Operational</span>
          </span>
          <span>Region: Global Edge</span>
          <span>© 2026</span>
        </div>
      </footer>
    </div>
  );
}

function SideNav() {
  const [active, setActive] = useState("hero");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      { threshold: 0.3 },
    );

    const sections = ["hero", "scan", "modules", "ai", "load", "changes"];
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const links = [
    { id: "hero", label: "00" },
    { id: "scan", label: "01" },
    { id: "modules", label: "02" },
    { id: "ai", label: "03" },
    { id: "load", label: "04" },
    { id: "changes", label: "05" },
  ];

  return (
    <div className="fixed left-6 top-1/2 -translate-y-1/2 z-50 hidden xl:flex flex-col gap-4">
      {links.map((l) => (
        <a
          key={l.id}
          href={`#${l.id}`}
          className="group flex items-center justify-start gap-3"
          aria-label={l.id}
        >
          <div
            className={`w-0.5 transition-all duration-300 ${active === l.id ? "h-8 bg-acid" : "h-3 bg-muted-foreground/30 group-hover:bg-muted-foreground"}`}
          />
          <span
            className={`font-display font-semibold text-[10px] uppercase tracking-widest transition-opacity duration-300 ${active === l.id ? "opacity-100 text-acid" : "opacity-0 group-hover:opacity-100 text-muted-foreground"}`}
          >
            {l.id}
          </span>
        </a>
      ))}
    </div>
  );
}

function ActionModal({
  kind,
  onClose,
}: {
  kind:
    | null
    | "deploy"
    | "scan"
    | "demo"
    | "github"
    | "jenkins"
    | "postman"
    | "swagger";
  onClose: () => void;
}) {
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
  const actionKind: "deploy" | "scan" | "demo" | null = isAction
    ? (kind as "deploy" | "scan" | "demo")
    : null;
  const integrationKind: "github" | "jenkins" | "postman" | "swagger" | null =
    isIntegration
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
          className="fixed inset-0 z-[100] bg-foreground/10 backdrop-blur-md flex items-center justify-center p-6"
        >
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            transition={{ duration: 0.18 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-lg border border-border/60 bg-card/95 backdrop-blur-xl shadow-2xl rounded-2xl overflow-hidden"
          >
            <div className="flex items-center justify-between border-b border-border/60 bg-secondary/30 px-6 py-3 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
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
              <button onClick={onClose} className="hover:text-foreground transition-colors">
                [ esc ]
              </button>
            </div>
            <div className="p-6 md:p-8 space-y-5">
              {isAction && actionKind && (
                <>
                  <div
                    className="font-mono text-xs font-semibold uppercase tracking-[0.2em]"
                    style={{ color: actionConfig[actionKind].accent }}
                  >
                    {actionConfig[actionKind].tag}
                  </div>
                  <h3 className="font-display text-3xl md:text-4xl font-bold tracking-tighter leading-tight text-foreground">
                    {actionConfig[actionKind].title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {actionConfig[actionKind].desc}
                  </p>
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      onClose();
                    }}
                    className="space-y-4 font-mono text-sm mt-6"
                  >
                    {actionConfig[actionKind].fields.map(
                      (f: {
                        label: string;
                        placeholder: string;
                        value: string;
                      }) => (
                        <label key={f.label} className="block">
                          <span className="text-muted-foreground block mb-2 text-xs font-semibold uppercase tracking-wider">
                            // {f.label}
                          </span>
                          <input
                            defaultValue={f.value}
                            placeholder={f.placeholder}
                            className="w-full bg-background border border-border/60 focus:border-acid focus:ring-2 focus:ring-acid/20 outline-none rounded-lg px-4 py-2.5 text-foreground transition-all shadow-sm"
                          />
                        </label>
                      ),
                    )}
                    <div className="flex flex-col sm:flex-row items-center gap-3 pt-6">
                      <button
                        type="submit"
                        className="w-full sm:w-auto font-display font-semibold border px-6 py-2.5 rounded-full transition-all shadow-sm hover:-translate-y-0.5 hover:shadow-md"
                        style={{
                          borderColor: actionConfig[actionKind].accent,
                          backgroundColor: actionConfig[actionKind].accent,
                          color: "var(--ink)",
                        }}
                      >
                        {actionConfig[actionKind].cta}
                      </button>
                      <button
                        type="button"
                        onClick={onClose}
                        className="w-full sm:w-auto text-muted-foreground hover:text-foreground font-display font-semibold px-4 py-2.5 transition-colors"
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
                    className="font-mono text-xs font-semibold uppercase tracking-[0.2em]"
                    style={{ color: integrationConfig[integrationKind].accent }}
                  >
                    {integrationConfig[integrationKind].tag}
                  </div>
                  <h3 className="font-display text-3xl md:text-4xl font-bold tracking-tighter leading-tight text-foreground">
                    {integrationConfig[integrationKind].title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {integrationConfig[integrationKind].desc}
                  </p>
                  <div className="space-y-3 font-mono text-sm mt-6 bg-secondary/20 rounded-xl p-4 border border-border/40">
                    {integrationConfig[integrationKind].meta.map((m) => (
                      <div
                        key={m.label}
                        className="flex justify-between items-center py-1 border-b border-border/40 last:border-0"
                      >
                        <span className="text-muted-foreground text-xs uppercase tracking-wider font-semibold">// {m.label}</span>
                        <span className="text-foreground font-medium">{m.value}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-2 pt-6">
                    {integrationConfig[integrationKind].actions.map((a) => (
                      <button
                        key={a}
                        onClick={onClose}
                        className="border border-border/60 bg-background hover:bg-secondary/30 px-4 py-2 rounded-lg font-mono text-xs font-medium text-foreground transition-all shadow-sm hover:border-acid hover:text-acid"
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

function SectionHead({
  n,
  label,
  title,
}: {
  n: string;
  label: string;
  title: string;
}) {
  return (
    <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-border/60 pb-6">
      <div>
        <div className="font-display font-semibold text-sm text-acid tracking-wide mb-2">
          {n} — {label}
        </div>
        <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight max-w-2xl text-foreground">
          {title}
        </h2>
      </div>
      <div className="font-medium text-xs text-muted-foreground uppercase tracking-wider hidden md:block">
        Scroll to Explore
      </div>
    </div>
  );
}

function DashboardMock() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 80, rotateX: 15 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 1 }}
      style={{ transformPerspective: 1400 }}
      className="mt-12 bg-secondary/10 rounded-3xl overflow-hidden"
    >
      <div className="flex items-center justify-between border-b border-border/60 bg-secondary/50 px-6 py-3 font-display font-medium text-xs text-muted-foreground uppercase tracking-wider">
        <div className="flex gap-2">
          <span className="size-3 rounded-full bg-destructive/70" />
          <span className="size-3 rounded-full bg-warn/70" />
          <span className="size-3 rounded-full bg-acid/70" />
        </div>
        <span>Production Dashboard</span>
        <span className="text-acid font-bold flex items-center gap-1.5"><span className="size-2 bg-acid rounded-full animate-pulse"/> LIVE</span>
      </div>
      <div className="grid md:grid-cols-[1fr_2fr_1fr] gap-px bg-border/30">
        {/* left rail: scan history */}
        <div className="bg-background/50 p-6 space-y-4">
          <div className="font-display font-semibold text-xs text-muted-foreground uppercase tracking-widest">
            Scan History
          </div>
          {["#4192", "#4191", "#4190", "#4189", "#4188", "#4187"].map(
            (id, i) => (
              <div
                key={id}
                className="flex items-center justify-between text-sm font-mono border-l-4 pl-4 py-2 rounded-r-md bg-secondary/20"
                style={{
                  borderColor: i === 0 ? "var(--acid)" : "var(--border)",
                }}
              >
                <span className="text-foreground font-medium">{id}</span>
                <span className={i === 0 ? "text-acid font-bold" : "text-muted-foreground"}>
                  {i === 0 ? "Running" : `${94 - i}/100`}
                </span>
              </div>
            ),
          )}
        </div>
        {/* center: security score + chart */}
        <div className="bg-background/50 p-8 relative">
          <div className="font-display font-semibold text-xs text-muted-foreground uppercase tracking-widest mb-6">
            Security Score · Last 30d
          </div>
          <div className="flex items-baseline gap-4 mb-8">
            <div className="font-display font-bold text-7xl text-foreground">94</div>
            <div className="text-muted-foreground font-medium">
              / 100 · <span className="text-acid">↑ 6 this week</span>
            </div>
          </div>
          {/* sparkline */}
          <svg viewBox="0 0 400 100" className="w-full h-24">
            <defs>
              <linearGradient id="g" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="var(--acid)" stopOpacity="0.4" />
                <stop offset="100%" stopColor="var(--acid)" stopOpacity="0" />
              </linearGradient>
            </defs>
            <motion.path
              d="M0,70 L40,60 L80,72 L120,50 L160,55 L200,38 L240,42 L280,28 L320,32 L360,20 L400,15 L400,100 L0,100 Z"
              fill="url(#g)"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1 }}
            />
            <motion.path
              d="M0,70 L40,60 L80,72 L120,50 L160,55 L200,38 L240,42 L280,28 L320,32 L360,20 L400,15"
              fill="none"
              stroke="var(--acid)"
              strokeWidth="2"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.6, ease: "easeInOut" }}
            />
          </svg>
          <div className="grid grid-cols-4 gap-4 mt-8">
            {[
              { l: "Critical", v: 0, c: "var(--destructive)" },
              { l: "High", v: 2, c: "var(--signal)" },
              { l: "Medium", v: 7, c: "var(--warn)" },
              { l: "Low", v: 14, c: "var(--acid)" },
            ].map((v) => (
              <div key={v.l} className="border border-border/60 bg-background/50 rounded-xl p-4 text-center shadow-sm">
                <div className="font-display font-bold text-3xl mb-1" style={{ color: v.c }}>
                  {v.v}
                </div>
                <div className="font-display font-medium text-xs text-muted-foreground uppercase tracking-widest">
                  {v.l}
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* right: health pulse */}
        <div className="bg-background/50 p-6 space-y-5">
          <div className="font-display font-semibold text-xs text-muted-foreground uppercase tracking-widest mb-2">
            Health Pulse
          </div>
          {[
            { n: "auth-svc", v: 99.99, ms: 42 },
            { n: "billing", v: 99.91, ms: 118 },
            { n: "search", v: 98.4, ms: 312 },
            { n: "feed", v: 99.97, ms: 67 },
          ].map((s) => (
            <div key={s.n} className="space-y-2">
              <div className="flex justify-between font-mono text-sm">
                <span className="text-foreground font-medium">{s.n}</span>
                <span className="text-acid font-bold">{s.v}%</span>
              </div>
              <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${s.v}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2 }}
                  className="h-full bg-acid rounded-full"
                />
              </div>
              <div className="font-mono text-xs text-muted-foreground">
                P50: {s.ms}ms
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function AIPanel({
  item,
  index,
}: {
  item: { tag: string; title: string; body: string };
  index: number;
}) {
  return (
    <div className="relative px-6 max-w-[1400px] mx-auto py-6">
      <div className="grid md:grid-cols-2 gap-12 items-center bg-secondary/10 rounded-3xl p-10 md:p-16">
        <div>
          <div className="font-display font-bold text-sm text-signal uppercase tracking-widest mb-4 bg-signal/10 inline-block px-3 py-1 rounded-full">
            {item.tag}
          </div>
          <h3 className="font-display text-4xl md:text-5xl font-bold tracking-tight leading-[1.1] mb-6 text-foreground">
            {item.title}
          </h3>
          <p className="text-muted-foreground text-lg leading-relaxed max-w-md">
            {item.body}
          </p>
          {(() => {
            const to =
              item.tag === "AI.TESTS"
                ? "/ai/test-synth"
                : item.tag === "AI.DOCS"
                  ? "/ai/docs-gen"
                  : "/ai/mock-server";
            return (
              <Link
                to={to}
                className="mt-8 inline-flex items-center gap-2 bg-acid text-ink px-6 py-3 rounded-full font-display font-medium shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all"
              >
                Initiate Module →
              </Link>
            );
          })()}
        </div>
        <div className="relative aspect-square bg-secondary/20 rounded-3xl p-8 overflow-hidden flex items-center justify-center">
          <div className="relative font-mono text-sm space-y-3 text-muted-foreground bg-background w-full h-full rounded-2xl p-6 shadow-sm">
            <div className="text-acid font-semibold">
              ▸ apiguard.{item.tag.toLowerCase().replace(".", "_")}()
            </div>
            <div className="pl-4 text-foreground">
              Analyzing 247 endpoints<span className="cursor-blink">_</span>
            </div>
            <div className="pl-4">▪ Parsing openapi.yaml</div>
            <div className="pl-4">▪ Inferring contracts</div>
            <div className="pl-4">▪ Generating output</div>
            <div className="pl-4 text-acid font-medium mt-4">
              ✓ Complete · {18 + index * 11}.{index * 3}s
            </div>
          </div>
          <motion.div
            className="absolute -bottom-10 -right-10 size-64 rounded-full"
            style={{
              background: `radial-gradient(circle, var(--signal), transparent 70%)`,
              opacity: 0.15,
            }}
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 4, repeat: Infinity }}
          />
        </div>
      </div>
    </div>
  );
}
