import { NextResponse } from "next/server";
import PocketBase from "pocketbase";

export async function POST(req: Request) {
  try {
    const { customer, nama_undangan, jumlah_undangan, status } =
      await req.json();
    const pb = new PocketBase(process.env.NEXT_PUBLIC_POCKETBASE_URL || "");
    const record = await pb.collection("undangan").create({
      customer, // asumsikan field "customer" adalah relasi ke collection customers
      nama_undangan,
      jumlah_undangan, // jika null, PocketBase harus mengizinkannya
      status, // "hadir" atau "tidak hadir"
    });
    return NextResponse.json({ success: true, record });
  } catch (error: any) {
    console.error("Error creating undangan:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
