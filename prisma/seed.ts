import { PrismaClient, Phase } from "@prisma/client";

const prisma = new PrismaClient();

const mockInquiries = [
  {
    id: "INQ-2026-0034",
    clientName: "Novartis AG",
    contactPerson: "Anna Mueller",
    eventType: "Conference",
    eventDate: new Date("2026-03-15"),
    guestCount: 120,
    potentialValue: 48500,
    phase: Phase.offers_received,
    hotels: ["Grand Hotel Zurich", "Hotel Schweizerhof"],
    notes: "Client prefers city center location",
    createdAt: new Date("2026-01-10T09:00:00Z"),
    updatedAt: new Date("2026-01-12T14:30:00Z"),
  },
  {
    id: "INQ-2026-0035",
    clientName: "Roche Pharmaceuticals",
    contactPerson: "Thomas Weber",
    eventType: "Product Launch",
    eventDate: new Date("2026-04-22"),
    guestCount: 85,
    potentialValue: 62000,
    phase: Phase.new,
    hotels: [],
    notes: "High-profile event, VIP attendees expected",
    createdAt: new Date("2026-01-11T10:30:00Z"),
    updatedAt: new Date("2026-01-11T10:30:00Z"),
  },
  {
    id: "INQ-2026-0036",
    clientName: "UBS Group",
    contactPerson: "Sophie Laurent",
    eventType: "Corporate Retreat",
    eventDate: new Date("2026-05-10"),
    guestCount: 45,
    potentialValue: 28000,
    phase: Phase.sent_to_hotels,
    hotels: ["Hotel Bellevue Palace", "The Dolder Grand"],
    notes: "Team building activities required",
    createdAt: new Date("2026-01-09T14:20:00Z"),
    updatedAt: new Date("2026-01-11T16:45:00Z"),
  },
  {
    id: "INQ-2026-0037",
    clientName: "Credit Suisse",
    contactPerson: "Marco Rossi",
    eventType: "Annual Meeting",
    eventDate: new Date("2026-06-18"),
    guestCount: 200,
    potentialValue: 95000,
    phase: Phase.completed,
    hotels: ["Baur au Lac", "Park Hyatt Zurich"],
    notes: "Confirmed booking at Baur au Lac",
    createdAt: new Date("2025-12-15T09:00:00Z"),
    updatedAt: new Date("2026-01-08T11:20:00Z"),
  },
  {
    id: "INQ-2026-0038",
    clientName: "Nestlé SA",
    contactPerson: "Claire Dubois",
    eventType: "Training Seminar",
    eventDate: new Date("2026-02-28"),
    guestCount: 60,
    potentialValue: 32000,
    phase: Phase.offers_received,
    hotels: ["Fairmont Le Montreux Palace", "Royal Savoy Lausanne"],
    notes: "Looking for lakeside venue",
    createdAt: new Date("2026-01-05T11:15:00Z"),
    updatedAt: new Date("2026-01-12T09:30:00Z"),
  },
];

async function main() {
  console.log("🌱 Start seeding...");

  await prisma.inquiry.deleteMany({});
  console.log("🗑️  Cleared existing data");

  const created = await prisma.inquiry.createMany({
    data: mockInquiries.map((inquiry) => ({
      ...inquiry,
      hotels: JSON.stringify(inquiry.hotels),
    })),
  });

  console.log(`🎉 Seeded ${created.count} inquiries successfully!`);
}

main()
  .catch((e) => {
    console.error("❌ Error during seeding:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
