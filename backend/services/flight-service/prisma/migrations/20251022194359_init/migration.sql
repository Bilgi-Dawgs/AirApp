-- CreateTable
CREATE TABLE "Airline" (
    "id" SERIAL NOT NULL,
    "code" CHAR(2) NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Airline_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Airport" (
    "id" SERIAL NOT NULL,
    "code" CHAR(3) NOT NULL,
    "name" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "country" TEXT NOT NULL,

    CONSTRAINT "Airport_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AircraftType" (
    "id" SERIAL NOT NULL,
    "modelName" TEXT NOT NULL,
    "seatCapacity" INTEGER NOT NULL,
    "seatingPlanJson" JSONB NOT NULL,
    "maxCrewCount" INTEGER NOT NULL,
    "maxPassengerCount" INTEGER NOT NULL,
    "standardMenu" TEXT NOT NULL,

    CONSTRAINT "AircraftType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Flight" (
    "id" SERIAL NOT NULL,
    "flightNumber" CHAR(6) NOT NULL,
    "airlineId" INTEGER NOT NULL,
    "departureTime" TIMESTAMP(3) NOT NULL,
    "durationMinutes" INTEGER NOT NULL,
    "distanceKm" DOUBLE PRECISION NOT NULL,
    "sourceAirportCode" TEXT NOT NULL,
    "destinationAirportCode" TEXT NOT NULL,
    "aircraftTypeId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Flight_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SharedFlight" (
    "id" SERIAL NOT NULL,
    "mainFlightId" INTEGER NOT NULL,
    "partnerFlightNumber" CHAR(6) NOT NULL,
    "partnerAirlineId" INTEGER NOT NULL,
    "connectingFlightInfo" TEXT,

    CONSTRAINT "SharedFlight_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Airline_code_key" ON "Airline"("code");

-- CreateIndex
CREATE UNIQUE INDEX "Airport_code_key" ON "Airport"("code");

-- CreateIndex
CREATE UNIQUE INDEX "AircraftType_modelName_key" ON "AircraftType"("modelName");

-- CreateIndex
CREATE UNIQUE INDEX "Flight_flightNumber_key" ON "Flight"("flightNumber");

-- CreateIndex
CREATE UNIQUE INDEX "SharedFlight_mainFlightId_key" ON "SharedFlight"("mainFlightId");

-- AddForeignKey
ALTER TABLE "Flight" ADD CONSTRAINT "Flight_airlineId_fkey" FOREIGN KEY ("airlineId") REFERENCES "Airline"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Flight" ADD CONSTRAINT "Flight_sourceAirportCode_fkey" FOREIGN KEY ("sourceAirportCode") REFERENCES "Airport"("code") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Flight" ADD CONSTRAINT "Flight_destinationAirportCode_fkey" FOREIGN KEY ("destinationAirportCode") REFERENCES "Airport"("code") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Flight" ADD CONSTRAINT "Flight_aircraftTypeId_fkey" FOREIGN KEY ("aircraftTypeId") REFERENCES "AircraftType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SharedFlight" ADD CONSTRAINT "SharedFlight_mainFlightId_fkey" FOREIGN KEY ("mainFlightId") REFERENCES "Flight"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SharedFlight" ADD CONSTRAINT "SharedFlight_partnerAirlineId_fkey" FOREIGN KEY ("partnerAirlineId") REFERENCES "Airline"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
