import { NextRequest, NextResponse } from "next/server";
import tracksData from "@/data/tracks.json";

/**
 * Extracts Google Drive file ID from various URL formats.
 */
function getGoogleDriveDirectUrl(url: string): string | null {
  const fileIdMatch = url.match(/\/d\/([a-zA-Z0-9_-]+)/);
  if (fileIdMatch) {
    return `https://drive.google.com/uc?export=download&id=${fileIdMatch[1]}`;
  }
  const idParam = url.match(/[?&]id=([a-zA-Z0-9_-]+)/);
  if (idParam && url.includes("drive.google.com")) {
    return `https://drive.google.com/uc?export=download&id=${idParam[1]}`;
  }
  return null;
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const track = tracksData.tracks.find((t) => t.id === id);

  if (!track) {
    return NextResponse.json({ error: "Track not found" }, { status: 404 });
  }

  const directUrl = getGoogleDriveDirectUrl(track.audioUrl);

  // If it's not a Google Drive URL, redirect to the original
  if (!directUrl) {
    return NextResponse.redirect(track.audioUrl);
  }

  try {
    const response = await fetch(directUrl, {
      headers: { "User-Agent": "Mozilla/5.0" },
      redirect: "follow",
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to fetch audio" },
        { status: response.status }
      );
    }

    const contentType =
      response.headers.get("content-type") || "audio/mpeg";
    const contentLength = response.headers.get("content-length");

    const headers: Record<string, string> = {
      "Content-Type": contentType,
      "Cache-Control": "public, max-age=86400",
      "Access-Control-Allow-Origin": "*",
    };

    if (contentLength) {
      headers["Content-Length"] = contentLength;
    }

    return new NextResponse(response.body, { status: 200, headers });
  } catch {
    return NextResponse.json(
      { error: "Failed to proxy audio" },
      { status: 500 }
    );
  }
}
