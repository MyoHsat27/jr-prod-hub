"use client";

import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useAudioPlayer } from "@/contexts/AudioPlayerContext";
import WaveSurfer from "wavesurfer.js";
import Image from "next/image";

export default function AudioPlayer() {
  const { currentTrack, isPlaying, togglePlayPause, stop } = useAudioPlayer();
  const waveformRef = useRef<HTMLDivElement>(null);
  const wavesurferRef = useRef<WaveSurfer | null>(null);
  const loadedTrackIdRef = useRef<string | null>(null);
  const [ready, setReady] = useState(false);
  const [currentTime, setCurrentTime] = useState("0:00");
  const [duration, setDuration] = useState("0:00");

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  useEffect(() => {
    const container = waveformRef.current;

    if (!currentTrack || !container) {
      if (wavesurferRef.current) {
        wavesurferRef.current.destroy();
        wavesurferRef.current = null;
      }
      loadedTrackIdRef.current = null;
      setReady(false);
      setCurrentTime("0:00");
      setDuration("0:00");
      return;
    }

    if (loadedTrackIdRef.current === currentTrack.id && wavesurferRef.current) {
      return;
    }

    if (wavesurferRef.current) {
      wavesurferRef.current.destroy();
      wavesurferRef.current = null;
    }

    setReady(false);
    setCurrentTime("0:00");
    setDuration("0:00");
    loadedTrackIdRef.current = currentTrack.id;

    const trackId = currentTrack.id;
    const ws = WaveSurfer.create({
      container,
      waveColor: "rgba(0, 240, 255, 0.25)",
      progressColor: "#00f0ff",
      cursorColor: "rgba(0, 240, 255, 0.6)",
      barWidth: 2,
      barGap: 1,
      barRadius: 0,
      height: 40,
      normalize: true,
    });

    wavesurferRef.current = ws;
    ws.load(currentTrack.audioUrl);

    ws.on("ready", () => {
      if (loadedTrackIdRef.current !== trackId) return;
      setReady(true);
      setDuration(formatTime(ws.getDuration()));
      ws.play();
    });

    ws.on("timeupdate", () => {
      if (loadedTrackIdRef.current !== trackId) return;
      setCurrentTime(formatTime(ws.getCurrentTime()));
    });

    ws.on("finish", () => {
      if (loadedTrackIdRef.current !== trackId) return;
      togglePlayPause();
    });

    return () => {
      ws.destroy();
      if (wavesurferRef.current === ws) {
        wavesurferRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentTrack?.id, currentTrack?.audioUrl]);

  useEffect(() => {
    const ws = wavesurferRef.current;
    if (!ws || !ready) return;

    if (isPlaying && !ws.isPlaying()) {
      ws.play();
    } else if (!isPlaying && ws.isPlaying()) {
      ws.pause();
    }
  }, [isPlaying, ready]);

  const isVisible = currentTrack !== null;

  return (
    <motion.div
      initial={false}
      animate={{ y: isVisible ? 0 : "100%" }}
      transition={{ duration: 0.4, ease: [0.25, 0.4, 0.25, 1] }}
      className="fixed bottom-0 left-0 right-0 z-50 border-t border-cyber-cyan/15 bg-background/95 backdrop-blur-2xl"
    >
      {/* Top neon glow line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-cyber-cyan/30 shadow-[0_0_10px_rgba(0,240,255,0.3)]" />

      <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3 md:px-6">
        {/* Track info */}
        <div className="flex min-w-0 shrink-0 items-center gap-3">
          <div className="relative h-10 w-10 overflow-hidden border border-cyber-cyan/20">
            {currentTrack && (
              <>
                <Image
                  src={currentTrack.cover}
                  alt={currentTrack.title}
                  fill
                  sizes="40px"
                  className="object-cover"
                />
                {isPlaying && (
                  <div className="absolute inset-0 bg-linear-to-tr from-cyber-cyan/10 via-transparent to-cyber-purple/10 animate-pulse" />
                )}
              </>
            )}
          </div>
          <div className="hidden min-w-0 sm:block">
            <p className="truncate font-cyber text-xs font-medium tracking-wide text-white">
              {currentTrack?.title ?? ""}
            </p>
            <p className="font-cyber text-[9px] uppercase tracking-wider text-cyber-cyan/50">
              {currentTrack?.genre ?? ""}
            </p>
          </div>
        </div>

        {/* Play/Pause */}
        <button
          onClick={togglePlayPause}
          className="flex h-9 w-9 shrink-0 items-center justify-center border border-cyber-cyan/30 bg-cyber-cyan/5 text-cyber-cyan transition-all duration-300 hover:bg-cyber-cyan/15 hover:shadow-[0_0_15px_rgba(0,240,255,0.2)]"
          aria-label={isPlaying ? "Pause" : "Play"}
        >
          {isPlaying ? (
            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
              <rect x="6" y="4" width="4" height="16" />
              <rect x="14" y="4" width="4" height="16" />
            </svg>
          ) : (
            <svg
              className="ml-0.5 h-4 w-4"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </button>

        {/* Time */}
        <span className="hidden shrink-0 font-mono text-[10px] text-cyber-cyan/50 sm:block">
          {currentTime}
        </span>

        {/* Real WaveSurfer waveform — always mounted, interactive */}
        <div className="relative min-w-0 flex-1">
          <div className="h-10 overflow-hidden rounded bg-white/2">
            <div ref={waveformRef} className="h-full w-full" />
            {!ready && (
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="font-cyber text-[9px] uppercase tracking-wider text-cyber-cyan/30 animate-pulse">
                  {currentTrack ? "Loading..." : ""}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Duration */}
        <span className="hidden shrink-0 font-mono text-[10px] text-cyber-cyan/50 sm:block">
          {duration}
        </span>

        {/* Equalizer bars (visible when playing) */}
        {isPlaying && (
          <div className="hidden items-end gap-[2px] sm:flex">
            {[0, 150, 300, 100, 250].map((delay, i) => (
              <span
                key={i}
                className="inline-block w-[2px] animate-eq-bar bg-cyber-cyan"
                style={{ animationDelay: `${delay}ms` }}
              />
            ))}
          </div>
        )}

        {/* Close */}
        <button
          onClick={stop}
          className="shrink-0 text-neutral-600 transition-colors hover:text-cyber-magenta"
          aria-label="Close player"
        >
          <svg
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    </motion.div>
  );
}
