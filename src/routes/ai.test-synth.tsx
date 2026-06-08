import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef, useState } from "react";
import { useLenis } from "@/hooks/use-lenis";
import { TiltCard } from "@/components/site/TiltCard";

export const Route = createFileRoute("/ai/test-synth")({
  head: () => ({
    meta: [
      { title: "Test Case Synthesizer // APIGUARD" },
      {
        name: "description",
        content:
          "Generate negative, fuzz, boundary and auth-bypass test cases from any OpenAPI spec. Export to Jest, Pytest, k6.",
      },
    ],
  }),
  component: TestSynthPage,
});

const CASE_CLASSES = [
  {
    code: "NEG",
    title: "Negative",
    desc: "Reject malformed payloads, wrong types, missing required fields.",
    count: 412,
    tone: "var(--acid)",
  },
  {
    code: "FZZ",
    title: "Fuzz",
    desc: "Mutational + grammar-based payloads against every field.",
    count: 9_318,
    tone: "var(--signal)",
  },
  {
    code: "BND",
    title: "Boundary",
    desc: "Off-by-one, integer overflow, string length walls, unicode edges.",
    count: 1_204,
    tone: "var(--warn)",
  },
  {
    code: "AUT",
    title: "Auth-Bypass",
    desc: "BOLA, BFLA, IDOR, JWT-none, scope confusion, role escalation.",
    count: 287,
    tone: "var(--signal)",
  },
  {
    code: "RCE",
    title: "Injection",
    desc: "SQLi, NoSQLi, SSRF, template, command, header smuggling.",
    count: 642,
    tone: "var(--warn)",
  },
  {
    code: "RAT",
    title: "Rate / Quota",
    desc: "Burst, drip, distributed, refill timing, quota leak.",
    count: 96,
    tone: "var(--acid)",
  },
];

const EXPORTS = [
  "jest",
  "pytest",
  "k6",
  "vitest",
  "postman",
  "rest-client",
  "bruno",
  "tavern",
];

const STREAM = [
  {
    t: "00:00.12",
    line: "▸ parsed openapi.yaml · 247 endpoints",
    tone: "var(--acid)",
  },
  {
    t: "00:00.41",
    line: "▸ inferring auth model · oauth2 + bearer · 4 scopes",
    tone: "var(--bone)",
  },
  {
    t: "00:01.07",
    line: "✦ synthesizing NEG class · 412 cases",
    tone: "var(--acid)",
  },
  {
    t: "00:02.55",
    line: "✦ synthesizing FZZ class · 9,318 cases (mutational)",
    tone: "var(--signal)",
  },
  {
    t: "00:04.21",
    line: "⚠ POST /v3/checkout · missing rate-limit · auth-bypass risk",
    tone: "var(--warn)",
  },
  {
    t: "00:05.93",
    line: "✦ synthesizing AUT class · BOLA on GET /users/{id}/orders",
    tone: "var(--signal)",
  },
  {
    t: "00:07.10",
    line: "✓ exported jest+pytest+k6 · 11,959 cases · 2.1 MB",
    tone: "var(--acid)",
  },
];

const PIPELINE = [
  { n: "01", k: "ingest", v: "OpenAPI · Postman · HAR" },
  { n: "02", k: "model", v: "infer schemas, auth, deps" },
  { n: "03", k: "synth", v: "6 case classes in parallel" },
  { n: "04", k: "rank", v: "risk × coverage × novelty" },
  { n: "05", k: "emit", v: "framework-native code" },
];

function TestSynthPage() {
  useLenis();
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const yTitle = useTransform(scrollYProgress, [0, 1], [0, -180]);
  const opTitle = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const rotGlyph = useTransform(scrollYProgress, [0, 1], [0, 360]);

  const [spec, setSpec] = useState("openapi.yaml");
  const [running, setRunning] = useState(false);

  return (
    <div className="relative bg-transparent text-foreground">
      {/* TOP RAIL */}
      <header className="fixed top-0 inset-x-0 z-50 bg-background/80 backdrop-blur-xl">
        <div className="max-w-[1400px] mx-auto flex items-center justify-between px-6 py-4 font-mono text-xs tracking-widest uppercase">
          <div className="flex items-center gap-3">
            <span className="size-2 bg-signal animate-pulse rounded-full" />
            <Link to="/" className="text-foreground font-display font-bold hover:text-acid transition-colors">
              APIGUARD / <span className="text-signal">ai.tests</span>
            </Link>
            <span className="text-muted-foreground hidden md:inline font-medium">
              // synthesizer v2.7 · gpt-augmented · 47ms
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
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-signal/10 via-background to-background pointer-events-none" />

        <motion.div
          style={{ rotate: rotGlyph }}
          className="absolute right-[-180px] top-[20%] size-[520px] border border-signal/30 rounded-full pointer-events-none"
        />
        <motion.div
          style={{ rotate: useTransform(scrollYProgress, [0, 1], [360, 0]) }}
          className="absolute right-[-80px] top-[28%] size-[360px] border border-acid/20 rounded-full pointer-events-none"
        />

        <motion.div
          style={{ y: yTitle, opacity: opTitle }}
          className="relative px-6 max-w-[1400px] mx-auto pt-12"
        >
          <div className="font-display font-bold text-xs text-signal uppercase tracking-[0.3em] mb-6 bg-signal/10 px-3 py-1 inline-block rounded-full">
            [ ai.module · 02/03 · test case synthesizer ]
          </div>
          <h1 className="font-display font-bold text-[14vw] md:text-[10vw] leading-[0.9] uppercase tracking-tighter text-foreground">
            <span className="block">test cases</span>
            <span className="block text-foreground/40">that nobody</span>
            <span className="block text-signal">would have written.</span>
          </h1>
          <p className="mt-10 max-w-2xl text-muted-foreground font-medium text-lg leading-relaxed">
            Feed it a spec. It hallucinates the request payloads your QA team
            forgot to imagine — boundary edges, malformed unicode,
            scope-confused JWTs, BOLA chains, refill-timing races — and ships
            them as runnable Jest, Pytest or k6 files.
          </p>

          <div className="mt-12 flex flex-wrap items-center gap-6">
            <button
              onClick={() => setRunning((r) => !r)}
              className="bg-signal text-ink px-8 py-4 font-display font-bold text-sm uppercase tracking-widest rounded-full shadow-md hover:-translate-y-1 hover:shadow-lg transition-all"
            >
              {running ? "■ abort synthesis" : "▶ run synthesis"}
            </button>
            <span className="font-display font-medium text-xs text-muted-foreground uppercase">
              expected · ~7s · ~11,959 cases · 2.1 MB
            </span>
          </div>
        </motion.div>

        {/* SPEC INTAKE */}
        <div className="relative mt-20 px-6 max-w-[1400px] mx-auto pb-24">
          <div className="bg-card rounded-3xl shadow-sm overflow-hidden">
            <div className="flex items-center justify-between border-b border-border/60 bg-secondary/50 px-6 py-4 font-display font-semibold text-[10px] uppercase tracking-widest text-muted-foreground">
              <span>~/apiguard/ai/test-synth · intake</span>
              <span className="flex gap-2">
                <span className="size-3 rounded-full bg-warn/70" />
                <span className="size-3 rounded-full bg-acid/70" />
                <span className="size-3 rounded-full bg-signal/70" />
              </span>
            </div>
            <div className="grid md:grid-cols-[1fr_auto_1fr] gap-0">
              <div className="p-8 font-mono text-xs space-y-4">
                <div className="text-muted-foreground font-semibold">// 1. point at a spec</div>
                <div className="flex items-center gap-3">
                  <span className="text-signal font-bold">▸</span>
                  <input
                    value={spec}
                    onChange={(e) => setSpec(e.target.value)}
                    className="bg-background border border-border/60 rounded-lg focus:border-signal focus:ring-4 focus:ring-signal/10 outline-none flex-1 text-foreground px-4 py-2 font-mono"
                  />
                </div>
                <div className="text-muted-foreground font-semibold pt-6">// 2. pick exports</div>
                <div className="flex flex-wrap gap-2">
                  {EXPORTS.map((x, i) => (
                    <span
                      key={x}
                      className={`border rounded-full px-4 py-1.5 cursor-pointer transition-all font-display font-semibold ${i < 3 ? "border-signal text-signal bg-signal/10" : "border-border/60 text-muted-foreground hover:border-foreground/30 hover:text-foreground bg-background"}`}
                    >
                      {x}
                    </span>
                  ))}
                </div>
              </div>
              <div className="hidden md:block w-px bg-border/60" />
              <div className="p-8 font-mono text-xs space-y-2 bg-secondary/20 max-h-[280px] overflow-hidden">
                {STREAM.map((s, i) => (
                  <motion.div
                    key={s.t}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: running ? 1 : 0.35, x: 0 }}
                    transition={{ delay: running ? i * 0.4 : 0 }}
                    className="flex gap-4"
                  >
                    <span className="text-muted-foreground">{s.t}</span>
                    <span style={{ color: s.tone }} className="font-medium">{s.line}</span>
                  </motion.div>
                ))}
                <div className="text-acid font-bold mt-2">
                  ▸ ready<span className="cursor-blink">_</span>
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
              <span className="text-signal">{p.n}</span>
              <span className="text-foreground/80">{p.k}</span>
              <span>·</span>
              <span>{p.v}</span>
              <span className="text-muted-foreground/30">//</span>
            </span>
          ))}
        </div>
      </section>

      {/* CASE CLASSES BENTO */}
      <section className="relative px-6 max-w-[1400px] mx-auto py-32">
        <div className="flex items-end justify-between mb-16 flex-wrap gap-6">
          <div>
            <div className="font-display font-bold text-xs text-signal uppercase tracking-[0.3em] mb-4">
              [ 02 · case.classes ]
            </div>
            <h2 className="font-display font-bold text-5xl md:text-7xl uppercase tracking-tighter leading-[1]">
              six classes.
              <br />
              <span className="text-foreground/40">one synth pass.</span>
            </h2>
          </div>
          <div className="font-display font-medium text-sm text-muted-foreground max-w-sm">
            Every endpoint is exploded across six adversarial dimensions in
            parallel. You ship the ones with the highest risk × novelty score.
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {CASE_CLASSES.map((c, i) => (
            <TiltCard key={c.code} className="group h-full">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: i * 0.06 }}
                className="relative bg-card rounded-3xl shadow-sm p-8 h-full overflow-hidden hover:shadow-md transition-shadow flex flex-col"
              >
                <div className="absolute -top-4 -right-4 font-display font-bold text-[10rem] leading-none text-foreground/[0.02] select-none pointer-events-none">
                  {c.code}
                </div>
                <div className="relative flex items-start justify-between mb-10">
                  <span
                    className="font-display font-bold text-xs uppercase tracking-widest px-3 py-1 rounded-full"
                    style={{ color: c.tone, backgroundColor: `color-mix(in srgb, ${c.tone} 10%, transparent)` }}
                  >
                    [ {c.code} ]
                  </span>
                  <span
                    className="size-2 rounded-full animate-pulse"
                    style={{ background: c.tone }}
                  />
                </div>
                <h3 className="relative font-display font-bold text-3xl uppercase tracking-tight mb-4 text-foreground">
                  {c.title}
                </h3>
                <p className="relative text-muted-foreground font-medium text-sm leading-relaxed mb-8 flex-1">
                  {c.desc}
                </p>
                <div className="relative flex items-baseline justify-between border-t border-border/60 pt-6 font-display font-medium text-xs">
                  <span className="text-muted-foreground uppercase tracking-widest">cases generated</span>
                  <span
                    style={{ color: c.tone }}
                    className="text-3xl font-display font-bold"
                  >
                    {c.count.toLocaleString()}
                  </span>
                </div>
              </motion.div>
            </TiltCard>
          ))}
        </div>
      </section>

      {/* CODE PREVIEW */}
      <section className="relative px-6 max-w-[1400px] mx-auto pb-32">
        <div className="grid md:grid-cols-[1fr_1.4fr] gap-0 bg-card rounded-[3rem] shadow-lg overflow-hidden border border-border/40">
          <div className="p-10 md:p-16 border-b md:border-b-0 md:border-r border-border/60 bg-secondary/20">
            <div className="font-display font-bold text-xs text-signal uppercase tracking-[0.3em] mb-6">
              [ 03 · emit ]
            </div>
            <h3 className="font-display font-bold text-4xl md:text-5xl uppercase tracking-tighter leading-[1] mb-6">
              framework-native. no glue.
            </h3>
            <p className="text-muted-foreground font-medium leading-relaxed mb-10">
              The synthesizer doesn't dump JSON for you to wrap. It writes the
              actual test file in your framework's idiom — fixtures, hooks,
              parametrize blocks, the works.
            </p>
            <div className="space-y-3 font-mono text-xs font-medium">
              {[
                { k: "jest", v: "describe.each + supertest" },
                { k: "pytest", v: "parametrize + httpx" },
                { k: "k6", v: "scenarios + thresholds" },
                { k: "postman", v: "v2.1 collection + env" },
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
              {[
                "auth_bypass.test.ts",
                "fuzz_checkout.py",
                "load_burst.k6.js",
              ].map((f, i) => (
                <div
                  key={f}
                  className={`px-6 py-4 border-r border-border/60 font-medium ${i === 0 ? "bg-background text-acid border-b-transparent -mb-px" : "text-muted-foreground hover:bg-secondary/50 transition-colors cursor-pointer"}`}
                >
                  {f}
                </div>
              ))}
            </div>
            <pre className="p-8 md:p-10 leading-relaxed text-foreground overflow-x-auto flex-1">
              {`import request from "supertest";
import { app, asUser } from "../helpers";

describe.each([
  { role: "guest",  expect: 401 },
  { role: "user",   expect: 403 },  // BOLA: other user's order
  { role: "admin",  expect: 200 },
])("GET /v3/orders/:id · scope=$role", ({ role, expect: code }) => {
  test("returns " + code, async () => {
    const tok = await asUser(role);
    const res = await request(app)
      .get("/v3/orders/8f3a-not-mine")
      .set("Authorization", \`Bearer \${tok}\`);
    expect(res.status).toBe(code);
  });
});

// `}
              <span className="text-signal font-bold">
                // synthesized · risk 0.91 · novelty 0.77
              </span>
            </pre>
          </div>
        </div>
      </section>

      {/* RISK MATRIX */}
      <section className="relative px-6 max-w-[1400px] mx-auto pb-32">
        <div className="font-display font-bold text-xs text-signal uppercase tracking-[0.3em] mb-4">
          [ 04 · risk.matrix ]
        </div>
        <h2 className="font-display font-bold text-5xl md:text-6xl uppercase tracking-tighter leading-[1] mb-12 text-foreground">
          what broke first.
        </h2>

        <div className="bg-card rounded-3xl shadow-sm overflow-hidden border border-border/40">
          <div className="grid grid-cols-[80px_1fr_120px_120px_100px] font-display font-semibold text-[10px] uppercase tracking-widest text-muted-foreground border-b border-border/60 bg-secondary/50">
            <div className="p-4 md:p-6">class</div>
            <div className="p-4 md:p-6">endpoint</div>
            <div className="p-4 md:p-6">risk</div>
            <div className="p-4 md:p-6">novelty</div>
            <div className="p-4 md:p-6 text-right">status</div>
          </div>
          {[
            {
              c: "AUT",
              e: "GET /v3/orders/{id}",
              r: 0.91,
              n: 0.77,
              s: "FAIL",
              tone: "var(--signal)",
            },
            {
              c: "FZZ",
              e: "POST /v3/checkout/express",
              r: 0.84,
              n: 0.92,
              s: "FAIL",
              tone: "var(--signal)",
            },
            {
              c: "BND",
              e: "PATCH /users/{id}/quota",
              r: 0.71,
              n: 0.34,
              s: "PASS",
              tone: "var(--acid)",
            },
            {
              c: "RCE",
              e: "POST /admin/sql/export",
              r: 0.96,
              n: 0.41,
              s: "FAIL",
              tone: "var(--signal)",
            },
            {
              c: "NEG",
              e: "PUT /catalog/{sku}",
              r: 0.52,
              n: 0.18,
              s: "PASS",
              tone: "var(--acid)",
            },
            {
              c: "RAT",
              e: "POST /auth/refresh",
              r: 0.68,
              n: 0.81,
              s: "FLAKY",
              tone: "var(--warn)",
            },
          ].map((row, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="grid grid-cols-[80px_1fr_120px_120px_100px] font-mono text-sm border-b border-border/40 last:border-0 hover:bg-secondary/30 transition-colors"
            >
              <div className="p-4 md:p-6 text-signal font-bold">{row.c}</div>
              <div className="p-4 md:p-6 text-foreground font-medium">{row.e}</div>
              <div className="p-4 md:p-6">
                <div className="h-2 bg-secondary rounded-full overflow-hidden relative">
                  <div
                    className="absolute inset-y-0 left-0 bg-signal rounded-full"
                    style={{ width: `${row.r * 100}%` }}
                  />
                </div>
                <div className="text-muted-foreground mt-2 text-[10px]">{row.r}</div>
              </div>
              <div className="p-4 md:p-6">
                <div className="h-2 bg-secondary rounded-full overflow-hidden relative">
                  <div
                    className="absolute inset-y-0 left-0 bg-acid rounded-full"
                    style={{ width: `${row.n * 100}%` }}
                  />
                </div>
                <div className="text-muted-foreground mt-2 text-[10px]">{row.n}</div>
              </div>
              <div className="p-4 md:p-6 text-right font-bold" style={{ color: row.tone }}>
                {row.s}
              </div>
            </motion.div>
          ))}
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
              to="/ai/docs-gen"
              className="font-display font-bold text-2xl uppercase hover:text-acid transition-colors text-foreground"
            >
              ← AI.Docs · Generator
            </Link>
          </div>
          <div className="text-left md:text-center">
            <div className="font-display font-bold text-xs text-muted-foreground uppercase tracking-widest mb-3">
              Return
            </div>
            <Link
              to="/"
              className="font-display font-bold text-2xl uppercase hover:text-signal transition-colors text-foreground"
            >
              // apiguard.os
            </Link>
          </div>
          <div className="text-left md:text-right">
            <div className="font-display font-bold text-xs text-muted-foreground uppercase tracking-widest mb-3">
              Next Module
            </div>
            <Link
              to="/ai/mock-server"
              className="font-display font-bold text-2xl uppercase hover:text-warn transition-colors text-foreground"
            >
              AI.Mock · Server →
            </Link>
          </div>
        </div>
        <div className="border-t border-border/60 px-6 py-8 font-display font-medium text-xs text-muted-foreground flex flex-wrap items-center justify-between gap-4">
          <span>
            APIGUARD // ai.test-synth · built for engineers who don't sleep
          </span>
          <span className="text-signal font-bold tracking-widest uppercase">● synth-engine nominal</span>
        </div>
      </section>
    </div>
  );
}
