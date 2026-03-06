"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Track } from "@/lib/types";
import TrackCard from "@/components/ui/TrackCard";
import NeonGrid from "@/components/ui/NeonGrid";
import PageTransition from "@/components/ui/PageTransition";

interface MusicPageClientProps {
  tracks: Track[];
  genres: string[];
}

export default function MusicPageClient({ tracks, genres }: MusicPageClientProps) {
  const [activeGenre, setActiveGenre] = useState<string | null>(null);

  const filteredTracks = activeGenre
    ? tracks.filter((t) => t.genre === activeGenre)
    : tracks;

  return (
    <PageTransition>
      <div className="relative mx-auto max-w-7xl px-6 py-20">
        {/* Background grid */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-30">
          <NeonGrid />
        </div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative mb-12"
        >
          <div className="mb-3 flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-cyber-cyan shadow-[0_0_8px_rgba(0,240,255,0.6)]" />
            <span className="font-cyber text-[9px] uppercase tracking-[0.4em] text-cyber-cyan/60">
              Audio Database
            </span>
          </div>
          <h1 className="font-cyber text-4xl font-bold tracking-wide text-white md:text-5xl">
            Music Library
          </h1>
          <p className="mt-3 text-sm text-neutral-600">
            Browse all available beats. Select any track to initialize playback.
          </p>
        </motion.div>

        {/* Genre filter pills */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="relative mb-10 flex flex-wrap gap-2"
        >
          <button
            onClick={() => setActiveGenre(null)}
            className={`font-cyber text-[10px] uppercase tracking-wider px-5 py-2 border transition-all duration-300 ${
              activeGenre === null
                ? "border-cyber-cyan/40 bg-cyber-cyan/10 text-cyber-cyan shadow-[0_0_12px_rgba(0,240,255,0.15)]"
                : "border-white/8 text-neutral-600 hover:border-cyber-cyan/20 hover:text-cyber-cyan/70"
            }`}
            style={{ clipPath: "polygon(8px 0, 100% 0, calc(100% - 8px) 100%, 0 100%)" }}
          >
            All ({tracks.length})
          </button>
          {genres.map((genre) => (
            <button
              key={genre}
              onClick={() => setActiveGenre(activeGenre === genre ? null : genre)}
              className={`font-cyber text-[10px] uppercase tracking-wider px-5 py-2 border transition-all duration-300 ${
                activeGenre === genre
                  ? "border-cyber-cyan/40 bg-cyber-cyan/10 text-cyber-cyan shadow-[0_0_12px_rgba(0,240,255,0.15)]"
                  : "border-white/8 text-neutral-600 hover:border-cyber-cyan/20 hover:text-cyber-cyan/70"
              }`}
              style={{ clipPath: "polygon(8px 0, 100% 0, calc(100% - 8px) 100%, 0 100%)" }}
            >
              {genre}
            </button>
          ))}
        </motion.div>

        {/* Track grid */}
        <div className="relative grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {filteredTracks.map((track, i) => (
            <TrackCard key={track.id} track={track} index={i} />
          ))}
        </div>

        {filteredTracks.length === 0 && (
          <div className="py-20 text-center">
            <p className="font-cyber text-sm text-neutral-700">No tracks found in this category.</p>
          </div>
        )}
      </div>
    </PageTransition>
  );
}
