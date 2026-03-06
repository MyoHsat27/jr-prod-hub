"use client";

import { motion } from "framer-motion";

interface GlowOrbProps {
  color?: string;
  size?: number;
  top?: string;
  left?: string;
  delay?: number;
}

export default function GlowOrb({
  color = "rgba(0, 240, 255, 0.1)",
  size = 400,
  top = "20%",
  left = "50%",
  delay = 0,
}: GlowOrbProps) {
  return (
    <motion.div
      className="pointer-events-none absolute rounded-full blur-[100px]"
      style={{
        background: color,
        width: size,
        height: size,
        top,
        left,
        transform: "translate(-50%, -50%)",
      }}
      animate={{
        scale: [1, 1.2, 1],
        opacity: [0.4, 0.7, 0.4],
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut",
        delay,
      }}
    />
  );
}
