"use client";

import { motion } from "framer-motion";
import { letterStagger, letterChild } from "@/lib/animations";

interface AnimatedTextProps {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
}

export default function AnimatedText({
  text,
  className = "",
  as: Tag = "h1",
}: AnimatedTextProps) {
  const MotionTag = motion.create(Tag);

  return (
    <MotionTag
      className={className}
      variants={letterStagger}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      {text.split("").map((char, i) => (
        <motion.span key={i} variants={letterChild} className="inline-block">
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </MotionTag>
  );
}
