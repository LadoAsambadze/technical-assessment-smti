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

    console.log("API GET: Fetching inquiries with filters", {
      clientName,
      dateFrom,
      dateTo,
      minValue,
    });

    // Build where clause
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

    // Parse hotels JSON string back to array
    const formattedInquiries = inquiries.map((inq) => ({
      ...inq,
      hotels: JSON.parse(inq.hotels),
      createdAt: inq.createdAt.toISOString(),
      updatedAt: inq.updatedAt.toISOString(),
    }));

    console.log("API GET: Returning", formattedInquiries.length, "inquiries");

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
