import { getAllTracks } from "@/lib/audio";
import MusicPageClient from "./MusicPageClient";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Music Database | Jr Prod",
  description: "Access the full beats database by Jr Prod.",
};

export default async function MusicPage() {
  const tracks = await getAllTracks();
  const genres = [...new Set(tracks.map((t) => t.genre))];

  return <MusicPageClient tracks={tracks} genres={genres} />;
}
