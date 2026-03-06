"use server";

import { adminAuth } from "./firebaseAdmin";
import { cookies } from "next/headers";

const ALLOWED_EMAILS = process.env.ALLOWED_EMAILS
  ? JSON.parse(process.env.ALLOWED_EMAILS)
  : [];

export const Login = async (idToken: string) => {
  try {
    const decodedToken = await adminAuth.verifyIdToken(idToken);
    const allowedEmails = ALLOWED_EMAILS;

    const { uid, email } = decodedToken;

    if (!email) {
      throw new Error("Email not available in token.");
    }

    if (allowedEmails.length > 0 && !allowedEmails.includes(email)) {
      throw new Error("User is not authorized.");
    }

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
  } catch (error) {
    console.error("Login failed:", error);
    throw new Error("Invalid login credentials.");
  }
};

export const Logout = async () => {
  try {
    const cookieStore = await cookies();

    const sessionCookie = cookieStore.get("session")?.value;

    if (sessionCookie) {
      const decoded = await adminAuth.verifySessionCookie(sessionCookie);
      await adminAuth.revokeRefreshTokens(decoded.uid);
    }

    cookieStore.delete("session");
  } catch (error) {
    console.error("Logout failed:", error);
    throw new Error("An Error has occured");
  }
};

export const RequireAdmin = async (
  idToken: string,
  allowedEmails: string[],
) => {
  try {
    const decodedToken = await adminAuth.verifyIdToken(idToken);
    const { email, uid } = decodedToken;

    if (!email || !allowedEmails.includes(email)) {
      throw new Error("Not authorized");
    }

    return { uid, email };
  } catch (err) {
    throw new Error("Unauthorized");
  }
};
