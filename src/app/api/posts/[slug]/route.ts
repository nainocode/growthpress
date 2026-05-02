import { NextResponse } from "next/server";
import { isValidSlug, requireAdmin } from "@/lib/admin-api";
import { removePost } from "@/lib/posts";

export async function DELETE(_: Request, { params }: { params: Promise<{ slug: string }> }) {
  const unauthorizedResponse = await requireAdmin();
  if (unauthorizedResponse) return unauthorizedResponse;

  const { slug } = await params;
  if (!isValidSlug(slug)) {
    return NextResponse.json({ error: "slug format is invalid" }, { status: 400 });
  }

  const removed = removePost(slug);
  if (!removed) {
    return NextResponse.json({ error: "Post not found on disk" }, { status: 404 });
  }

  return NextResponse.json({ success: true });
}
