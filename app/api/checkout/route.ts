import { NextRequest, NextResponse } from "next/server";
import { validatePaymentStatus } from "@/lib/payments/validatePaymentStatus";

export async function POST(request: NextRequest) {
  const body: unknown = await request.json();

  if (
    typeof body !== "object" ||
    body === null ||
    !("paymentStatus" in body)
  ) {
    return NextResponse.json(
      { error: "paymentStatus is required" },
      { status: 400 }
    );
  }

  const { paymentStatus, amount, currency } = body as {
    paymentStatus: string;
    amount?: number;
    currency?: string;
  };

  const validation = validatePaymentStatus({
    status: paymentStatus,
    amount: amount ?? 0,
    currency: currency ?? "USD",
  });

  if (!validation.canProceed) {
    return NextResponse.json(
      {
        error: "Payment not approved",
        normalizedStatus: validation.normalizedStatus,
        rawStatus: validation.raw,
      },
      { status: 402 }
    );
  }

  return NextResponse.json({
    success: true,
    normalizedStatus: validation.normalizedStatus,
    message: "Checkout approved",
  });
}
