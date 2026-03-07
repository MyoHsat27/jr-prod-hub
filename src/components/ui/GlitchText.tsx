"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";

interface GlitchTextProps {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  glowColor?: string;
  typewriter?: boolean;
}

export default function GlitchText({
  text,
  className = "",
  as: Tag = "h1",
  glowColor = "rgba(0, 240, 255, 0.5)",
  typewriter = false,
}: GlitchTextProps) {
  const [displayText, setDisplayText] = useState(typewriter ? "" : text);
  const [glitching, setGlitching] = useState(false);

  // Typewriter effect
  useEffect(() => {
    if (!typewriter) return;
    let i = 0;
    const interval = setInterval(() => {
      if (i <= text.length) {
        setDisplayText(text.slice(0, i));
        i++;
      } else {
        clearInterval(interval);
      }
    }, 60);
    return () => clearInterval(interval);
  }, [text, typewriter]);

  // Random glitch trigger
  useEffect(() => {
    const interval = setInterval(
      () => {
        setGlitching(true);
        setTimeout(() => setGlitching(false), 200);
      },
      4000 + Math.random() * 3000,
    );
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="relative inline-block"
    >
      <Tag
        className={`relative ${className}`}
        style={{
          textShadow: `0 0 10px ${glowColor}, 0 0 30px ${glowColor}`,
        }}
      >
        {displayText}
        {typewriter && (
          <motion.span
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 0.6, repeat: Infinity }}
            className="ml-0.5 inline-block h-[1em] w-[2px] align-middle bg-cyber-cyan"
          />
        )}
      </Tag>

      {/* Glitch layers */}
      {glitching && (
        <>
          <Tag
            className={`absolute inset-0 ${className}`}
            style={{
              textShadow: `0 0 10px ${glowColor}`,
              clipPath: "inset(20% 0 50% 0)",
              transform: "translate(-2px, 0)",
              color: "#00f0ff",
              opacity: 0.8,
            }}
            aria-hidden
          >
            {displayText}
          </Tag>
          <Tag
            className={`absolute inset-0 ${className}`}
            style={{
              textShadow: `0 0 10px rgba(255, 0, 170, 0.5)`,
              clipPath: "inset(60% 0 10% 0)",
              transform: "translate(2px, 0)",
              color: "#ff00aa",
              opacity: 0.8,
            }}
            aria-hidden
          >
            {displayText}
          </Tag>
        </>
      )}
    </motion.div>
  );
}
