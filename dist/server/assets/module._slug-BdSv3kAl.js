import { jsxs, jsx } from "react/jsx-runtime";
import { a as Route, M as MODULES } from "./router-DwgKz4jV.js";
import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { u as useLenis } from "./use-lenis-CXIvTO8Z.js";
import "@tanstack/react-query";
import "react";
import "zustand";
import "zustand/middleware";
import "lenis";
const ORDER = ["surface-scanner", "openapi-inhaler", "repo-bridge", "forensic-pdf", "change-radar", "health-pulse"];
function ModulePage() {
  useLenis();
  const {
    slug
  } = Route.useParams();
  const m = MODULES[slug];
  if (!m) return null;
  const idx = ORDER.indexOf(slug);
  const prev = ORDER[(idx - 1 + ORDER.length) % ORDER.length];
  const next = ORDER[(idx + 1) % ORDER.length];
  return /* @__PURE__ */ jsxs("div", { className: "relative bg-transparent text-foreground min-h-screen", children: [
    /* @__PURE__ */ jsx("header", { className: "fixed top-0 inset-x-0 z-50 border-b border-border/60 bg-background/70 backdrop-blur-xl", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between px-6 py-3 font-mono text-xs tracking-widest uppercase", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsx("span", { className: "size-2 rounded-full animate-pulse", style: {
          background: m.accent
        } }),
        /* @__PURE__ */ jsxs(Link, { to: "/", className: "text-bone hover:text-acid", children: [
          "APIGUARD/",
          /* @__PURE__ */ jsx("span", { style: {
            color: m.accent
          }, children: m.tag })
        ] }),
        /* @__PURE__ */ jsxs("span", { className: "text-bone/40 hidden md:inline", children: [
          "// mod.",
          m.code,
          " · ",
          m.title.toLowerCase()
        ] })
      ] }),
      /* @__PURE__ */ jsx(Link, { to: "/", className: "border border-bone/40 text-bone px-3 py-1 hover:border-acid hover:text-acid transition", children: "← all.modules" })
    ] }) }),
    /* @__PURE__ */ jsxs("section", { className: "relative grid-bg pt-32 pb-20 overflow-hidden", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute inset-0 scan-lines opacity-30 pointer-events-none" }),
      /* @__PURE__ */ jsx("div", { className: "absolute top-0 left-0 right-0 h-px", style: {
        background: `linear-gradient(to right, transparent, ${m.accent}, transparent)`
      } }),
      /* @__PURE__ */ jsxs("div", { className: "relative z-10 max-w-[1400px] mx-auto px-6", children: [
        /* @__PURE__ */ jsxs(motion.div, { initial: {
          opacity: 0,
          y: 30
        }, animate: {
          opacity: 1,
          y: 0
        }, transition: {
          duration: 0.6
        }, className: "font-mono text-xs text-bone/50 mb-8 flex items-center gap-4 flex-wrap", children: [
          /* @__PURE__ */ jsx(Link, { to: "/", className: "hover:text-acid", children: "~/modules" }),
          /* @__PURE__ */ jsx("span", { className: "text-bone/30", children: "/" }),
          /* @__PURE__ */ jsx("span", { style: {
            color: m.accent
          }, children: slug }),
          /* @__PURE__ */ jsxs("span", { className: "ml-auto border border-bone/30 px-2 py-1", children: [
            "MOD.",
            m.code,
            " · ONLINE"
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-[1.6fr_1fr] gap-12 items-end", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsxs(motion.div, { initial: {
              opacity: 0,
              x: -20
            }, animate: {
              opacity: 1,
              x: 0
            }, transition: {
              delay: 0.1
            }, className: "flex items-center gap-6 mb-6", children: [
              /* @__PURE__ */ jsx("span", { className: "font-display text-7xl leading-none", style: {
                color: m.accent
              }, children: m.glyph }),
              /* @__PURE__ */ jsxs("div", { className: "font-mono text-xs text-bone/50 uppercase", children: [
                /* @__PURE__ */ jsxs("div", { children: [
                  "module · ",
                  m.code
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "text-bone/30", children: [
                  "[ ",
                  m.tag,
                  " ]"
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxs(motion.h1, { initial: {
              opacity: 0,
              y: 20
            }, animate: {
              opacity: 1,
              y: 0
            }, transition: {
              delay: 0.15
            }, className: "font-display text-[clamp(2.8rem,8vw,7rem)] leading-[0.85] tracking-tight uppercase", children: [
              m.title.split(" ")[0],
              /* @__PURE__ */ jsx("br", {}),
              /* @__PURE__ */ jsx("span", { className: "text-stroke", children: m.title.split(" ").slice(1).join(" ") || "·" })
            ] }),
            /* @__PURE__ */ jsx(motion.p, { initial: {
              opacity: 0
            }, animate: {
              opacity: 1
            }, transition: {
              delay: 0.25
            }, className: "mt-8 text-bone/70 text-lg md:text-xl leading-relaxed max-w-2xl", children: m.tagline })
          ] }),
          /* @__PURE__ */ jsxs(motion.div, { initial: {
            opacity: 0,
            y: 30,
            rotateX: 10
          }, animate: {
            opacity: 1,
            y: 0,
            rotateX: 0
          }, transition: {
            delay: 0.3,
            duration: 0.7
          }, style: {
            transformPerspective: 1200
          }, className: "border border-border bg-card/40 backdrop-blur-xl p-5 font-mono text-[11px] space-y-1.5", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between text-bone/40 uppercase text-[10px] pb-2 border-b border-border mb-2", children: [
              /* @__PURE__ */ jsxs("span", { children: [
                "~/apiguard · ",
                m.tag
              ] }),
              /* @__PURE__ */ jsx("span", { style: {
                color: m.accent
              }, children: "LIVE" })
            ] }),
            m.cli.map((line, i) => /* @__PURE__ */ jsx(motion.div, { initial: {
              opacity: 0,
              x: -10
            }, animate: {
              opacity: 1,
              x: 0
            }, transition: {
              delay: 0.5 + i * 0.12
            }, className: line.startsWith("✓") ? "" : line.startsWith("▸") ? "text-bone" : "text-bone/50", style: line.startsWith("✓") ? {
              color: m.accent
            } : void 0, children: line }, i)),
            /* @__PURE__ */ jsxs("div", { style: {
              color: m.accent
            }, children: [
              "_",
              /* @__PURE__ */ jsx("span", { className: "cursor-blink", children: "▌" })
            ] })
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx("section", { className: "border-y border-border bg-background/40 backdrop-blur-xl", children: /* @__PURE__ */ jsx("div", { className: "max-w-[1400px] mx-auto grid grid-cols-2 md:grid-cols-4 divide-x divide-border", children: m.metrics.map((x, i) => /* @__PURE__ */ jsxs(motion.div, { initial: {
      opacity: 0,
      y: 20
    }, whileInView: {
      opacity: 1,
      y: 0
    }, viewport: {
      once: true
    }, transition: {
      delay: i * 0.08
    }, className: "p-6 md:p-8", children: [
      /* @__PURE__ */ jsx("div", { className: "font-mono text-[10px] text-bone/40 uppercase tracking-widest mb-3", children: x.label }),
      /* @__PURE__ */ jsx("div", { className: "font-display text-4xl md:text-5xl tracking-tight", style: {
        color: m.accent
      }, children: x.value }),
      /* @__PURE__ */ jsx("div", { className: "font-mono text-[10px] text-bone/40 mt-2", children: x.sub })
    ] }, x.label)) }) }),
    /* @__PURE__ */ jsxs("section", { className: "max-w-[1400px] mx-auto px-6 py-24 grid md:grid-cols-[1.5fr_1fr] gap-12", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("div", { className: "font-mono text-xs uppercase tracking-widest mb-4", style: {
          color: m.accent
        }, children: "[ 01 ] dossier" }),
        /* @__PURE__ */ jsx("p", { className: "font-serif italic text-2xl md:text-3xl leading-relaxed text-bone/90 max-w-2xl", children: m.body })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "border border-border bg-card/40 backdrop-blur-xl p-6", children: [
        /* @__PURE__ */ jsx("div", { className: "font-mono text-[10px] text-bone/40 uppercase tracking-widest mb-4", children: "ops.config" }),
        /* @__PURE__ */ jsx("div", { className: "space-y-3 font-mono text-xs", children: m.ops.map((o) => /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-[1fr_1.5fr] gap-3 border-b border-border/50 pb-2", children: [
          /* @__PURE__ */ jsx("span", { className: "text-bone/50", children: o.k }),
          /* @__PURE__ */ jsx("span", { className: "text-bone", children: o.v })
        ] }, o.k)) })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("section", { className: "max-w-[1400px] mx-auto px-6 py-16", children: [
      /* @__PURE__ */ jsxs("div", { className: "border-b border-border pb-6 mb-10 flex items-end justify-between flex-wrap gap-4", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("div", { className: "font-mono text-xs uppercase tracking-widest mb-3", style: {
            color: m.accent
          }, children: "[ 02 ] capabilities" }),
          /* @__PURE__ */ jsx("h2", { className: "font-display text-4xl md:text-5xl uppercase tracking-tight", children: "What it actually does." })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "font-mono text-[10px] text-bone/40 uppercase", children: "4 · primitives" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "grid md:grid-cols-2 gap-px bg-border", children: m.capabilities.map((c, i) => /* @__PURE__ */ jsxs(motion.div, { initial: {
        opacity: 0,
        y: 40
      }, whileInView: {
        opacity: 1,
        y: 0
      }, viewport: {
        once: true,
        margin: "-50px"
      }, transition: {
        delay: i * 0.1
      }, className: "bg-card/40 backdrop-blur-xl p-8 group hover:bg-bone/[0.02] transition-colors", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between mb-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "font-mono text-xs text-bone/40", children: [
            "CAP.",
            String(i + 1).padStart(2, "0")
          ] }),
          /* @__PURE__ */ jsx("span", { className: "text-2xl", style: {
            color: m.accent
          }, children: ["◇", "◈", "◆", "▣"][i] })
        ] }),
        /* @__PURE__ */ jsx("h3", { className: "font-display text-2xl uppercase tracking-tight mb-3 group-hover:text-acid transition-colors", children: c.title }),
        /* @__PURE__ */ jsx("p", { className: "text-bone/60 leading-relaxed", children: c.desc })
      ] }, c.title)) })
    ] }),
    /* @__PURE__ */ jsxs("section", { className: "max-w-[1400px] mx-auto px-6 py-24", children: [
      /* @__PURE__ */ jsxs("div", { className: "border-b border-border pb-6 mb-10 flex items-end justify-between flex-wrap gap-4", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("div", { className: "font-mono text-xs uppercase tracking-widest mb-3", style: {
            color: m.accent
          }, children: "[ 03 ] live.stream" }),
          /* @__PURE__ */ jsx("h2", { className: "font-display text-4xl md:text-5xl uppercase tracking-tight", children: "As it happens." })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "font-mono text-[10px] text-bone/40 flex items-center gap-2", children: [
          /* @__PURE__ */ jsx("span", { className: "size-1.5 rounded-full animate-pulse", style: {
            background: m.accent
          } }),
          "tailing · 5m window"
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "border border-border bg-card/40 backdrop-blur-xl", children: [
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-[80px_1fr] gap-4 px-6 py-3 border-b border-border font-mono text-[10px] text-bone/40 uppercase tracking-widest", children: [
          /* @__PURE__ */ jsx("span", { children: "t" }),
          /* @__PURE__ */ jsx("span", { children: "event" })
        ] }),
        m.feed.map((f, i) => /* @__PURE__ */ jsxs(motion.div, { initial: {
          opacity: 0,
          x: -20
        }, whileInView: {
          opacity: 1,
          x: 0
        }, viewport: {
          once: true
        }, transition: {
          delay: i * 0.06
        }, className: "grid grid-cols-[80px_1fr] gap-4 px-6 py-4 border-b border-border/50 font-mono text-sm hover:bg-bone/[0.02]", children: [
          /* @__PURE__ */ jsx("span", { className: "text-bone/40", children: f.t }),
          /* @__PURE__ */ jsx("span", { style: {
            color: f.tone
          }, children: f.line })
        ] }, i))
      ] })
    ] }),
    /* @__PURE__ */ jsxs("section", { className: "max-w-[1400px] mx-auto px-6 py-24", children: [
      /* @__PURE__ */ jsxs("div", { className: "border border-border bg-card/40 backdrop-blur-xl p-10 md:p-16 text-center relative overflow-hidden", children: [
        /* @__PURE__ */ jsx("div", { className: "absolute inset-0 grid-bg opacity-30 pointer-events-none" }),
        /* @__PURE__ */ jsx("div", { className: "absolute -top-32 -right-32 size-96 rounded-full pointer-events-none", style: {
          background: `radial-gradient(circle, ${m.accent}, transparent 70%)`,
          opacity: 0.15
        } }),
        /* @__PURE__ */ jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ jsx("div", { className: "font-mono text-xs uppercase tracking-widest mb-4", style: {
            color: m.accent
          }, children: "[ engage ]" }),
          /* @__PURE__ */ jsxs("h2", { className: "font-display text-4xl md:text-6xl uppercase tracking-tight leading-[0.9] mb-8", children: [
            "Wire",
            " ",
            /* @__PURE__ */ jsx("span", { className: "italic font-serif lowercase", style: {
              color: m.accent
            }, children: m.title.toLowerCase() }),
            /* @__PURE__ */ jsx("br", {}),
            /* @__PURE__ */ jsx("span", { className: "text-stroke", children: "into your stack." })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap justify-center gap-4", children: [
            /* @__PURE__ */ jsxs("button", { className: "px-8 py-4 font-mono text-sm uppercase tracking-widest text-ink transition hover:opacity-80", style: {
              background: m.accent
            }, children: [
              "deploy.",
              m.tag.split(".")[0],
              "()"
            ] }),
            /* @__PURE__ */ jsx(Link, { to: "/", className: "border border-bone/40 text-bone px-8 py-4 font-mono text-sm uppercase tracking-widest hover:border-acid hover:text-acid transition", children: "back.to.console" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mt-12 grid md:grid-cols-2 gap-px bg-border", children: [
        /* @__PURE__ */ jsxs(Link, { to: "/module/$slug", params: {
          slug: prev
        }, className: "bg-card/40 backdrop-blur-xl p-6 group hover:bg-bone/[0.02] transition-colors", children: [
          /* @__PURE__ */ jsx("div", { className: "font-mono text-[10px] text-bone/40 uppercase mb-2", children: "← prev module" }),
          /* @__PURE__ */ jsx("div", { className: "font-display text-2xl uppercase group-hover:text-acid transition-colors", children: MODULES[prev].title })
        ] }),
        /* @__PURE__ */ jsxs(Link, { to: "/module/$slug", params: {
          slug: next
        }, className: "bg-card/40 backdrop-blur-xl p-6 group hover:bg-bone/[0.02] transition-colors text-right", children: [
          /* @__PURE__ */ jsx("div", { className: "font-mono text-[10px] text-bone/40 uppercase mb-2", children: "next module →" }),
          /* @__PURE__ */ jsx("div", { className: "font-display text-2xl uppercase group-hover:text-acid transition-colors", children: MODULES[next].title })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("footer", { className: "border-t border-border px-6 py-8 font-mono text-xs text-bone/40 flex flex-wrap items-center justify-between gap-4 bg-background/40 backdrop-blur-xl", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        "APIGUARD // mod.",
        m.code,
        " · ",
        m.tag
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex gap-6", children: [
        /* @__PURE__ */ jsxs("span", { children: [
          "status: ",
          /* @__PURE__ */ jsx("span", { style: {
            color: m.accent
          }, children: "operational" })
        ] }),
        /* @__PURE__ */ jsx("span", { children: "© 2026" })
      ] })
    ] })
  ] });
}
export {
  ModulePage as component
};
