import { NextRequest, NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";
import fs from "fs";
import path from "path";

const DATA_FILE = path.join(process.cwd(), "src/data/tracks.json");

function readTracks() {
  const raw = fs.readFileSync(DATA_FILE, "utf-8");
  return JSON.parse(raw);
}

function writeTracks(data: { tracks: Array<Record<string, unknown>> }) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2) + "\n");
}

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
  const data = readTracks();
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

    const data = readTracks();
    const id = slugify(title);

    // Check for duplicate ID
    if (data.tracks.some((t: { id: string }) => t.id === id)) {
      return NextResponse.json(
        { error: "A track with a similar title already exists" },
        { status: 409 },
      );
    }

    // If this track is featured, unfeatured all others
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
    writeTracks(data);

    return NextResponse.json(newTrack, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
