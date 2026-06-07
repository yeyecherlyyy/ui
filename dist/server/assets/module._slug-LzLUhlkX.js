import { jsx, jsxs } from "react/jsx-runtime";
import { Link } from "@tanstack/react-router";
const SplitNotFoundComponent = () => /* @__PURE__ */ jsx("div", { className: "min-h-screen flex items-center justify-center font-mono text-bone/60", children: /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
  /* @__PURE__ */ jsx("div", { className: "text-acid text-xs mb-4", children: "[ MODULE.404 ]" }),
  /* @__PURE__ */ jsx("div", { className: "mb-6", children: "unknown module" }),
  /* @__PURE__ */ jsx(Link, { to: "/", className: "border border-acid text-acid px-4 py-2 hover:bg-acid hover:text-ink transition", children: "return ←" })
] }) });
export {
  SplitNotFoundComponent as notFoundComponent
};
