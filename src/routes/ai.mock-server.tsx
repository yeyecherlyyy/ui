import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef, useState } from "react";
import { useLenis } from "@/hooks/use-lenis";
import { TiltCard } from "@/components/site/TiltCard";

export const Route = createFileRoute("/ai/mock-server")({
  head: () => ({
    meta: [
      { title: "One-Click Mock Server // APIGUARD" },
      {
        name: "description",
        content:
          "Spin up a realistic fake of any API in one click. Faker-backed payloads, latency profiles, failure injection.",
      },
    ],
  }),
  component: MockServerPage,
});

const PROFILES = [
  {
    code: "RLZ",
    title: "Realistic",
    desc: "Faker-backed payloads: names, emails, ULIDs, ISO dates, locale-aware.",
    reqs: "12.4k/s",
    tone: "var(--acid)",
  },
  {
    code: "LAT",
    title: "Latency Shape",
    desc: "p50 / p95 / p99 distributions injected per route. Long-tail tunable.",
    reqs: "p95 118ms",
    tone: "var(--signal)",
  },
  {
    code: "FAI",
    title: "Failure Injection",
    desc: "5xx storms, partial writes, slow loris, connection resets — chaos on demand.",
    reqs: "0.4% / 4% / 40%",
    tone: "var(--warn)",
  },
  {
    code: "STA",
    title: "Stateful",
    desc: "POST /x then GET /x/{id} actually returns what you wrote. Resets on demand.",
    reqs: "in-memory · 50 MB",
    tone: "var(--acid)",
  },
  {
    code: "AUT",
    title: "Auth Shadow",
    desc: "Mimics OAuth2, bearer, API-key, mTLS — including the way real servers reject.",
    reqs: "401 / 403 / 419",
    tone: "var(--signal)",
  },
  {
    code: "WBH",
    title: "Webhook Replay",
    desc: "Fires outbound webhooks to your dev box on schedule or trigger.",
    reqs: "burst · drip · scheduled",
    tone: "var(--warn)",
  },
];

const REGIONS = [
  "us-east",
  "us-west",
  "eu-west",
  "eu-north",
  "ap-south",
  "sa-east",
];

const STREAM = [
  {
    t: "00:00.04",
    line: "▸ ingesting openapi.yaml · 247 routes detected",
    tone: "var(--acid)",
  },
  {
    t: "00:00.11",
    line: "▸ generating faker schemas · 1,204 fields",
    tone: "var(--bone)",
  },
  {
    t: "00:00.28",
    line: "✦ allocating in-memory store · 50 MB",
    tone: "var(--acid)",
  },
  {
    t: "00:00.41",
    line: "✦ provisioning edge worker · us-east · eu-west · ap-south",
    tone: "var(--signal)",
  },
  {
    t: "00:00.62",
    line: "✦ wiring latency profile · p95 = 118ms · jitter 22ms",
    tone: "var(--signal)",
  },
  {
    t: "00:00.78",
    line: "✦ chaos hooks armed · 0.4% 5xx · 0.1% reset",
    tone: "var(--warn)",
  },
  {
    t: "00:00.91",
    line: "✓ live @ https://m-9af3.apiguard.dev · 247 routes · stateful",
    tone: "var(--acid)",
  },
];

const PIPELINE = [
  { n: "01", k: "ingest", v: "openapi · postman · har" },
  { n: "02", k: "synth", v: "faker schemas per field" },
  { n: "03", k: "deploy", v: "edge worker · 6 regions" },
  { n: "04", k: "shape", v: "latency + failure profile" },
  { n: "05", k: "expose", v: "stable URL · auto-TLS" },
];

const ROUTES = [
  { m: "GET", p: "/v3/users", s: 200, ms: 42, tone: "var(--acid)" },
  { m: "POST", p: "/v3/users", s: 201, ms: 86, tone: "var(--acid)" },
  { m: "GET", p: "/v3/users/{id}", s: 200, ms: 51, tone: "var(--acid)" },
  { m: "PATCH", p: "/v3/users/{id}", s: 200, ms: 94, tone: "var(--signal)" },
  { m: "DELETE", p: "/v3/users/{id}", s: 204, ms: 38, tone: "var(--signal)" },
  {
    m: "POST",
    p: "/v3/checkout/express",
    s: 201,
    ms: 118,
    tone: "var(--acid)",
  },
  { m: "GET", p: "/v3/orders/{id}", s: 200, ms: 67, tone: "var(--acid)" },
  { m: "POST", p: "/v3/auth/token", s: 200, ms: 22, tone: "var(--warn)" },
  { m: "GET", p: "/v3/admin/billing", s: 403, ms: 14, tone: "var(--warn)" },
];

function MockServerPage() {
  useLenis();
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const yTitle = useTransform(scrollYProgress, [0, 1], [0, -180]);
  const opTitle = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const rotGlyph = useTransform(scrollYProgress, [0, 1], [0, 360]);
  const rotGlyph2 = useTransform(scrollYProgress, [0, 1], [360, 0]);

  const [spec, setSpec] = useState("openapi.yaml");
  const [running, setRunning] = useState(false);
  const [chaos, setChaos] = useState(0.4);

  return (
    <div className="relative bg-transparent text-foreground">
      {/* TOP RAIL */}
      <header className="fixed top-0 inset-x-0 z-50 bg-background/80 backdrop-blur-xl">
        <div className="max-w-[1400px] mx-auto flex items-center justify-between px-6 py-4 font-mono text-xs tracking-widest uppercase">
          <div className="flex items-center gap-3">
            <span className="size-2 bg-warn animate-pulse rounded-full" />
            <Link to="/" className="text-foreground font-display font-bold hover:text-acid transition-colors">
              APIGUARD / <span className="text-warn">ai.mock</span>
            </Link>
            <span className="text-muted-foreground hidden md:inline font-medium">
              // mock server v1.9 · edge-deployed · 47ms
            </span>
          </div>
          <Link
            to="/"
            className="text-muted-foreground font-display font-semibold hover:text-acid transition-colors"
          >
            ← return to OS
          </Link>
        </div>
      </header>

      {/* HERO */}
      <section
        ref={heroRef}
        className="relative min-h-[100vh] overflow-hidden pt-28 bg-background"
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-warn/10 via-background to-background pointer-events-none" />

        <motion.div
          style={{ rotate: rotGlyph }}
          className="absolute right-[-180px] top-[20%] size-[520px] border border-warn/30 rounded-full pointer-events-none"
        />
        <motion.div
          style={{ rotate: rotGlyph2 }}
          className="absolute right-[-80px] top-[28%] size-[360px] border border-acid/20 rounded-full pointer-events-none"
        />

        <motion.div
          style={{ y: yTitle, opacity: opTitle }}
          className="relative px-6 max-w-[1400px] mx-auto pt-12"
        >
          <div className="font-display font-bold text-xs text-warn uppercase tracking-[0.3em] mb-6 bg-warn/10 px-3 py-1 inline-block rounded-full">
            [ ai.module · 03/03 · one-click mock server ]
          </div>
          <h1 className="font-display font-bold text-[14vw] md:text-[10vw] leading-[0.9] uppercase tracking-tighter text-foreground">
            <span className="block">a fake api</span>
            <span className="block text-foreground/40">that lies</span>
            <span className="block text-warn">convincingly.</span>
          </h1>
          <p className="mt-10 max-w-2xl text-muted-foreground font-medium text-lg leading-relaxed">
            Throw it a spec. In under a second it stands up a stateful,
            faker-backed, latency-shaped, chaos-armed clone of your API on a
            stable HTTPS URL — so your frontend, your tests, and your demos stop
            waiting on the backend team.
          </p>

          <div className="mt-12 flex flex-wrap items-center gap-6">
            <button
              onClick={() => setRunning((r) => !r)}
              className="bg-warn text-ink px-8 py-4 font-display font-bold text-sm uppercase tracking-widest rounded-full shadow-md hover:-translate-y-1 hover:shadow-lg transition-all"
            >
              {running ? "■ tear down" : "▶ one-click deploy"}
            </button>
            <span className="font-display font-medium text-xs text-muted-foreground uppercase">
              expected · ~1s · 247 routes · 6 regions · auto-TLS
            </span>
          </div>
        </motion.div>

        {/* INTAKE */}
        <div className="relative mt-20 px-6 max-w-[1400px] mx-auto pb-24">
          <div className="bg-card rounded-3xl shadow-sm overflow-hidden">
            <div className="flex items-center justify-between border-b border-border/60 bg-secondary/50 px-6 py-4 font-display font-semibold text-[10px] uppercase tracking-widest text-muted-foreground">
              <span>~/apiguard/ai/mock-server · intake</span>
              <span className="flex gap-2">
                <span className="size-3 rounded-full bg-acid/70" />
                <span className="size-3 rounded-full bg-signal/70" />
                <span className="size-3 rounded-full bg-warn/70" />
              </span>
            </div>
            <div className="grid md:grid-cols-[1fr_auto_1fr] gap-0">
              <div className="p-8 font-mono text-xs space-y-4">
                <div className="text-muted-foreground font-semibold">// 1. point at a spec</div>
                <div className="flex items-center gap-3">
                  <span className="text-warn font-bold">▸</span>
                  <input
                    value={spec}
                    onChange={(e) => setSpec(e.target.value)}
                    className="bg-background border border-border/60 rounded-lg focus:border-warn focus:ring-4 focus:ring-warn/10 outline-none flex-1 text-foreground px-4 py-2 font-mono"
                  />
                </div>

                <div className="text-muted-foreground font-semibold pt-6">// 2. deploy regions</div>
                <div className="flex flex-wrap gap-2">
                  {REGIONS.map((r, i) => (
                    <span
                      key={r}
                      className={`border rounded-full px-4 py-1.5 cursor-pointer transition-all font-display font-semibold ${i < 3 ? "border-warn text-warn bg-warn/10" : "border-border/60 text-muted-foreground hover:border-foreground/30 hover:text-foreground bg-background"}`}
                    >
                      {r}
                    </span>
                  ))}
                </div>

                <div className="text-muted-foreground font-semibold pt-6">
                  // 3. chaos · {(chaos * 100).toFixed(1)}% 5xx
                </div>
                <input
                  type="range"
                  min={0}
                  max={40}
                  step={0.5}
                  value={chaos * 100}
                  onChange={(e) => setChaos(Number(e.target.value) / 100)}
                  className="w-full accent-warn"
                />
                <div className="flex justify-between text-[10px] text-muted-foreground font-display font-medium uppercase tracking-widest">
                  <span>calm</span>
                  <span>angry</span>
                  <span>apocalypse</span>
                </div>

                <div className="text-muted-foreground font-semibold pt-6">// 4. live URL</div>
                <div className="bg-background border border-border/60 p-4 rounded-lg text-acid font-bold">
                  https://m-9af3.apiguard.dev
                </div>
              </div>
              <div className="hidden md:block w-px bg-border/60" />
              <div className="p-8 font-mono text-xs space-y-2 bg-secondary/20 max-h-[400px] overflow-hidden">
                {STREAM.map((s, i) => (
                  <motion.div
                    key={s.t}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: running ? 1 : 0.35, x: 0 }}
                    transition={{ delay: running ? i * 0.18 : 0 }}
                    className="flex gap-4"
                  >
                    <span className="text-muted-foreground">{s.t}</span>
                    <span style={{ color: s.tone }} className="font-medium">{s.line}</span>
                  </motion.div>
                ))}
                <div className="text-warn font-bold mt-2">
                  ▸ awaiting deploy<span className="cursor-blink">_</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PIPELINE STRIP */}
      <section className="relative border-y border-border/50 bg-secondary/30 overflow-hidden">
        <div className="flex marquee-track whitespace-nowrap py-6 font-display font-bold text-xs uppercase tracking-[0.3em] text-muted-foreground">
          {[...PIPELINE, ...PIPELINE, ...PIPELINE].map((p, i) => (
            <span key={i} className="px-8 flex items-center gap-4">
              <span className="text-warn">{p.n}</span>
              <span className="text-foreground/80">{p.k}</span>
              <span>·</span>
              <span>{p.v}</span>
              <span className="text-muted-foreground/30">//</span>
            </span>
          ))}
        </div>
      </section>

      {/* PROFILES BENTO */}
      <section className="relative px-6 max-w-[1400px] mx-auto py-32">
        <div className="flex items-end justify-between mb-16 flex-wrap gap-6">
          <div>
            <div className="font-display font-bold text-xs text-warn uppercase tracking-[0.3em] mb-4">
              [ 02 · profiles ]
            </div>
            <h2 className="font-display font-bold text-5xl md:text-7xl uppercase tracking-tighter leading-[1]">
              six dials.
              <br />
              <span className="text-foreground/40">one fake stack.</span>
            </h2>
          </div>
          <div className="font-display font-medium text-sm text-muted-foreground max-w-sm">
            Every mock server is the same six dials. Twist them per route, per
            method, per consumer — and your frontend finally gets a backend that
            behaves the way production actually does.
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {PROFILES.map((p, i) => (
            <TiltCard key={p.code} className="group h-full">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: i * 0.06 }}
                className="relative bg-card rounded-3xl shadow-sm p-8 h-full overflow-hidden hover:shadow-md transition-shadow flex flex-col"
              >
                <div className="absolute -top-4 -right-4 font-display font-bold text-[10rem] leading-none text-foreground/[0.02] select-none pointer-events-none">
                  {p.code}
                </div>
                <div className="relative flex items-start justify-between mb-10">
                  <span
                    className="font-display font-bold text-xs uppercase tracking-widest px-3 py-1 rounded-full"
                    style={{ color: p.tone, backgroundColor: `color-mix(in srgb, ${p.tone} 10%, transparent)` }}
                  >
                    [ {p.code} ]
                  </span>
                  <span
                    className="size-2 rounded-full animate-pulse"
                    style={{ background: p.tone }}
                  />
                </div>
                <h3 className="relative font-display font-bold text-3xl uppercase tracking-tight mb-4 text-foreground">
                  {p.title}
                </h3>
                <p className="relative text-muted-foreground font-medium text-sm leading-relaxed mb-8 flex-1">
                  {p.desc}
                </p>
                <div className="relative flex items-baseline justify-between border-t border-border/60 pt-6 font-display font-medium text-xs">
                  <span className="text-muted-foreground uppercase tracking-widest">profile</span>
                  <span
                    style={{ color: p.tone }}
                    className="font-display font-bold text-lg"
                  >
                    {p.reqs}
                  </span>
                </div>
              </motion.div>
            </TiltCard>
          ))}
        </div>
      </section>

      {/* ROUTE TABLE */}
      <section className="relative px-6 max-w-[1400px] mx-auto pb-32">
        <div className="font-display font-bold text-xs text-warn uppercase tracking-[0.3em] mb-4">
          [ 03 · live.routes ]
        </div>
        <h2 className="font-display font-bold text-5xl md:text-6xl uppercase tracking-tighter leading-[1] mb-12 text-foreground">
          247 routes. all answering.
        </h2>

        <div className="bg-card rounded-3xl shadow-sm overflow-hidden border border-border/40">
          <div className="grid grid-cols-[100px_1fr_100px_120px] font-display font-semibold text-[10px] uppercase tracking-widest text-muted-foreground border-b border-border/60 bg-secondary/50">
            <div className="p-4 md:p-6">method</div>
            <div className="p-4 md:p-6">path</div>
            <div className="p-4 md:p-6">status</div>
            <div className="p-4 md:p-6 text-right">latency</div>
          </div>
          {ROUTES.map((r, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04 }}
              className="grid grid-cols-[100px_1fr_100px_120px] font-mono text-sm border-b border-border/40 last:border-0 hover:bg-secondary/30 transition-colors"
            >
              <div className="p-4 md:p-6 font-bold" style={{ color: r.tone }}>
                {r.m}
              </div>
              <div className="p-4 md:p-6 text-foreground font-medium">{r.p}</div>
              <div className="p-4 md:p-6 text-acid font-bold">{r.s}</div>
              <div className="p-4 md:p-6 text-right text-muted-foreground">{r.ms}ms</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CURL DEMO */}
      <section className="relative px-6 max-w-[1400px] mx-auto pb-32">
        <div className="grid md:grid-cols-[1fr_1.4fr] gap-0 bg-card rounded-[3rem] shadow-lg overflow-hidden border border-border/40">
          <div className="p-10 md:p-16 border-b md:border-b-0 md:border-r border-border/60 bg-secondary/20">
            <div className="font-display font-bold text-xs text-warn uppercase tracking-[0.3em] mb-6">
              [ 04 · hit it ]
            </div>
            <h3 className="font-display font-bold text-4xl md:text-5xl uppercase tracking-tighter leading-[1] mb-6">
              curl it now.
              <br />
              it answers.
            </h3>
            <p className="text-muted-foreground font-medium leading-relaxed mb-10">
              The mock URL is stable. Bake it into your CI, your Storybook, your
              demo deck. Tear it down with one click — or leave it running for a
              week. Costs nothing when idle.
            </p>
            <div className="space-y-3 font-mono text-xs font-medium">
              {[
                { k: "url", v: "https://m-9af3.apiguard.dev" },
                { k: "tls", v: "auto · LE · pinned" },
                { k: "cors", v: "* · per-origin override" },
                { k: "cost", v: "$0 idle · $0.40 / 1M req" },
              ].map((x) => (
                <div
                  key={x.k}
                  className="flex justify-between border-b border-border/40 py-3 last:border-0"
                >
                  <span className="text-muted-foreground uppercase">{x.k}</span>
                  <span className="text-acid font-bold">{x.v}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-background font-mono text-xs overflow-hidden flex flex-col">
            <div className="flex border-b border-border/60 bg-secondary/30">
              {["request.sh", "response.json", "headers.txt"].map((f, i) => (
                <div
                  key={f}
                  className={`px-6 py-4 border-r border-border/60 font-medium ${i === 0 ? "bg-background text-warn border-b-transparent -mb-px" : "text-muted-foreground hover:bg-secondary/50 transition-colors cursor-pointer"}`}
                >
                  {f}
                </div>
              ))}
            </div>
            <pre className="p-8 md:p-10 leading-relaxed text-foreground overflow-x-auto flex-1">
              {`$ curl https://m-9af3.apiguard.dev/v3/users/usr_8f3a

{
  "id": "usr_8f3a",
  "email": "marcella.rojas@plumbline.io",
  "name": "Marcella Rojas",
  "created_at": "2024-11-02T14:21:09Z",
  "plan": "growth",
  "balance_cents": 18420,
  "addresses": [
    { "label": "home", "city": "Lisbon", "country": "PT" }
  ]
}

# `}
              <span className="text-warn font-bold">
                // faker-backed · stateful · 51ms · region eu-west
              </span>
            </pre>
          </div>
        </div>
      </section>

      {/* FOOTER NAV */}
      <section className="border-t border-border/60 bg-background">
        <div className="max-w-[1400px] mx-auto px-6 py-16 grid md:grid-cols-3 gap-12">
          <div className="text-left">
            <div className="font-display font-bold text-xs text-muted-foreground uppercase tracking-widest mb-3">
              Previous Module
            </div>
            <Link
              to="/ai/test-synth"
              className="font-display font-bold text-2xl uppercase hover:text-signal transition-colors text-foreground"
            >
              ← AI.Tests · Synthesizer
            </Link>
          </div>
          <div className="text-left md:text-center">
            <div className="font-display font-bold text-xs text-muted-foreground uppercase tracking-widest mb-3">
              Return
            </div>
            <Link
              to="/"
              className="font-display font-bold text-2xl uppercase hover:text-acid transition-colors text-foreground"
            >
              // apiguard.os
            </Link>
          </div>
          <div className="text-left md:text-right">
            <div className="font-display font-bold text-xs text-muted-foreground uppercase tracking-widest mb-3">
              Also
            </div>
            <Link
              to="/ai/docs-gen"
              className="font-display font-bold text-2xl uppercase hover:text-acid transition-colors text-foreground"
            >
              AI.Docs · Generator →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
