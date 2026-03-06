import { NextRequest, NextResponse } from "next/server";
import { validateCredentials, getAuthCookieOptions } from "@/lib/auth";

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!validateCredentials(email, password)) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 },
      );
    }

    const response = NextResponse.json({ success: true });
    const cookieOptions = getAuthCookieOptions();
    response.cookies.set(cookieOptions);
    return response;
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
