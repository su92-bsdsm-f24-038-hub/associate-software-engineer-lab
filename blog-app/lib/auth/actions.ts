"use server";

import { redirect } from "next/navigation";
import { MOCK_AUTH_PASSWORD, SESSION_MAX_AGE_SECONDS } from "@/lib/auth/constants";
import { clearSessionCookie, writeSessionCookie } from "@/lib/auth/session";
import { getUserByEmail } from "@/lib/db/repositories/userRepository";

function sanitizeErrorMessage(message: string): string {
  return encodeURIComponent(message);
}

export async function loginAction(formData: FormData): Promise<void> {
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const password = String(formData.get("password") ?? "").trim();

  if (!email || !password) {
    redirect(`/login?error=${sanitizeErrorMessage("Email and password are required.")}`);
  }

  if (password !== MOCK_AUTH_PASSWORD) {
    redirect(`/login?error=${sanitizeErrorMessage("Invalid credentials.")}`);
  }

  const user = await getUserByEmail(email);

  if (!user) {
    redirect(`/login?error=${sanitizeErrorMessage("No user found for this email.")}`);
  }

  await writeSessionCookie(
    {
      userId: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    },
    SESSION_MAX_AGE_SECONDS
  );

  redirect("/dashboard");
}

export async function logoutAction(): Promise<void> {
  await clearSessionCookie();
  redirect("/login");
}
