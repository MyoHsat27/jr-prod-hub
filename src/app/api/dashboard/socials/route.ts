import { NextRequest, NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";
import fs from "fs";
import path from "path";

const DATA_FILE = path.join(process.cwd(), "src/data/socials.json");

function readSocials() {
  const raw = fs.readFileSync(DATA_FILE, "utf-8");
  return JSON.parse(raw);
}

function writeSocials(data: { socials: Array<Record<string, unknown>> }) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2) + "\n");
}

export async function GET() {
  // Public endpoint - used by links page too
  const data = readSocials();
  return NextResponse.json(data);
}

export async function PUT(request: NextRequest) {
  const authed = await isAuthenticated();
  if (!authed) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { socials } = body;

    if (!Array.isArray(socials)) {
      return NextResponse.json(
        { error: "Invalid data format" },
        { status: 400 },
      );
    }

    writeSocials({ socials });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
