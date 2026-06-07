import { jsxs, jsx } from "react/jsx-runtime";
import { Link } from "@tanstack/react-router";
import { useScroll, useTransform, motion } from "motion/react";
import { useRef, useState } from "react";
import { u as useLenis } from "./use-lenis-CXIvTO8Z.js";
import { T as TiltCard } from "./TiltCard-CepmM0j3.js";
import "lenis";
const CASE_CLASSES = [{
  code: "NEG",
  title: "Negative",
  desc: "Reject malformed payloads, wrong types, missing required fields.",
  count: 412,
  tone: "var(--acid)"
}, {
  code: "FZZ",
  title: "Fuzz",
  desc: "Mutational + grammar-based payloads against every field.",
  count: 9318,
  tone: "var(--signal)"
}, {
  code: "BND",
  title: "Boundary",
  desc: "Off-by-one, integer overflow, string length walls, unicode edges.",
  count: 1204,
  tone: "var(--warn)"
}, {
  code: "AUT",
  title: "Auth-Bypass",
  desc: "BOLA, BFLA, IDOR, JWT-none, scope confusion, role escalation.",
  count: 287,
  tone: "var(--signal)"
}, {
  code: "RCE",
  title: "Injection",
  desc: "SQLi, NoSQLi, SSRF, template, command, header smuggling.",
  count: 642,
  tone: "var(--warn)"
}, {
  code: "RAT",
  title: "Rate / Quota",
  desc: "Burst, drip, distributed, refill timing, quota leak.",
  count: 96,
  tone: "var(--acid)"
}];
const EXPORTS = ["jest", "pytest", "k6", "vitest", "postman", "rest-client", "bruno", "tavern"];
const STREAM = [{
  t: "00:00.12",
  line: "▸ parsed openapi.yaml · 247 endpoints",
  tone: "var(--acid)"
}, {
  t: "00:00.41",
  line: "▸ inferring auth model · oauth2 + bearer · 4 scopes",
  tone: "var(--bone)"
}, {
  t: "00:01.07",
  line: "✦ synthesizing NEG class · 412 cases",
  tone: "var(--acid)"
}, {
  t: "00:02.55",
  line: "✦ synthesizing FZZ class · 9,318 cases (mutational)",
  tone: "var(--signal)"
}, {
  t: "00:04.21",
  line: "⚠ POST /v3/checkout · missing rate-limit · auth-bypass risk",
  tone: "var(--warn)"
}, {
  t: "00:05.93",
  line: "✦ synthesizing AUT class · BOLA on GET /users/{id}/orders",
  tone: "var(--signal)"
}, {
  t: "00:07.10",
  line: "✓ exported jest+pytest+k6 · 11,959 cases · 2.1 MB",
  tone: "var(--acid)"
}];
const PIPELINE = [{
  n: "01",
  k: "ingest",
  v: "OpenAPI · Postman · HAR"
}, {
  n: "02",
  k: "model",
  v: "infer schemas, auth, deps"
}, {
  n: "03",
  k: "synth",
  v: "6 case classes in parallel"
}, {
  n: "04",
  k: "rank",
  v: "risk × coverage × novelty"
}, {
  n: "05",
  k: "emit",
  v: "framework-native code"
}];
function TestSynthPage() {
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
  const [spec, setSpec] = useState("openapi.yaml");
  const [running, setRunning] = useState(false);
  return /* @__PURE__ */ jsxs("div", { className: "relative bg-transparent text-foreground", children: [
    /* @__PURE__ */ jsx("header", { className: "fixed top-0 inset-x-0 z-50 border-b border-border/60 bg-background/70 backdrop-blur-xl", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between px-6 py-3 font-mono text-xs tracking-widest uppercase", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsx("span", { className: "size-2 bg-signal animate-pulse rounded-full" }),
        /* @__PURE__ */ jsxs(Link, { to: "/", className: "text-bone hover:text-acid", children: [
          "APIGUARD/",
          /* @__PURE__ */ jsx("span", { className: "text-signal", children: "ai.tests" })
        ] }),
        /* @__PURE__ */ jsx("span", { className: "text-bone/40 hidden md:inline", children: "// synthesizer v2.7 · gpt-augmented · 47ms" })
      ] }),
      /* @__PURE__ */ jsx(Link, { to: "/", className: "border border-bone/30 text-bone/70 px-3 py-1 hover:border-acid hover:text-acid transition", children: "← return to OS" })
    ] }) }),
    /* @__PURE__ */ jsxs("section", { ref: heroRef, className: "relative min-h-[110vh] grid-bg overflow-hidden pt-28", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute inset-0 scan-lines opacity-30 pointer-events-none" }),
      /* @__PURE__ */ jsx("div", { className: "absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-signal to-transparent" }),
      /* @__PURE__ */ jsx(motion.div, { style: {
        rotate: rotGlyph
      }, className: "absolute right-[-180px] top-[20%] size-[520px] border border-signal/30 rounded-full pointer-events-none" }),
      /* @__PURE__ */ jsx(motion.div, { style: {
        rotate: useTransform(scrollYProgress, [0, 1], [360, 0])
      }, className: "absolute right-[-80px] top-[28%] size-[360px] border border-acid/20 rounded-full pointer-events-none" }),
      /* @__PURE__ */ jsxs(motion.div, { style: {
        y: yTitle,
        opacity: opTitle
      }, className: "relative px-6 max-w-[1400px] mx-auto pt-12", children: [
        /* @__PURE__ */ jsx("div", { className: "font-mono text-xs text-signal uppercase tracking-[0.3em] mb-6", children: "[ ai.module · 02/03 · test case synthesizer ]" }),
        /* @__PURE__ */ jsxs("h1", { className: "font-display text-[14vw] md:text-[10vw] leading-[0.82] uppercase tracking-tighter", children: [
          /* @__PURE__ */ jsx("span", { className: "block", children: "test cases" }),
          /* @__PURE__ */ jsx("span", { className: "block text-stroke", children: "that nobody" }),
          /* @__PURE__ */ jsx("span", { className: "block text-signal", children: "would have written." })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "mt-10 max-w-2xl text-bone/60 text-lg leading-relaxed", children: "Feed it a spec. It hallucinates the request payloads your QA team forgot to imagine — boundary edges, malformed unicode, scope-confused JWTs, BOLA chains, refill-timing races — and ships them as runnable Jest, Pytest or k6 files." }),
        /* @__PURE__ */ jsxs("div", { className: "mt-12 flex flex-wrap items-center gap-4", children: [
          /* @__PURE__ */ jsxs("button", { onClick: () => setRunning((r) => !r), className: "group relative border border-signal text-signal px-6 py-3 font-mono text-xs uppercase tracking-[0.25em] hover:bg-signal hover:text-ink transition", children: [
            running ? "■ abort synthesis" : "▶ run synthesis",
            /* @__PURE__ */ jsx("span", { className: "absolute -inset-px border border-signal/30 translate-x-1 translate-y-1 -z-10 group-hover:translate-x-2 group-hover:translate-y-2 transition" })
          ] }),
          /* @__PURE__ */ jsx("span", { className: "font-mono text-xs text-bone/40", children: "expected · ~7s · ~11,959 cases · 2.1 MB" })
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "relative mt-20 px-6 max-w-[1400px] mx-auto pb-24", children: /* @__PURE__ */ jsxs("div", { className: "border border-border bg-card/40 backdrop-blur-xl", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between border-b border-border px-4 py-2 font-mono text-[10px] uppercase tracking-widest text-bone/50", children: [
          /* @__PURE__ */ jsx("span", { children: "~/apiguard/ai/test-synth · intake" }),
          /* @__PURE__ */ jsxs("span", { className: "flex gap-1", children: [
            /* @__PURE__ */ jsx("span", { className: "size-2 rounded-full bg-warn/60" }),
            /* @__PURE__ */ jsx("span", { className: "size-2 rounded-full bg-acid/60" }),
            /* @__PURE__ */ jsx("span", { className: "size-2 rounded-full bg-signal/60" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-[1fr_auto_1fr] gap-0", children: [
          /* @__PURE__ */ jsxs("div", { className: "p-6 font-mono text-xs space-y-3", children: [
            /* @__PURE__ */ jsx("div", { className: "text-bone/40", children: "// 1. point at a spec" }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsx("span", { className: "text-signal", children: "▸" }),
              /* @__PURE__ */ jsx("input", { value: spec, onChange: (e) => setSpec(e.target.value), className: "bg-transparent border-b border-bone/20 focus:border-signal outline-none flex-1 text-bone py-1" })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "text-bone/40 pt-4", children: "// 2. pick exports" }),
            /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-2", children: EXPORTS.map((x, i) => /* @__PURE__ */ jsx("span", { className: `border px-2 py-1 cursor-pointer transition ${i < 3 ? "border-signal text-signal" : "border-bone/20 text-bone/40 hover:border-bone/60 hover:text-bone/70"}`, children: x }, x)) })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "hidden md:block w-px bg-border" }),
          /* @__PURE__ */ jsxs("div", { className: "p-6 font-mono text-xs space-y-1 bg-background/40 max-h-[280px] overflow-hidden", children: [
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
      /* @__PURE__ */ jsx("span", { className: "text-signal", children: p.n }),
      /* @__PURE__ */ jsx("span", { className: "text-bone/80", children: p.k }),
      /* @__PURE__ */ jsx("span", { children: "·" }),
      /* @__PURE__ */ jsx("span", { children: p.v }),
      /* @__PURE__ */ jsx("span", { className: "text-bone/20", children: "//" })
    ] }, i)) }) }),
    /* @__PURE__ */ jsxs("section", { className: "relative px-6 max-w-[1400px] mx-auto py-32", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-end justify-between mb-12 flex-wrap gap-4", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("div", { className: "font-mono text-xs text-signal uppercase tracking-[0.3em] mb-3", children: "[ 02 · case.classes ]" }),
          /* @__PURE__ */ jsxs("h2", { className: "font-display text-5xl md:text-7xl uppercase tracking-tighter leading-[0.9]", children: [
            "six classes.",
            /* @__PURE__ */ jsx("br", {}),
            /* @__PURE__ */ jsx("span", { className: "text-stroke", children: "one synth pass." })
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "font-mono text-xs text-bone/40 max-w-sm", children: "Every endpoint is exploded across six adversarial dimensions in parallel. You ship the ones with the highest risk × novelty score." })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "grid md:grid-cols-3 gap-4", children: CASE_CLASSES.map((c, i) => /* @__PURE__ */ jsx(TiltCard, { className: "group", children: /* @__PURE__ */ jsxs(motion.div, { initial: {
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
        /* @__PURE__ */ jsx("div", { className: "absolute top-0 right-0 font-mono text-[10rem] leading-none text-bone/[0.03] select-none", children: c.code }),
        /* @__PURE__ */ jsxs("div", { className: "relative flex items-start justify-between mb-8", children: [
          /* @__PURE__ */ jsxs("span", { className: "font-mono text-xs uppercase tracking-widest", style: {
            color: c.tone
          }, children: [
            "[ ",
            c.code,
            " ]"
          ] }),
          /* @__PURE__ */ jsx("span", { className: "size-2 rounded-full animate-pulse", style: {
            background: c.tone
          } })
        ] }),
        /* @__PURE__ */ jsx("h3", { className: "relative font-display text-3xl uppercase tracking-tight mb-3", children: c.title }),
        /* @__PURE__ */ jsx("p", { className: "relative text-bone/60 text-sm leading-relaxed mb-6", children: c.desc }),
        /* @__PURE__ */ jsxs("div", { className: "relative flex items-baseline justify-between border-t border-border pt-4 font-mono text-xs", children: [
          /* @__PURE__ */ jsx("span", { className: "text-bone/40", children: "cases generated" }),
          /* @__PURE__ */ jsx("span", { style: {
            color: c.tone
          }, className: "text-2xl font-display", children: c.count.toLocaleString() })
        ] })
      ] }) }, c.code)) })
    ] }),
    /* @__PURE__ */ jsx("section", { className: "relative px-6 max-w-[1400px] mx-auto pb-32", children: /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-[1fr_1.4fr] gap-0 border border-border bg-card/40 backdrop-blur-xl", children: [
      /* @__PURE__ */ jsxs("div", { className: "p-10 border-r border-border", children: [
        /* @__PURE__ */ jsx("div", { className: "font-mono text-xs text-signal uppercase tracking-[0.3em] mb-4", children: "[ 03 · emit ]" }),
        /* @__PURE__ */ jsx("h3", { className: "font-display text-4xl md:text-5xl uppercase tracking-tighter leading-[0.9] mb-6", children: "framework-native. no glue." }),
        /* @__PURE__ */ jsx("p", { className: "text-bone/60 leading-relaxed mb-8", children: "The synthesizer doesn't dump JSON for you to wrap. It writes the actual test file in your framework's idiom — fixtures, hooks, parametrize blocks, the works." }),
        /* @__PURE__ */ jsx("div", { className: "space-y-2 font-mono text-xs", children: [{
          k: "jest",
          v: "describe.each + supertest"
        }, {
          k: "pytest",
          v: "parametrize + httpx"
        }, {
          k: "k6",
          v: "scenarios + thresholds"
        }, {
          k: "postman",
          v: "v2.1 collection + env"
        }].map((x) => /* @__PURE__ */ jsxs("div", { className: "flex justify-between border-b border-border/60 py-2", children: [
          /* @__PURE__ */ jsx("span", { className: "text-bone/50", children: x.k }),
          /* @__PURE__ */ jsx("span", { className: "text-acid", children: x.v })
        ] }, x.k)) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "bg-background/60 font-mono text-xs overflow-hidden", children: [
        /* @__PURE__ */ jsx("div", { className: "flex border-b border-border", children: ["auth_bypass.test.ts", "fuzz_checkout.py", "load_burst.k6.js"].map((f, i) => /* @__PURE__ */ jsx("div", { className: `px-4 py-3 border-r border-border ${i === 0 ? "bg-card text-acid" : "text-bone/40"}`, children: f }, f)) }),
        /* @__PURE__ */ jsxs("pre", { className: "p-6 leading-relaxed text-bone/70 overflow-x-auto", children: [
          `import request from "supertest";
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

// `,
          /* @__PURE__ */ jsx("span", { className: "text-signal", children: "// synthesized · risk 0.91 · novelty 0.77" })
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxs("section", { className: "relative px-6 max-w-[1400px] mx-auto pb-32", children: [
      /* @__PURE__ */ jsx("div", { className: "font-mono text-xs text-signal uppercase tracking-[0.3em] mb-3", children: "[ 04 · risk.matrix ]" }),
      /* @__PURE__ */ jsx("h2", { className: "font-display text-5xl md:text-6xl uppercase tracking-tighter leading-[0.9] mb-10", children: "what broke first." }),
      /* @__PURE__ */ jsxs("div", { className: "border border-border bg-card/40 backdrop-blur-xl", children: [
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-[80px_1fr_120px_120px_100px] font-mono text-[10px] uppercase tracking-widest text-bone/40 border-b border-border", children: [
          /* @__PURE__ */ jsx("div", { className: "p-3", children: "class" }),
          /* @__PURE__ */ jsx("div", { className: "p-3", children: "endpoint" }),
          /* @__PURE__ */ jsx("div", { className: "p-3", children: "risk" }),
          /* @__PURE__ */ jsx("div", { className: "p-3", children: "novelty" }),
          /* @__PURE__ */ jsx("div", { className: "p-3 text-right", children: "status" })
        ] }),
        [{
          c: "AUT",
          e: "GET /v3/orders/{id}",
          r: 0.91,
          n: 0.77,
          s: "FAIL",
          tone: "var(--signal)"
        }, {
          c: "FZZ",
          e: "POST /v3/checkout/express",
          r: 0.84,
          n: 0.92,
          s: "FAIL",
          tone: "var(--signal)"
        }, {
          c: "BND",
          e: "PATCH /users/{id}/quota",
          r: 0.71,
          n: 0.34,
          s: "PASS",
          tone: "var(--acid)"
        }, {
          c: "RCE",
          e: "POST /admin/sql/export",
          r: 0.96,
          n: 0.41,
          s: "FAIL",
          tone: "var(--signal)"
        }, {
          c: "NEG",
          e: "PUT /catalog/{sku}",
          r: 0.52,
          n: 0.18,
          s: "PASS",
          tone: "var(--acid)"
        }, {
          c: "RAT",
          e: "POST /auth/refresh",
          r: 0.68,
          n: 0.81,
          s: "FLAKY",
          tone: "var(--warn)"
        }].map((row, i) => /* @__PURE__ */ jsxs(motion.div, { initial: {
          opacity: 0,
          x: -10
        }, whileInView: {
          opacity: 1,
          x: 0
        }, viewport: {
          once: true
        }, transition: {
          delay: i * 0.05
        }, className: "grid grid-cols-[80px_1fr_120px_120px_100px] font-mono text-xs border-b border-border/60 hover:bg-background/40 transition", children: [
          /* @__PURE__ */ jsx("div", { className: "p-3 text-signal", children: row.c }),
          /* @__PURE__ */ jsx("div", { className: "p-3 text-bone/80", children: row.e }),
          /* @__PURE__ */ jsxs("div", { className: "p-3", children: [
            /* @__PURE__ */ jsx("div", { className: "h-1 bg-bone/10 relative", children: /* @__PURE__ */ jsx("div", { className: "absolute inset-y-0 left-0 bg-signal", style: {
              width: `${row.r * 100}%`
            } }) }),
            /* @__PURE__ */ jsx("div", { className: "text-bone/40 mt-1", children: row.r })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "p-3", children: [
            /* @__PURE__ */ jsx("div", { className: "h-1 bg-bone/10 relative", children: /* @__PURE__ */ jsx("div", { className: "absolute inset-y-0 left-0 bg-acid", style: {
              width: `${row.n * 100}%`
            } }) }),
            /* @__PURE__ */ jsx("div", { className: "text-bone/40 mt-1", children: row.n })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "p-3 text-right", style: {
            color: row.tone
          }, children: row.s })
        ] }, i))
      ] })
    ] }),
    /* @__PURE__ */ jsxs("section", { className: "border-t border-border bg-card/30 backdrop-blur-xl", children: [
      /* @__PURE__ */ jsxs("div", { className: "max-w-[1400px] mx-auto px-6 py-16 grid md:grid-cols-3 gap-8", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("div", { className: "font-mono text-xs text-bone/40 uppercase tracking-widest mb-2", children: "previous module" }),
          /* @__PURE__ */ jsx(Link, { to: "/", className: "font-display text-2xl uppercase hover:text-acid transition", children: "← AI.Docs · generator" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
          /* @__PURE__ */ jsx("div", { className: "font-mono text-xs text-bone/40 uppercase tracking-widest mb-2", children: "return" }),
          /* @__PURE__ */ jsx(Link, { to: "/", className: "font-display text-2xl uppercase hover:text-signal transition", children: "// apiguard.os" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "md:text-right", children: [
          /* @__PURE__ */ jsx("div", { className: "font-mono text-xs text-bone/40 uppercase tracking-widest mb-2", children: "next module" }),
          /* @__PURE__ */ jsx(Link, { to: "/", className: "font-display text-2xl uppercase hover:text-acid transition", children: "AI.Mock · server →" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "border-t border-border px-6 py-4 font-mono text-[10px] uppercase tracking-widest text-bone/30 flex justify-between", children: [
        /* @__PURE__ */ jsx("span", { children: "apiguard // ai.test-synth · built for engineers who don't sleep" }),
        /* @__PURE__ */ jsx("span", { className: "text-signal", children: "● synth-engine nominal" })
      ] })
    ] })
  ] });
}
export {
  TestSynthPage as component
};
