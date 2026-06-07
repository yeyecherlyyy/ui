import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { motion } from "motion/react";
import { useLenis } from "@/hooks/use-lenis";

export const Route = createFileRoute("/module/$slug")({
  head: ({ params }) => {
    const m = MODULES[params.slug as keyof typeof MODULES];
    return {
      meta: [
        { title: `${m?.title ?? "Module"} // APIGUARD` },
        { name: "description", content: m?.tagline ?? "APIGUARD module." },
      ],
    };
  },
  loader: ({ params }) => {
    if (!MODULES[params.slug as keyof typeof MODULES]) throw notFound();
    return { slug: params.slug };
  },
  notFoundComponent: () => (
    <div className="min-h-screen flex items-center justify-center font-mono text-bone/60">
      <div className="text-center">
        <div className="text-acid text-xs mb-4">[ MODULE.404 ]</div>
        <div className="mb-6">unknown module</div>
        <Link
          to="/"
          className="border border-acid text-acid px-4 py-2 hover:bg-acid hover:text-ink transition"
        >
          return ←
        </Link>
      </div>
    </div>
  ),
  component: ModulePage,
});

type ModuleDef = {
  code: string;
  title: string;
  glyph: string;
  tag: string;
  tagline: string;
  body: string;
  accent: string; // css var
  metrics: { label: string; value: string; sub: string }[];
  ops: { k: string; v: string; tone?: string }[];
  capabilities: { title: string; desc: string }[];
  feed: { t: string; line: string; tone: string }[];
  cli: string[];
};

const MODULES: Record<string, ModuleDef> = {
  "surface-scanner": {
    code: "01",
    title: "Surface Scanner",
    glyph: "◉",
    tag: "scan.surface",
    accent: "var(--acid)",
    tagline:
      "Continuous CVE + OWASP API top-10 sweeps. Live security score per endpoint.",
    body: "A perpetually-running adversary. Probes every endpoint against OWASP API Top 10, known CVEs, auth weaknesses, IDOR patterns, rate-limit absence, and silent data exfiltration paths. Outputs a single twitchy security score per endpoint, per service, per fleet.",
    metrics: [
      {
        label: "endpoints under watch",
        value: "12,481",
        sub: "across 38 services",
      },
      { label: "rules engine", value: "2,140", sub: "owasp + cve + custom" },
      { label: "mean time to detect", value: "47s", sub: "p50 across last 7d" },
      { label: "false positive rate", value: "0.6%", sub: "tuned weekly" },
    ],
    ops: [
      { k: "policy.profile", v: "STRICT/PROD" },
      { k: "schedule", v: "every 5m · drift mode" },
      { k: "auth.simulation", v: "bearer · oauth2 · mtls" },
      { k: "rate.budget", v: "120 rps · adaptive" },
    ],
    capabilities: [
      {
        title: "OWASP API Top 10",
        desc: "BOLA, broken auth, excessive data, mass assignment, SSRF — all mapped to endpoint contracts.",
      },
      {
        title: "CVE Cross-Match",
        desc: "Continuously diffs your runtime dependencies against NVD + GitHub advisories.",
      },
      {
        title: "Auth Bypass Probes",
        desc: "Token replay, scope confusion, IDOR walks, JWT alg-none, expired-token acceptance.",
      },
      {
        title: "Live Severity Score",
        desc: "0–100 per endpoint with decay curve. Score drops the moment a regression lands.",
      },
    ],
    feed: [
      {
        t: "00:01",
        line: "BOLA suspected · GET /v3/users/{id}/orders",
        tone: "var(--signal)",
      },
      {
        t: "00:04",
        line: "missing rate-limit · POST /auth/login",
        tone: "var(--warn)",
      },
      {
        t: "00:09",
        line: "tls/ok · cipher TLS_AES_256_GCM_SHA384",
        tone: "var(--acid)",
      },
      {
        t: "00:14",
        line: "owasp-api-02 · weak token rotation policy",
        tone: "var(--warn)",
      },
      {
        t: "00:19",
        line: "cve-2025-19023 · package undici < 6.21",
        tone: "var(--signal)",
      },
      {
        t: "00:23",
        line: "scan #4192 · 12,481/12,481 · 94 score",
        tone: "var(--acid)",
      },
    ],
    cli: [
      "▸ apiguard scan --profile strict --diff main",
      "▪ resolving service mesh · 38 svcs",
      "▪ inhaling openapi · 12,481 endpoints",
      "▪ executing 2,140 rules · concurrency 64",
      "▪ correlating cve feed · nvd + ghsa",
      "✓ surface mapped · score 94/100 · 2 high · 7 med",
    ],
  },
  "openapi-inhaler": {
    code: "02",
    title: "OpenAPI Inhaler",
    glyph: "⬢",
    tag: "spec.ingest",
    accent: "var(--signal)",
    tagline: "Drop a Swagger/OpenAPI/Postman file. We crawl, diff, normalize.",
    body: "Throw any spec at it — OpenAPI 2/3/3.1, Postman v2.1, HAR captures, Insomnia exports, raw curl logs. The inhaler normalizes, diffs against the last known good, and emits a single canonical contract your whole stack can pivot on.",
    metrics: [
      { label: "specs ingested", value: "1,847", sub: "lifetime" },
      {
        label: "formats supported",
        value: "9",
        sub: "openapi · postman · har · curl…",
      },
      { label: "normalization time", value: "1.2s", sub: "avg per 500 ops" },
      {
        label: "diff precision",
        value: "99.4%",
        sub: "vs hand-audited baseline",
      },
    ],
    ops: [
      { k: "input.formats", v: "openapi · postman · har · curl · graphql" },
      { k: "schema.target", v: "openapi 3.1 canonical" },
      { k: "dedupe", v: "structural · semantic" },
      { k: "secret.scrub", v: "auto · 38 patterns" },
    ],
    capabilities: [
      {
        title: "Universal Importer",
        desc: "Drag, drop, paste, or webhook. Inhales OpenAPI 2/3/3.1, Postman 2.1, HAR, curl logs.",
      },
      {
        title: "Canonical Normalizer",
        desc: "Collapses synonyms, infers missing schemas, resolves $refs, scrubs PII.",
      },
      {
        title: "Spec Diff Engine",
        desc: "Structural + semantic diff. Knows the difference between rename and remove.",
      },
      {
        title: "Auto-Reconciliation",
        desc: "When two specs disagree, picks the one your runtime actually serves.",
      },
    ],
    feed: [
      { t: "now", line: "openapi.v3.1 · 412 ops parsed", tone: "var(--acid)" },
      {
        t: "1s",
        line: "postman.collection.json · 89 requests merged",
        tone: "var(--signal)",
      },
      {
        t: "2s",
        line: "$ref resolved · 1,204 schema nodes",
        tone: "var(--acid)",
      },
      {
        t: "3s",
        line: "secret scrubbed · 2 bearer tokens removed",
        tone: "var(--warn)",
      },
      {
        t: "4s",
        line: "diff vs baseline · +14 / -3 / ~22",
        tone: "var(--signal)",
      },
      {
        t: "5s",
        line: "canonical contract emitted · sha 9af3…",
        tone: "var(--acid)",
      },
    ],
    cli: [
      "▸ apiguard inhale ./specs/*.yaml ./postman/*.json",
      "▪ detecting formats · 7 files",
      "▪ normalizing → openapi 3.1",
      "▪ resolving $refs · 1,204 nodes",
      "▪ scrubbing secrets · 2 redacted",
      "✓ canonical contract @ sha 9af3a1c · ready to publish",
    ],
  },
  "repo-bridge": {
    code: "03",
    title: "Repo Bridge",
    glyph: "⟁",
    tag: "ci.bridge",
    accent: "var(--acid)",
    tagline:
      "Connect GitHub. Auto-pull specs from PRs. Wire Actions or Jenkins.",
    body: "The umbilical between source-of-truth and APIGUARD. Watches every PR, pulls specs as they land, runs the gauntlet, posts results inline as PR checks. Speaks GitHub Actions, Jenkins, GitLab CI, CircleCI, Buildkite.",
    metrics: [
      { label: "repos connected", value: "147", sub: "across 6 orgs" },
      { label: "pr checks/day", value: "3,402", sub: "median 11s each" },
      { label: "blocked merges", value: "82", sub: "this quarter" },
      {
        label: "ci providers",
        value: "6",
        sub: "actions · jenkins · gitlab · circle · buildkite · drone",
      },
    ],
    ops: [
      { k: "trigger", v: "pr.opened · pr.sync · push:main" },
      { k: "auth.mode", v: "github app · least scope" },
      { k: "policy.gate", v: "block on HIGH+ findings" },
      { k: "comment.style", v: "inline · sticky · diff-aware" },
    ],
    capabilities: [
      {
        title: "GitHub Native App",
        desc: "Installed once per org. PR checks, inline annotations, suggested patches.",
      },
      {
        title: "Jenkins Step",
        desc: "Drop-in pipeline step: apiguardScan(profile: 'strict'). Junit + sarif output.",
      },
      {
        title: "Branch Protection",
        desc: "Block merges below your security score floor. No exceptions, no DMs.",
      },
      {
        title: "Spec Drift Bot",
        desc: "Opens a PR when shipped runtime diverges from the committed spec.",
      },
    ],
    feed: [
      {
        t: "12s",
        line: "pr #4421 · payments-svc · check started",
        tone: "var(--bone)",
      },
      {
        t: "15s",
        line: "spec diff · +2 endpoints · 0 breaking",
        tone: "var(--acid)",
      },
      { t: "18s", line: "scan · 0 critical · 1 medium", tone: "var(--warn)" },
      {
        t: "19s",
        line: "annotation posted · line 84 · openapi.yaml",
        tone: "var(--signal)",
      },
      { t: "22s", line: "status · success · score 96", tone: "var(--acid)" },
    ],
    cli: [
      "▸ apiguard ci bind --provider github --org acme",
      "▪ installing app · scope: contents:read pull_requests:write",
      "▪ subscribing · 147 repos",
      "▪ provisioning webhook · /hooks/gh",
      "▪ deploying pr-check workflow",
      "✓ bridge live · first check in 12s",
    ],
  },
  "forensic-pdf": {
    code: "04",
    title: "Forensic PDF",
    glyph: "▤",
    tag: "report.export",
    accent: "var(--warn)",
    tagline: "One-click signed report. Auditors love it. Lawyers tolerate it.",
    body: "Generates a courtroom-grade PDF: every finding with evidence, request/response capture, reproduction steps, CVSS, OWASP mapping, remediation. Cryptographically signed, timestamped, watermarked. Optional SOC2 + ISO 27001 templates.",
    metrics: [
      { label: "reports issued", value: "9,118", sub: "last 12 months" },
      { label: "avg generation time", value: "3.4s", sub: "300-page bundle" },
      {
        label: "sign + timestamp",
        value: "PAdES-LTA",
        sub: "long-term archival",
      },
      {
        label: "templates",
        value: "12",
        sub: "soc2 · iso · pci · hipaa · custom",
      },
    ],
    ops: [
      { k: "format", v: "pdf/a-3 · machine-readable annex" },
      { k: "signature", v: "ecdsa p-256 · tsa rfc 3161" },
      { k: "evidence", v: "har · curl · screenshot · stack trace" },
      { k: "redaction", v: "policy-driven · per audience" },
    ],
    capabilities: [
      {
        title: "Evidence Bundling",
        desc: "Each finding ships with the exact request, response, headers, and replay curl.",
      },
      {
        title: "CVSS + OWASP Mapping",
        desc: "Cross-referenced to OWASP API Top 10, CWE, MITRE ATT&CK technique IDs.",
      },
      {
        title: "Compliance Templates",
        desc: "SOC2, ISO 27001 Annex A, PCI-DSS, HIPAA Security Rule — sectioned and indexed.",
      },
      {
        title: "Cryptographic Signing",
        desc: "PAdES-LTA with RFC 3161 timestamp. Auditors verify offline.",
      },
    ],
    feed: [
      {
        t: "0.1s",
        line: "collecting findings · 23 items",
        tone: "var(--bone)",
      },
      { t: "0.4s", line: "rendering evidence pages · 86", tone: "var(--bone)" },
      {
        t: "1.1s",
        line: "embedding machine-readable annex (json+sarif)",
        tone: "var(--signal)",
      },
      {
        t: "2.8s",
        line: "signing pades-lta · tsa: digicert",
        tone: "var(--warn)",
      },
      {
        t: "3.4s",
        line: "report-2026-06-07-#4192.pdf · 4.2mb · ready",
        tone: "var(--acid)",
      },
    ],
    cli: [
      "▸ apiguard report --scan 4192 --template soc2 --sign",
      "▪ aggregating 23 findings · 86 evidence artifacts",
      "▪ rendering 314 pages · pdf/a-3",
      "▪ embedding sarif + json annex",
      "▪ signing pades-lta · timestamping",
      "✓ report-2026-06-07-#4192.pdf · sha 41bc…",
    ],
  },
  "change-radar": {
    code: "05",
    title: "Change Radar",
    glyph: "⟴",
    tag: "diff.radar",
    accent: "var(--signal)",
    tagline:
      "Endpoint added, auth changed, contract broken — pinged before users notice.",
    body: "Watches your runtime AND your spec. The instant a new endpoint slips into production, an auth header silently mutates, or a required field appears in a response — radar pings the channel of your choosing with a structural diff and blast radius.",
    metrics: [
      { label: "events/day", value: "1,204", sub: "across all envs" },
      {
        label: "detection latency",
        value: "8s",
        sub: "runtime → notification",
      },
      {
        label: "blast radius engine",
        value: "v2.3",
        sub: "graph-based dep walk",
      },
      {
        label: "channels",
        value: "slack · pagerduty · teams · webhook",
        sub: "",
      },
    ],
    ops: [
      { k: "sources", v: "runtime taps · spec repo · gateway logs" },
      { k: "diff.kinds", v: "added · removed · auth-changed · contract-break" },
      { k: "noise.filter", v: "ml-grouped · 92% reduction" },
      { k: "ack.flow", v: "owner ping · 5m escalation" },
    ],
    capabilities: [
      {
        title: "Runtime Taps",
        desc: "Sidecar or eBPF probe captures shipped behavior, not just declared spec.",
      },
      {
        title: "Semantic Diff",
        desc: "Knows that renaming `user_id` → `userId` is one change, not two.",
      },
      {
        title: "Blast Radius",
        desc: "Walks the consumer graph and tells you exactly which clients will break.",
      },
      {
        title: "Triage Channels",
        desc: "Routes by service owner — Slack thread, PagerDuty incident, GitHub issue.",
      },
    ],
    feed: [
      {
        t: "now",
        line: "ADDED · POST /v3/checkout/express",
        tone: "var(--acid)",
      },
      {
        t: "11m",
        line: "REMOVED · GET /legacy/users/{id}/profile",
        tone: "var(--signal)",
      },
      {
        t: "1h",
        line: "AUTH·CHG · PATCH /admin/billing → Bearer",
        tone: "var(--warn)",
      },
      {
        t: "3h",
        line: "BREAK · GET /search?q now required",
        tone: "var(--signal)",
      },
      {
        t: "6h",
        line: "FIELD · response.user.email now nullable",
        tone: "var(--warn)",
      },
    ],
    cli: [
      "▸ apiguard radar tail --env prod",
      "▪ subscribing to runtime tap · gateway-east-1",
      "▪ pulling spec baseline @ sha 9af3a1c",
      "▪ correlating · graph nodes 12,481",
      "✓ radar hot · 1,204 events/d · pinging #api-watch",
    ],
  },
  "health-pulse": {
    code: "06",
    title: "Health Pulse",
    glyph: "♡",
    tag: "uptime.pulse",
    accent: "var(--acid)",
    tagline:
      "Uptime, latency, error rates rolled into a single twitchy heartbeat.",
    body: "Three numbers that actually matter, fused into one waveform. p50/p95/p99 latency, 5xx + 4xx-by-intent error budget burn, and synthetic uptime probes from 14 regions. When the heartbeat skips, on-call knows before the dashboard refreshes.",
    metrics: [
      { label: "probes/min", value: "82,400", sub: "14 regions" },
      { label: "p95 latency", value: "118ms", sub: "fleet rolling 5m" },
      { label: "error budget", value: "94%", sub: "remaining this 30d" },
      { label: "slo violations", value: "0", sub: "last 14d" },
    ],
    ops: [
      {
        k: "regions",
        v: "us-east · us-west · eu-west · eu-north · ap-south · sa-east · …",
      },
      { k: "method.set", v: "GET · POST · WS handshake · long-poll" },
      { k: "burn.alerting", v: "multi-window · multi-burn-rate" },
      { k: "synthetic.flows", v: "login · checkout · search · upload" },
    ],
    capabilities: [
      {
        title: "Multi-Region Probes",
        desc: "14 PoPs. Real TCP, real TLS, real DNS — not just ICMP. Anycast-aware.",
      },
      {
        title: "Latency Histograms",
        desc: "Full distribution. p50, p95, p99, p99.9. Tail latency, not just averages.",
      },
      {
        title: "Error Budget Burn",
        desc: "Multi-window, multi-burn-rate alerts. Pages on slope, not just symptom.",
      },
      {
        title: "Synthetic Journeys",
        desc: "Scripted user flows — login → search → checkout — run every 60s.",
      },
    ],
    feed: [
      {
        t: "now",
        line: "auth-svc · p95 42ms · 99.99% · ok",
        tone: "var(--acid)",
      },
      {
        t: "now",
        line: "billing · p95 118ms · 99.91% · ok",
        tone: "var(--acid)",
      },
      {
        t: "now",
        line: "search · p95 312ms · 98.40% · degraded",
        tone: "var(--warn)",
      },
      { t: "12s", line: "feed · p95 67ms · 99.97% · ok", tone: "var(--acid)" },
      {
        t: "30s",
        line: "synthetic checkout · 1.4s · pass",
        tone: "var(--acid)",
      },
    ],
    cli: [
      "▸ apiguard pulse --service '*' --window 5m",
      "▪ polling 14 regions · 82,400 probes/min",
      "▪ aggregating histograms · t-digest",
      "▪ computing burn rates · 1h/6h/3d windows",
      "✓ heartbeat steady · 0 slo violations · 14d",
    ],
  },
};

const ORDER = [
  "surface-scanner",
  "openapi-inhaler",
  "repo-bridge",
  "forensic-pdf",
  "change-radar",
  "health-pulse",
];

function ModulePage() {
  useLenis();
  const { slug } = Route.useParams();
  const m = MODULES[slug as keyof typeof MODULES];
  if (!m) return null;

  const idx = ORDER.indexOf(slug);
  const prev = ORDER[(idx - 1 + ORDER.length) % ORDER.length];
  const next = ORDER[(idx + 1) % ORDER.length];

  return (
    <div className="relative bg-transparent text-foreground min-h-screen">
      {/* TOP RAIL */}
      <header className="fixed top-0 inset-x-0 z-50 border-b border-border/60 bg-background/70 backdrop-blur-xl">
        <div className="flex items-center justify-between px-6 py-3 font-mono text-xs tracking-widest uppercase">
          <div className="flex items-center gap-3">
            <span
              className="size-2 rounded-full animate-pulse"
              style={{ background: m.accent }}
            />
            <Link to="/" className="text-bone hover:text-acid">
              APIGUARD/<span style={{ color: m.accent }}>{m.tag}</span>
            </Link>
            <span className="text-bone/40 hidden md:inline">
              // mod.{m.code} · {m.title.toLowerCase()}
            </span>
          </div>
          <Link
            to="/"
            className="border border-bone/40 text-bone px-3 py-1 hover:border-acid hover:text-acid transition"
          >
            ← all.modules
          </Link>
        </div>
      </header>

      {/* HERO */}
      <section className="relative grid-bg pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 scan-lines opacity-30 pointer-events-none" />
        <div
          className="absolute top-0 left-0 right-0 h-px"
          style={{
            background: `linear-gradient(to right, transparent, ${m.accent}, transparent)`,
          }}
        />

        <div className="relative z-10 max-w-[1400px] mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-mono text-xs text-bone/50 mb-8 flex items-center gap-4 flex-wrap"
          >
            <Link to="/" className="hover:text-acid">
              ~/modules
            </Link>
            <span className="text-bone/30">/</span>
            <span style={{ color: m.accent }}>{slug}</span>
            <span className="ml-auto border border-bone/30 px-2 py-1">
              MOD.{m.code} · ONLINE
            </span>
          </motion.div>

          <div className="grid md:grid-cols-[1.6fr_1fr] gap-12 items-end">
            <div>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="flex items-center gap-6 mb-6"
              >
                <span
                  className="font-display text-7xl leading-none"
                  style={{ color: m.accent }}
                >
                  {m.glyph}
                </span>
                <div className="font-mono text-xs text-bone/50 uppercase">
                  <div>module · {m.code}</div>
                  <div className="text-bone/30">[ {m.tag} ]</div>
                </div>
              </motion.div>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                className="font-display text-[clamp(2.8rem,8vw,7rem)] leading-[0.85] tracking-tight uppercase"
              >
                {m.title.split(" ")[0]}
                <br />
                <span className="text-stroke">
                  {m.title.split(" ").slice(1).join(" ") || "·"}
                </span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.25 }}
                className="mt-8 text-bone/70 text-lg md:text-xl leading-relaxed max-w-2xl"
              >
                {m.tagline}
              </motion.p>
            </div>

            {/* CLI block */}
            <motion.div
              initial={{ opacity: 0, y: 30, rotateX: 10 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ delay: 0.3, duration: 0.7 }}
              style={{ transformPerspective: 1200 }}
              className="border border-border bg-card/40 backdrop-blur-xl p-5 font-mono text-[11px] space-y-1.5"
            >
              <div className="flex items-center justify-between text-bone/40 uppercase text-[10px] pb-2 border-b border-border mb-2">
                <span>~/apiguard · {m.tag}</span>
                <span style={{ color: m.accent }}>LIVE</span>
              </div>
              {m.cli.map((line, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + i * 0.12 }}
                  className={
                    line.startsWith("✓")
                      ? ""
                      : line.startsWith("▸")
                        ? "text-bone"
                        : "text-bone/50"
                  }
                  style={line.startsWith("✓") ? { color: m.accent } : undefined}
                >
                  {line}
                </motion.div>
              ))}
              <div style={{ color: m.accent }}>
                _<span className="cursor-blink">▌</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* METRICS STRIP */}
      <section className="border-y border-border bg-background/40 backdrop-blur-xl">
        <div className="max-w-[1400px] mx-auto grid grid-cols-2 md:grid-cols-4 divide-x divide-border">
          {m.metrics.map((x, i) => (
            <motion.div
              key={x.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="p-6 md:p-8"
            >
              <div className="font-mono text-[10px] text-bone/40 uppercase tracking-widest mb-3">
                {x.label}
              </div>
              <div
                className="font-display text-4xl md:text-5xl tracking-tight"
                style={{ color: m.accent }}
              >
                {x.value}
              </div>
              <div className="font-mono text-[10px] text-bone/40 mt-2">
                {x.sub}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* BODY + OPS */}
      <section className="max-w-[1400px] mx-auto px-6 py-24 grid md:grid-cols-[1.5fr_1fr] gap-12">
        <div>
          <div
            className="font-mono text-xs uppercase tracking-widest mb-4"
            style={{ color: m.accent }}
          >
            [ 01 ] dossier
          </div>
          <p className="font-serif italic text-2xl md:text-3xl leading-relaxed text-bone/90 max-w-2xl">
            {m.body}
          </p>
        </div>
        <div className="border border-border bg-card/40 backdrop-blur-xl p-6">
          <div className="font-mono text-[10px] text-bone/40 uppercase tracking-widest mb-4">
            ops.config
          </div>
          <div className="space-y-3 font-mono text-xs">
            {m.ops.map((o) => (
              <div
                key={o.k}
                className="grid grid-cols-[1fr_1.5fr] gap-3 border-b border-border/50 pb-2"
              >
                <span className="text-bone/50">{o.k}</span>
                <span className="text-bone">{o.v}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CAPABILITIES */}
      <section className="max-w-[1400px] mx-auto px-6 py-16">
        <div className="border-b border-border pb-6 mb-10 flex items-end justify-between flex-wrap gap-4">
          <div>
            <div
              className="font-mono text-xs uppercase tracking-widest mb-3"
              style={{ color: m.accent }}
            >
              [ 02 ] capabilities
            </div>
            <h2 className="font-display text-4xl md:text-5xl uppercase tracking-tight">
              What it actually does.
            </h2>
          </div>
          <div className="font-mono text-[10px] text-bone/40 uppercase">
            4 · primitives
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-px bg-border">
          {m.capabilities.map((c, i) => (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.1 }}
              className="bg-card/40 backdrop-blur-xl p-8 group hover:bg-bone/[0.02] transition-colors"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="font-mono text-xs text-bone/40">
                  CAP.{String(i + 1).padStart(2, "0")}
                </div>
                <span className="text-2xl" style={{ color: m.accent }}>
                  {["◇", "◈", "◆", "▣"][i]}
                </span>
              </div>
              <h3 className="font-display text-2xl uppercase tracking-tight mb-3 group-hover:text-acid transition-colors">
                {c.title}
              </h3>
              <p className="text-bone/60 leading-relaxed">{c.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* LIVE FEED */}
      <section className="max-w-[1400px] mx-auto px-6 py-24">
        <div className="border-b border-border pb-6 mb-10 flex items-end justify-between flex-wrap gap-4">
          <div>
            <div
              className="font-mono text-xs uppercase tracking-widest mb-3"
              style={{ color: m.accent }}
            >
              [ 03 ] live.stream
            </div>
            <h2 className="font-display text-4xl md:text-5xl uppercase tracking-tight">
              As it happens.
            </h2>
          </div>
          <div className="font-mono text-[10px] text-bone/40 flex items-center gap-2">
            <span
              className="size-1.5 rounded-full animate-pulse"
              style={{ background: m.accent }}
            />
            tailing · 5m window
          </div>
        </div>
        <div className="border border-border bg-card/40 backdrop-blur-xl">
          <div className="grid grid-cols-[80px_1fr] gap-4 px-6 py-3 border-b border-border font-mono text-[10px] text-bone/40 uppercase tracking-widest">
            <span>t</span>
            <span>event</span>
          </div>
          {m.feed.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className="grid grid-cols-[80px_1fr] gap-4 px-6 py-4 border-b border-border/50 font-mono text-sm hover:bg-bone/[0.02]"
            >
              <span className="text-bone/40">{f.t}</span>
              <span style={{ color: f.tone }}>{f.line}</span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA + NAV */}
      <section className="max-w-[1400px] mx-auto px-6 py-24">
        <div className="border border-border bg-card/40 backdrop-blur-xl p-10 md:p-16 text-center relative overflow-hidden">
          <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />
          <div
            className="absolute -top-32 -right-32 size-96 rounded-full pointer-events-none"
            style={{
              background: `radial-gradient(circle, ${m.accent}, transparent 70%)`,
              opacity: 0.15,
            }}
          />
          <div className="relative">
            <div
              className="font-mono text-xs uppercase tracking-widest mb-4"
              style={{ color: m.accent }}
            >
              [ engage ]
            </div>
            <h2 className="font-display text-4xl md:text-6xl uppercase tracking-tight leading-[0.9] mb-8">
              Wire{" "}
              <span
                className="italic font-serif lowercase"
                style={{ color: m.accent }}
              >
                {m.title.toLowerCase()}
              </span>
              <br />
              <span className="text-stroke">into your stack.</span>
            </h2>
            <div className="flex flex-wrap justify-center gap-4">
              <button
                className="px-8 py-4 font-mono text-sm uppercase tracking-widest text-ink transition hover:opacity-80"
                style={{ background: m.accent }}
              >
                deploy.{m.tag.split(".")[0]}()
              </button>
              <Link
                to="/"
                className="border border-bone/40 text-bone px-8 py-4 font-mono text-sm uppercase tracking-widest hover:border-acid hover:text-acid transition"
              >
                back.to.console
              </Link>
            </div>
          </div>
        </div>

        {/* prev / next */}
        <div className="mt-12 grid md:grid-cols-2 gap-px bg-border">
          <Link
            to="/module/$slug"
            params={{ slug: prev }}
            className="bg-card/40 backdrop-blur-xl p-6 group hover:bg-bone/[0.02] transition-colors"
          >
            <div className="font-mono text-[10px] text-bone/40 uppercase mb-2">
              ← prev module
            </div>
            <div className="font-display text-2xl uppercase group-hover:text-acid transition-colors">
              {MODULES[prev].title}
            </div>
          </Link>
          <Link
            to="/module/$slug"
            params={{ slug: next }}
            className="bg-card/40 backdrop-blur-xl p-6 group hover:bg-bone/[0.02] transition-colors text-right"
          >
            <div className="font-mono text-[10px] text-bone/40 uppercase mb-2">
              next module →
            </div>
            <div className="font-display text-2xl uppercase group-hover:text-acid transition-colors">
              {MODULES[next].title}
            </div>
          </Link>
        </div>
      </section>

      <footer className="border-t border-border px-6 py-8 font-mono text-xs text-bone/40 flex flex-wrap items-center justify-between gap-4 bg-background/40 backdrop-blur-xl">
        <div>
          APIGUARD // mod.{m.code} · {m.tag}
        </div>
        <div className="flex gap-6">
          <span>
            status: <span style={{ color: m.accent }}>operational</span>
          </span>
          <span>© 2026</span>
        </div>
      </footer>
    </div>
  );
}
