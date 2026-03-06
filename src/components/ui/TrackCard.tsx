"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Track } from "@/lib/types";
import { useAudioPlayer } from "@/contexts/AudioPlayerContext";

interface TrackCardProps {
  track: Track;
  index?: number;
}

export default function TrackCard({ track, index = 0 }: TrackCardProps) {
  const { playTrack, currentTrack, isPlaying } = useAudioPlayer();
  const isActive = currentTrack?.id === track.id;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      whileHover={{ y: -6 }}
      className={`group relative cursor-pointer overflow-hidden border transition-all duration-300 ${
        isActive
          ? "border-cyber-cyan/40 bg-cyber-cyan/5 shadow-[0_0_20px_rgba(0,240,255,0.1)]"
          : "border-white/6 bg-white/2 hover:border-cyber-cyan/20 hover:shadow-[0_0_25px_rgba(0,240,255,0.08)]"
      }`}
      style={{ clipPath: "polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 16px 100%, 0 calc(100% - 16px))" }}
      onClick={() => playTrack(track)}
    >
      {/* Corner accents */}
      <div className="absolute top-0 right-0 h-4 w-4 border-t border-r border-cyber-cyan/30 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <div className="absolute bottom-0 left-0 h-4 w-4 border-b border-l border-cyber-cyan/30 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      {/* Cover image */}
      <div className="relative aspect-square overflow-hidden">
        <Image
          src={track.cover}
          alt={track.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />

        {/* Holographic overlay */}
        <div className="absolute inset-0 bg-linear-to-t from-[#050505] via-transparent to-transparent opacity-60" />
        <div
          className="absolute inset-0 opacity-0 mix-blend-overlay transition-opacity duration-500 group-hover:opacity-30"
          style={{
            background: "linear-gradient(135deg, rgba(0,240,255,0.3), rgba(184,41,255,0.2), rgba(255,0,170,0.2))",
          }}
        />

        {/* Scanline on hover */}
        <div
          className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,240,255,0.03) 2px, rgba(0,240,255,0.03) 4px)",
          }}
        />

        {/* Play overlay */}
        <div
          className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${
            isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100"
          }`}
        >
          <div className="flex h-14 w-14 items-center justify-center border border-cyber-cyan/50 bg-[#050505]/80 shadow-[0_0_20px_rgba(0,240,255,0.3)] transition-transform hover:scale-110"
            style={{ clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)" }}
          >
            {isActive && isPlaying ? (
              <div className="flex items-end gap-0.5">
                <span className="inline-block w-[3px] animate-eq-bar bg-cyber-cyan" style={{ animationDelay: "0ms" }} />
                <span className="inline-block w-[3px] animate-eq-bar bg-cyber-cyan" style={{ animationDelay: "150ms" }} />
                <span className="inline-block w-[3px] animate-eq-bar bg-cyber-cyan" style={{ animationDelay: "300ms" }} />
              </div>
            ) : (
              <svg className="ml-0.5 h-5 w-5 text-cyber-cyan" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            )}
          </div>
        </div>
      </div>

      {/* Track info */}
      <div className="relative p-4">
        <h3 className="truncate font-cyber text-sm font-semibold tracking-wide text-white">
          {track.title}
        </h3>
        <div className="mt-2 flex items-center justify-between">
          <span className="font-cyber text-[10px] uppercase tracking-wider text-cyber-cyan/60">
            {track.genre}
          </span>
          {track.duration && (
            <span className="font-mono text-[10px] text-neutral-700">
              {track.duration}
            </span>
          )}
        </div>
        {/* Active indicator line */}
        {isActive && (
          <motion.div
            layoutId="track-active-bar"
            className="absolute bottom-0 left-0 right-0 h-px bg-cyber-cyan shadow-[0_0_8px_rgba(0,240,255,0.5)]"
          />
        )}
      </div>
    </motion.div>
  );
}
