"use client";

import { motion } from "framer-motion";
import GlowOrb from "./GlowOrb";
import GlitchText from "./GlitchText";
import NeonGrid from "./NeonGrid";

export default function Hero() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
      {/* Background layers */}
      <NeonGrid />
      <GlowOrb
        color="rgba(0, 240, 255, 0.08)"
        size={600}
        top="30%"
        left="20%"
        delay={0}
      />
      <GlowOrb
        color="rgba(184, 41, 255, 0.06)"
        size={500}
        top="60%"
        left="75%"
        delay={3}
      />
      <GlowOrb
        color="rgba(255, 0, 170, 0.04)"
        size={350}
        top="15%"
        left="85%"
        delay={5}
      />

      {/* Radial vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_30%,_#050505_80%)]" />

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-linear-to-t from-[#050505] to-transparent" />

      <div className="relative z-10 px-6 text-center">
        {/* System status line */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8 flex items-center justify-center gap-3"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-cyber-cyan shadow-[0_0_8px_rgba(0,240,255,0.8)] animate-pulse-neon" />
          <span className="font-cyber text-[10px] font-medium uppercase tracking-[0.4em] text-cyber-cyan/70">
            Audio Terminal Active
          </span>
          <span className="h-1.5 w-1.5 rounded-full bg-cyber-cyan shadow-[0_0_8px_rgba(0,240,255,0.8)] animate-pulse-neon" />
        </motion.div>

        {/* Artist name */}
        <GlitchText
          text="JR PROD"
          as="h1"
          className="font-cyber text-[clamp(4rem,15vw,12rem)] font-black leading-[0.85] tracking-wider text-cyber-cyan"
          glowColor="rgba(0, 240, 255, 0.4)"
        />

        {/* Terminal info lines */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-8 space-y-2"
        >
          <p className="font-cyber text-xs uppercase tracking-[0.3em] text-cyber-purple/80">
            Genre: Future Beats &middot; Lo-Fi &middot; Trap
          </p>
          <p className="mx-auto max-w-lg text-base leading-relaxed text-neutral-600">
            Crafting beats from the underground. Where sound meets the digital
            frontier.
          </p>
        </motion.div>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-12 flex items-center justify-center gap-5"
        >
          <a
            href="/music"
            className="group relative overflow-hidden border border-cyber-cyan/30 bg-cyber-cyan/5 px-8 py-3.5 font-cyber text-xs font-semibold uppercase tracking-wider text-cyber-cyan transition-all duration-300 hover:bg-cyber-cyan/10 hover:shadow-[0_0_30px_rgba(0,240,255,0.2)]"
            style={{
              clipPath:
                "polygon(12px 0, 100% 0, calc(100% - 12px) 100%, 0 100%)",
            }}
          >
            <span className="relative z-10">&gt; Access Music Database</span>
          </a>
          <a
            href="/links"
            className="border border-white/10 px-8 py-3.5 font-cyber text-xs font-semibold uppercase tracking-wider text-neutral-500 transition-all duration-300 hover:border-cyber-magenta/30 hover:text-cyber-magenta hover:shadow-[0_0_20px_rgba(255,0,170,0.1)]"
            style={{
              clipPath:
                "polygon(12px 0, 100% 0, calc(100% - 12px) 100%, 0 100%)",
            }}
          >
            &gt; Connect
          </a>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="mt-24"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="mx-auto flex flex-col items-center gap-2"
          >
            <span className="font-cyber text-[9px] font-medium uppercase tracking-[0.4em] text-neutral-700">
              Scroll
            </span>
            <div className="h-8 w-px bg-linear-to-b from-cyber-cyan/40 to-transparent" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
