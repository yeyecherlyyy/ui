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
      scans: {},
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
