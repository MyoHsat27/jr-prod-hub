import { NextRequest, NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";
import { readTracks, writeTracks } from "@/lib/gdrive";

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
    const data = await readTracks();
    const index = data.tracks.findIndex(
      (t: Record<string, unknown>) => t.id === id,
    );

    if (index === -1) {
      return NextResponse.json({ error: "Track not found" }, { status: 404 });
    }

    if (body.featured) {
      data.tracks = data.tracks.map((t: Record<string, unknown>) => ({
        ...t,
        featured: false,
      }));
    }

    data.tracks[index] = { ...data.tracks[index], ...body, id };
    await writeTracks(data);

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
  const data = await readTracks();
  const index = data.tracks.findIndex(
    (t: Record<string, unknown>) => t.id === id,
  );

  if (index === -1) {
    return NextResponse.json({ error: "Track not found" }, { status: 404 });
  }

  data.tracks.splice(index, 1);
  await writeTracks(data);

  return NextResponse.json({ success: true });
}
