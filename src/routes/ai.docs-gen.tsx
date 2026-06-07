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
      <header className="fixed top-0 inset-x-0 z-50 border-b border-border/60 bg-background/70 backdrop-blur-xl">
        <div className="flex items-center justify-between px-6 py-3 font-mono text-xs tracking-widest uppercase">
          <div className="flex items-center gap-3">
            <span className="size-2 bg-acid animate-pulse rounded-full" />
            <Link to="/" className="text-bone hover:text-acid">
              APIGUARD/<span className="text-acid">ai.docs</span>
            </Link>
            <span className="text-bone/40 hidden md:inline">
              // generator v3.1 · llm-augmented · 47ms
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
      <section
        ref={heroRef}
        className="relative min-h-[110vh] grid-bg overflow-hidden pt-28"
      >
        <div className="absolute inset-0 scan-lines opacity-30 pointer-events-none" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-acid to-transparent" />

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
          <div className="font-mono text-xs text-acid uppercase tracking-[0.3em] mb-6">
            [ ai.module · 01/03 · documentation generator ]
          </div>
          <h1 className="font-display text-[14vw] md:text-[10vw] leading-[0.82] uppercase tracking-tighter">
            <span className="block">docs nobody</span>
            <span className="block text-stroke">wanted to</span>
            <span className="block text-acid">write.</span>
          </h1>
          <p className="mt-10 max-w-2xl text-bone/60 text-lg leading-relaxed">
            Aim at a base URL or drop an OpenAPI file. Ninety seconds later you
            have a full documentation site — overview prose, endpoint reference,
            curl/fetch/python examples, auth diagrams, changelog — all narrated
            in your tone, all linkable, all printable.
          </p>

          <div className="mt-12 flex flex-wrap items-center gap-4">
            <button
              onClick={() => setRunning((r) => !r)}
              className="group relative border border-acid text-acid px-6 py-3 font-mono text-xs uppercase tracking-[0.25em] hover:bg-acid hover:text-ink transition"
            >
              {running ? "■ abort generation" : "▶ run generator"}
              <span className="absolute -inset-px border border-acid/30 translate-x-1 translate-y-1 -z-10 group-hover:translate-x-2 group-hover:translate-y-2 transition" />
            </button>
            <span className="font-mono text-xs text-bone/40">
              expected · ~14s · ~12,757 lines · 4.8 MB
            </span>
          </div>
        </motion.div>

        {/* INTAKE */}
        <div className="relative mt-20 px-6 max-w-[1400px] mx-auto pb-24">
          <div className="border border-border bg-card/40 backdrop-blur-xl">
            <div className="flex items-center justify-between border-b border-border px-4 py-2 font-mono text-[10px] uppercase tracking-widest text-bone/50">
              <span>~/apiguard/ai/docs-gen · intake</span>
              <span className="flex gap-1">
                <span className="size-2 rounded-full bg-warn/60" />
                <span className="size-2 rounded-full bg-signal/60" />
                <span className="size-2 rounded-full bg-acid/60" />
              </span>
            </div>
            <div className="grid md:grid-cols-[1fr_auto_1fr] gap-0">
              <div className="p-6 font-mono text-xs space-y-3">
                <div className="text-bone/40">
                  // 1. point at base URL or spec
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-acid">▸</span>
                  <input
                    value={target}
                    onChange={(e) => setTarget(e.target.value)}
                    className="bg-transparent border-b border-bone/20 focus:border-acid outline-none flex-1 text-bone py-1"
                  />
                </div>
                <div className="text-bone/40 pt-4">
                  // 2. pick output formats
                </div>
                <div className="flex flex-wrap gap-2">
                  {FORMATS.map((x, i) => (
                    <span
                      key={x}
                      className={`border px-2 py-1 cursor-pointer transition ${i < 4 ? "border-acid text-acid" : "border-bone/20 text-bone/40 hover:border-bone/60 hover:text-bone/70"}`}
                    >
                      {x}
                    </span>
                  ))}
                </div>
                <div className="text-bone/40 pt-4">// 3. tone</div>
                <div className="flex flex-wrap gap-2">
                  {["technical", "friendly", "terse", "verbose"].map((t, i) => (
                    <span
                      key={t}
                      className={`border px-2 py-1 cursor-pointer transition ${i === 0 ? "border-signal text-signal" : "border-bone/20 text-bone/40 hover:border-bone/60 hover:text-bone/70"}`}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
              <div className="hidden md:block w-px bg-border" />
              <div className="p-6 font-mono text-xs space-y-1 bg-background/40 max-h-[320px] overflow-hidden">
                {STREAM.map((s, i) => (
                  <motion.div
                    key={s.t}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: running ? 1 : 0.35, x: 0 }}
                    transition={{ delay: running ? i * 0.4 : 0 }}
                    className="flex gap-3"
                  >
                    <span className="text-bone/30">{s.t}</span>
                    <span style={{ color: s.tone }}>{s.line}</span>
                  </motion.div>
                ))}
                <div className="text-acid">
                  ▸ ready<span className="cursor-blink">_</span>
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
              <span className="text-acid">{p.n}</span>
              <span className="text-bone/80">{p.k}</span>
              <span>·</span>
              <span>{p.v}</span>
              <span className="text-bone/20">//</span>
            </span>
          ))}
        </div>
      </section>

      {/* SECTIONS BENTO */}
      <section className="relative px-6 max-w-[1400px] mx-auto py-32">
        <div className="flex items-end justify-between mb-12 flex-wrap gap-4">
          <div>
            <div className="font-mono text-xs text-acid uppercase tracking-[0.3em] mb-3">
              [ 02 · sections ]
            </div>
            <h2 className="font-display text-5xl md:text-7xl uppercase tracking-tighter leading-[0.9]">
              six sections.
              <br />
              <span className="text-stroke">one narration pass.</span>
            </h2>
          </div>
          <div className="font-mono text-xs text-bone/40 max-w-sm">
            Every documentation site is assembled from the same six sections —
            written in your tone, cross-linked, indexed, and shipped to the
            format of your choosing.
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          {SECTIONS.map((s, i) => (
            <TiltCard key={s.code} className="group">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: i * 0.06 }}
                className="relative border border-border bg-card/40 backdrop-blur-xl p-6 h-full overflow-hidden"
              >
                <div className="absolute top-0 right-0 font-mono text-[10rem] leading-none text-bone/[0.03] select-none">
                  {s.code}
                </div>
                <div className="relative flex items-start justify-between mb-8">
                  <span
                    className="font-mono text-xs uppercase tracking-widest"
                    style={{ color: s.tone }}
                  >
                    [ {s.code} ]
                  </span>
                  <span
                    className="size-2 rounded-full animate-pulse"
                    style={{ background: s.tone }}
                  />
                </div>
                <h3 className="relative font-display text-3xl uppercase tracking-tight mb-3">
                  {s.title}
                </h3>
                <p className="relative text-bone/60 text-sm leading-relaxed mb-6">
                  {s.desc}
                </p>
                <div className="relative flex items-baseline justify-between border-t border-border pt-4 font-mono text-xs">
                  <span className="text-bone/40">lines emitted</span>
                  <span
                    style={{ color: s.tone }}
                    className="text-2xl font-display"
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
        <div className="grid md:grid-cols-[1fr_1.4fr] gap-0 border border-border bg-card/40 backdrop-blur-xl">
          <div className="p-10 border-r border-border">
            <div className="font-mono text-xs text-acid uppercase tracking-[0.3em] mb-4">
              [ 03 · emit ]
            </div>
            <h3 className="font-display text-4xl md:text-5xl uppercase tracking-tighter leading-[0.9] mb-6">
              readable. linkable. printable.
            </h3>
            <p className="text-bone/60 leading-relaxed mb-8">
              The generator doesn't dump a swagger viewer. It writes prose,
              code, callouts, and diagrams as a real site — searchable,
              indexable, theme-able. Or as a 300-page PDF if your CTO still
              mails things.
            </p>
            <div className="space-y-2 font-mono text-xs">
              {[
                { k: "html", v: "static · 0 deps · ship to S3" },
                { k: "mdx", v: "embed React widgets" },
                { k: "docusaurus", v: "drop-in plugin" },
                { k: "pdf", v: "pdf/a-3 · bookmark tree" },
              ].map((x) => (
                <div
                  key={x.k}
                  className="flex justify-between border-b border-border/60 py-2"
                >
                  <span className="text-bone/50">{x.k}</span>
                  <span className="text-acid">{x.v}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-background/60 font-mono text-xs overflow-hidden">
            <div className="flex border-b border-border">
              {["POST /v3/checkout.md", "auth.flow.mdx", "changelog.md"].map(
                (f, i) => (
                  <div
                    key={f}
                    className={`px-4 py-3 border-r border-border ${i === 0 ? "bg-card text-acid" : "text-bone/40"}`}
                  >
                    {f}
                  </div>
                ),
              )}
            </div>
            <pre className="p-6 leading-relaxed text-bone/70 overflow-x-auto">
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
              <span className="text-acid">
                // narrated · tone=technical · 184 words
              </span>
            </pre>
          </div>
        </div>
      </section>

      {/* FOOTER NAV */}
      <section className="border-t border-border bg-card/30 backdrop-blur-xl">
        <div className="max-w-[1400px] mx-auto px-6 py-16 grid md:grid-cols-3 gap-8">
          <div>
            <div className="font-mono text-xs text-bone/40 uppercase tracking-widest mb-2">
              return
            </div>
            <Link
              to="/"
              className="font-display text-2xl uppercase hover:text-acid transition"
            >
              // apiguard.os
            </Link>
          </div>
          <div className="text-center">
            <div className="font-mono text-xs text-bone/40 uppercase tracking-widest mb-2">
              next module
            </div>
            <Link
              to="/ai/test-synth"
              className="font-display text-2xl uppercase hover:text-signal transition"
            >
              AI.Tests · synthesizer →
            </Link>
          </div>
          <div className="text-right">
            <div className="font-mono text-xs text-bone/40 uppercase tracking-widest mb-2">
              also
            </div>
            <Link
              to="/ai/mock-server"
              className="font-display text-2xl uppercase hover:text-warn transition"
            >
              AI.Mock · server →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
