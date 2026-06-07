// src/routes/settings.tsx
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useAppStore } from "@/store/useAppStore";
import { toast } from "sonner";

export const Route = createFileRoute("/settings")({
  component: Settings,
});

function Settings() {
  const { settings, setSettings } = useAppStore();
  const [openAIApiKey, setOpenAIApiKey] = useState(settings.openAIApiKey);
  const [scanServiceUrl, setScanServiceUrl] = useState(settings.scanServiceUrl);
  const [authToken, setAuthToken] = useState(settings.authToken ?? "");

  const handleSave = () => {
    setSettings({
      openAIApiKey,
      scanServiceUrl,
      authToken: authToken || undefined,
    });
    toast.success("Settings saved");
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Settings</h1>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">OpenAI API Key</label>
          <input
            type="password"
            value={openAIApiKey}
            onChange={(e) => setOpenAIApiKey(e.target.value)}
            placeholder="sk-..."
            className="w-full p-2 border rounded bg-background text-foreground"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Scan Service URL</label>
          <input
            type="text"
            value={scanServiceUrl}
            onChange={(e) => setScanServiceUrl(e.target.value)}
            placeholder="https://scan-service.example.com"
            className="w-full p-2 border rounded bg-background text-foreground"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Auth Token (optional)</label>
          <input
            type="text"
            value={authToken}
            onChange={(e) => setAuthToken(e.target.value)}
            placeholder="Bearer token"
            className="w-full p-2 border rounded bg-background text-foreground"
          />
        </div>
        <button
          onClick={handleSave}
          className="mt-4 px-4 py-2 bg-acid text-ink rounded hover:bg-acid/80"
        >
          Save Settings
        </button>
      </div>
    </div>
  );
}
