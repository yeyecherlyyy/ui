// src/store/useAppStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface Scan {
  id: string;
  status: "pending" | "running" | "completed" | "failed";
  spec: string;
  findings?: Finding[];
  createdAt: string;
}

export interface Finding {
  severity: "low" | "medium" | "high" | "critical";
  description: string;
}

export interface Settings {
  openAIApiKey: string;
  scanServiceUrl: string;
  authToken?: string;
}

export type ModalKind =
  | null
  | "deploy"
  | "scan"
  | "demo"
  | "github"
  | "jenkins"
  | "postman"
  | "swagger";

export interface AppState {
  scans: Record<string, Scan>;
  settings: Settings;
  modal: ModalKind;
  // actions
  addScan: (scan: Scan) => void;
  updateScan: (id: string, partial: Partial<Scan>) => void;
  setSettings: (s: Settings) => void;
  setModal: (m: ModalKind) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      scans: {
        "s-9281": {
          id: "s-9281",
          status: "completed",
          spec: "{}",
          createdAt: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
          findings: [
            { severity: "critical", description: "BOLA vulnerability in /api/v1/users/{id}/profile" },
            { severity: "high", description: "JWT signature validation bypass possible on POST /auth" },
            { severity: "medium", description: "Rate limit not strictly enforced on /search endpoint" },
          ],
        },
        "s-9280": {
          id: "s-9280",
          status: "completed",
          spec: "{}",
          createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
          findings: [
            { severity: "medium", description: "Information exposure via overly verbose error responses" },
            { severity: "low", description: "Missing Content-Security-Policy header" },
          ],
        },
        "s-9279": {
          id: "s-9279",
          status: "failed",
          spec: "{}",
          createdAt: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
          findings: [],
        },
      },
      settings: {
        openAIApiKey: "",
        scanServiceUrl: "https://scan-service.example.com",
        authToken: undefined,
      },
      modal: null,
      addScan: (scan) => set((state) => ({ scans: { ...state.scans, [scan.id]: scan } })),
      updateScan: (id, partial) =>
        set((state) => ({
          scans: { ...state.scans, [id]: { ...state.scans[id], ...partial } },
        })),
      setSettings: (s) => set(() => ({ settings: s })),
      setModal: (m) => set(() => ({ modal: m })),
    }),
    {
      name: "apiguard-storage", // key in localStorage
      // we only persist settings; scans stay in memory for session simplicity
      partialize: (state) => ({ settings: state.settings }),
    },
  ),
);
