import { NextRequest, NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";
import { readTracks, writeTracks } from "@/lib/gdrive";

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export async function GET() {
  const authed = await isAuthenticated();
  if (!authed) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const data = await readTracks();
  return NextResponse.json(data);
}

export async function POST(request: NextRequest) {
  const authed = await isAuthenticated();
  if (!authed) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { title, genre, cover, audioUrl, releaseDate, featured } = body;

    if (!title || !genre || !cover || !audioUrl || !releaseDate) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    const data = await readTracks();
    const id = slugify(title);

    if (data.tracks.some((t: Record<string, unknown>) => t.id === id)) {
      return NextResponse.json(
        { error: "A track with a similar title already exists" },
        { status: 409 },
      );
    }

    if (featured) {
      data.tracks = data.tracks.map((t: Record<string, unknown>) => ({
        ...t,
        featured: false,
      }));
    }

    const newTrack = {
      id,
      title,
      genre,
      cover,
      audioUrl,
      releaseDate,
      featured: featured || false,
    };

    data.tracks.unshift(newTrack);
    await writeTracks(data);

    return NextResponse.json(newTrack, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
