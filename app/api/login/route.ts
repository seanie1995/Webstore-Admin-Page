import { login } from "@/lib/authActions";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { adminAuth } from "@/lib/firebaseAdmin";

const ALLOWED_EMAILS = process.env.ALLOWED_EMAILS
  ? JSON.parse(process.env.ALLOWED_EMAILS)
  : [];

export async function POST(req: Request) {
  const { idToken } = await req.json();

  await login(idToken, ALLOWED_EMAILS);

  const expiresIn = 60 * 60 * 24 * 14 * 1000;

  const sessionCookie = await adminAuth.createSessionCookie(idToken, {
    expiresIn,
  });

  (await cookies()).set("session", sessionCookie, {
    httpOnly: true,
    secure: true,
    maxAge: expiresIn / 1000,
    path: "/",
  });

  return NextResponse.json({ success: true });
}
