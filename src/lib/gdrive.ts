import { GoogleAuth } from "google-auth-library";

const SCOPES = ["https://www.googleapis.com/auth/drive"];

function getAuth() {
  return new GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    },
    scopes: SCOPES,
  });
}

async function getAccessToken(): Promise<string> {
  const auth = getAuth();
  const client = await auth.getClient();
  const tokenResponse = await client.getAccessToken();
  return tokenResponse.token || "";
}

export async function readDriveJSON<T>(fileId: string): Promise<T> {
  const token = await getAccessToken();
  const res = await fetch(
    `https://www.googleapis.com/drive/v3/files/${fileId}?alt=media`,
    {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    },
  );

  if (!res.ok) {
    const errorText = await res.text();
    console.error(`Drive API error for file ${fileId}:`, res.status, errorText);
    throw new Error(
      `Failed to read file ${fileId}: ${res.status} ${errorText}`,
    );
  }

  return res.json();
}

export async function writeDriveJSON(
  fileId: string,
  data: unknown,
): Promise<void> {
  const token = await getAccessToken();
  const res = await fetch(
    `https://www.googleapis.com/upload/drive/v3/files/${fileId}?uploadType=media`,
    {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data, null, 2),
    },
  );

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Failed to write file ${fileId}: ${res.status} ${text}`);
  }
}

export async function readTracks() {
  const fileId = process.env.GDRIVE_TRACKS_FILE_ID!;
  return readDriveJSON<{ tracks: Array<Record<string, unknown>> }>(fileId);
}

export async function writeTracks(data: {
  tracks: Array<Record<string, unknown>>;
}) {
  const fileId = process.env.GDRIVE_TRACKS_FILE_ID!;
  return writeDriveJSON(fileId, data);
}

export async function readSocials() {
  const fileId = process.env.GDRIVE_SOCIALS_FILE_ID!;
  return readDriveJSON<{ socials: Array<Record<string, unknown>> }>(fileId);
}

export async function writeSocials(data: {
  socials: Array<Record<string, unknown>>;
}) {
  const fileId = process.env.GDRIVE_SOCIALS_FILE_ID!;
  return writeDriveJSON(fileId, data);
}
