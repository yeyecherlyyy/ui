import { jsxs, jsx } from "react/jsx-runtime";
import { Link } from "@tanstack/react-router";
import { useScroll, useTransform, motion } from "motion/react";
import { useRef, useState } from "react";
import { u as useLenis } from "./use-lenis-CXIvTO8Z.js";
import { T as TiltCard } from "./TiltCard-CepmM0j3.js";
import "lenis";
const PROFILES = [{
  code: "RLZ",
  title: "Realistic",
  desc: "Faker-backed payloads: names, emails, ULIDs, ISO dates, locale-aware.",
  reqs: "12.4k/s",
  tone: "var(--acid)"
}, {
  code: "LAT",
  title: "Latency Shape",
  desc: "p50 / p95 / p99 distributions injected per route. Long-tail tunable.",
  reqs: "p95 118ms",
  tone: "var(--signal)"
}, {
  code: "FAI",
  title: "Failure Injection",
  desc: "5xx storms, partial writes, slow loris, connection resets — chaos on demand.",
  reqs: "0.4% / 4% / 40%",
  tone: "var(--warn)"
}, {
  code: "STA",
  title: "Stateful",
  desc: "POST /x then GET /x/{id} actually returns what you wrote. Resets on demand.",
  reqs: "in-memory · 50 MB",
  tone: "var(--acid)"
}, {
  code: "AUT",
  title: "Auth Shadow",
  desc: "Mimics OAuth2, bearer, API-key, mTLS — including the way real servers reject.",
  reqs: "401 / 403 / 419",
  tone: "var(--signal)"
}, {
  code: "WBH",
  title: "Webhook Replay",
  desc: "Fires outbound webhooks to your dev box on schedule or trigger.",
  reqs: "burst · drip · scheduled",
  tone: "var(--warn)"
}];
const REGIONS = ["us-east", "us-west", "eu-west", "eu-north", "ap-south", "sa-east"];
const STREAM = [{
  t: "00:00.04",
  line: "▸ ingesting openapi.yaml · 247 routes detected",
  tone: "var(--acid)"
}, {
  t: "00:00.11",
  line: "▸ generating faker schemas · 1,204 fields",
  tone: "var(--bone)"
}, {
  t: "00:00.28",
  line: "✦ allocating in-memory store · 50 MB",
  tone: "var(--acid)"
}, {
  t: "00:00.41",
  line: "✦ provisioning edge worker · us-east · eu-west · ap-south",
  tone: "var(--signal)"
}, {
  t: "00:00.62",
  line: "✦ wiring latency profile · p95 = 118ms · jitter 22ms",
  tone: "var(--signal)"
}, {
  t: "00:00.78",
  line: "✦ chaos hooks armed · 0.4% 5xx · 0.1% reset",
  tone: "var(--warn)"
}, {
  t: "00:00.91",
  line: "✓ live @ https://m-9af3.apiguard.dev · 247 routes · stateful",
  tone: "var(--acid)"
}];
const PIPELINE = [{
  n: "01",
  k: "ingest",
  v: "openapi · postman · har"
}, {
  n: "02",
  k: "synth",
  v: "faker schemas per field"
}, {
  n: "03",
  k: "deploy",
  v: "edge worker · 6 regions"
}, {
  n: "04",
  k: "shape",
  v: "latency + failure profile"
}, {
  n: "05",
  k: "expose",
  v: "stable URL · auto-TLS"
}];
const ROUTES = [{
  m: "GET",
  p: "/v3/users",
  s: 200,
  ms: 42,
  tone: "var(--acid)"
}, {
  m: "POST",
  p: "/v3/users",
  s: 201,
  ms: 86,
  tone: "var(--acid)"
}, {
  m: "GET",
  p: "/v3/users/{id}",
  s: 200,
  ms: 51,
  tone: "var(--acid)"
}, {
  m: "PATCH",
  p: "/v3/users/{id}",
  s: 200,
  ms: 94,
  tone: "var(--signal)"
}, {
  m: "DELETE",
  p: "/v3/users/{id}",
  s: 204,
  ms: 38,
  tone: "var(--signal)"
}, {
  m: "POST",
  p: "/v3/checkout/express",
  s: 201,
  ms: 118,
  tone: "var(--acid)"
}, {
  m: "GET",
  p: "/v3/orders/{id}",
  s: 200,
  ms: 67,
  tone: "var(--acid)"
}, {
  m: "POST",
  p: "/v3/auth/token",
  s: 200,
  ms: 22,
  tone: "var(--warn)"
}, {
  m: "GET",
  p: "/v3/admin/billing",
  s: 403,
  ms: 14,
  tone: "var(--warn)"
}];
function MockServerPage() {
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
  const [spec, setSpec] = useState("openapi.yaml");
  const [running, setRunning] = useState(false);
  const [chaos, setChaos] = useState(0.4);
  return /* @__PURE__ */ jsxs("div", { className: "relative bg-transparent text-foreground", children: [
    /* @__PURE__ */ jsx("header", { className: "fixed top-0 inset-x-0 z-50 border-b border-border/60 bg-background/70 backdrop-blur-xl", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between px-6 py-3 font-mono text-xs tracking-widest uppercase", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsx("span", { className: "size-2 bg-warn animate-pulse rounded-full" }),
        /* @__PURE__ */ jsxs(Link, { to: "/", className: "text-bone hover:text-acid", children: [
          "APIGUARD/",
          /* @__PURE__ */ jsx("span", { className: "text-warn", children: "ai.mock" })
        ] }),
        /* @__PURE__ */ jsx("span", { className: "text-bone/40 hidden md:inline", children: "// mock server v1.9 · edge-deployed · 47ms" })
      ] }),
      /* @__PURE__ */ jsx(Link, { to: "/", className: "border border-bone/30 text-bone/70 px-3 py-1 hover:border-acid hover:text-acid transition", children: "← return to OS" })
    ] }) }),
    /* @__PURE__ */ jsxs("section", { ref: heroRef, className: "relative min-h-[110vh] grid-bg overflow-hidden pt-28", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute inset-0 scan-lines opacity-30 pointer-events-none" }),
      /* @__PURE__ */ jsx("div", { className: "absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-warn to-transparent" }),
      /* @__PURE__ */ jsx(motion.div, { style: {
        rotate: rotGlyph
      }, className: "absolute right-[-180px] top-[20%] size-[520px] border border-warn/30 rounded-full pointer-events-none" }),
      /* @__PURE__ */ jsx(motion.div, { style: {
        rotate: rotGlyph2
      }, className: "absolute right-[-80px] top-[28%] size-[360px] border border-acid/20 rounded-full pointer-events-none" }),
      /* @__PURE__ */ jsxs(motion.div, { style: {
        y: yTitle,
        opacity: opTitle
      }, className: "relative px-6 max-w-[1400px] mx-auto pt-12", children: [
        /* @__PURE__ */ jsx("div", { className: "font-mono text-xs text-warn uppercase tracking-[0.3em] mb-6", children: "[ ai.module · 03/03 · one-click mock server ]" }),
        /* @__PURE__ */ jsxs("h1", { className: "font-display text-[14vw] md:text-[10vw] leading-[0.82] uppercase tracking-tighter", children: [
          /* @__PURE__ */ jsx("span", { className: "block", children: "a fake api" }),
          /* @__PURE__ */ jsx("span", { className: "block text-stroke", children: "that lies" }),
          /* @__PURE__ */ jsx("span", { className: "block text-warn", children: "convincingly." })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "mt-10 max-w-2xl text-bone/60 text-lg leading-relaxed", children: "Throw it a spec. In under a second it stands up a stateful, faker-backed, latency-shaped, chaos-armed clone of your API on a stable HTTPS URL — so your frontend, your tests, and your demos stop waiting on the backend team." }),
        /* @__PURE__ */ jsxs("div", { className: "mt-12 flex flex-wrap items-center gap-4", children: [
          /* @__PURE__ */ jsxs("button", { onClick: () => setRunning((r) => !r), className: "group relative border border-warn text-warn px-6 py-3 font-mono text-xs uppercase tracking-[0.25em] hover:bg-warn hover:text-ink transition", children: [
            running ? "■ tear down" : "▶ one-click deploy",
            /* @__PURE__ */ jsx("span", { className: "absolute -inset-px border border-warn/30 translate-x-1 translate-y-1 -z-10 group-hover:translate-x-2 group-hover:translate-y-2 transition" })
          ] }),
          /* @__PURE__ */ jsx("span", { className: "font-mono text-xs text-bone/40", children: "expected · ~1s · 247 routes · 6 regions · auto-TLS" })
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "relative mt-20 px-6 max-w-[1400px] mx-auto pb-24", children: /* @__PURE__ */ jsxs("div", { className: "border border-border bg-card/40 backdrop-blur-xl", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between border-b border-border px-4 py-2 font-mono text-[10px] uppercase tracking-widest text-bone/50", children: [
          /* @__PURE__ */ jsx("span", { children: "~/apiguard/ai/mock-server · intake" }),
          /* @__PURE__ */ jsxs("span", { className: "flex gap-1", children: [
            /* @__PURE__ */ jsx("span", { className: "size-2 rounded-full bg-acid/60" }),
            /* @__PURE__ */ jsx("span", { className: "size-2 rounded-full bg-signal/60" }),
            /* @__PURE__ */ jsx("span", { className: "size-2 rounded-full bg-warn/60" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-[1fr_auto_1fr] gap-0", children: [
          /* @__PURE__ */ jsxs("div", { className: "p-6 font-mono text-xs space-y-3", children: [
            /* @__PURE__ */ jsx("div", { className: "text-bone/40", children: "// 1. point at a spec" }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsx("span", { className: "text-warn", children: "▸" }),
              /* @__PURE__ */ jsx("input", { value: spec, onChange: (e) => setSpec(e.target.value), className: "bg-transparent border-b border-bone/20 focus:border-warn outline-none flex-1 text-bone py-1" })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "text-bone/40 pt-4", children: "// 2. deploy regions" }),
            /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-2", children: REGIONS.map((r, i) => /* @__PURE__ */ jsx("span", { className: `border px-2 py-1 cursor-pointer transition ${i < 3 ? "border-warn text-warn" : "border-bone/20 text-bone/40 hover:border-bone/60 hover:text-bone/70"}`, children: r }, r)) }),
            /* @__PURE__ */ jsxs("div", { className: "text-bone/40 pt-4", children: [
              "// 3. chaos · ",
              (chaos * 100).toFixed(1),
              "% 5xx"
            ] }),
            /* @__PURE__ */ jsx("input", { type: "range", min: 0, max: 40, step: 0.5, value: chaos * 100, onChange: (e) => setChaos(Number(e.target.value) / 100), className: "w-full accent-warn" }),
            /* @__PURE__ */ jsxs("div", { className: "flex justify-between text-[10px] text-bone/40", children: [
              /* @__PURE__ */ jsx("span", { children: "calm" }),
              /* @__PURE__ */ jsx("span", { children: "angry" }),
              /* @__PURE__ */ jsx("span", { children: "apocalypse" })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "text-bone/40 pt-4", children: "// 4. live URL" }),
            /* @__PURE__ */ jsx("div", { className: "border border-border bg-background/40 p-2 text-acid", children: "https://m-9af3.apiguard.dev" })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "hidden md:block w-px bg-border" }),
          /* @__PURE__ */ jsxs("div", { className: "p-6 font-mono text-xs space-y-1 bg-background/40 max-h-[360px] overflow-hidden", children: [
            STREAM.map((s, i) => /* @__PURE__ */ jsxs(motion.div, { initial: {
              opacity: 0,
              x: -8
            }, animate: {
              opacity: running ? 1 : 0.35,
              x: 0
            }, transition: {
              delay: running ? i * 0.18 : 0
            }, className: "flex gap-3", children: [
              /* @__PURE__ */ jsx("span", { className: "text-bone/30", children: s.t }),
              /* @__PURE__ */ jsx("span", { style: {
                color: s.tone
              }, children: s.line })
            ] }, s.t)),
            /* @__PURE__ */ jsxs("div", { className: "text-warn", children: [
              "▸ awaiting deploy",
              /* @__PURE__ */ jsx("span", { className: "cursor-blink", children: "_" })
            ] })
          ] })
        ] })
      ] }) })
    ] }),
    /* @__PURE__ */ jsx("section", { className: "relative border-y border-border bg-card/30 backdrop-blur-xl overflow-hidden", children: /* @__PURE__ */ jsx("div", { className: "flex marquee-track whitespace-nowrap py-4 font-mono text-xs uppercase tracking-[0.3em] text-bone/40", children: [...PIPELINE, ...PIPELINE, ...PIPELINE].map((p, i) => /* @__PURE__ */ jsxs("span", { className: "px-8 flex items-center gap-3", children: [
      /* @__PURE__ */ jsx("span", { className: "text-warn", children: p.n }),
      /* @__PURE__ */ jsx("span", { className: "text-bone/80", children: p.k }),
      /* @__PURE__ */ jsx("span", { children: "·" }),
      /* @__PURE__ */ jsx("span", { children: p.v }),
      /* @__PURE__ */ jsx("span", { className: "text-bone/20", children: "//" })
    ] }, i)) }) }),
    /* @__PURE__ */ jsxs("section", { className: "relative px-6 max-w-[1400px] mx-auto py-32", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-end justify-between mb-12 flex-wrap gap-4", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("div", { className: "font-mono text-xs text-warn uppercase tracking-[0.3em] mb-3", children: "[ 02 · profiles ]" }),
          /* @__PURE__ */ jsxs("h2", { className: "font-display text-5xl md:text-7xl uppercase tracking-tighter leading-[0.9]", children: [
            "six dials.",
            /* @__PURE__ */ jsx("br", {}),
            /* @__PURE__ */ jsx("span", { className: "text-stroke", children: "one fake stack." })
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "font-mono text-xs text-bone/40 max-w-sm", children: "Every mock server is the same six dials. Twist them per route, per method, per consumer — and your frontend finally gets a backend that behaves the way production actually does." })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "grid md:grid-cols-3 gap-4", children: PROFILES.map((p, i) => /* @__PURE__ */ jsx(TiltCard, { className: "group", children: /* @__PURE__ */ jsxs(motion.div, { initial: {
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
        /* @__PURE__ */ jsx("div", { className: "absolute top-0 right-0 font-mono text-[10rem] leading-none text-bone/[0.03] select-none", children: p.code }),
        /* @__PURE__ */ jsxs("div", { className: "relative flex items-start justify-between mb-8", children: [
          /* @__PURE__ */ jsxs("span", { className: "font-mono text-xs uppercase tracking-widest", style: {
            color: p.tone
          }, children: [
            "[ ",
            p.code,
            " ]"
          ] }),
          /* @__PURE__ */ jsx("span", { className: "size-2 rounded-full animate-pulse", style: {
            background: p.tone
          } })
        ] }),
        /* @__PURE__ */ jsx("h3", { className: "relative font-display text-3xl uppercase tracking-tight mb-3", children: p.title }),
        /* @__PURE__ */ jsx("p", { className: "relative text-bone/60 text-sm leading-relaxed mb-6", children: p.desc }),
        /* @__PURE__ */ jsxs("div", { className: "relative flex items-baseline justify-between border-t border-border pt-4 font-mono text-xs", children: [
          /* @__PURE__ */ jsx("span", { className: "text-bone/40", children: "profile" }),
          /* @__PURE__ */ jsx("span", { style: {
            color: p.tone
          }, className: "font-display text-lg", children: p.reqs })
        ] })
      ] }) }, p.code)) })
    ] }),
    /* @__PURE__ */ jsxs("section", { className: "relative px-6 max-w-[1400px] mx-auto pb-32", children: [
      /* @__PURE__ */ jsx("div", { className: "font-mono text-xs text-warn uppercase tracking-[0.3em] mb-3", children: "[ 03 · live.routes ]" }),
      /* @__PURE__ */ jsx("h2", { className: "font-display text-5xl md:text-6xl uppercase tracking-tighter leading-[0.9] mb-10", children: "247 routes. all answering." }),
      /* @__PURE__ */ jsxs("div", { className: "border border-border bg-card/40 backdrop-blur-xl", children: [
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-[100px_1fr_100px_120px] font-mono text-[10px] uppercase tracking-widest text-bone/40 border-b border-border", children: [
          /* @__PURE__ */ jsx("div", { className: "p-3", children: "method" }),
          /* @__PURE__ */ jsx("div", { className: "p-3", children: "path" }),
          /* @__PURE__ */ jsx("div", { className: "p-3", children: "status" }),
          /* @__PURE__ */ jsx("div", { className: "p-3 text-right", children: "latency" })
        ] }),
        ROUTES.map((r, i) => /* @__PURE__ */ jsxs(motion.div, { initial: {
          opacity: 0,
          x: -10
        }, whileInView: {
          opacity: 1,
          x: 0
        }, viewport: {
          once: true
        }, transition: {
          delay: i * 0.04
        }, className: "grid grid-cols-[100px_1fr_100px_120px] font-mono text-xs border-b border-border/60 hover:bg-background/40 transition", children: [
          /* @__PURE__ */ jsx("div", { className: "p-3", style: {
            color: r.tone
          }, children: r.m }),
          /* @__PURE__ */ jsx("div", { className: "p-3 text-bone/80", children: r.p }),
          /* @__PURE__ */ jsx("div", { className: "p-3 text-acid", children: r.s }),
          /* @__PURE__ */ jsxs("div", { className: "p-3 text-right text-bone/60", children: [
            r.ms,
            "ms"
          ] })
        ] }, i))
      ] })
    ] }),
    /* @__PURE__ */ jsx("section", { className: "relative px-6 max-w-[1400px] mx-auto pb-32", children: /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-[1fr_1.4fr] gap-0 border border-border bg-card/40 backdrop-blur-xl", children: [
      /* @__PURE__ */ jsxs("div", { className: "p-10 border-r border-border", children: [
        /* @__PURE__ */ jsx("div", { className: "font-mono text-xs text-warn uppercase tracking-[0.3em] mb-4", children: "[ 04 · hit it ]" }),
        /* @__PURE__ */ jsxs("h3", { className: "font-display text-4xl md:text-5xl uppercase tracking-tighter leading-[0.9] mb-6", children: [
          "curl it now.",
          /* @__PURE__ */ jsx("br", {}),
          "it answers."
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-bone/60 leading-relaxed mb-8", children: "The mock URL is stable. Bake it into your CI, your Storybook, your demo deck. Tear it down with one click — or leave it running for a week. Costs nothing when idle." }),
        /* @__PURE__ */ jsx("div", { className: "space-y-2 font-mono text-xs", children: [{
          k: "url",
          v: "https://m-9af3.apiguard.dev"
        }, {
          k: "tls",
          v: "auto · LE · pinned"
        }, {
          k: "cors",
          v: "* · per-origin override"
        }, {
          k: "cost",
          v: "$0 idle · $0.40 / 1M req"
        }].map((x) => /* @__PURE__ */ jsxs("div", { className: "flex justify-between border-b border-border/60 py-2", children: [
          /* @__PURE__ */ jsx("span", { className: "text-bone/50", children: x.k }),
          /* @__PURE__ */ jsx("span", { className: "text-acid", children: x.v })
        ] }, x.k)) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "bg-background/60 font-mono text-xs overflow-hidden", children: [
        /* @__PURE__ */ jsx("div", { className: "flex border-b border-border", children: ["request.sh", "response.json", "headers.txt"].map((f, i) => /* @__PURE__ */ jsx("div", { className: `px-4 py-3 border-r border-border ${i === 0 ? "bg-card text-warn" : "text-bone/40"}`, children: f }, f)) }),
        /* @__PURE__ */ jsxs("pre", { className: "p-6 leading-relaxed text-bone/70 overflow-x-auto", children: [
          `$ curl https://m-9af3.apiguard.dev/v3/users/usr_8f3a

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

# `,
          /* @__PURE__ */ jsx("span", { className: "text-warn", children: "// faker-backed · stateful · 51ms · region eu-west" })
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "border-t border-border bg-card/30 backdrop-blur-xl", children: /* @__PURE__ */ jsxs("div", { className: "max-w-[1400px] mx-auto px-6 py-16 grid md:grid-cols-3 gap-8", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("div", { className: "font-mono text-xs text-bone/40 uppercase tracking-widest mb-2", children: "previous module" }),
        /* @__PURE__ */ jsx(Link, { to: "/ai/test-synth", className: "font-display text-2xl uppercase hover:text-signal transition", children: "← AI.Tests · synthesizer" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
        /* @__PURE__ */ jsx("div", { className: "font-mono text-xs text-bone/40 uppercase tracking-widest mb-2", children: "return" }),
        /* @__PURE__ */ jsx(Link, { to: "/", className: "font-display text-2xl uppercase hover:text-acid transition", children: "// apiguard.os" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "text-right", children: [
        /* @__PURE__ */ jsx("div", { className: "font-mono text-xs text-bone/40 uppercase tracking-widest mb-2", children: "also" }),
        /* @__PURE__ */ jsx(Link, { to: "/ai/docs-gen", className: "font-display text-2xl uppercase hover:text-acid transition", children: "AI.Docs · generator →" })
      ] })
    ] }) })
  ] });
}
export {
  MockServerPage as component
};
