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
    <div className="p-6 max-w-3xl mx-auto pt-32 pb-20">
      <div className="mb-10">
        <h1 className="text-4xl md:text-5xl font-display font-bold tracking-tight text-foreground">
          Configuration
        </h1>
        <p className="text-muted-foreground mt-2 font-medium">
          Manage system infrastructure and intelligence settings.
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-12 max-w-2xl"
      >
        <div>
          <h2 className="font-display font-semibold text-lg text-foreground mb-6">
            Core Infrastructure
          </h2>
          <div className="space-y-6">
            <div>
              <label className="block font-medium text-sm text-foreground mb-2">
                Scan Service URL
              </label>
              <input
                type="text"
                value={scanServiceUrl}
                onChange={(e) => setScanServiceUrl(e.target.value)}
                placeholder="https://scan-service.example.com"
                className="w-full bg-background border border-border/60 rounded-xl focus:border-acid focus:ring-4 focus:ring-acid/10 outline-none px-4 py-3 text-foreground font-mono text-sm transition-all shadow-inner"
              />
              <p className="mt-2 text-xs text-muted-foreground font-medium">
                Target endpoint for offloading heavy surface analysis.
              </p>
            </div>

            <div>
              <label className="block font-medium text-sm text-foreground mb-2">
                Service Authentication Token
              </label>
              <input
                type="password"
                value={authToken}
                onChange={(e) => setAuthToken(e.target.value)}
                placeholder="Bearer ••••••••••••"
                className="w-full bg-background border border-border/60 rounded-xl focus:border-acid focus:ring-4 focus:ring-acid/10 outline-none px-4 py-3 text-foreground font-mono text-sm transition-all shadow-inner"
              />
              <p className="mt-2 text-xs text-muted-foreground font-medium">
                Required if your designated scan service is protected.
              </p>
            </div>
          </div>
        </div>

        <div>
          <h2 className="font-display font-semibold text-lg text-foreground mb-6">
            Intelligence Layer
          </h2>
          <div className="space-y-6">
            <div>
              <label className="block font-medium text-sm text-foreground mb-2">
                OpenAI API Key
              </label>
              <input
                type="password"
                value={openAIApiKey}
                onChange={(e) => setOpenAIApiKey(e.target.value)}
                placeholder="sk-proj-..."
                className="w-full bg-background border border-border/60 rounded-xl focus:border-acid focus:ring-4 focus:ring-acid/10 outline-none px-4 py-3 text-foreground font-mono text-sm transition-all shadow-inner"
              />
              <p className="mt-2 text-xs text-muted-foreground font-medium">
                Required for test case synthesis and auto-documentation features.
              </p>
            </div>
          </div>
        </div>

        <div className="pt-4">
          <button
            onClick={handleSave}
            disabled={isSaving}
            className={`
              px-8 py-3.5 font-display font-semibold text-sm rounded-full shadow-md transition-all
              ${
                isSaving
                  ? "bg-acid/50 text-ink cursor-wait shadow-none"
                  : "bg-acid text-ink hover:shadow-lg hover:-translate-y-0.5"
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
