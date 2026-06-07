import { jsxs, jsx } from "react/jsx-runtime";
import { R as Route, u as useAppStore } from "./router-DwgKz4jV.js";
import "@tanstack/react-query";
import "@tanstack/react-router";
import "react";
import "zustand";
import "zustand/middleware";
import "motion/react";
function Report() {
  const {
    id
  } = Route.useParams();
  const scan = useAppStore((state) => state.scans[id]);
  if (!scan) {
    return /* @__PURE__ */ jsxs("div", { className: "p-6 max-w-4xl mx-auto", children: [
      /* @__PURE__ */ jsx("h1", { className: "text-3xl font-bold mb-4", children: "Report Not Found" }),
      /* @__PURE__ */ jsxs("p", { children: [
        "No scan with ID ",
        /* @__PURE__ */ jsx("code", { children: id }),
        " was found."
      ] })
    ] });
  }
  return /* @__PURE__ */ jsxs("div", { className: "p-6 max-w-4xl mx-auto", children: [
    /* @__PURE__ */ jsxs("h1", { className: "text-3xl font-bold mb-4", children: [
      "Scan Report – ",
      scan.id
    ] }),
    /* @__PURE__ */ jsxs("p", { className: "mb-2", children: [
      /* @__PURE__ */ jsx("strong", { children: "Status:" }),
      " ",
      scan.status
    ] }),
    /* @__PURE__ */ jsxs("p", { className: "mb-4", children: [
      /* @__PURE__ */ jsx("strong", { children: "Created At:" }),
      " ",
      new Date(scan.createdAt).toLocaleString()
    ] }),
    scan.findings && scan.findings.length > 0 ? /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("h2", { className: "text-2xl font-semibold mb-2", children: "Findings" }),
      /* @__PURE__ */ jsx("ul", { className: "list-disc pl-5 space-y-1", children: scan.findings.map((f, idx) => /* @__PURE__ */ jsxs("li", { children: [
        /* @__PURE__ */ jsx("span", { className: "font-medium capitalize", children: f.severity }),
        ":",
        " ",
        f.description
      ] }, idx)) })
    ] }) : /* @__PURE__ */ jsx("p", { children: "No findings recorded." })
  ] });
}
export {
  Report as component
};
