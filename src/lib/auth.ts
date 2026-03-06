import { cookies } from "next/headers";

const DASHBOARD_EMAIL = "admin@jrprod.com";
const DASHBOARD_PASSWORD = "jrprod2026";
const TOKEN_VALUE = "jr-dashboard-authenticated";
const COOKIE_NAME = "dashboard_token";

export function validateCredentials(email: string, password: string): boolean {
  return email === DASHBOARD_EMAIL && password === DASHBOARD_PASSWORD;
}

export async function isAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME);
  return token?.value === TOKEN_VALUE;
}

export function getAuthCookieOptions() {
  return {
    name: COOKIE_NAME,
    value: TOKEN_VALUE,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  };
}

export function getClearCookieOptions() {
  return {
    name: COOKIE_NAME,
    value: "",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
    maxAge: 0,
  };
}
