-- CreateEnum
CREATE TYPE "Position" AS ENUM ('PILOT', 'FIRST_OFFICER', 'FLIGHT_ATTENDANT');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('AVAILABLE', 'ON_DUTY', 'OFF_DUTY');

-- CreateTable
CREATE TABLE "Employee" (
    "id" BIGSERIAL NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "position" "Position" NOT NULL,
    "licenseNumber" TEXT NOT NULL,
    "experienceYears" INTEGER NOT NULL,
    "assignedFlightId" BIGINT,
    "status" "Status" NOT NULL DEFAULT 'AVAILABLE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Employee_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Employee_licenseNumber_key" ON "Employee"("licenseNumber");
