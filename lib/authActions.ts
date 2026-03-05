import { adminAuth } from "./firebaseAdmin";

export const login = async (idToken: string, allowedEmails: string[] = []) => {
  try {
    const decodedToken = await adminAuth.verifyIdToken(idToken);

    const { uid, email } = decodedToken;

    if (!email) {
      throw new Error("Email not available in token.");
    }

    if (allowedEmails.length > 0 && !allowedEmails.includes(email)) {
      throw new Error("User is not authorized.");
    }

    return {
      uid,
      email,
      token: idToken,
    };
  } catch (error) {
    console.error("Login failed:", error);
    throw new Error("Invalid login credentials.");
  }
};

export const requireAdmin = async (
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
