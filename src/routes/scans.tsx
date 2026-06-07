// src/routes/scans.tsx
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useAppStore } from "@/store/useAppStore";
import { startScan, pollScanStatus } from "@/api/scanner";
import { toast } from "sonner"; // toast library already used in the project

export const Route = createFileRoute("/scans")({
  component: Scans,
});

function Scans() {
  const { addScan, updateScan, settings } = useAppStore();
  const [spec, setSpec] = useState("");

  const handleStart = async () => {
    if (!spec.trim()) {
      toast.error("Spec cannot be empty");
      return;
    }
    try {
      const { id } = await startScan(spec, settings.authToken);
      const newScan = { id, spec, status: "pending", createdAt: new Date().toISOString() } as const;
      addScan(newScan);
      toast.success(`Scan started (ID: ${id})`);
      // start polling for status updates
      pollScanStatus(id, (status, findings) => {
        updateScan(id, { status, findings });
        if (status === "completed") toast.success(`Scan ${id} completed`);
        if (status === "failed") toast.error(`Scan ${id} failed`);
      });
    } catch (e) {
      console.error(e);
      toast.error("Failed to start scan");
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Start New Scan</h1>
      <textarea
        value={spec}
        onChange={(e) => setSpec(e.target.value)}
        placeholder="Paste OpenAPI / Swagger / Postman JSON here"
        className="w-full h-64 p-2 border rounded bg-background text-foreground"
      />
      <button
        onClick={handleStart}
        className="mt-4 px-4 py-2 bg-acid text-ink rounded hover:bg-acid/80"
      >
        Start Scan
      </button>
    </div>
  );
}
