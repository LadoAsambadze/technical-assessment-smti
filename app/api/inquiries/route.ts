import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function GET(request: NextRequest) {
  await delay(500);

  try {
    const searchParams = request.nextUrl.searchParams;
    const clientName = searchParams.get("clientName");
    const dateFrom = searchParams.get("dateFrom");
    const dateTo = searchParams.get("dateTo");
    const minValue = searchParams.get("minValue");

    const where: any = {};

    if (clientName) {
      where.OR = [
        { clientName: { contains: clientName, mode: "insensitive" } },
        { contactPerson: { contains: clientName, mode: "insensitive" } },
      ];
    }

    if (dateFrom && dateTo) {
      where.eventDate = {
        gte: dateFrom,
        lte: dateTo,
      };
    } else if (dateFrom) {
      where.eventDate = { gte: dateFrom };
    } else if (dateTo) {
      where.eventDate = { lte: dateTo };
    }

    if (minValue) {
      where.potentialValue = { gte: parseFloat(minValue) };
    }

    const inquiries = await prisma.inquiry.findMany({
      where,
      orderBy: { createdAt: "desc" },
    });

    const formattedInquiries = inquiries.map((inq) => ({
      ...inq,
      hotels: JSON.parse(inq.hotels),
      createdAt: inq.createdAt.toISOString(),
      updatedAt: inq.updatedAt.toISOString(),
    }));

    return NextResponse.json({
      inquiries: formattedInquiries,
      total: inquiries.length,
    });
  } catch (error) {
    console.error("API GET Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch inquiries", inquiries: [], total: 0 },
      { status: 500 }
    );
  }
}
