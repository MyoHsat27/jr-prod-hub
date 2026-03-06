"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import PageTransition from "@/components/ui/PageTransition";
import GlowOrb from "@/components/ui/GlowOrb";

interface AboutClientProps {
  influences: string[];
  genres: string[];
  bioSections: { label: string; text: string }[];
}

export default function AboutClient({ influences, genres, bioSections }: AboutClientProps) {
  return (
    <PageTransition>
      <div className="relative mx-auto max-w-5xl px-6 py-20">
        {/* Background orbs */}
        <GlowOrb color="rgba(184, 41, 255, 0.06)" size={400} top="20%" left="10%" delay={0} />
        <GlowOrb color="rgba(0, 240, 255, 0.04)" size={350} top="60%" left="80%" delay={3} />

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative mb-16"
        >
          <div className="mb-3 flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-cyber-cyan shadow-[0_0_8px_rgba(0,240,255,0.6)]" />
            <span className="font-cyber text-[9px] uppercase tracking-[0.4em] text-cyber-cyan/60">
              Artist Profile
            </span>
          </div>
          <h1 className="font-cyber text-4xl font-bold tracking-wide text-white md:text-5xl">
            About
          </h1>
        </motion.div>

        <div className="relative flex flex-col gap-16 md:flex-row">
          {/* Photo panel */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="shrink-0"
          >
            <div className="relative h-96 w-72 overflow-hidden border border-cyber-cyan/15 cyber-corners"
              style={{ clipPath: "polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 16px 100%, 0 calc(100% - 16px))" }}
            >
              <Image
                src="/images/artist.svg"
                alt="Jr Prod"
                fill
                sizes="288px"
                className="object-cover"
                priority
              />
              {/* Holographic overlay */}
              <div
                className="absolute inset-0 opacity-20 mix-blend-overlay"
                style={{
                  background: "linear-gradient(135deg, rgba(0,240,255,0.3), transparent, rgba(184,41,255,0.2))",
                }}
              />
              {/* Scanlines */}
              <div
                className="absolute inset-0 opacity-[0.06]"
                style={{
                  backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,240,255,0.1) 2px, rgba(0,240,255,0.1) 4px)",
                }}
              />
              {/* Label */}
              <div className="absolute bottom-0 left-0 right-0 bg-background/80 p-3 backdrop-blur-sm">
                <p className="font-cyber text-xs tracking-wider text-cyber-cyan">JR://PROD</p>
                <p className="font-mono text-[9px] text-neutral-600">Beat Producer &middot; Sound Designer</p>
              </div>
            </div>
          </motion.div>

          {/* Bio data panels */}
          <div className="flex-1 space-y-6">
            {bioSections.map((section, i) => (
              <motion.div
                key={section.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="border border-white/6 bg-white/2 p-6"
                style={{ clipPath: "polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))" }}
              >
                <div className="mb-3 flex items-center gap-2">
                  <span className="h-px w-4 bg-cyber-cyan/40" />
                  <span className="font-cyber text-[9px] uppercase tracking-[0.3em] text-cyber-cyan/60">
                    {section.label}
                  </span>
                </div>
                <p className="text-sm leading-relaxed text-neutral-400">
                  {section.text}
                </p>
              </motion.div>
            ))}

            {/* Influences */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="border border-white/6 bg-white/2 p-6"
              style={{ clipPath: "polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))" }}
            >
              <div className="mb-4 flex items-center gap-2">
                <span className="h-px w-4 bg-cyber-purple/40" />
                <span className="font-cyber text-[9px] uppercase tracking-[0.3em] text-cyber-purple/60">
                  Influences
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {influences.map((name) => (
                  <span
                    key={name}
                    className="border border-cyber-purple/15 bg-cyber-purple/5 px-3 py-1.5 font-mono text-xs text-neutral-400 transition-colors hover:border-cyber-purple/30 hover:text-cyber-purple"
                  >
                    {name}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Genres */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="border border-white/6 bg-white/2 p-6"
              style={{ clipPath: "polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))" }}
            >
              <div className="mb-4 flex items-center gap-2">
                <span className="h-px w-4 bg-cyber-magenta/40" />
                <span className="font-cyber text-[9px] uppercase tracking-[0.3em] text-cyber-magenta/60">
                  Genres
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {genres.map((genre) => (
                  <span
                    key={genre}
                    className="border border-cyber-cyan/15 bg-cyber-cyan/5 px-3 py-1.5 font-cyber text-[10px] font-medium uppercase tracking-wider text-cyber-cyan transition-colors hover:border-cyber-cyan/30 hover:shadow-[0_0_10px_rgba(0,240,255,0.1)]"
                  >
                    {genre}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
