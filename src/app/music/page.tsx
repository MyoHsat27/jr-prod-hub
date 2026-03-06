import { getAllTracks } from "@/lib/audio";
import MusicPageClient from "./MusicPageClient";

export const metadata = {
  title: "Music Database | Jr Prod",
  description: "Access the full beats database by Jr Prod.",
};

export default function MusicPage() {
  const tracks = getAllTracks();
  const genres = [...new Set(tracks.map((t) => t.genre))];

  return <MusicPageClient tracks={tracks} genres={genres} />;
}
