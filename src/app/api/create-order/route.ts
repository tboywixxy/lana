import { NextResponse } from "next/server";

type CheckoutCustomer = {
  fullName: string;
  email: string;
  phone: string;
  address?: string;
  note?: string;
};

type CheckoutItem = {
  name: string;
  price: number;
  quantity: number;
  size?: string;
};

function generateCode(length = 8) {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let result = "";

  for (let i = 0; i < length; i++) {
    result += chars[Math.floor(Math.random() * chars.length)];
  }

  return result;
}

function formatCurrency(amount: number) {
  return `NGN ${amount.toLocaleString("en-NG")}`;
}

function normalizeWhatsAppNumber(value: string) {
  return value.replace(/[^\d]/g, "");
}

function buildWhatsAppMessage({
  orderId,
  trackingCode,
  amountPaid,
  customer,
  items,
}: {
  orderId: string;
  trackingCode: string;
  amountPaid: number;
  customer: CheckoutCustomer;
  items: CheckoutItem[];
}) {
  const itemLines = items.map((item, index) => {
    const sizeLine = item.size ? ` | Size: ${item.size}` : "";

    return `${index + 1}. ${item.name} x${item.quantity}${sizeLine} - ${formatCurrency(
      item.price * item.quantity
    )}`;
  });

  const lines = [
    "Hello, I want to place an order from LANA.",
    "",
    `Order ID: ${orderId}`,
    `Tracking Code: ${trackingCode}`,
    "",
    "Customer Details",
    `Name: ${customer.fullName}`,
    `Email: ${customer.email}`,
    `Phone: ${customer.phone}`,
    `Address: ${customer.address ?? ""}`,
    customer.note ? `Note: ${customer.note}` : "",
    "",
    "Order Items",
    ...itemLines,
    "",
    `Total: ${formatCurrency(amountPaid)}`,
  ].filter(Boolean);

  return lines.join("\n");
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { customer, items, amountPaid } = body || {};
    const whatsappNumber = normalizeWhatsAppNumber(
      process.env.WHATSAPP_ORDER_NUMBER ||
        process.env.NEXT_PUBLIC_WHATSAPP_ORDER_NUMBER ||
        ""
    );

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

    if (!whatsappNumber) {
      return NextResponse.json(
        { message: "WhatsApp checkout is not configured yet" },
        { status: 500 }
      );
    }

    const orderId = `LANA-${Date.now()}`;
    const trackingCode = `TRK-${generateCode(4)}`;
    const whatsappMessage = buildWhatsAppMessage({
      orderId,
      trackingCode,
      amountPaid: Number(amountPaid) || 0,
      customer,
      items,
    });

    return NextResponse.json({
      success: true,
      orderId,
      trackingCode,
      amountPaid,
      customer,
      items,
      whatsappUrl: `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
        whatsappMessage
      )}`,
    });
  } catch {
    return NextResponse.json(
      { message: "Something went wrong while creating order" },
      { status: 500 }
    );
  }
}
