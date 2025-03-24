import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { order_id, amount } = await req.json();
  const response = await fetch(
    "https://app.sandbox.midtrans.com/snap/v1/transactions",
    {
      method: "POST",
      headers: {
        Authorization: `Basic ${Buffer.from(
          process.env.MIDTRANS_SERVER_KEY + ":"
        ).toString("base64")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        transaction_details: {
          order_id,
          gross_amount: amount,
        },
      }),
    }
  );
  const data = await response.json();
  return NextResponse.json({ token: data.token });
}
