-- CreateEnum
CREATE TYPE "FlightStatus" AS ENUM ('scheduled', 'ongoing', 'delayed', 'cancelled', 'completed');

-- AlterTable
ALTER TABLE "Flight" ADD COLUMN     "status" "FlightStatus" NOT NULL DEFAULT 'scheduled';
