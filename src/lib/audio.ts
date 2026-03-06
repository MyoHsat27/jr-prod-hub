import { Track } from "./types";
import tracksData from "@/data/tracks.json";

/**
 * Resolves Google Drive URLs through our API proxy to avoid CORS.
 * Non-Google-Drive URLs (CDN, local, etc.) are returned as-is.
 */
function isGoogleDriveUrl(url: string): boolean {
  return url.includes("drive.google.com");
}

function resolveTrack(track: Track): Track {
  const audioUrl = isGoogleDriveUrl(track.audioUrl)
    ? `/api/audio/${track.id}`
    : track.audioUrl;
  const cover = isGoogleDriveUrl(track.cover)
    ? `/api/cover/${track.id}`
    : track.cover;
  return { ...track, audioUrl, cover };
}

export function getAllTracks(): Track[] {
  return tracksData.tracks.map(resolveTrack);
}

export function getFeaturedTrack(): Track {
  const featured = tracksData.tracks.find((t) => t.featured);
  return resolveTrack(featured || tracksData.tracks[0]);
}

export function getTrackById(id: string): Track | undefined {
  const track = tracksData.tracks.find((t) => t.id === id);
  return track ? resolveTrack(track) : undefined;
}

export function getTracksByGenre(genre: string): Track[] {
  return tracksData.tracks
    .filter((track) => track.genre.toLowerCase() === genre.toLowerCase())
    .map(resolveTrack);
}

export function getLatestTracks(count: number = 4): Track[] {
  return [...tracksData.tracks]
    .sort(
      (a, b) =>
        new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime(),
    )
    .slice(0, count)
    .map(resolveTrack);
}
