import fs from "node:fs";
import path from "node:path";
import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-api";

const MAX_UPLOAD_SIZE_BYTES = 3 * 1024 * 1024;
const ALLOWED_TYPES = new Set(["image/jpeg", "image/png", "image/webp", "image/gif"]);

export async function POST(request: Request) {
  const unauthorizedResponse = await requireAdmin();
  if (unauthorizedResponse) return unauthorizedResponse;

  const data = await request.formData();
  const file = data.get("file") as File | null;

  if (!file) {
    return NextResponse.json({ error: "file is required" }, { status: 400 });
  }

  if (!ALLOWED_TYPES.has(file.type)) {
    return NextResponse.json({ error: "unsupported file type" }, { status: 400 });
  }

  if (file.size > MAX_UPLOAD_SIZE_BYTES) {
    return NextResponse.json({ error: "file too large (max 3MB)" }, { status: 413 });
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const safeName = file.name.toLowerCase().replace(/[^a-z0-9.\-_]/g, "-");
  const fileName = `${Date.now()}-${safeName}`;
  const uploadPath = path.join(process.cwd(), "public", "uploads", fileName);

  fs.writeFileSync(uploadPath, buffer);

  return NextResponse.json({ url: `/uploads/${fileName}` });
}
