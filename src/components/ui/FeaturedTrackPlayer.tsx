"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Track } from "@/lib/types";
import { useAudioPlayer } from "@/contexts/AudioPlayerContext";

interface FeaturedTrackPlayerProps {
  track: Track;
}

export default function FeaturedTrackPlayer({ track }: FeaturedTrackPlayerProps) {
  const { playTrack, currentTrack, isPlaying } = useAudioPlayer();
  const isActive = currentTrack?.id === track.id;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={`group relative cursor-pointer overflow-hidden border transition-all duration-500 ${
        isActive
          ? "border-cyber-cyan/30 shadow-[0_0_30px_rgba(0,240,255,0.1)]"
          : "border-white/6 hover:border-cyber-cyan/20"
      }`}
      style={{ clipPath: "polygon(0 0, calc(100% - 24px) 0, 100% 24px, 100% 100%, 24px 100%, 0 calc(100% - 24px))" }}
      onClick={() => playTrack(track)}
    >
      {/* Background */}
      <div className="absolute inset-0 bg-background/80" />

      {/* Scanlines on hover */}
      <div
        className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,240,255,0.02) 2px, rgba(0,240,255,0.02) 4px)",
        }}
      />

      <div className="relative flex flex-col md:flex-row">
        {/* Cover */}
        <div className="relative aspect-square w-full md:w-72 lg:w-80">
          <Image
            src={track.cover}
            alt={track.title}
            fill
            sizes="(max-width: 768px) 100vw, 320px"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            priority
          />
          {/* Holographic overlay */}
          <div className="absolute inset-0 bg-linear-to-r from-background/60 via-transparent to-transparent" />
          <div
            className="absolute inset-0 opacity-0 mix-blend-overlay transition-opacity duration-500 group-hover:opacity-20"
            style={{
              background: "linear-gradient(135deg, rgba(0,240,255,0.4), rgba(184,41,255,0.3), rgba(255,0,170,0.2))",
            }}
          />

          {/* Play button */}
          <div
            className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${
              isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100"
            }`}
          >
            <div
              className="flex h-16 w-16 items-center justify-center border border-cyber-cyan/40 bg-background/70 shadow-[0_0_25px_rgba(0,240,255,0.3)] transition-transform hover:scale-110"
              style={{ clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)" }}
            >
              {isActive && isPlaying ? (
                <div className="flex items-end gap-[3px]">
                  {[0, 150, 300].map((delay, i) => (
                    <span key={i} className="inline-block w-[3px] animate-eq-bar bg-cyber-cyan" style={{ animationDelay: `${delay}ms` }} />
                  ))}
                </div>
              ) : (
                <svg className="ml-1 h-6 w-6 text-cyber-cyan" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              )}
            </div>
          </div>
        </div>

        {/* Info panel */}
        <div className="flex flex-1 flex-col justify-center p-6 md:p-10">
          {/* Terminal-style header */}
          <div className="mb-4 flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-cyber-cyan shadow-[0_0_6px_rgba(0,240,255,0.6)]" />
            <span className="font-cyber text-[9px] uppercase tracking-[0.3em] text-cyber-cyan/60">
              Featured Track &mdash; Now Streaming
            </span>
          </div>

          <span className="mb-3 inline-block w-fit border border-cyber-purple/20 bg-cyber-purple/5 px-3 py-1 font-cyber text-[10px] uppercase tracking-wider text-cyber-purple">
            {track.genre}
          </span>

          <h3 className="mb-3 font-cyber text-3xl font-bold tracking-wide text-white lg:text-4xl">
            {track.title}
          </h3>

          <div className="space-y-1 font-mono text-xs text-neutral-600">
            <p>
              Released: {new Date(track.releaseDate).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </p>
            {track.duration && <p>Duration: {track.duration}</p>}
          </div>

          <div className="mt-6">
            <span
              className="inline-flex items-center gap-3 border border-cyber-cyan/20 bg-cyber-cyan/5 px-5 py-2.5 font-cyber text-[10px] font-medium uppercase tracking-wider text-cyber-cyan transition-all duration-300 group-hover:border-cyber-cyan/40 group-hover:shadow-[0_0_15px_rgba(0,240,255,0.15)]"
            >
              {isActive && isPlaying ? (
                <>
                  <span className="flex items-end gap-[2px]">
                    {[0, 100, 200].map((delay, i) => (
                      <span key={i} className="inline-block w-[2px] animate-eq-bar bg-cyber-cyan" style={{ animationDelay: `${delay}ms` }} />
                    ))}
                  </span>
                  Now Playing
                </>
              ) : (
                <>&gt; Initialize Playback</>
              )}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
