import { adminAuth } from "@/lib/firebaseAdmin";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("session")?.value;

  if (sessionCookie) {
    try {
      const decoded = await adminAuth.verifySessionCookie(sessionCookie);
      await adminAuth.revokeRefreshTokens(decoded.uid);
    } catch {}
  }

  cookieStore.delete("session");
  return NextResponse.json({ success: true });
}
