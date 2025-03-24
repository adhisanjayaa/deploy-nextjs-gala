// app/api/proxy-image/route.ts
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const path = searchParams.get("path");
  if (!path) {
    return NextResponse.error();
  }
  // Buat URL absolut ke PocketBase
  const baseUrl = process.env.NEXT_PUBLIC_POCKETBASE_URL?.replace(/\/$/, "");
  const imageUrl = `${baseUrl}${path.startsWith("/") ? path : "/" + path}`;

  const response = await fetch(imageUrl);
  const blob = await response.blob();
  return new NextResponse(blob, {
    headers: { "Content-Type": blob.type },
  });
}
