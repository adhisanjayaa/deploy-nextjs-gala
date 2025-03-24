import { NextResponse } from "next/server";
import PocketBase from "pocketbase";

export async function POST(req: Request) {
  return NextResponse.json(
    { success: false, error: "Endpoint ini belum mendukung file upload." },
    { status: 501 }
  );
}
