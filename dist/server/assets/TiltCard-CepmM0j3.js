import { jsx } from "react/jsx-runtime";
import { useMotionValue, useSpring, useTransform, motion } from "motion/react";
function TiltCard({
  children,
  className = ""
}) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rx = useSpring(useTransform(y, [-0.5, 0.5], [10, -10]), {
    stiffness: 200,
    damping: 18
  });
  const ry = useSpring(useTransform(x, [-0.5, 0.5], [-12, 12]), {
    stiffness: 200,
    damping: 18
  });
  function onMove(e) {
    const r = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - r.left) / r.width - 0.5);
    y.set((e.clientY - r.top) / r.height - 0.5);
  }
  function onLeave() {
    x.set(0);
    y.set(0);
  }
  return /* @__PURE__ */ jsx(
    motion.div,
    {
      onMouseMove: onMove,
      onMouseLeave: onLeave,
      style: {
        rotateX: rx,
        rotateY: ry,
        transformStyle: "preserve-3d",
        perspective: 1e3
      },
      className,
      children
    }
  );
}
export {
  TiltCard as T
};
