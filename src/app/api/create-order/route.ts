import { NextResponse } from "next/server";

function generateCode(length = 8) {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let result = "";

  for (let i = 0; i < length; i++) {
    result += chars[Math.floor(Math.random() * chars.length)];
  }

  return result;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { customer, items, amountPaid } = body || {};

    if (!customer?.fullName || !customer?.email || !customer?.phone) {
      return NextResponse.json(
        { message: "Customer details are incomplete" },
        { status: 400 }
      );
    }

    if (!Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { message: "No items found in order" },
        { status: 400 }
      );
    }

    const orderId = `LANA-${Date.now()}`;
    const trackingCode = `TRK-${generateCode(8)}`;

    return NextResponse.json({
      success: true,
      orderId,
      trackingCode,
      amountPaid,
      customer,
      items,
    });
  } catch {
    return NextResponse.json(
      { message: "Something went wrong while creating order" },
      { status: 500 }
    );
  }
}