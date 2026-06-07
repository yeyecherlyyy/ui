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

const REGIONS = ["us-east", "us-west", "eu-west", "eu-north", "ap-south", "sa-east"];

const STREAM = [
  { t: "00:00.04", line: "▸ ingesting openapi.yaml · 247 routes detected", tone: "var(--acid)" },
  { t: "00:00.11", line: "▸ generating faker schemas · 1,204 fields", tone: "var(--bone)" },
  { t: "00:00.28", line: "✦ allocating in-memory store · 50 MB", tone: "var(--acid)" },
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
  { t: "00:00.78", line: "✦ chaos hooks armed · 0.4% 5xx · 0.1% reset", tone: "var(--warn)" },
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
  { m: "POST", p: "/v3/checkout/express", s: 201, ms: 118, tone: "var(--acid)" },
  { m: "GET", p: "/v3/orders/{id}", s: 200, ms: 67, tone: "var(--acid)" },
  { m: "POST", p: "/v3/auth/token", s: 200, ms: 22, tone: "var(--warn)" },
  { m: "GET", p: "/v3/admin/billing", s: 403, ms: 14, tone: "var(--warn)" },
];

function MockServerPage() {
  useLenis();
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
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
      <header className="fixed top-0 inset-x-0 z-50 border-b border-border/60 bg-background/70 backdrop-blur-xl">
        <div className="flex items-center justify-between px-6 py-3 font-mono text-xs tracking-widest uppercase">
          <div className="flex items-center gap-3">
            <span className="size-2 bg-warn animate-pulse rounded-full" />
            <Link to="/" className="text-bone hover:text-acid">
              APIGUARD/<span className="text-warn">ai.mock</span>
            </Link>
            <span className="text-bone/40 hidden md:inline">
              // mock server v1.9 · edge-deployed · 47ms
            </span>
          </div>
          <Link
            to="/"
            className="border border-bone/30 text-bone/70 px-3 py-1 hover:border-acid hover:text-acid transition"
          >
            ← return to OS
          </Link>
        </div>
      </header>

      {/* HERO */}
      <section ref={heroRef} className="relative min-h-[110vh] grid-bg overflow-hidden pt-28">
        <div className="absolute inset-0 scan-lines opacity-30 pointer-events-none" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-warn to-transparent" />

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
          <div className="font-mono text-xs text-warn uppercase tracking-[0.3em] mb-6">
            [ ai.module · 03/03 · one-click mock server ]
          </div>
          <h1 className="font-display text-[14vw] md:text-[10vw] leading-[0.82] uppercase tracking-tighter">
            <span className="block">a fake api</span>
            <span className="block text-stroke">that lies</span>
            <span className="block text-warn">convincingly.</span>
          </h1>
          <p className="mt-10 max-w-2xl text-bone/60 text-lg leading-relaxed">
            Throw it a spec. In under a second it stands up a stateful, faker-backed,
            latency-shaped, chaos-armed clone of your API on a stable HTTPS URL — so your frontend,
            your tests, and your demos stop waiting on the backend team.
          </p>

          <div className="mt-12 flex flex-wrap items-center gap-4">
            <button
              onClick={() => setRunning((r) => !r)}
              className="group relative border border-warn text-warn px-6 py-3 font-mono text-xs uppercase tracking-[0.25em] hover:bg-warn hover:text-ink transition"
            >
              {running ? "■ tear down" : "▶ one-click deploy"}
              <span className="absolute -inset-px border border-warn/30 translate-x-1 translate-y-1 -z-10 group-hover:translate-x-2 group-hover:translate-y-2 transition" />
            </button>
            <span className="font-mono text-xs text-bone/40">
              expected · ~1s · 247 routes · 6 regions · auto-TLS
            </span>
          </div>
        </motion.div>

        {/* INTAKE */}
        <div className="relative mt-20 px-6 max-w-[1400px] mx-auto pb-24">
          <div className="border border-border bg-card/40 backdrop-blur-xl">
            <div className="flex items-center justify-between border-b border-border px-4 py-2 font-mono text-[10px] uppercase tracking-widest text-bone/50">
              <span>~/apiguard/ai/mock-server · intake</span>
              <span className="flex gap-1">
                <span className="size-2 rounded-full bg-acid/60" />
                <span className="size-2 rounded-full bg-signal/60" />
                <span className="size-2 rounded-full bg-warn/60" />
              </span>
            </div>
            <div className="grid md:grid-cols-[1fr_auto_1fr] gap-0">
              <div className="p-6 font-mono text-xs space-y-3">
                <div className="text-bone/40">// 1. point at a spec</div>
                <div className="flex items-center gap-2">
                  <span className="text-warn">▸</span>
                  <input
                    value={spec}
                    onChange={(e) => setSpec(e.target.value)}
                    className="bg-transparent border-b border-bone/20 focus:border-warn outline-none flex-1 text-bone py-1"
                  />
                </div>

                <div className="text-bone/40 pt-4">// 2. deploy regions</div>
                <div className="flex flex-wrap gap-2">
                  {REGIONS.map((r, i) => (
                    <span
                      key={r}
                      className={`border px-2 py-1 cursor-pointer transition ${i < 3 ? "border-warn text-warn" : "border-bone/20 text-bone/40 hover:border-bone/60 hover:text-bone/70"}`}
                    >
                      {r}
                    </span>
                  ))}
                </div>

                <div className="text-bone/40 pt-4">
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
                <div className="flex justify-between text-[10px] text-bone/40">
                  <span>calm</span>
                  <span>angry</span>
                  <span>apocalypse</span>
                </div>

                <div className="text-bone/40 pt-4">// 4. live URL</div>
                <div className="border border-border bg-background/40 p-2 text-acid">
                  https://m-9af3.apiguard.dev
                </div>
              </div>
              <div className="hidden md:block w-px bg-border" />
              <div className="p-6 font-mono text-xs space-y-1 bg-background/40 max-h-[360px] overflow-hidden">
                {STREAM.map((s, i) => (
                  <motion.div
                    key={s.t}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: running ? 1 : 0.35, x: 0 }}
                    transition={{ delay: running ? i * 0.18 : 0 }}
                    className="flex gap-3"
                  >
                    <span className="text-bone/30">{s.t}</span>
                    <span style={{ color: s.tone }}>{s.line}</span>
                  </motion.div>
                ))}
                <div className="text-warn">
                  ▸ awaiting deploy<span className="cursor-blink">_</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PIPELINE STRIP */}
      <section className="relative border-y border-border bg-card/30 backdrop-blur-xl overflow-hidden">
        <div className="flex marquee-track whitespace-nowrap py-4 font-mono text-xs uppercase tracking-[0.3em] text-bone/40">
          {[...PIPELINE, ...PIPELINE, ...PIPELINE].map((p, i) => (
            <span key={i} className="px-8 flex items-center gap-3">
              <span className="text-warn">{p.n}</span>
              <span className="text-bone/80">{p.k}</span>
              <span>·</span>
              <span>{p.v}</span>
              <span className="text-bone/20">//</span>
            </span>
          ))}
        </div>
      </section>

      {/* PROFILES BENTO */}
      <section className="relative px-6 max-w-[1400px] mx-auto py-32">
        <div className="flex items-end justify-between mb-12 flex-wrap gap-4">
          <div>
            <div className="font-mono text-xs text-warn uppercase tracking-[0.3em] mb-3">
              [ 02 · profiles ]
            </div>
            <h2 className="font-display text-5xl md:text-7xl uppercase tracking-tighter leading-[0.9]">
              six dials.
              <br />
              <span className="text-stroke">one fake stack.</span>
            </h2>
          </div>
          <div className="font-mono text-xs text-bone/40 max-w-sm">
            Every mock server is the same six dials. Twist them per route, per method, per consumer
            — and your frontend finally gets a backend that behaves the way production actually
            does.
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          {PROFILES.map((p, i) => (
            <TiltCard key={p.code} className="group">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: i * 0.06 }}
                className="relative border border-border bg-card/40 backdrop-blur-xl p-6 h-full overflow-hidden"
              >
                <div className="absolute top-0 right-0 font-mono text-[10rem] leading-none text-bone/[0.03] select-none">
                  {p.code}
                </div>
                <div className="relative flex items-start justify-between mb-8">
                  <span
                    className="font-mono text-xs uppercase tracking-widest"
                    style={{ color: p.tone }}
                  >
                    [ {p.code} ]
                  </span>
                  <span
                    className="size-2 rounded-full animate-pulse"
                    style={{ background: p.tone }}
                  />
                </div>
                <h3 className="relative font-display text-3xl uppercase tracking-tight mb-3">
                  {p.title}
                </h3>
                <p className="relative text-bone/60 text-sm leading-relaxed mb-6">{p.desc}</p>
                <div className="relative flex items-baseline justify-between border-t border-border pt-4 font-mono text-xs">
                  <span className="text-bone/40">profile</span>
                  <span style={{ color: p.tone }} className="font-display text-lg">
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
        <div className="font-mono text-xs text-warn uppercase tracking-[0.3em] mb-3">
          [ 03 · live.routes ]
        </div>
        <h2 className="font-display text-5xl md:text-6xl uppercase tracking-tighter leading-[0.9] mb-10">
          247 routes. all answering.
        </h2>

        <div className="border border-border bg-card/40 backdrop-blur-xl">
          <div className="grid grid-cols-[100px_1fr_100px_120px] font-mono text-[10px] uppercase tracking-widest text-bone/40 border-b border-border">
            <div className="p-3">method</div>
            <div className="p-3">path</div>
            <div className="p-3">status</div>
            <div className="p-3 text-right">latency</div>
          </div>
          {ROUTES.map((r, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04 }}
              className="grid grid-cols-[100px_1fr_100px_120px] font-mono text-xs border-b border-border/60 hover:bg-background/40 transition"
            >
              <div className="p-3" style={{ color: r.tone }}>
                {r.m}
              </div>
              <div className="p-3 text-bone/80">{r.p}</div>
              <div className="p-3 text-acid">{r.s}</div>
              <div className="p-3 text-right text-bone/60">{r.ms}ms</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CURL DEMO */}
      <section className="relative px-6 max-w-[1400px] mx-auto pb-32">
        <div className="grid md:grid-cols-[1fr_1.4fr] gap-0 border border-border bg-card/40 backdrop-blur-xl">
          <div className="p-10 border-r border-border">
            <div className="font-mono text-xs text-warn uppercase tracking-[0.3em] mb-4">
              [ 04 · hit it ]
            </div>
            <h3 className="font-display text-4xl md:text-5xl uppercase tracking-tighter leading-[0.9] mb-6">
              curl it now.
              <br />
              it answers.
            </h3>
            <p className="text-bone/60 leading-relaxed mb-8">
              The mock URL is stable. Bake it into your CI, your Storybook, your demo deck. Tear it
              down with one click — or leave it running for a week. Costs nothing when idle.
            </p>
            <div className="space-y-2 font-mono text-xs">
              {[
                { k: "url", v: "https://m-9af3.apiguard.dev" },
                { k: "tls", v: "auto · LE · pinned" },
                { k: "cors", v: "* · per-origin override" },
                { k: "cost", v: "$0 idle · $0.40 / 1M req" },
              ].map((x) => (
                <div key={x.k} className="flex justify-between border-b border-border/60 py-2">
                  <span className="text-bone/50">{x.k}</span>
                  <span className="text-acid">{x.v}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-background/60 font-mono text-xs overflow-hidden">
            <div className="flex border-b border-border">
              {["request.sh", "response.json", "headers.txt"].map((f, i) => (
                <div
                  key={f}
                  className={`px-4 py-3 border-r border-border ${i === 0 ? "bg-card text-warn" : "text-bone/40"}`}
                >
                  {f}
                </div>
              ))}
            </div>
            <pre className="p-6 leading-relaxed text-bone/70 overflow-x-auto">
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
              <span className="text-warn">// faker-backed · stateful · 51ms · region eu-west</span>
            </pre>
          </div>
        </div>
      </section>

      {/* FOOTER NAV */}
      <section className="border-t border-border bg-card/30 backdrop-blur-xl">
        <div className="max-w-[1400px] mx-auto px-6 py-16 grid md:grid-cols-3 gap-8">
          <div>
            <div className="font-mono text-xs text-bone/40 uppercase tracking-widest mb-2">
              previous module
            </div>
            <Link
              to="/ai/test-synth"
              className="font-display text-2xl uppercase hover:text-signal transition"
            >
              ← AI.Tests · synthesizer
            </Link>
          </div>
          <div className="text-center">
            <div className="font-mono text-xs text-bone/40 uppercase tracking-widest mb-2">
              return
            </div>
            <Link to="/" className="font-display text-2xl uppercase hover:text-acid transition">
              // apiguard.os
            </Link>
          </div>
          <div className="text-right">
            <div className="font-mono text-xs text-bone/40 uppercase tracking-widest mb-2">
              also
            </div>
            <Link
              to="/ai/docs-gen"
              className="font-display text-2xl uppercase hover:text-acid transition"
            >
              AI.Docs · generator →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
