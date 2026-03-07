import { NextRequest, NextResponse } from "next/server";
import { getRawTrackById } from "@/lib/audio";

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
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const track = await getRawTrackById(id);

  if (!track) {
    return NextResponse.json({ error: "Track not found" }, { status: 404 });
  }

  const directUrl = getGoogleDriveDirectUrl(track.cover);

  if (!directUrl) {
    return NextResponse.redirect(track.cover);
  }

  try {
    const response = await fetch(directUrl, {
      headers: { "User-Agent": "Mozilla/5.0" },
      redirect: "follow",
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to fetch cover" },
        { status: response.status },
      );
    }

    const contentType = response.headers.get("content-type") || "image/jpeg";
    const contentLength = response.headers.get("content-length");

    const headers: Record<string, string> = {
      "Content-Type": contentType,
      "Cache-Control": "public, max-age=604800",
      "Access-Control-Allow-Origin": "*",
    };

    if (contentLength) {
      headers["Content-Length"] = contentLength;
    }

    return new NextResponse(response.body, { status: 200, headers });
  } catch {
    return NextResponse.json(
      { error: "Failed to proxy cover image" },
      { status: 500 },
    );
  }
}
