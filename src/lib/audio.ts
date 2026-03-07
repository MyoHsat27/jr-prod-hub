import { Track } from "./types";
import { readTracks as readTracksFromDrive } from "./gdrive";

/**
 * Resolves Google Drive URLs through our API proxy to avoid CORS.
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

async function fetchTracks(): Promise<Track[]> {
  const data = await readTracksFromDrive();
  return data.tracks as unknown as Track[];
}

export async function getAllTracks(): Promise<Track[]> {
  const tracks = await fetchTracks();
  return tracks.map(resolveTrack);
}

export async function getFeaturedTrack(): Promise<Track> {
  const tracks = await fetchTracks();
  const featured = tracks.find((t) => t.featured);
  return resolveTrack(featured || tracks[0]);
}

export async function getTrackById(id: string): Promise<Track | undefined> {
  const tracks = await fetchTracks();
  const track = tracks.find((t) => t.id === id);
  return track ? resolveTrack(track) : undefined;
}

export async function getTracksByGenre(genre: string): Promise<Track[]> {
  const tracks = await fetchTracks();
  return tracks
    .filter((track) => track.genre.toLowerCase() === genre.toLowerCase())
    .map(resolveTrack);
}

export async function getLatestTracks(count: number = 4): Promise<Track[]> {
  const tracks = await fetchTracks();
  return [...tracks]
    .sort(
      (a, b) =>
        new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime(),
    )
    .slice(0, count)
    .map(resolveTrack);
}

/**
 * Get raw track data (without resolving URLs) for proxy routes.
 */
export async function getRawTrackById(id: string): Promise<Track | undefined> {
  const tracks = await fetchTracks();
  return tracks.find((t) => t.id === id);
}
