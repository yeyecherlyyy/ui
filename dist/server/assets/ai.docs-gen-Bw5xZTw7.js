import { jsxs, jsx } from "react/jsx-runtime";
import { Link } from "@tanstack/react-router";
import { useScroll, useTransform, motion } from "motion/react";
import { useRef, useState } from "react";
import { u as useLenis } from "./use-lenis-CXIvTO8Z.js";
import { T as TiltCard } from "./TiltCard-CepmM0j3.js";
import "lenis";
const SECTIONS = [{
  code: "OVR",
  title: "Overview",
  desc: "Auto-written prose: what the API does, who it's for, auth model, conventions.",
  lines: 184,
  tone: "var(--acid)"
}, {
  code: "REF",
  title: "Endpoint Reference",
  desc: "Every route, method, param, header, body, status — fully cross-linked.",
  lines: 9412,
  tone: "var(--signal)"
}, {
  code: "EXM",
  title: "Examples",
  desc: "curl, fetch, axios, requests, httpx, Go, Rust — all generated, all runnable.",
  lines: 2087,
  tone: "var(--acid)"
}, {
  code: "EDG",
  title: "Edge Cases",
  desc: "Null bodies, 429 storms, partial writes, idempotency keys, retries.",
  lines: 612,
  tone: "var(--warn)"
}, {
  code: "AUT",
  title: "Auth Flows",
  desc: "OAuth2, PKCE, mTLS, API keys — diagrammed and narrated end-to-end.",
  lines: 318,
  tone: "var(--signal)"
}, {
  code: "CHG",
  title: "Changelog",
  desc: 'Versioned diff prose. "What changed and why you care." Auto-pinned.',
  lines: 144,
  tone: "var(--acid)"
}];
const FORMATS = ["html", "markdown", "mdx", "docusaurus", "mintlify", "pdf", "openapi", "redoc"];
const STREAM = [{
  t: "00:00.08",
  line: "▸ probing https://api.acme.io · 247 endpoints found",
  tone: "var(--acid)"
}, {
  t: "00:00.31",
  line: "▸ inferring auth · oauth2 + bearer · 4 scopes detected",
  tone: "var(--bone)"
}, {
  t: "00:01.92",
  line: "✦ narrating overview · 184 lines of prose",
  tone: "var(--acid)"
}, {
  t: "00:04.10",
  line: "✦ rendering endpoint reference · 9,412 lines",
  tone: "var(--signal)"
}, {
  t: "00:07.55",
  line: "✦ generating examples · 7 languages · 2,087 snippets",
  tone: "var(--signal)"
}, {
  t: "00:11.83",
  line: "⚠ POST /v3/checkout · ambiguous error envelope · documented both",
  tone: "var(--warn)"
}, {
  t: "00:14.27",
  line: "✓ docs site built · 12,757 lines · 4.8 MB · ready to publish",
  tone: "var(--acid)"
}];
const PIPELINE = [{
  n: "01",
  k: "probe",
  v: "base URL or OpenAPI"
}, {
  n: "02",
  k: "infer",
  v: "schemas, auth, conventions"
}, {
  n: "03",
  k: "narrate",
  v: "LLM prose per section"
}, {
  n: "04",
  k: "render",
  v: "code samples · 7 langs"
}, {
  n: "05",
  k: "ship",
  v: "static site or PDF"
}];
function DocsGenPage() {
  useLenis();
  const heroRef = useRef(null);
  const {
    scrollYProgress
  } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  const yTitle = useTransform(scrollYProgress, [0, 1], [0, -180]);
  const opTitle = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const rotGlyph = useTransform(scrollYProgress, [0, 1], [0, 360]);
  const rotGlyph2 = useTransform(scrollYProgress, [0, 1], [360, 0]);
  const [target, setTarget] = useState("https://api.acme.io");
  const [running, setRunning] = useState(false);
  return /* @__PURE__ */ jsxs("div", { className: "relative bg-transparent text-foreground", children: [
    /* @__PURE__ */ jsx("header", { className: "fixed top-0 inset-x-0 z-50 border-b border-border/60 bg-background/70 backdrop-blur-xl", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between px-6 py-3 font-mono text-xs tracking-widest uppercase", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsx("span", { className: "size-2 bg-acid animate-pulse rounded-full" }),
        /* @__PURE__ */ jsxs(Link, { to: "/", className: "text-bone hover:text-acid", children: [
          "APIGUARD/",
          /* @__PURE__ */ jsx("span", { className: "text-acid", children: "ai.docs" })
        ] }),
        /* @__PURE__ */ jsx("span", { className: "text-bone/40 hidden md:inline", children: "// generator v3.1 · llm-augmented · 47ms" })
      ] }),
      /* @__PURE__ */ jsx(Link, { to: "/", className: "border border-bone/30 text-bone/70 px-3 py-1 hover:border-acid hover:text-acid transition", children: "← return to OS" })
    ] }) }),
    /* @__PURE__ */ jsxs("section", { ref: heroRef, className: "relative min-h-[110vh] grid-bg overflow-hidden pt-28", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute inset-0 scan-lines opacity-30 pointer-events-none" }),
      /* @__PURE__ */ jsx("div", { className: "absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-acid to-transparent" }),
      /* @__PURE__ */ jsx(motion.div, { style: {
        rotate: rotGlyph
      }, className: "absolute right-[-180px] top-[20%] size-[520px] border border-acid/30 rounded-full pointer-events-none" }),
      /* @__PURE__ */ jsx(motion.div, { style: {
        rotate: rotGlyph2
      }, className: "absolute right-[-80px] top-[28%] size-[360px] border border-signal/20 rounded-full pointer-events-none" }),
      /* @__PURE__ */ jsxs(motion.div, { style: {
        y: yTitle,
        opacity: opTitle
      }, className: "relative px-6 max-w-[1400px] mx-auto pt-12", children: [
        /* @__PURE__ */ jsx("div", { className: "font-mono text-xs text-acid uppercase tracking-[0.3em] mb-6", children: "[ ai.module · 01/03 · documentation generator ]" }),
        /* @__PURE__ */ jsxs("h1", { className: "font-display text-[14vw] md:text-[10vw] leading-[0.82] uppercase tracking-tighter", children: [
          /* @__PURE__ */ jsx("span", { className: "block", children: "docs nobody" }),
          /* @__PURE__ */ jsx("span", { className: "block text-stroke", children: "wanted to" }),
          /* @__PURE__ */ jsx("span", { className: "block text-acid", children: "write." })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "mt-10 max-w-2xl text-bone/60 text-lg leading-relaxed", children: "Aim at a base URL or drop an OpenAPI file. Ninety seconds later you have a full documentation site — overview prose, endpoint reference, curl/fetch/python examples, auth diagrams, changelog — all narrated in your tone, all linkable, all printable." }),
        /* @__PURE__ */ jsxs("div", { className: "mt-12 flex flex-wrap items-center gap-4", children: [
          /* @__PURE__ */ jsxs("button", { onClick: () => setRunning((r) => !r), className: "group relative border border-acid text-acid px-6 py-3 font-mono text-xs uppercase tracking-[0.25em] hover:bg-acid hover:text-ink transition", children: [
            running ? "■ abort generation" : "▶ run generator",
            /* @__PURE__ */ jsx("span", { className: "absolute -inset-px border border-acid/30 translate-x-1 translate-y-1 -z-10 group-hover:translate-x-2 group-hover:translate-y-2 transition" })
          ] }),
          /* @__PURE__ */ jsx("span", { className: "font-mono text-xs text-bone/40", children: "expected · ~14s · ~12,757 lines · 4.8 MB" })
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "relative mt-20 px-6 max-w-[1400px] mx-auto pb-24", children: /* @__PURE__ */ jsxs("div", { className: "border border-border bg-card/40 backdrop-blur-xl", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between border-b border-border px-4 py-2 font-mono text-[10px] uppercase tracking-widest text-bone/50", children: [
          /* @__PURE__ */ jsx("span", { children: "~/apiguard/ai/docs-gen · intake" }),
          /* @__PURE__ */ jsxs("span", { className: "flex gap-1", children: [
            /* @__PURE__ */ jsx("span", { className: "size-2 rounded-full bg-warn/60" }),
            /* @__PURE__ */ jsx("span", { className: "size-2 rounded-full bg-signal/60" }),
            /* @__PURE__ */ jsx("span", { className: "size-2 rounded-full bg-acid/60" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-[1fr_auto_1fr] gap-0", children: [
          /* @__PURE__ */ jsxs("div", { className: "p-6 font-mono text-xs space-y-3", children: [
            /* @__PURE__ */ jsx("div", { className: "text-bone/40", children: "// 1. point at base URL or spec" }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsx("span", { className: "text-acid", children: "▸" }),
              /* @__PURE__ */ jsx("input", { value: target, onChange: (e) => setTarget(e.target.value), className: "bg-transparent border-b border-bone/20 focus:border-acid outline-none flex-1 text-bone py-1" })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "text-bone/40 pt-4", children: "// 2. pick output formats" }),
            /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-2", children: FORMATS.map((x, i) => /* @__PURE__ */ jsx("span", { className: `border px-2 py-1 cursor-pointer transition ${i < 4 ? "border-acid text-acid" : "border-bone/20 text-bone/40 hover:border-bone/60 hover:text-bone/70"}`, children: x }, x)) }),
            /* @__PURE__ */ jsx("div", { className: "text-bone/40 pt-4", children: "// 3. tone" }),
            /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-2", children: ["technical", "friendly", "terse", "verbose"].map((t, i) => /* @__PURE__ */ jsx("span", { className: `border px-2 py-1 cursor-pointer transition ${i === 0 ? "border-signal text-signal" : "border-bone/20 text-bone/40 hover:border-bone/60 hover:text-bone/70"}`, children: t }, t)) })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "hidden md:block w-px bg-border" }),
          /* @__PURE__ */ jsxs("div", { className: "p-6 font-mono text-xs space-y-1 bg-background/40 max-h-[320px] overflow-hidden", children: [
            STREAM.map((s, i) => /* @__PURE__ */ jsxs(motion.div, { initial: {
              opacity: 0,
              x: -8
            }, animate: {
              opacity: running ? 1 : 0.35,
              x: 0
            }, transition: {
              delay: running ? i * 0.4 : 0
            }, className: "flex gap-3", children: [
              /* @__PURE__ */ jsx("span", { className: "text-bone/30", children: s.t }),
              /* @__PURE__ */ jsx("span", { style: {
                color: s.tone
              }, children: s.line })
            ] }, s.t)),
            /* @__PURE__ */ jsxs("div", { className: "text-acid", children: [
              "▸ ready",
              /* @__PURE__ */ jsx("span", { className: "cursor-blink", children: "_" })
            ] })
          ] })
        ] })
      ] }) })
    ] }),
    /* @__PURE__ */ jsx("section", { className: "relative border-y border-border bg-card/30 backdrop-blur-xl overflow-hidden", children: /* @__PURE__ */ jsx("div", { className: "flex marquee-track whitespace-nowrap py-4 font-mono text-xs uppercase tracking-[0.3em] text-bone/40", children: [...PIPELINE, ...PIPELINE, ...PIPELINE].map((p, i) => /* @__PURE__ */ jsxs("span", { className: "px-8 flex items-center gap-3", children: [
      /* @__PURE__ */ jsx("span", { className: "text-acid", children: p.n }),
      /* @__PURE__ */ jsx("span", { className: "text-bone/80", children: p.k }),
      /* @__PURE__ */ jsx("span", { children: "·" }),
      /* @__PURE__ */ jsx("span", { children: p.v }),
      /* @__PURE__ */ jsx("span", { className: "text-bone/20", children: "//" })
    ] }, i)) }) }),
    /* @__PURE__ */ jsxs("section", { className: "relative px-6 max-w-[1400px] mx-auto py-32", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-end justify-between mb-12 flex-wrap gap-4", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("div", { className: "font-mono text-xs text-acid uppercase tracking-[0.3em] mb-3", children: "[ 02 · sections ]" }),
          /* @__PURE__ */ jsxs("h2", { className: "font-display text-5xl md:text-7xl uppercase tracking-tighter leading-[0.9]", children: [
            "six sections.",
            /* @__PURE__ */ jsx("br", {}),
            /* @__PURE__ */ jsx("span", { className: "text-stroke", children: "one narration pass." })
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "font-mono text-xs text-bone/40 max-w-sm", children: "Every documentation site is assembled from the same six sections — written in your tone, cross-linked, indexed, and shipped to the format of your choosing." })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "grid md:grid-cols-3 gap-4", children: SECTIONS.map((s, i) => /* @__PURE__ */ jsx(TiltCard, { className: "group", children: /* @__PURE__ */ jsxs(motion.div, { initial: {
        opacity: 0,
        y: 30
      }, whileInView: {
        opacity: 1,
        y: 0
      }, viewport: {
        once: true,
        margin: "-50px"
      }, transition: {
        delay: i * 0.06
      }, className: "relative border border-border bg-card/40 backdrop-blur-xl p-6 h-full overflow-hidden", children: [
        /* @__PURE__ */ jsx("div", { className: "absolute top-0 right-0 font-mono text-[10rem] leading-none text-bone/[0.03] select-none", children: s.code }),
        /* @__PURE__ */ jsxs("div", { className: "relative flex items-start justify-between mb-8", children: [
          /* @__PURE__ */ jsxs("span", { className: "font-mono text-xs uppercase tracking-widest", style: {
            color: s.tone
          }, children: [
            "[ ",
            s.code,
            " ]"
          ] }),
          /* @__PURE__ */ jsx("span", { className: "size-2 rounded-full animate-pulse", style: {
            background: s.tone
          } })
        ] }),
        /* @__PURE__ */ jsx("h3", { className: "relative font-display text-3xl uppercase tracking-tight mb-3", children: s.title }),
        /* @__PURE__ */ jsx("p", { className: "relative text-bone/60 text-sm leading-relaxed mb-6", children: s.desc }),
        /* @__PURE__ */ jsxs("div", { className: "relative flex items-baseline justify-between border-t border-border pt-4 font-mono text-xs", children: [
          /* @__PURE__ */ jsx("span", { className: "text-bone/40", children: "lines emitted" }),
          /* @__PURE__ */ jsx("span", { style: {
            color: s.tone
          }, className: "text-2xl font-display", children: s.lines.toLocaleString() })
        ] })
      ] }) }, s.code)) })
    ] }),
    /* @__PURE__ */ jsx("section", { className: "relative px-6 max-w-[1400px] mx-auto pb-32", children: /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-[1fr_1.4fr] gap-0 border border-border bg-card/40 backdrop-blur-xl", children: [
      /* @__PURE__ */ jsxs("div", { className: "p-10 border-r border-border", children: [
        /* @__PURE__ */ jsx("div", { className: "font-mono text-xs text-acid uppercase tracking-[0.3em] mb-4", children: "[ 03 · emit ]" }),
        /* @__PURE__ */ jsx("h3", { className: "font-display text-4xl md:text-5xl uppercase tracking-tighter leading-[0.9] mb-6", children: "readable. linkable. printable." }),
        /* @__PURE__ */ jsx("p", { className: "text-bone/60 leading-relaxed mb-8", children: "The generator doesn't dump a swagger viewer. It writes prose, code, callouts, and diagrams as a real site — searchable, indexable, theme-able. Or as a 300-page PDF if your CTO still mails things." }),
        /* @__PURE__ */ jsx("div", { className: "space-y-2 font-mono text-xs", children: [{
          k: "html",
          v: "static · 0 deps · ship to S3"
        }, {
          k: "mdx",
          v: "embed React widgets"
        }, {
          k: "docusaurus",
          v: "drop-in plugin"
        }, {
          k: "pdf",
          v: "pdf/a-3 · bookmark tree"
        }].map((x) => /* @__PURE__ */ jsxs("div", { className: "flex justify-between border-b border-border/60 py-2", children: [
          /* @__PURE__ */ jsx("span", { className: "text-bone/50", children: x.k }),
          /* @__PURE__ */ jsx("span", { className: "text-acid", children: x.v })
        ] }, x.k)) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "bg-background/60 font-mono text-xs overflow-hidden", children: [
        /* @__PURE__ */ jsx("div", { className: "flex border-b border-border", children: ["POST /v3/checkout.md", "auth.flow.mdx", "changelog.md"].map((f, i) => /* @__PURE__ */ jsx("div", { className: `px-4 py-3 border-r border-border ${i === 0 ? "bg-card text-acid" : "text-bone/40"}`, children: f }, f)) }),
        /* @__PURE__ */ jsxs("pre", { className: "p-6 leading-relaxed text-bone/70 overflow-x-auto", children: [
          `# POST /v3/checkout/express

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

`,
          /* @__PURE__ */ jsx("span", { className: "text-acid", children: "// narrated · tone=technical · 184 words" })
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "border-t border-border bg-card/30 backdrop-blur-xl", children: /* @__PURE__ */ jsxs("div", { className: "max-w-[1400px] mx-auto px-6 py-16 grid md:grid-cols-3 gap-8", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("div", { className: "font-mono text-xs text-bone/40 uppercase tracking-widest mb-2", children: "return" }),
        /* @__PURE__ */ jsx(Link, { to: "/", className: "font-display text-2xl uppercase hover:text-acid transition", children: "// apiguard.os" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
        /* @__PURE__ */ jsx("div", { className: "font-mono text-xs text-bone/40 uppercase tracking-widest mb-2", children: "next module" }),
        /* @__PURE__ */ jsx(Link, { to: "/ai/test-synth", className: "font-display text-2xl uppercase hover:text-signal transition", children: "AI.Tests · synthesizer →" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "text-right", children: [
        /* @__PURE__ */ jsx("div", { className: "font-mono text-xs text-bone/40 uppercase tracking-widest mb-2", children: "also" }),
        /* @__PURE__ */ jsx(Link, { to: "/ai/mock-server", className: "font-display text-2xl uppercase hover:text-warn transition", children: "AI.Mock · server →" })
      ] })
    ] }) })
  ] });
}
export {
  DocsGenPage as component
};
