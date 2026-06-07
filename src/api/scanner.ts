// src/api/scanner.ts
import { useAppStore } from "@/store/useAppStore";

export interface ScanResponse {
  id: string;
}

export interface ScanStatusResponse {
  status: "pending" | "running" | "completed" | "failed";
  findings?: {
    severity: "low" | "medium" | "high" | "critical";
    description: string;
  }[];
}

/**
 * Initiates a scan by sending the API specification to the backend service.
 * Returns the newly created scan ID.
 */
export async function startScan(spec: string, authToken?: string): Promise<ScanResponse> {
  const { scanServiceUrl } = useAppStore.getState().settings;
  const response = await fetch(`${scanServiceUrl}/start`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(authToken ? { Authorization: `Bearer ${authToken}` } : {}),
    },
    body: JSON.stringify({ spec }),
  });

  if (!response.ok) {
    const txt = await response.text();
    throw new Error(`Failed to start scan: ${response.status} ${txt}`);
  }
  const data: ScanResponse = await response.json();
  return data;
}

/**
 * Polls the scan status until it reaches a terminal state (completed or failed).
 * Calls the provided `onUpdate` callback with the latest status and findings.
 */
export function pollScanStatus(
  id: string,
  onUpdate: (
    status: ScanStatusResponse["status"],
    findings?: ScanStatusResponse["findings"],
  ) => void,
  intervalMs = 2000,
) {
  const { scanServiceUrl, authToken } = useAppStore.getState().settings;
  let stopped = false;
  const fetchStatus = async () => {
    if (stopped) return;
    try {
      const response = await fetch(`${scanServiceUrl}/status/${id}`, {
        headers: {
          ...(authToken ? { Authorization: `Bearer ${authToken}` } : {}),
        },
      });
      if (!response.ok) {
        const txt = await response.text();
        throw new Error(`Status fetch error ${response.status}: ${txt}`);
      }
      const data: ScanStatusResponse = await response.json();
      onUpdate(data.status, data.findings);
      if (data.status === "completed" || data.status === "failed") {
        stopped = true;
        return;
      }
    } catch (e) {
      console.error("pollScanStatus error", e);
      onUpdate("failed");
      stopped = true;
      return;
    }
    setTimeout(fetchStatus, intervalMs);
  };
  // start the loop
  fetchStatus();
  // return a stopper in case caller wants to cancel
  return () => {
    stopped = true;
  };
}
