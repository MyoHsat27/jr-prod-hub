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

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const authed = await isAuthenticated();
  if (!authed) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  try {
    const body = await request.json();
    const data = readTracks();
    const index = data.tracks.findIndex((t: { id: string }) => t.id === id);

    if (index === -1) {
      return NextResponse.json({ error: "Track not found" }, { status: 404 });
    }

    // If this track is being set as featured, unfeatured all others
    if (body.featured) {
      data.tracks = data.tracks.map((t: Record<string, unknown>) => ({
        ...t,
        featured: false,
      }));
    }

    data.tracks[index] = { ...data.tracks[index], ...body, id };
    writeTracks(data);

    return NextResponse.json(data.tracks[index]);
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const authed = await isAuthenticated();
  if (!authed) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const data = readTracks();
  const index = data.tracks.findIndex((t: { id: string }) => t.id === id);

  if (index === -1) {
    return NextResponse.json({ error: "Track not found" }, { status: 404 });
  }

  data.tracks.splice(index, 1);
  writeTracks(data);

  return NextResponse.json({ success: true });
}
