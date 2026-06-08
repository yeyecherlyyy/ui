import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

const FACES = [
  { label: "GET /v1/users", tone: "acid" },
  { label: "POST /auth/login", tone: "signal" },
  { label: "DELETE /key/42", tone: "warn" },
  { label: "PATCH /scan/run", tone: "acid" },
  { label: "GET /health", tone: "foreground" },
  { label: "POST /webhook", tone: "signal" },
];

export function CubeHero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const rotX = useTransform(scrollYProgress, [0, 1], [-18, 180]);
  const rotY = useTransform(scrollYProgress, [0, 1], [28, 420]);

  return (
    <div ref={ref} className="relative" style={{ perspective: "1400px" }}>
      <motion.div
        className="relative mx-auto"
        style={{
          width: 280,
          height: 280,
          transformStyle: "preserve-3d",
          rotateX: rotX,
          rotateY: rotY,
        }}
        animate={{ rotateZ: [0, 4, -4, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      >
        {FACES.map((f, i) => {
          const transforms = [
            "translateZ(140px)",
            "rotateY(180deg) translateZ(140px)",
            "rotateY(90deg) translateZ(140px)",
            "rotateY(-90deg) translateZ(140px)",
            "rotateX(90deg) translateZ(140px)",
            "rotateX(-90deg) translateZ(140px)",
          ];
          const color =
            f.tone === "acid"
              ? "var(--acid)"
              : f.tone === "signal"
                ? "var(--signal)"
                : f.tone === "warn"
                  ? "var(--warn)"
                  : "var(--foreground)";
          return (
            <div
              key={i}
              className="absolute inset-0 border-2 flex flex-col justify-between p-4 backdrop-blur-sm"
              style={{
                transform: transforms[i],
                borderColor: color,
                background: `linear-gradient(135deg, color-mix(in oklab, ${color} 8%, transparent), transparent)`,
                boxShadow: `inset 0 0 60px color-mix(in oklab, ${color} 15%, transparent)`,
              }}
            >
              <div className="flex items-center justify-between font-mono text-[10px] tracking-widest text-muted-foreground">
                <span>FACE_{String(i).padStart(2, "0")}</span>
                <span
                  className="size-2 rounded-full"
                  style={{ background: color }}
                />
              </div>
              <div className="font-mono text-sm font-semibold" style={{ color }}>
                {f.label}
              </div>
              <div className="font-mono text-[10px] text-muted-foreground leading-relaxed">
                200 OK · 42ms
                <br />
                lat p95 · 118ms
                <br />
                err 0.01%
              </div>
            </div>
          );
        })}
      </motion.div>
    </div>
  );
}
