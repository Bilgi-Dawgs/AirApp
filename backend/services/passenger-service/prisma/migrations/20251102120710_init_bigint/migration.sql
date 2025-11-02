-- CreateEnum
CREATE TYPE "ClassType" AS ENUM ('economy', 'business', 'first');

-- CreateTable
CREATE TABLE "Passenger" (
    "id" BIGSERIAL NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "passportNumber" TEXT NOT NULL,
    "ticketNumber" TEXT NOT NULL,
    "flightId" BIGINT NOT NULL,
    "seatNumber" TEXT,
    "classType" "ClassType" NOT NULL,
    "nationality" TEXT NOT NULL,
    "checkedIn" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Passenger_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Passenger_passportNumber_key" ON "Passenger"("passportNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Passenger_ticketNumber_key" ON "Passenger"("ticketNumber");
