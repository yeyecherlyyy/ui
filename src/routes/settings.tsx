import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useAppStore } from "@/store/useAppStore";
import { toast } from "sonner";
import { motion } from "motion/react";

export const Route = createFileRoute("/settings")({
  component: Settings,
});

function Settings() {
  const { settings, setSettings } = useAppStore();
  const [openAIApiKey, setOpenAIApiKey] = useState(settings.openAIApiKey);
  const [scanServiceUrl, setScanServiceUrl] = useState(settings.scanServiceUrl);
  const [authToken, setAuthToken] = useState(settings.authToken ?? "");
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    // Simulate network delay for UI effect
    await new Promise((resolve) => setTimeout(resolve, 800));
    setSettings({
      openAIApiKey,
      scanServiceUrl,
      authToken: authToken || undefined,
    });
    setIsSaving(false);
    toast.success("Configuration successfully updated");
  };

  return (
    <div className="p-6 max-w-3xl mx-auto pt-24">
      <div className="mb-8 border-b border-border pb-6">
        <div className="font-mono text-xs text-acid uppercase tracking-widest mb-3">
          [ sys.settings ]
        </div>
        <h1 className="text-4xl md:text-5xl font-display uppercase tracking-tight">
          Configuration
        </h1>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-8"
      >
        <div className="border border-border bg-card/20 backdrop-blur-md">
          <div className="border-b border-border px-6 py-3 font-mono text-[10px] uppercase tracking-widest text-bone/50 bg-background/50">
            // Core Infrastructure
          </div>
          <div className="p-6 space-y-6">
            <div>
              <label className="block font-mono text-xs text-bone/60 uppercase tracking-widest mb-2">
                Scan Service URL
              </label>
              <input
                type="text"
                value={scanServiceUrl}
                onChange={(e) => setScanServiceUrl(e.target.value)}
                placeholder="https://scan-service.example.com"
                className="w-full bg-background/60 border border-border focus:border-acid outline-none px-4 py-3 text-bone font-mono text-sm transition-colors"
              />
              <p className="mt-2 font-mono text-[10px] text-bone/40">
                Target endpoint for offloading heavy surface analysis.
              </p>
            </div>

            <div>
              <label className="block font-mono text-xs text-bone/60 uppercase tracking-widest mb-2">
                Service Authentication Token
              </label>
              <input
                type="password"
                value={authToken}
                onChange={(e) => setAuthToken(e.target.value)}
                placeholder="Bearer ••••••••••••"
                className="w-full bg-background/60 border border-border focus:border-acid outline-none px-4 py-3 text-bone font-mono text-sm transition-colors"
              />
              <p className="mt-2 font-mono text-[10px] text-bone/40">
                Required if your designated scan service is protected.
              </p>
            </div>
          </div>
        </div>

        <div className="border border-border bg-card/20 backdrop-blur-md">
          <div className="border-b border-border px-6 py-3 font-mono text-[10px] uppercase tracking-widest text-bone/50 bg-background/50">
            // Intelligence Layer
          </div>
          <div className="p-6 space-y-6">
            <div>
              <label className="block font-mono text-xs text-bone/60 uppercase tracking-widest mb-2">
                OpenAI API Key
              </label>
              <input
                type="password"
                value={openAIApiKey}
                onChange={(e) => setOpenAIApiKey(e.target.value)}
                placeholder="sk-proj-..."
                className="w-full bg-background/60 border border-border focus:border-acid outline-none px-4 py-3 text-bone font-mono text-sm transition-colors"
              />
              <p className="mt-2 font-mono text-[10px] text-bone/40">
                Required for test case synthesis and auto-documentation
                features.
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-4">
          <button
            onClick={handleSave}
            disabled={isSaving}
            className={`
              border px-8 py-3 font-mono text-xs uppercase tracking-[0.25em] transition-all
              ${
                isSaving
                  ? "border-acid text-acid bg-acid/10 cursor-wait"
                  : "border-acid text-acid hover:bg-acid hover:text-ink shadow-[0_0_15px_rgba(var(--acid-rgb),0.1)] hover:shadow-[0_0_20px_rgba(var(--acid-rgb),0.3)]"
              }
            `}
          >
            {isSaving ? "Persisting..." : "Apply Config"}
          </button>
        </div>
      </motion.div>
    </div>
  );
}
