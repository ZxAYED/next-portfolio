"use server";

import { jwtDecode, type JwtPayload } from "jwt-decode";
import { cookies } from "next/headers";
import { z } from "zod";

export interface IUser {
  name: string;
  email: string;
  image: string;
}

const credentialsSchema = z.object({
  email: z.string().trim().email().max(254),
  password: z.string().min(1).max(1024),
});
const loginResponseSchema = z.object({
  success: z.literal(true),
  data: z.object({ accessToken: z.string().min(1).max(8192) }),
});
const displayProfileSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  image: z.string().default(""),
});

/** Retained integration; the source archive did not contain dashboard pages. */
export async function Login(payload: { email: string; password: string }) {
  const parsed = credentialsSchema.safeParse(payload);
  if (!parsed.success)
    return {
      success: false,
      message: "Please check your email address and password.",
    };
  const baseUrl =
    process.env.BACKEND_URL || process.env.NEXT_PUBLIC_BACKEND_URL;
  if (!baseUrl)
    return {
      success: false,
      message: "Owner sign-in has not been configured.",
    };

  try {
    const response = await fetch(`${baseUrl.replace(/\/$/, "")}/user/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(parsed.data),
      cache: "no-store",
      signal: AbortSignal.timeout(10_000),
    });
    if (!response.ok)
      return {
        success: false,
        message: "Unable to sign in with those details.",
      };
    const result = loginResponseSchema.safeParse(await response.json());
    if (!result.success)
      return {
        success: false,
        message: "The sign-in service could not complete this request.",
      };

    (await cookies()).set("accessToken", result.data.data.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 30,
    });
    // Keep the access token in its HttpOnly cookie, out of client action responses.
    return { success: true, message: "Signed in." };
  } catch {
    return {
      success: false,
      message: "The sign-in service is unavailable. Please try again later.",
    };
  }
}

/** Display data only: JWT decoding does not verify a session or authorize access. */
export async function UserInfo(): Promise<IUser | null> {
  const token = (await cookies()).get("accessToken")?.value;
  if (!token) return null;
  try {
    const decoded = jwtDecode<JwtPayload & Partial<IUser>>(token);
    if (decoded.exp && decoded.exp * 1000 <= Date.now()) return null;
    const profile = displayProfileSchema.safeParse(decoded);
    return profile.success ? profile.data : null;
  } catch {
    return null;
  }
}
