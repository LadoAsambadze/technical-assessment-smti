-- CreateTable
CREATE TABLE "Inquiry" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "clientName" TEXT NOT NULL,
    "contactPerson" TEXT NOT NULL,
    "eventType" TEXT NOT NULL,
    "eventDate" TEXT NOT NULL,
    "guestCount" INTEGER NOT NULL,
    "potentialValue" REAL NOT NULL,
    "phase" TEXT NOT NULL DEFAULT 'new',
    "hotels" TEXT NOT NULL,
    "notes" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
