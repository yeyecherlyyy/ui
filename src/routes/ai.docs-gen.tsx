import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef, useState } from "react";
import { useLenis } from "@/hooks/use-lenis";
import { TiltCard } from "@/components/site/TiltCard";

export const Route = createFileRoute("/ai/docs-gen")({
  head: () => ({
    meta: [
      { title: "Documentation Generator // APIGUARD" },
      {
        name: "description",
        content:
          "Point at a base URL. Get a fully-narrated, sectioned docs site in 90 seconds — endpoints, examples, edge cases.",
      },
    ],
  }),
  component: DocsGenPage,
});

const SECTIONS = [
  {
    code: "OVR",
    title: "Overview",
    desc: "Auto-written prose: what the API does, who it's for, auth model, conventions.",
    lines: 184,
    tone: "var(--acid)",
  },
  {
    code: "REF",
    title: "Endpoint Reference",
    desc: "Every route, method, param, header, body, status — fully cross-linked.",
    lines: 9_412,
    tone: "var(--signal)",
  },
  {
    code: "EXM",
    title: "Examples",
    desc: "curl, fetch, axios, requests, httpx, Go, Rust — all generated, all runnable.",
    lines: 2_087,
    tone: "var(--acid)",
  },
  {
    code: "EDG",
    title: "Edge Cases",
    desc: "Null bodies, 429 storms, partial writes, idempotency keys, retries.",
    lines: 612,
    tone: "var(--warn)",
  },
  {
    code: "AUT",
    title: "Auth Flows",
    desc: "OAuth2, PKCE, mTLS, API keys — diagrammed and narrated end-to-end.",
    lines: 318,
    tone: "var(--signal)",
  },
  {
    code: "CHG",
    title: "Changelog",
    desc: 'Versioned diff prose. "What changed and why you care." Auto-pinned.',
    lines: 144,
    tone: "var(--acid)",
  },
];

const FORMATS = [
  "html",
  "markdown",
  "mdx",
  "docusaurus",
  "mintlify",
  "pdf",
  "openapi",
  "redoc",
];

const STREAM = [
  {
    t: "00:00.08",
    line: "▸ probing https://api.acme.io · 247 endpoints found",
    tone: "var(--acid)",
  },
  {
    t: "00:00.31",
    line: "▸ inferring auth · oauth2 + bearer · 4 scopes detected",
    tone: "var(--bone)",
  },
  {
    t: "00:01.92",
    line: "✦ narrating overview · 184 lines of prose",
    tone: "var(--acid)",
  },
  {
    t: "00:04.10",
    line: "✦ rendering endpoint reference · 9,412 lines",
    tone: "var(--signal)",
  },
  {
    t: "00:07.55",
    line: "✦ generating examples · 7 languages · 2,087 snippets",
    tone: "var(--signal)",
  },
  {
    t: "00:11.83",
    line: "⚠ POST /v3/checkout · ambiguous error envelope · documented both",
    tone: "var(--warn)",
  },
  {
    t: "00:14.27",
    line: "✓ docs site built · 12,757 lines · 4.8 MB · ready to publish",
    tone: "var(--acid)",
  },
];

const PIPELINE = [
  { n: "01", k: "probe", v: "base URL or OpenAPI" },
  { n: "02", k: "infer", v: "schemas, auth, conventions" },
  { n: "03", k: "narrate", v: "LLM prose per section" },
  { n: "04", k: "render", v: "code samples · 7 langs" },
  { n: "05", k: "ship", v: "static site or PDF" },
];

function DocsGenPage() {
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

  const [target, setTarget] = useState("https://api.acme.io");
  const [running, setRunning] = useState(false);

  return (
    <div className="relative bg-transparent text-foreground">
      {/* TOP RAIL */}
      <header className="fixed top-0 inset-x-0 z-50 bg-background/80 backdrop-blur-xl">
        <div className="max-w-[1400px] mx-auto flex items-center justify-between px-6 py-4 font-mono text-xs tracking-widest uppercase">
          <div className="flex items-center gap-3">
            <span className="size-2 bg-acid animate-pulse rounded-full" />
            <Link to="/" className="text-foreground font-display font-bold hover:text-acid transition-colors">
              APIGUARD / <span className="text-acid">ai.docs</span>
            </Link>
            <span className="text-muted-foreground hidden md:inline font-medium">
              // generator v3.1 · llm-augmented · 47ms
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
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-acid/10 via-background to-background pointer-events-none" />

        <motion.div
          style={{ rotate: rotGlyph }}
          className="absolute right-[-180px] top-[20%] size-[520px] border border-acid/30 rounded-full pointer-events-none"
        />
        <motion.div
          style={{ rotate: rotGlyph2 }}
          className="absolute right-[-80px] top-[28%] size-[360px] border border-signal/20 rounded-full pointer-events-none"
        />

        <motion.div
          style={{ y: yTitle, opacity: opTitle }}
          className="relative px-6 max-w-[1400px] mx-auto pt-12"
        >
          <div className="font-display font-bold text-xs text-acid uppercase tracking-[0.3em] mb-6 bg-acid/10 px-3 py-1 inline-block rounded-full">
            [ ai.module · 01/03 · documentation generator ]
          </div>
          <h1 className="font-display font-bold text-[14vw] md:text-[10vw] leading-[0.9] uppercase tracking-tighter text-foreground">
            <span className="block">docs nobody</span>
            <span className="block text-foreground/40">wanted to</span>
            <span className="block text-acid">write.</span>
          </h1>
          <p className="mt-10 max-w-2xl text-muted-foreground font-medium text-lg leading-relaxed">
            Aim at a base URL or drop an OpenAPI file. Ninety seconds later you
            have a full documentation site — overview prose, endpoint reference,
            curl/fetch/python examples, auth diagrams, changelog — all narrated
            in your tone, all linkable, all printable.
          </p>

          <div className="mt-12 flex flex-wrap items-center gap-6">
            <button
              onClick={() => setRunning((r) => !r)}
              className="bg-acid text-ink px-8 py-4 font-display font-bold text-sm uppercase tracking-widest rounded-full shadow-md hover:-translate-y-1 hover:shadow-lg transition-all"
            >
              {running ? "■ abort generation" : "▶ run generator"}
            </button>
            <span className="font-display font-medium text-xs text-muted-foreground uppercase">
              expected · ~14s · ~12,757 lines · 4.8 MB
            </span>
          </div>
        </motion.div>

        {/* INTAKE */}
        <div className="relative mt-20 px-6 max-w-[1400px] mx-auto pb-24">
          <div className="bg-card rounded-3xl shadow-sm overflow-hidden">
            <div className="flex items-center justify-between border-b border-border/60 bg-secondary/50 px-6 py-4 font-display font-semibold text-[10px] uppercase tracking-widest text-muted-foreground">
              <span>~/apiguard/ai/docs-gen · intake</span>
              <span className="flex gap-2">
                <span className="size-3 rounded-full bg-destructive/70" />
                <span className="size-3 rounded-full bg-warn/70" />
                <span className="size-3 rounded-full bg-acid/70" />
              </span>
            </div>
            <div className="grid md:grid-cols-[1fr_auto_1fr] gap-0">
              <div className="p-8 font-mono text-xs space-y-4">
                <div className="text-muted-foreground font-semibold">
                  // 1. point at base URL or spec
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-acid font-bold">▸</span>
                  <input
                    value={target}
                    onChange={(e) => setTarget(e.target.value)}
                    className="bg-background border border-border/60 rounded-lg focus:border-acid focus:ring-4 focus:ring-acid/10 outline-none flex-1 text-foreground px-4 py-2 font-mono"
                  />
                </div>
                <div className="text-muted-foreground font-semibold pt-6">
                  // 2. pick output formats
                </div>
                <div className="flex flex-wrap gap-2">
                  {FORMATS.map((x, i) => (
                    <span
                      key={x}
                      className={`border rounded-full px-4 py-1.5 cursor-pointer transition-all font-display font-semibold ${i < 4 ? "border-acid text-acid bg-acid/10" : "border-border/60 text-muted-foreground hover:border-foreground/30 hover:text-foreground bg-background"}`}
                    >
                      {x}
                    </span>
                  ))}
                </div>
                <div className="text-muted-foreground font-semibold pt-6">// 3. tone</div>
                <div className="flex flex-wrap gap-2">
                  {["technical", "friendly", "terse", "verbose"].map((t, i) => (
                    <span
                      key={t}
                      className={`border rounded-full px-4 py-1.5 cursor-pointer transition-all font-display font-semibold ${i === 0 ? "border-signal text-signal bg-signal/10" : "border-border/60 text-muted-foreground hover:border-foreground/30 hover:text-foreground bg-background"}`}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
              <div className="hidden md:block w-px bg-border/60" />
              <div className="p-8 font-mono text-xs space-y-2 bg-secondary/20 max-h-[400px] overflow-hidden">
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
              <span className="text-acid">{p.n}</span>
              <span className="text-foreground/80">{p.k}</span>
              <span>·</span>
              <span>{p.v}</span>
              <span className="text-muted-foreground/30">//</span>
            </span>
          ))}
        </div>
      </section>

      {/* SECTIONS BENTO */}
      <section className="relative px-6 max-w-[1400px] mx-auto py-32">
        <div className="flex items-end justify-between mb-16 flex-wrap gap-6">
          <div>
            <div className="font-display font-bold text-xs text-acid uppercase tracking-[0.3em] mb-4">
              [ 02 · sections ]
            </div>
            <h2 className="font-display font-bold text-5xl md:text-7xl uppercase tracking-tighter leading-[1]">
              six sections.
              <br />
              <span className="text-foreground/40">one narration pass.</span>
            </h2>
          </div>
          <div className="font-display font-medium text-sm text-muted-foreground max-w-sm">
            Every documentation site is assembled from the same six sections —
            written in your tone, cross-linked, indexed, and shipped to the
            format of your choosing.
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {SECTIONS.map((s, i) => (
            <TiltCard key={s.code} className="group h-full">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: i * 0.06 }}
                className="relative bg-card rounded-3xl shadow-sm p-8 h-full overflow-hidden hover:shadow-md transition-shadow flex flex-col"
              >
                <div className="absolute -top-4 -right-4 font-display font-bold text-[10rem] leading-none text-foreground/[0.02] select-none pointer-events-none">
                  {s.code}
                </div>
                <div className="relative flex items-start justify-between mb-10">
                  <span
                    className="font-display font-bold text-xs uppercase tracking-widest px-3 py-1 rounded-full"
                    style={{ color: s.tone, backgroundColor: `color-mix(in srgb, ${s.tone} 10%, transparent)` }}
                  >
                    [ {s.code} ]
                  </span>
                  <span
                    className="size-2 rounded-full animate-pulse"
                    style={{ background: s.tone }}
                  />
                </div>
                <h3 className="relative font-display font-bold text-3xl uppercase tracking-tight mb-4 text-foreground">
                  {s.title}
                </h3>
                <p className="relative text-muted-foreground font-medium text-sm leading-relaxed mb-8 flex-1">
                  {s.desc}
                </p>
                <div className="relative flex items-baseline justify-between border-t border-border/60 pt-6 font-display font-medium text-xs">
                  <span className="text-muted-foreground uppercase tracking-widest">lines emitted</span>
                  <span
                    style={{ color: s.tone }}
                    className="text-3xl font-display font-bold"
                  >
                    {s.lines.toLocaleString()}
                  </span>
                </div>
              </motion.div>
            </TiltCard>
          ))}
        </div>
      </section>

      {/* PREVIEW PANE */}
      <section className="relative px-6 max-w-[1400px] mx-auto pb-32">
        <div className="grid md:grid-cols-[1fr_1.4fr] gap-0 bg-card rounded-[3rem] shadow-lg overflow-hidden">
          <div className="p-10 md:p-16 border-b md:border-b-0 md:border-r border-border/60 bg-secondary/20">
            <div className="font-display font-bold text-xs text-acid uppercase tracking-[0.3em] mb-6">
              [ 03 · emit ]
            </div>
            <h3 className="font-display font-bold text-4xl md:text-5xl uppercase tracking-tighter leading-[1] mb-6">
              readable. linkable. printable.
            </h3>
            <p className="text-muted-foreground font-medium leading-relaxed mb-10">
              The generator doesn't dump a swagger viewer. It writes prose,
              code, callouts, and diagrams as a real site — searchable,
              indexable, theme-able. Or as a 300-page PDF if your CTO still
              mails things.
            </p>
            <div className="space-y-3 font-mono text-xs font-medium">
              {[
                { k: "html", v: "static · 0 deps · ship to S3" },
                { k: "mdx", v: "embed React widgets" },
                { k: "docusaurus", v: "drop-in plugin" },
                { k: "pdf", v: "pdf/a-3 · bookmark tree" },
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
              {["POST /v3/checkout.md", "auth.flow.mdx", "changelog.md"].map(
                (f, i) => (
                  <div
                    key={f}
                    className={`px-6 py-4 border-r border-border/60 font-medium ${i === 0 ? "bg-background text-acid border-b-transparent -mb-px" : "text-muted-foreground hover:bg-secondary/50 transition-colors cursor-pointer"}`}
                  >
                    {f}
                  </div>
                ),
              )}
            </div>
            <pre className="p-8 md:p-10 leading-relaxed text-foreground overflow-x-auto flex-1">
              {`# POST /v3/checkout/express

Creates an **express checkout session** and returns a hosted URL
the customer can be redirected to. Idempotent on \`X-Idem-Key\`.

## Request
| field        | type        | required | notes                       |
|--------------|-------------|----------|-----------------------------|
| items[]      | LineItem    | yes      | min 1, max 100              |
| currency     | ISO 4217    | yes      | must match account default  |
| return_url   | https URL   | yes      | called on success or cancel |

## Example
\`\`\`bash
curl -X POST https://api.acme.io/v3/checkout/express \\
  -H "Authorization: Bearer $TOKEN" \\
  -H "X-Idem-Key: $(uuidgen)" \\
  -d '{"items":[{"sku":"A-12","qty":2}], "currency":"USD"}'
\`\`\`

`}
              <span className="text-acid font-bold">
                // narrated · tone=technical · 184 words
              </span>
            </pre>
          </div>
        </div>
      </section>

      {/* FOOTER NAV */}
      <section className="border-t border-border/60 bg-background">
        <div className="max-w-[1400px] mx-auto px-6 py-16 grid md:grid-cols-3 gap-12">
          <div>
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
          <div className="text-left md:text-center">
            <div className="font-display font-bold text-xs text-muted-foreground uppercase tracking-widest mb-3">
              Next Module
            </div>
            <Link
              to="/ai/test-synth"
              className="font-display font-bold text-2xl uppercase hover:text-signal transition-colors text-foreground"
            >
              AI.Tests · Synthesizer →
            </Link>
          </div>
          <div className="text-left md:text-right">
            <div className="font-display font-bold text-xs text-muted-foreground uppercase tracking-widest mb-3">
              Also
            </div>
            <Link
              to="/ai/mock-server"
              className="font-display font-bold text-2xl uppercase hover:text-warn transition-colors text-foreground"
            >
              AI.Mock · Server →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
