// src/routes/import-spec.tsx
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { startScan, pollScanStatus } from "@/api/scanner";
import { useAppStore } from "@/store/useAppStore";
import { toast } from "sonner";
import { useNavigate } from "@tanstack/react-router";

export const Route = createFileRoute("/import-spec")({
  component: ImportSpec,
});

function ImportSpec() {
  const [specText, setSpecText] = useState("");
  const handleImport = async () => {
    try {
      const { id } = await startScan(specText, useAppStore.getState().settings.authToken);
      const newScan = {
        id,
        spec: specText,
        status: "pending",
        createdAt: new Date().toISOString(),
      } as const;
      useAppStore.getState().addScan(newScan);
      toast.success(`Scan started (ID: ${id})`);
      // poll for status updates
      pollScanStatus(id, (status, findings) => {
        useAppStore.getState().updateScan(id, { status, findings });
        if (status === "completed") toast.success(`Scan ${id} completed`);
        if (status === "failed") toast.error(`Scan ${id} failed`);
      });
      // navigate to scans overview
      const navigate = useNavigate();
      navigate({ to: "/scans" });
    } catch (e) {
      console.error(e);
      toast.error("Failed to start scan");
    }
  };
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Import API Specification</h1>
      <textarea
        value={specText}
        onChange={(e) => setSpecText(e.target.value)}
        placeholder="Paste OpenAPI / Swagger / Postman JSON here"
        className="w-full h-64 p-2 border rounded bg-background text-foreground"
      />
      <button
        onClick={handleImport}
        className="mt-4 px-4 py-2 bg-acid text-ink rounded hover:bg-acid/80"
      >
        Start Scan
      </button>
    </div>
  );
}
