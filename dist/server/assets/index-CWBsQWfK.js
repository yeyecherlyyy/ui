import { jsx, jsxs } from "react/jsx-runtime";
import { useScroll, useTransform, motion } from "motion/react";
import { useRef, useState, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { T as TiltCard } from "./TiltCard-CepmM0j3.js";
import { u as useLenis } from "./use-lenis-CXIvTO8Z.js";
import { u as useAppStore } from "./router-DwgKz4jV.js";
import "lenis";
import "@tanstack/react-query";
import "zustand";
import "zustand/middleware";
const FACES = [
  { label: "GET /v1/users", tone: "acid" },
  { label: "POST /auth/login", tone: "signal" },
  { label: "DELETE /key/42", tone: "warn" },
  { label: "PATCH /scan/run", tone: "acid" },
  { label: "GET /health", tone: "bone" },
  { label: "POST /webhook", tone: "signal" }
];
function CubeHero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });
  const rotX = useTransform(scrollYProgress, [0, 1], [-18, 180]);
  const rotY = useTransform(scrollYProgress, [0, 1], [28, 420]);
  return /* @__PURE__ */ jsx("div", { ref, className: "relative", style: { perspective: "1400px" }, children: /* @__PURE__ */ jsx(
    motion.div,
    {
      className: "relative mx-auto",
      style: {
        width: 280,
        height: 280,
        transformStyle: "preserve-3d",
        rotateX: rotX,
        rotateY: rotY
      },
      animate: { rotateZ: [0, 4, -4, 0] },
      transition: { duration: 12, repeat: Infinity, ease: "easeInOut" },
      children: FACES.map((f, i) => {
        const transforms = [
          "translateZ(140px)",
          "rotateY(180deg) translateZ(140px)",
          "rotateY(90deg) translateZ(140px)",
          "rotateY(-90deg) translateZ(140px)",
          "rotateX(90deg) translateZ(140px)",
          "rotateX(-90deg) translateZ(140px)"
        ];
        const color = f.tone === "acid" ? "var(--acid)" : f.tone === "signal" ? "var(--signal)" : f.tone === "warn" ? "var(--warn)" : "var(--bone)";
        return /* @__PURE__ */ jsxs(
          "div",
          {
            className: "absolute inset-0 border-2 flex flex-col justify-between p-4 backdrop-blur-sm",
            style: {
              transform: transforms[i],
              borderColor: color,
              background: `linear-gradient(135deg, color-mix(in oklab, ${color} 8%, transparent), transparent)`,
              boxShadow: `inset 0 0 60px color-mix(in oklab, ${color} 15%, transparent)`
            },
            children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between font-mono text-[10px] tracking-widest text-bone/60", children: [
                /* @__PURE__ */ jsxs("span", { children: [
                  "FACE_",
                  String(i).padStart(2, "0")
                ] }),
                /* @__PURE__ */ jsx(
                  "span",
                  {
                    className: "size-2 rounded-full",
                    style: { background: color }
                  }
                )
              ] }),
              /* @__PURE__ */ jsx("div", { className: "font-mono text-sm", style: { color }, children: f.label }),
              /* @__PURE__ */ jsxs("div", { className: "font-mono text-[10px] text-bone/40 leading-relaxed", children: [
                "200 OK · 42ms",
                /* @__PURE__ */ jsx("br", {}),
                "lat p95 · 118ms",
                /* @__PURE__ */ jsx("br", {}),
                "err 0.01%"
              ] })
            ]
          },
          i
        );
      })
    }
  ) });
}
const CORE = [{
  code: "01",
  slug: "surface-scanner",
  title: "Surface Scanner",
  desc: "Continuous CVE + OWASP API top-10 sweeps. Live security score per endpoint.",
  glyph: "◉"
}, {
  code: "02",
  slug: "openapi-inhaler",
  title: "OpenAPI Inhaler",
  desc: "Drop a Swagger/OpenAPI/Postman file. We crawl, diff, normalize.",
  glyph: "⬢"
}, {
  code: "03",
  slug: "repo-bridge",
  title: "Repo Bridge",
  desc: "Connect GitHub. Auto-pull specs from PRs. Wire Actions or Jenkins.",
  glyph: "⟁"
}, {
  code: "04",
  slug: "forensic-pdf",
  title: "Forensic PDF",
  desc: "One-click signed report. Auditors love it. Lawyers tolerate it.",
  glyph: "▤"
}, {
  code: "05",
  slug: "change-radar",
  title: "Change Radar",
  desc: "Endpoint added, auth changed, contract broken — pinged before users notice.",
  glyph: "⟴"
}, {
  code: "06",
  slug: "health-pulse",
  title: "Health Pulse",
  desc: "Uptime, latency, error rates rolled into a single twitchy heartbeat.",
  glyph: "♡"
}];
const AI_STACK = [{
  tag: "AI.DOCS",
  title: "Documentation Generator",
  body: "Point at a base URL. Get a fully-narrated, sectioned docs site in 90 seconds — endpoints, examples, edge cases."
}, {
  tag: "AI.TESTS",
  title: "Test Case Synthesizer",
  body: "Generates negative, fuzz, boundary and auth-bypass cases from spec. Exports to Jest, Pytest, k6."
}, {
  tag: "AI.MOCK",
  title: "One-Click Mock Server",
  body: "Spin up a realistic fake of any API. Faker-backed payloads, latency profiles, failure injection."
}];
const LOAD_TIERS = [{
  users: "100",
  note: "morning standup",
  color: "var(--acid)"
}, {
  users: "1,000",
  note: "product launch",
  color: "var(--warn)"
}, {
  users: "10,000",
  note: "viral incident",
  color: "var(--signal)"
}];
const CHANGES = [{
  kind: "ADDED",
  path: "POST /v3/checkout/express",
  t: "2s ago",
  tone: "var(--acid)"
}, {
  kind: "REMOVED",
  path: "GET /legacy/users/{id}/profile",
  t: "11m ago",
  tone: "var(--signal)"
}, {
  kind: "AUTH·CHG",
  path: "PATCH /admin/billing → Bearer",
  t: "1h ago",
  tone: "var(--warn)"
}, {
  kind: "BREAK",
  path: "GET /search?q now required",
  t: "3h ago",
  tone: "var(--signal)"
}];
function Index() {
  useLenis();
  const containerRef = useRef(null);
  const {
    scrollYProgress
  } = useScroll();
  const titleY = useTransform(scrollYProgress, [0, 0.2], [0, -200]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const {
    setModal
  } = useAppStore();
  return /* @__PURE__ */ jsxs("div", { ref: containerRef, className: "relative bg-transparent text-foreground", children: [
    /* @__PURE__ */ jsx(SideNav, {}),
    /* @__PURE__ */ jsxs("section", { id: "hero", className: "relative min-h-[120vh] grid-bg overflow-hidden pt-24", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute inset-0 scan-lines opacity-30 pointer-events-none" }),
      /* @__PURE__ */ jsx("div", { className: "absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-acid to-transparent" }),
      /* @__PURE__ */ jsxs(motion.div, { style: {
        y: titleY,
        opacity: titleOpacity
      }, className: "relative z-10 px-6 pt-16 max-w-[1400px] mx-auto", children: [
        /* @__PURE__ */ jsxs("div", { className: "font-mono text-xs text-bone/50 mb-8 flex items-center gap-4", children: [
          /* @__PURE__ */ jsx("span", { className: "border border-bone/30 px-2 py-1", children: "[ SYS.BOOT ]" }),
          /* @__PURE__ */ jsxs("span", { children: [
            "initializing perimeter sweep",
            /* @__PURE__ */ jsx("span", { className: "cursor-blink", children: "_" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("h1", { className: "font-display text-[clamp(3rem,11vw,11rem)] leading-[0.85] tracking-tight uppercase", children: [
          /* @__PURE__ */ jsx("span", { className: "block", children: "Every API" }),
          /* @__PURE__ */ jsx("span", { className: "block text-stroke", children: "you ship is" }),
          /* @__PURE__ */ jsxs("span", { className: "block", children: [
            "a",
            " ",
            /* @__PURE__ */ jsx("span", { className: "text-acid italic font-serif lowercase", children: "liability." })
          ] }),
          /* @__PURE__ */ jsx("span", { className: "block text-bone/30", children: "we fix that." })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "mt-12 grid md:grid-cols-[1.4fr_1fr] gap-12 items-end", children: [
          /* @__PURE__ */ jsx("p", { className: "text-bone/70 text-lg md:text-xl max-w-xl leading-relaxed", children: "APIGUARD is a brutalist control plane for API security, observability, mocking and load — wired straight into your repo, your CI, and your conscience." }),
          /* @__PURE__ */ jsxs("div", { className: "font-mono text-xs text-bone/50 grid grid-cols-3 gap-4 border-t border-border pt-4", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("div", { className: "text-acid text-2xl font-display", children: "12.4k" }),
              "endpoints scanned"
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("div", { className: "text-signal text-2xl font-display", children: "3.1M" }),
              "requests/min"
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("div", { className: "text-warn text-2xl font-display", children: "99.99%" }),
              "uptime sla"
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "absolute right-[6%] top-[28%] hidden lg:block", children: /* @__PURE__ */ jsx(CubeHero, {}) }),
      /* @__PURE__ */ jsx("div", { className: "absolute bottom-0 inset-x-0 border-t border-border bg-background/40 backdrop-blur-xl overflow-hidden", children: /* @__PURE__ */ jsx("div", { className: "flex marquee-track whitespace-nowrap py-3 font-mono text-sm uppercase", children: Array.from({
        length: 2
      }).map((_, k) => /* @__PURE__ */ jsx("div", { className: "flex shrink-0", children: ["scan", "diff", "mock", "monitor", "load·test", "auto·doc", "openapi", "postman", "jenkins", "github·actions", "ci/cd", "owasp·top10"].map((w) => /* @__PURE__ */ jsxs("span", { className: "px-8 flex items-center gap-8 text-bone/60", children: [
        w,
        " ",
        /* @__PURE__ */ jsx("span", { className: "text-acid", children: "◇" })
      ] }, w + k)) }, k)) }) })
    ] }),
    /* @__PURE__ */ jsxs("section", { id: "scan", className: "relative px-6 py-32 max-w-[1400px] mx-auto", children: [
      /* @__PURE__ */ jsx(SectionHead, { n: "00", label: "control.plane", title: "A dashboard that talks back." }),
      /* @__PURE__ */ jsx(DashboardMock, {})
    ] }),
    /* @__PURE__ */ jsxs("section", { id: "modules", className: "relative px-6 py-32 max-w-[1400px] mx-auto", children: [
      /* @__PURE__ */ jsx(SectionHead, { n: "01", label: "core.modules", title: "Six instruments. One console." }),
      /* @__PURE__ */ jsx("div", { className: "grid md:grid-cols-3 gap-4 mt-12", style: {
        perspective: 1500
      }, children: CORE.map((f) => /* @__PURE__ */ jsx(TiltCard, { className: "group", children: /* @__PURE__ */ jsxs(Link, { to: "/module/$slug", params: {
        slug: f.slug
      }, className: "relative block border border-border bg-card/40 backdrop-blur-xl p-8 h-[280px] overflow-hidden hover:border-acid transition-colors", children: [
        /* @__PURE__ */ jsx("div", { className: "absolute top-0 right-0 text-[8rem] leading-none text-bone/[0.04] font-display font-bold", children: f.code }),
        /* @__PURE__ */ jsxs("div", { className: "relative flex flex-col justify-between h-full", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between font-mono text-xs text-bone/40", children: [
            /* @__PURE__ */ jsxs("span", { children: [
              "MOD.",
              f.code
            ] }),
            /* @__PURE__ */ jsx("span", { className: "text-acid text-xl", children: f.glyph })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h3", { className: "font-display text-2xl uppercase tracking-tight mb-2 group-hover:text-acid transition-colors", children: f.title }),
            /* @__PURE__ */ jsx("p", { className: "text-bone/60 text-sm leading-relaxed", children: f.desc })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "font-mono text-[10px] text-acid/70 flex items-center gap-2", children: [
            /* @__PURE__ */ jsx("div", { className: "h-px flex-1 bg-acid/30" }),
            /* @__PURE__ */ jsx("span", { children: "OPEN →" })
          ] })
        ] })
      ] }) }, f.code)) })
    ] }),
    /* @__PURE__ */ jsxs("section", { id: "ai", className: "relative", children: [
      /* @__PURE__ */ jsx("div", { className: "px-6 max-w-[1400px] mx-auto pt-24", children: /* @__PURE__ */ jsx(SectionHead, { n: "02", label: "intelligence.layer", title: "The model does the boring half." }) }),
      AI_STACK.map((item, i) => /* @__PURE__ */ jsx(AIPanel, { item, index: i }, item.tag))
    ] }),
    /* @__PURE__ */ jsxs("section", { id: "load", className: "relative px-6 py-32 max-w-[1400px] mx-auto", children: [
      /* @__PURE__ */ jsx(SectionHead, { n: "03", label: "load.simulation", title: "Punch your API. See what breaks." }),
      /* @__PURE__ */ jsx("div", { className: "grid md:grid-cols-3 gap-6 mt-12", children: LOAD_TIERS.map((t, i) => /* @__PURE__ */ jsxs(motion.div, { initial: {
        opacity: 0,
        y: 60,
        rotateX: -15
      }, whileInView: {
        opacity: 1,
        y: 0,
        rotateX: 0
      }, viewport: {
        once: true,
        margin: "-100px"
      }, transition: {
        duration: 0.7,
        delay: i * 0.12
      }, className: "relative border-2 p-8 aspect-[3/4] flex flex-col justify-between overflow-hidden bg-card/30 backdrop-blur-xl", style: {
        borderColor: t.color,
        background: `radial-gradient(circle at top right, color-mix(in oklab, ${t.color} 15%, transparent), transparent 60%)`
      }, children: [
        /* @__PURE__ */ jsxs("div", { className: "font-mono text-xs uppercase", style: {
          color: t.color
        }, children: [
          "TIER ",
          String(i + 1).padStart(2, "0")
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("div", { className: "font-display text-[6rem] leading-none tracking-tighter", style: {
            color: t.color
          }, children: t.users }),
          /* @__PURE__ */ jsx("div", { className: "text-bone/60 uppercase tracking-widest text-xs mt-2", children: "concurrent users" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-2 font-mono text-xs text-bone/60", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex justify-between", children: [
            /* @__PURE__ */ jsx("span", { children: "scenario" }),
            /* @__PURE__ */ jsx("span", { className: "text-bone", children: t.note })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex justify-between", children: [
            /* @__PURE__ */ jsx("span", { children: "duration" }),
            /* @__PURE__ */ jsx("span", { className: "text-bone", children: "5m / 15m / 1h" })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "h-1 bg-bone/10 mt-3", children: /* @__PURE__ */ jsx(motion.div, { className: "h-full", style: {
            background: t.color
          }, initial: {
            width: 0
          }, whileInView: {
            width: `${30 + i * 30}%`
          }, viewport: {
            once: true
          }, transition: {
            duration: 1.2,
            delay: 0.4
          } }) })
        ] })
      ] }, t.users)) })
    ] }),
    /* @__PURE__ */ jsxs("section", { id: "changes", className: "relative px-6 py-32 max-w-[1400px] mx-auto", children: [
      /* @__PURE__ */ jsx(SectionHead, { n: "04", label: "diff.radar", title: "The world's most paranoid changelog." }),
      /* @__PURE__ */ jsxs("div", { className: "mt-12 border border-border bg-card/40 backdrop-blur-xl", children: [
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-[100px_1fr_120px] gap-4 px-6 py-3 border-b border-border font-mono text-[10px] text-bone/40 uppercase tracking-widest", children: [
          /* @__PURE__ */ jsx("span", { children: "event" }),
          /* @__PURE__ */ jsx("span", { children: "endpoint" }),
          /* @__PURE__ */ jsx("span", { className: "text-right", children: "timestamp" })
        ] }),
        CHANGES.map((c, i) => /* @__PURE__ */ jsxs(motion.div, { initial: {
          opacity: 0,
          x: -40
        }, whileInView: {
          opacity: 1,
          x: 0
        }, viewport: {
          once: true
        }, transition: {
          delay: i * 0.08
        }, className: "grid grid-cols-[100px_1fr_120px] gap-4 px-6 py-5 border-b border-border/50 hover:bg-bone/[0.02] items-center group", children: [
          /* @__PURE__ */ jsx("span", { className: "font-mono text-[11px] font-bold tracking-wider", style: {
            color: c.tone
          }, children: c.kind }),
          /* @__PURE__ */ jsx("span", { className: "font-mono text-sm text-bone group-hover:text-acid transition-colors", children: c.path }),
          /* @__PURE__ */ jsx("span", { className: "font-mono text-xs text-bone/40 text-right", children: c.t })
        ] }, i))
      ] })
    ] }),
    /* @__PURE__ */ jsxs("section", { className: "relative py-24 border-y border-border overflow-hidden", children: [
      /* @__PURE__ */ jsx("div", { className: "px-6 max-w-[1400px] mx-auto mb-12", children: /* @__PURE__ */ jsx("div", { className: "font-mono text-xs text-bone/40 uppercase tracking-widest", children: "// connected to your stack" }) }),
      /* @__PURE__ */ jsx("div", { className: "flex marquee-track gap-16 font-display text-5xl md:text-7xl uppercase whitespace-nowrap", children: Array.from({
        length: 2
      }).map((_, k) => ["GitHub", "Jenkins", "Postman", "Swagger", "OpenAPI", "k6", "Datadog", "Slack", "PagerDuty"].map((b) => {
        const clickable = ["GitHub", "Jenkins", "Postman", "Swagger"].includes(b);
        const kindMap = {
          GitHub: "github",
          Jenkins: "jenkins",
          Postman: "postman",
          Swagger: "swagger"
        };
        return /* @__PURE__ */ jsxs("button", { onClick: () => clickable && setModal(kindMap[b]), className: `text-bone/20 hover:text-acid transition-colors flex items-center gap-16 bg-transparent border-none p-0 m-0 font-display ${clickable ? "cursor-pointer" : "cursor-default"}`, children: [
          b,
          " ",
          /* @__PURE__ */ jsx("span", { className: "text-acid/40", children: "/" })
        ] }, b + k);
      })) })
    ] }),
    /* @__PURE__ */ jsxs("section", { className: "relative px-6 py-40 max-w-[1400px] mx-auto text-center", children: [
      /* @__PURE__ */ jsxs(motion.h2, { initial: {
        opacity: 0,
        scale: 0.9
      }, whileInView: {
        opacity: 1,
        scale: 1
      }, viewport: {
        once: true
      }, transition: {
        duration: 0.8
      }, className: "font-display text-[clamp(3rem,10vw,9rem)] leading-[0.85] uppercase tracking-tight", children: [
        "Ship",
        /* @__PURE__ */ jsx("br", {}),
        /* @__PURE__ */ jsx("span", { className: "text-acid italic font-serif lowercase", children: "without" }),
        /* @__PURE__ */ jsx("br", {}),
        /* @__PURE__ */ jsx("span", { className: "text-stroke", children: "flinching." })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mt-12 flex flex-wrap justify-center gap-4", children: [
        /* @__PURE__ */ jsx("button", { onClick: () => setModal("scan"), className: "bg-acid text-ink px-8 py-4 font-mono text-sm uppercase tracking-widest hover:bg-bone transition", children: "start.scan()" }),
        /* @__PURE__ */ jsx("button", { onClick: () => setModal("demo"), className: "border border-bone/40 text-bone px-8 py-4 font-mono text-sm uppercase tracking-widest hover:border-acid hover:text-acid transition", children: "book.demo()" })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("footer", { className: "border-t border-border px-6 py-8 font-mono text-xs text-bone/40 flex flex-wrap items-center justify-between gap-4 bg-background/40 backdrop-blur-xl", children: [
      /* @__PURE__ */ jsx("div", { children: "APIGUARD // api.os · built for engineers who don't sleep" }),
      /* @__PURE__ */ jsxs("div", { className: "flex gap-6", children: [
        /* @__PURE__ */ jsxs("span", { children: [
          "status: ",
          /* @__PURE__ */ jsx("span", { className: "text-acid", children: "operational" })
        ] }),
        /* @__PURE__ */ jsx("span", { children: "region: global·edge" }),
        /* @__PURE__ */ jsx("span", { children: "© 2026" })
      ] })
    ] })
  ] });
}
function SideNav() {
  const [active, setActive] = useState("hero");
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActive(entry.target.id);
        }
      });
    }, {
      threshold: 0.3
    });
    const sections = ["hero", "scan", "modules", "ai", "load", "changes"];
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);
  const links = [{
    id: "hero",
    label: "00"
  }, {
    id: "scan",
    label: "01"
  }, {
    id: "modules",
    label: "02"
  }, {
    id: "ai",
    label: "03"
  }, {
    id: "load",
    label: "04"
  }, {
    id: "changes",
    label: "05"
  }];
  return /* @__PURE__ */ jsx("div", { className: "fixed left-6 top-1/2 -translate-y-1/2 z-50 hidden xl:flex flex-col gap-4", children: links.map((l) => /* @__PURE__ */ jsxs("a", { href: `#${l.id}`, className: "group flex items-center justify-start gap-3", "aria-label": l.id, children: [
    /* @__PURE__ */ jsx("div", { className: `w-0.5 transition-all duration-300 ${active === l.id ? "h-8 bg-acid" : "h-3 bg-bone/20 group-hover:bg-bone/60"}` }),
    /* @__PURE__ */ jsx("span", { className: `font-mono text-[9px] uppercase tracking-widest transition-opacity duration-300 ${active === l.id ? "opacity-100 text-acid" : "opacity-0 group-hover:opacity-50 text-bone"}`, children: l.id })
  ] }, l.id)) });
}
function SectionHead({
  n,
  label,
  title
}) {
  return /* @__PURE__ */ jsxs("div", { className: "flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-border pb-8", children: [
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsxs("div", { className: "font-mono text-xs text-acid uppercase tracking-widest mb-3", children: [
        "[ ",
        n,
        " ] ",
        label
      ] }),
      /* @__PURE__ */ jsx("h2", { className: "font-display text-4xl md:text-6xl uppercase tracking-tight max-w-3xl", children: title })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "font-mono text-[10px] text-bone/40 uppercase", children: "scroll·to·engage ↓" })
  ] });
}
function DashboardMock() {
  return /* @__PURE__ */ jsxs(motion.div, { initial: {
    opacity: 0,
    y: 80,
    rotateX: 15
  }, whileInView: {
    opacity: 1,
    y: 0,
    rotateX: 0
  }, viewport: {
    once: true,
    margin: "-50px"
  }, transition: {
    duration: 1
  }, style: {
    transformPerspective: 1400
  }, className: "mt-12 border border-border bg-card/40 backdrop-blur-xl overflow-hidden", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between border-b border-border px-4 py-2 font-mono text-[10px] text-bone/50 uppercase", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex gap-1.5", children: [
        /* @__PURE__ */ jsx("span", { className: "size-2.5 rounded-full bg-destructive/70" }),
        /* @__PURE__ */ jsx("span", { className: "size-2.5 rounded-full bg-warn/70" }),
        /* @__PURE__ */ jsx("span", { className: "size-2.5 rounded-full bg-acid/70" })
      ] }),
      /* @__PURE__ */ jsx("span", { children: "~/apiguard/dashboard · prod" }),
      /* @__PURE__ */ jsx("span", { className: "text-acid", children: "LIVE" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-[1fr_2fr_1fr] gap-px bg-border", children: [
      /* @__PURE__ */ jsxs("div", { className: "bg-card/30 backdrop-blur-md p-5 space-y-3", children: [
        /* @__PURE__ */ jsx("div", { className: "font-mono text-[10px] text-bone/40 uppercase", children: "scan.history" }),
        ["#4192", "#4191", "#4190", "#4189", "#4188", "#4187"].map((id, i) => /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between text-xs font-mono border-l-2 pl-3 py-2", style: {
          borderColor: i === 0 ? "var(--acid)" : "var(--border)"
        }, children: [
          /* @__PURE__ */ jsx("span", { className: "text-bone/80", children: id }),
          /* @__PURE__ */ jsx("span", { className: i === 0 ? "text-acid" : "text-bone/40", children: i === 0 ? "running" : `${94 - i}/100` })
        ] }, id))
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "bg-card/30 backdrop-blur-md p-8 relative", children: [
        /* @__PURE__ */ jsx("div", { className: "font-mono text-[10px] text-bone/40 uppercase mb-4", children: "security.score · last 30d" }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-baseline gap-4 mb-6", children: [
          /* @__PURE__ */ jsx("div", { className: "font-display text-7xl text-acid", children: "94" }),
          /* @__PURE__ */ jsx("div", { className: "text-bone/50 text-sm font-mono", children: "/ 100 · ↑ 6 this week" })
        ] }),
        /* @__PURE__ */ jsxs("svg", { viewBox: "0 0 400 100", className: "w-full h-24", children: [
          /* @__PURE__ */ jsx("defs", { children: /* @__PURE__ */ jsxs("linearGradient", { id: "g", x1: "0", x2: "0", y1: "0", y2: "1", children: [
            /* @__PURE__ */ jsx("stop", { offset: "0%", stopColor: "var(--acid)", stopOpacity: "0.4" }),
            /* @__PURE__ */ jsx("stop", { offset: "100%", stopColor: "var(--acid)", stopOpacity: "0" })
          ] }) }),
          /* @__PURE__ */ jsx(motion.path, { d: "M0,70 L40,60 L80,72 L120,50 L160,55 L200,38 L240,42 L280,28 L320,32 L360,20 L400,15 L400,100 L0,100 Z", fill: "url(#g)", initial: {
            opacity: 0
          }, whileInView: {
            opacity: 1
          }, transition: {
            duration: 1
          } }),
          /* @__PURE__ */ jsx(motion.path, { d: "M0,70 L40,60 L80,72 L120,50 L160,55 L200,38 L240,42 L280,28 L320,32 L360,20 L400,15", fill: "none", stroke: "var(--acid)", strokeWidth: "2", initial: {
            pathLength: 0
          }, whileInView: {
            pathLength: 1
          }, viewport: {
            once: true
          }, transition: {
            duration: 1.6,
            ease: "easeInOut"
          } })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "grid grid-cols-4 gap-3 mt-6", children: [{
          l: "critical",
          v: 0,
          c: "var(--destructive)"
        }, {
          l: "high",
          v: 2,
          c: "var(--signal)"
        }, {
          l: "medium",
          v: 7,
          c: "var(--warn)"
        }, {
          l: "low",
          v: 14,
          c: "var(--acid)"
        }].map((v) => /* @__PURE__ */ jsxs("div", { className: "border border-border p-3", children: [
          /* @__PURE__ */ jsx("div", { className: "font-display text-2xl", style: {
            color: v.c
          }, children: v.v }),
          /* @__PURE__ */ jsx("div", { className: "font-mono text-[10px] text-bone/40 uppercase", children: v.l })
        ] }, v.l)) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "bg-card/30 backdrop-blur-md p-5 space-y-4", children: [
        /* @__PURE__ */ jsx("div", { className: "font-mono text-[10px] text-bone/40 uppercase", children: "health.pulse" }),
        [{
          n: "auth-svc",
          v: 99.99,
          ms: 42
        }, {
          n: "billing",
          v: 99.91,
          ms: 118
        }, {
          n: "search",
          v: 98.4,
          ms: 312
        }, {
          n: "feed",
          v: 99.97,
          ms: 67
        }].map((s) => /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex justify-between font-mono text-xs", children: [
            /* @__PURE__ */ jsx("span", { className: "text-bone/80", children: s.n }),
            /* @__PURE__ */ jsxs("span", { className: "text-acid", children: [
              s.v,
              "%"
            ] })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "h-1 bg-bone/10", children: /* @__PURE__ */ jsx(motion.div, { initial: {
            width: 0
          }, whileInView: {
            width: `${s.v}%`
          }, viewport: {
            once: true
          }, transition: {
            duration: 1.2
          }, className: "h-full bg-acid" }) }),
          /* @__PURE__ */ jsxs("div", { className: "font-mono text-[10px] text-bone/40", children: [
            "p50 · ",
            s.ms,
            "ms"
          ] })
        ] }, s.n))
      ] })
    ] })
  ] });
}
function AIPanel({
  item,
  index
}) {
  const ref = useRef(null);
  const {
    scrollYProgress
  } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  const x = useTransform(scrollYProgress, [0, 1], index % 2 === 0 ? [-80, 80] : [80, -80]);
  const rot = useTransform(scrollYProgress, [0, 1], [-6, 6]);
  return /* @__PURE__ */ jsx("div", { ref, className: "sticky top-24 px-6 max-w-[1400px] mx-auto py-16", children: /* @__PURE__ */ jsxs(motion.div, { style: {
    x,
    rotate: rot
  }, className: "grid md:grid-cols-2 gap-8 items-center border border-border bg-card/80 backdrop-blur-xl p-10 md:p-16", children: [
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsxs("div", { className: "font-mono text-xs text-signal uppercase tracking-widest mb-4", children: [
        "[ ",
        item.tag,
        " ]"
      ] }),
      /* @__PURE__ */ jsx("h3", { className: "font-display text-4xl md:text-6xl uppercase tracking-tight leading-[0.9] mb-6", children: item.title }),
      /* @__PURE__ */ jsx("p", { className: "text-bone/60 text-lg leading-relaxed max-w-md", children: item.body }),
      (() => {
        const to = item.tag === "AI.TESTS" ? "/ai/test-synth" : item.tag === "AI.DOCS" ? "/ai/docs-gen" : "/ai/mock-server";
        return /* @__PURE__ */ jsx(Link, { to, className: "mt-8 inline-block font-mono text-xs text-acid uppercase tracking-widest border-b border-acid pb-1 hover:text-signal hover:border-signal transition", children: "initiate →" });
      })()
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "relative aspect-square border border-border bg-background p-6 overflow-hidden", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute inset-0 grid-bg opacity-40" }),
      /* @__PURE__ */ jsxs("div", { className: "relative font-mono text-xs space-y-2 text-bone/60", children: [
        /* @__PURE__ */ jsxs("div", { className: "text-acid", children: [
          "▸ apiguard.",
          item.tag.toLowerCase().replace(".", "_"),
          "()"
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "pl-4", children: [
          "analyzing 247 endpoints",
          /* @__PURE__ */ jsx("span", { className: "cursor-blink", children: "_" })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "pl-4 text-bone/40", children: "▪ parsing openapi.yaml" }),
        /* @__PURE__ */ jsx("div", { className: "pl-4 text-bone/40", children: "▪ inferring contracts" }),
        /* @__PURE__ */ jsx("div", { className: "pl-4 text-bone/40", children: "▪ generating output" }),
        /* @__PURE__ */ jsxs("div", { className: "pl-4 text-acid", children: [
          "✓ complete · ",
          18 + index * 11,
          ".",
          index * 3,
          "s"
        ] })
      ] }),
      /* @__PURE__ */ jsx(motion.div, { className: "absolute -bottom-10 -right-10 size-40 rounded-full", style: {
        background: `radial-gradient(circle, var(--signal), transparent 70%)`,
        opacity: 0.3
      }, animate: {
        scale: [1, 1.3, 1]
      }, transition: {
        duration: 4,
        repeat: Infinity
      } })
    ] })
  ] }) });
}
export {
  Index as component
};
