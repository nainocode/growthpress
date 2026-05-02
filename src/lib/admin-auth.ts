import crypto from "node:crypto";
import { cookies } from "next/headers";

const COOKIE_NAME = "admin_session";
const SESSION_TTL_SECONDS = 60 * 60 * 8;

function getSecret() {
  return process.env.ADMIN_SESSION_SECRET ?? "dev-only-secret-change-me";
}

function createSignature(payload: string) {
  return crypto.createHmac("sha256", getSecret()).update(payload).digest("hex");
}

function timingSafeEqual(a: string, b: string) {
  const aBuf = Buffer.from(a);
  const bBuf = Buffer.from(b);
  if (aBuf.length !== bBuf.length) return false;
  return crypto.timingSafeEqual(aBuf, bBuf);
}

export function createSessionToken() {
  const exp = Math.floor(Date.now() / 1000) + SESSION_TTL_SECONDS;
  const payload = JSON.stringify({ exp });
  const base = Buffer.from(payload).toString("base64url");
  const sig = createSignature(base);
  return `${base}.${sig}`;
}

export function isSessionValid(token?: string) {
  if (!token) return false;

  const [base, sig] = token.split(".");
  if (!base || !sig) return false;

  const expected = createSignature(base);
  if (!timingSafeEqual(sig, expected)) return false;

  try {
    const payload = JSON.parse(Buffer.from(base, "base64url").toString("utf8")) as { exp: number };
    return payload.exp > Math.floor(Date.now() / 1000);
  } catch {
    return false;
  }
}

export async function isAdminAuthenticated() {
  const store = await cookies();
  const token = store.get(COOKIE_NAME)?.value;
  return isSessionValid(token);
}

export async function setAdminSessionCookie() {
  const store = await cookies();
  const token = createSessionToken();

  store.set(COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SESSION_TTL_SECONDS,
  });
}

export async function clearAdminSessionCookie() {
  const store = await cookies();
  store.delete(COOKIE_NAME);
}

export function isAdminPasswordValid(password: string) {
  const envPassword = process.env.ADMIN_PASSWORD;
  if (!envPassword) {
    return false;
  }

  const inputHash = crypto.createHash("sha256").update(password).digest("hex");
  const envHash = crypto.createHash("sha256").update(envPassword).digest("hex");

  return timingSafeEqual(inputHash, envHash);
}
