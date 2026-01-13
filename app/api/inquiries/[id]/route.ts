import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { Phase } from "@/lib/types/inquiry.types";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  await delay(500);

  try {
    // Await params in Next.js 15+
    const { id } = await context.params;
    const body = await request.json();
    const { phase } = body as { phase: Phase };

    console.log("API PATCH: Update request", { id, phase });

    const validPhases: Phase[] = [
      "new",
      "sent_to_hotels",
      "offers_received",
      "completed",
    ];
    if (!validPhases.includes(phase)) {
      return NextResponse.json(
        { error: "Invalid phase", success: false },
        { status: 400 }
      );
    }

    const updatedInquiry = await prisma.inquiry.update({
      where: { id },
      data: { phase },
    });

    const formatted = {
      ...updatedInquiry,
      hotels: JSON.parse(updatedInquiry.hotels),
      createdAt: updatedInquiry.createdAt.toISOString(),
      updatedAt: updatedInquiry.updatedAt.toISOString(),
    };

    console.log("API PATCH: Successfully updated", id, "to phase", phase);

    return NextResponse.json({
      inquiry: formatted,
      success: true,
    });
  } catch (error) {
    console.error("API PATCH Error:", error);
    return NextResponse.json(
      { error: "Inquiry not found", success: false },
      { status: 404 }
    );
  }
}

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    // Await params in Next.js 15+
    const { id } = await context.params;

    const inquiry = await prisma.inquiry.findUnique({
      where: { id },
    });

    if (!inquiry) {
      return NextResponse.json({ error: "Inquiry not found" }, { status: 404 });
    }

    const formatted = {
      ...inquiry,
      hotels: JSON.parse(inquiry.hotels),
      createdAt: inquiry.createdAt.toISOString(),
      updatedAt: inquiry.updatedAt.toISOString(),
    };

    return NextResponse.json({ inquiry: formatted });
  } catch (error) {
    console.error("API GET Error:", error);
    return NextResponse.json({ error: "Inquiry not found" }, { status: 404 });
  }
}
