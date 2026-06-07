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
        className="relative min-h-[120vh] grid-bg overflow-hidden pt-24"
      >
        <div className="absolute inset-0 scan-lines opacity-30 pointer-events-none" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-acid to-transparent" />

        <motion.div
          style={{ y: titleY, opacity: titleOpacity }}
          className="relative z-10 px-6 pt-16 max-w-[1400px] mx-auto"
        >
          <div className="font-mono text-xs text-bone/70 mb-8 flex items-center gap-4">
            <span className="border border-bone/40 px-2 py-1">
              [ SYS.BOOT ]
            </span>
            <span>
              initializing perimeter sweep
              <span className="cursor-blink">_</span>
            </span>
          </div>

          <h1 className="font-display text-[clamp(3rem,11vw,11rem)] leading-[0.85] tracking-tight uppercase">
            <span className="block">Every API</span>
            <span className="block text-stroke">you ship is</span>
            <span className="block">
              a{" "}
              <span className="text-acid italic font-serif lowercase">
                liability.
              </span>
            </span>
            <span className="block text-bone/50">we fix that.</span>
          </h1>

          <div className="mt-12 grid md:grid-cols-[1.4fr_1fr] gap-12 items-end">
            <p className="text-bone/70 text-lg md:text-xl max-w-xl leading-relaxed">
              APIGUARD is a brutalist control plane for API security,
              observability, mocking and load — wired straight into your repo,
              your CI, and your conscience.
            </p>
            <div className="font-mono text-xs text-bone/50 grid grid-cols-3 gap-4 border-t border-border pt-4">
              <div>
                <div className="text-acid text-2xl font-display">12.4k</div>
                endpoints scanned
              </div>
              <div>
                <div className="text-signal text-2xl font-display">3.1M</div>
                requests/min
              </div>
              <div>
                <div className="text-warn text-2xl font-display">99.99%</div>
                uptime sla
              </div>
            </div>
          </div>
        </motion.div>

        {/* Floating cube */}
        <div className="absolute right-[6%] top-[28%] hidden lg:block">
          <CubeHero />
        </div>

        {/* Marquee strip */}
        <div className="absolute bottom-0 inset-x-0 border-t border-border bg-background/40 backdrop-blur-xl overflow-hidden">
          <div className="flex marquee-track whitespace-nowrap py-3 font-mono text-sm uppercase">
            {Array.from({ length: 2 }).map((_, k) => (
              <div key={k} className="flex shrink-0">
                {[
                  "scan",
                  "diff",
                  "mock",
                  "monitor",
                  "load·test",
                  "auto·doc",
                  "openapi",
                  "postman",
                  "jenkins",
                  "github·actions",
                  "ci/cd",
                  "owasp·top10",
                ].map((w) => (
                  <span
                    key={w + k}
                    className="px-8 flex items-center gap-8 text-bone/60"
                  >
                    {w} <span className="text-acid">◇</span>
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DASHBOARD MOCK */}
      <section id="scan" className="relative px-6 py-32 max-w-[1400px] mx-auto">
        <SectionHead
          n="00"
          label="control.plane"
          title="A dashboard that talks back."
        />
        <DashboardMock />
      </section>

      {/* CORE FEATURES BENTO */}
      <section
        id="modules"
        className="relative px-6 py-32 max-w-[1400px] mx-auto"
      >
        <SectionHead
          n="01"
          label="core.modules"
          title="Six instruments. One console."
        />
        <div
          className="grid md:grid-cols-3 gap-4 mt-12"
          style={{ perspective: 1500 }}
        >
          {CORE.map((f) => (
            <TiltCard key={f.code} className="group">
              <Link
                to="/module/$slug"
                params={{ slug: f.slug }}
                className="relative block border border-border bg-card/40 backdrop-blur-xl p-8 h-[280px] overflow-hidden hover:border-acid transition-colors shadow-sm"
              >
                <div className="absolute top-0 right-0 text-[8rem] leading-none text-bone/10 font-display font-bold">
                  {f.code}
                </div>
                <div className="relative flex flex-col justify-between h-full">
                  <div className="flex items-center justify-between font-mono text-xs text-bone/60">
                    <span>MOD.{f.code}</span>
                    <span className="text-acid text-xl">{f.glyph}</span>
                  </div>
                  <div>
                    <h3 className="font-display text-2xl uppercase tracking-tight mb-2 group-hover:text-acid transition-colors">
                      {f.title}
                    </h3>
                    <p className="text-bone/60 text-sm leading-relaxed">
                      {f.desc}
                    </p>
                  </div>
                  <div className="font-mono text-[10px] text-acid/70 flex items-center gap-2">
                    <div className="h-px flex-1 bg-acid/30" />
                    <span>OPEN →</span>
                  </div>
                </div>
              </Link>
            </TiltCard>
          ))}
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
      <section id="load" className="relative px-6 py-32 max-w-[1400px] mx-auto">
        <SectionHead
          n="03"
          label="load.simulation"
          title="Punch your API. See what breaks."
        />
        <div className="grid md:grid-cols-3 gap-6 mt-12">
          {LOAD_TIERS.map((t, i) => (
            <motion.div
              key={t.users}
              initial={{ opacity: 0, y: 60, rotateX: -15 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, delay: i * 0.12 }}
              className="relative border-2 p-8 aspect-[3/4] flex flex-col justify-between overflow-hidden bg-card/30 backdrop-blur-xl"
              style={{
                borderColor: t.color,
                background: `radial-gradient(circle at top right, color-mix(in oklab, ${t.color} 15%, transparent), transparent 60%)`,
              }}
            >
              <div
                className="font-mono text-xs uppercase"
                style={{ color: t.color }}
              >
                TIER {String(i + 1).padStart(2, "0")}
              </div>
              <div>
                <div
                  className="font-display text-[6rem] leading-none tracking-tighter"
                  style={{ color: t.color }}
                >
                  {t.users}
                </div>
                <div className="text-bone/60 uppercase tracking-widest text-xs mt-2">
                  concurrent users
                </div>
              </div>
              <div className="space-y-2 font-mono text-xs text-bone/60">
                <div className="flex justify-between">
                  <span>scenario</span>
                  <span className="text-bone">{t.note}</span>
                </div>
                <div className="flex justify-between">
                  <span>duration</span>
                  <span className="text-bone">5m / 15m / 1h</span>
                </div>
                <div className="h-1 bg-bone/10 mt-3">
                  <motion.div
                    className="h-full"
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
        className="relative px-6 py-32 max-w-[1400px] mx-auto"
      >
        <SectionHead
          n="04"
          label="diff.radar"
          title="The world's most paranoid changelog."
        />
        <div className="mt-12 border border-border bg-card/40 backdrop-blur-xl">
          <div className="grid grid-cols-[100px_1fr_120px] gap-4 px-6 py-3 border-b border-border font-mono text-[10px] text-bone/40 uppercase tracking-widest">
            <span>event</span>
            <span>endpoint</span>
            <span className="text-right">timestamp</span>
          </div>
          {CHANGES.map((c, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="grid grid-cols-[100px_1fr_120px] gap-4 px-6 py-5 border-b border-border/50 hover:bg-bone/[0.02] items-center group"
            >
              <span
                className="font-mono text-[11px] font-bold tracking-wider"
                style={{ color: c.tone }}
              >
                {c.kind}
              </span>
              <span className="font-mono text-sm text-bone group-hover:text-acid transition-colors">
                {c.path}
              </span>
              <span className="font-mono text-xs text-bone/40 text-right">
                {c.t}
              </span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* INTEGRATIONS RAIL */}
      <section className="relative py-24 border-y border-border overflow-hidden">
        <div className="px-6 max-w-[1400px] mx-auto mb-12">
          <div className="font-mono text-xs text-bone/40 uppercase tracking-widest">
            // connected to your stack
          </div>
        </div>
        <div className="flex marquee-track gap-16 font-display text-5xl md:text-7xl uppercase whitespace-nowrap">
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
                  className={`text-bone/20 hover:text-acid transition-colors flex items-center gap-16 bg-transparent border-none p-0 m-0 font-display ${clickable ? "cursor-pointer" : "cursor-default"}`}
                >
                  {b} <span className="text-acid/40">/</span>
                </button>
              );
            }),
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="relative px-6 py-40 max-w-[1400px] mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="font-display text-[clamp(3rem,10vw,9rem)] leading-[0.85] uppercase tracking-tight"
        >
          Ship
          <br />
          <span className="text-acid italic font-serif lowercase">without</span>
          <br />
          <span className="text-stroke">flinching.</span>
        </motion.h2>
        <div className="mt-12 flex flex-wrap justify-center gap-4">
          <button
            onClick={() => setModal("scan")}
            className="bg-acid text-ink px-8 py-4 font-mono text-sm uppercase tracking-widest hover:bg-bone transition"
          >
            start.scan()
          </button>
          <button
            onClick={() => setModal("demo")}
            className="border border-bone/40 text-bone px-8 py-4 font-mono text-sm uppercase tracking-widest hover:border-acid hover:text-acid transition"
          >
            book.demo()
          </button>
        </div>
      </section>

      <footer className="border-t border-border px-6 py-8 font-mono text-xs text-bone/40 flex flex-wrap items-center justify-between gap-4 bg-background/40 backdrop-blur-xl">
        <div>APIGUARD // api.os · built for engineers who don't sleep</div>
        <div className="flex gap-6">
          <span>
            status: <span className="text-acid">operational</span>
          </span>
          <span>region: global·edge</span>
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
            className={`w-0.5 transition-all duration-300 ${active === l.id ? "h-8 bg-acid" : "h-3 bg-bone/20 group-hover:bg-bone/60"}`}
          />
          <span
            className={`font-mono text-[9px] uppercase tracking-widest transition-opacity duration-300 ${active === l.id ? "opacity-100 text-acid" : "opacity-0 group-hover:opacity-50 text-bone"}`}
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
                      (f: {
                        label: string;
                        placeholder: string;
                        value: string;
                      }) => (
                        <label key={f.label} className="block">
                          <span className="text-bone/40 block mb-1">
                            // {f.label}
                          </span>
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
    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-border pb-8">
      <div>
        <div className="font-mono text-xs text-acid uppercase tracking-widest mb-3">
          [ {n} ] {label}
        </div>
        <h2 className="font-display text-4xl md:text-6xl uppercase tracking-tight max-w-3xl">
          {title}
        </h2>
      </div>
      <div className="font-mono text-[10px] text-bone/40 uppercase">
        scroll·to·engage ↓
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
      className="mt-12 border border-border bg-card/40 backdrop-blur-xl overflow-hidden"
    >
      <div className="flex items-center justify-between border-b border-border px-4 py-2 font-mono text-[10px] text-bone/50 uppercase">
        <div className="flex gap-1.5">
          <span className="size-2.5 rounded-full bg-destructive/70" />
          <span className="size-2.5 rounded-full bg-warn/70" />
          <span className="size-2.5 rounded-full bg-acid/70" />
        </div>
        <span>~/apiguard/dashboard · prod</span>
        <span className="text-acid">LIVE</span>
      </div>
      <div className="grid md:grid-cols-[1fr_2fr_1fr] gap-px bg-border">
        {/* left rail: scan history */}
        <div className="bg-card/30 backdrop-blur-md p-5 space-y-3">
          <div className="font-mono text-[10px] text-bone/40 uppercase">
            scan.history
          </div>
          {["#4192", "#4191", "#4190", "#4189", "#4188", "#4187"].map(
            (id, i) => (
              <div
                key={id}
                className="flex items-center justify-between text-xs font-mono border-l-2 pl-3 py-2"
                style={{
                  borderColor: i === 0 ? "var(--acid)" : "var(--border)",
                }}
              >
                <span className="text-bone/80">{id}</span>
                <span className={i === 0 ? "text-acid" : "text-bone/40"}>
                  {i === 0 ? "running" : `${94 - i}/100`}
                </span>
              </div>
            ),
          )}
        </div>
        {/* center: security score + chart */}
        <div className="bg-card/30 backdrop-blur-md p-8 relative">
          <div className="font-mono text-[10px] text-bone/40 uppercase mb-4">
            security.score · last 30d
          </div>
          <div className="flex items-baseline gap-4 mb-6">
            <div className="font-display text-7xl text-acid">94</div>
            <div className="text-bone/50 text-sm font-mono">
              / 100 · ↑ 6 this week
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
          <div className="grid grid-cols-4 gap-3 mt-6">
            {[
              { l: "critical", v: 0, c: "var(--destructive)" },
              { l: "high", v: 2, c: "var(--signal)" },
              { l: "medium", v: 7, c: "var(--warn)" },
              { l: "low", v: 14, c: "var(--acid)" },
            ].map((v) => (
              <div key={v.l} className="border border-border p-3">
                <div className="font-display text-2xl" style={{ color: v.c }}>
                  {v.v}
                </div>
                <div className="font-mono text-[10px] text-bone/40 uppercase">
                  {v.l}
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* right: health pulse */}
        <div className="bg-card/30 backdrop-blur-md p-5 space-y-4">
          <div className="font-mono text-[10px] text-bone/40 uppercase">
            health.pulse
          </div>
          {[
            { n: "auth-svc", v: 99.99, ms: 42 },
            { n: "billing", v: 99.91, ms: 118 },
            { n: "search", v: 98.4, ms: 312 },
            { n: "feed", v: 99.97, ms: 67 },
          ].map((s) => (
            <div key={s.n} className="space-y-1">
              <div className="flex justify-between font-mono text-xs">
                <span className="text-bone/80">{s.n}</span>
                <span className="text-acid">{s.v}%</span>
              </div>
              <div className="h-1 bg-bone/10">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${s.v}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2 }}
                  className="h-full bg-acid"
                />
              </div>
              <div className="font-mono text-[10px] text-bone/40">
                p50 · {s.ms}ms
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
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const x = useTransform(
    scrollYProgress,
    [0, 1],
    index % 2 === 0 ? [-80, 80] : [80, -80],
  );
  const rot = useTransform(scrollYProgress, [0, 1], [-6, 6]);

  return (
    <div ref={ref} className="sticky top-24 px-6 max-w-[1400px] mx-auto py-16">
      <motion.div
        style={{ x, rotate: rot }}
        className="grid md:grid-cols-2 gap-8 items-center border border-border bg-card/80 backdrop-blur-xl p-10 md:p-16"
      >
        <div>
          <div className="font-mono text-xs text-signal uppercase tracking-widest mb-4">
            [ {item.tag} ]
          </div>
          <h3 className="font-display text-4xl md:text-6xl uppercase tracking-tight leading-[0.9] mb-6">
            {item.title}
          </h3>
          <p className="text-bone/60 text-lg leading-relaxed max-w-md">
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
                className="mt-8 inline-block font-mono text-xs text-acid uppercase tracking-widest border-b border-acid pb-1 hover:text-signal hover:border-signal transition"
              >
                initiate →
              </Link>
            );
          })()}
        </div>
        <div className="relative aspect-square border border-border bg-background p-6 overflow-hidden">
          <div className="absolute inset-0 grid-bg opacity-40" />
          <div className="relative font-mono text-xs space-y-2 text-bone/60">
            <div className="text-acid">
              ▸ apiguard.{item.tag.toLowerCase().replace(".", "_")}()
            </div>
            <div className="pl-4">
              analyzing 247 endpoints<span className="cursor-blink">_</span>
            </div>
            <div className="pl-4 text-bone/40">▪ parsing openapi.yaml</div>
            <div className="pl-4 text-bone/40">▪ inferring contracts</div>
            <div className="pl-4 text-bone/40">▪ generating output</div>
            <div className="pl-4 text-acid">
              ✓ complete · {18 + index * 11}.{index * 3}s
            </div>
          </div>
          <motion.div
            className="absolute -bottom-10 -right-10 size-40 rounded-full"
            style={{
              background: `radial-gradient(circle, var(--signal), transparent 70%)`,
              opacity: 0.3,
            }}
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 4, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </div>
  );
}
