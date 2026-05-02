import { NextResponse } from "next/server";
import { isValidSlug, requireAdmin } from "@/lib/admin-api";
import { getAllPosts, upsertPost } from "@/lib/posts";

export async function GET() {
  return NextResponse.json(getAllPosts());
}

export async function POST(request: Request) {
  const unauthorizedResponse = await requireAdmin();
  if (unauthorizedResponse) return unauthorizedResponse;

  const { slug, markdown } = (await request.json()) as { slug?: string; markdown?: string };

  if (!slug || !markdown) {
    return NextResponse.json({ error: "slug and markdown are required" }, { status: 400 });
  }

  if (!isValidSlug(slug)) {
    return NextResponse.json({ error: "slug format is invalid" }, { status: 400 });
  }

  if (markdown.length > 200_000) {
    return NextResponse.json({ error: "markdown is too large" }, { status: 413 });
  }

  upsertPost(slug, markdown);
  return NextResponse.json({ success: true });
}
