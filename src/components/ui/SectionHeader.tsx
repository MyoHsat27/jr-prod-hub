"use client";

import { motion } from "framer-motion";

interface SectionHeaderProps {
  label: string;
  title: string;
  href?: string;
  linkText?: string;
}

export default function SectionHeader({ label, title, href, linkText }: SectionHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5 }}
      className="mb-10 flex items-end justify-between"
    >
      <div>
        <div className="mb-2 flex items-center gap-2">
          <span className="h-px w-6 bg-cyber-cyan/40" />
          <span className="font-cyber text-[9px] uppercase tracking-[0.4em] text-cyber-cyan/60">
            {label}
          </span>
        </div>
        <h2 className="font-cyber text-2xl font-bold tracking-wide text-white">
          {title}
        </h2>
      </div>
      {href && linkText && (
        <a
          href={href}
          className="font-cyber text-[10px] uppercase tracking-wider text-cyber-cyan/50 transition-colors hover:text-cyber-cyan"
        >
          {linkText} &rarr;
        </a>
      )}
    </motion.div>
  );
}
