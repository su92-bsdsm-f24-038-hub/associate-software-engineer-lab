import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { SESSION_COOKIE_NAME } from "@/lib/auth/constants";
import { AuthSession } from "@/lib/auth/types";

function encodeSession(session: AuthSession): string {
  return Buffer.from(JSON.stringify(session), "utf-8").toString("base64url");
}

function decodeSession(rawValue: string): AuthSession | null {
  try {
    const parsed = JSON.parse(Buffer.from(rawValue, "base64url").toString("utf-8")) as AuthSession;

    if (!parsed || !parsed.email || !parsed.name || !parsed.role || typeof parsed.userId !== "number") {
      return null;
    }

    return parsed;
  } catch {
    return null;
  }
}

export async function readSession(): Promise<AuthSession | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;

  if (!token) {
    return null;
  }

  return decodeSession(token);
}

export async function requireSession(): Promise<AuthSession> {
  const session = await readSession();

  if (!session) {
    redirect("/login");
  }

  return session;
}

export async function writeSessionCookie(session: AuthSession, maxAge: number): Promise<void> {
  const cookieStore = await cookies();

  cookieStore.set(SESSION_COOKIE_NAME, encodeSession(session), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge,
  });
}

export async function clearSessionCookie(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE_NAME);
}
