"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useRef,
  ReactNode,
} from "react";
import { Track } from "@/lib/types";

interface AudioPlayerState {
  currentTrack: Track | null;
  isPlaying: boolean;
  playTrack: (track: Track) => void;
  togglePlayPause: () => void;
  stop: () => void;
}

const AudioPlayerContext = createContext<AudioPlayerState | undefined>(
  undefined,
);

export function AudioPlayerProvider({ children }: { children: ReactNode }) {
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const currentTrackRef = useRef<Track | null>(null);

  const playTrack = useCallback((track: Track) => {
    if (currentTrackRef.current?.id === track.id) {
      setIsPlaying((prev) => !prev);
    } else {
      currentTrackRef.current = track;
      setCurrentTrack(track);
      setIsPlaying(true);
    }
  }, []);

  const togglePlayPause = useCallback(() => {
    if (currentTrackRef.current) {
      setIsPlaying((prev) => !prev);
    }
  }, []);

  const stop = useCallback(() => {
    setIsPlaying(false);
    currentTrackRef.current = null;
    setCurrentTrack(null);
  }, []);

  return (
    <AudioPlayerContext.Provider
      value={{ currentTrack, isPlaying, playTrack, togglePlayPause, stop }}
    >
      {children}
    </AudioPlayerContext.Provider>
  );
}

export function useAudioPlayer() {
  const context = useContext(AudioPlayerContext);
  if (!context) {
    throw new Error(
      "useAudioPlayer must be used within an AudioPlayerProvider",
    );
  }
  return context;
}
