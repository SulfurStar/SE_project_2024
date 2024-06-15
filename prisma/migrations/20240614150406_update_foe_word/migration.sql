-- AlterTable
ALTER TABLE "public"."Advertise" ADD COLUMN     "endAt" TIMESTAMP(3),
ADD COLUMN     "houseAge" TEXT;

-- AlterTable
ALTER TABLE "public"."User" ADD COLUMN     "emergencyContact" TEXT,
ADD COLUMN     "emergencyContactNumber" TEXT,
ADD COLUMN     "grade" INTEGER,
ADD COLUMN     "homeAddress" TEXT,
ADD COLUMN     "homeTel" TEXT,
ADD COLUMN     "jobTitle" TEXT,
ADD COLUMN     "officeAddress" TEXT,
ADD COLUMN     "officeTel" TEXT,
ADD COLUMN     "phone" TEXT,
ADD COLUMN     "sexsual" TEXT,
ADD COLUMN     "studentID" TEXT,
ADD COLUMN     "teacher" INTEGER;

-- CreateTable
CREATE TABLE "public"."StudentHousingInfo" (
    "id" SERIAL NOT NULL,
    "studentId" INTEGER NOT NULL,
    "address" TEXT,
    "academicYear" INTEGER,
    "semester" INTEGER,
    "landlordName" TEXT,
    "landlordPhone" TEXT,
    "rent" DOUBLE PRECISION,
    "roommatesName" TEXT,
    "roommatesPhone" TEXT,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "StudentHousingInfo_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "StudentHousingInfo_userId_key" ON "public"."StudentHousingInfo"("userId");

-- AddForeignKey
ALTER TABLE "public"."StudentHousingInfo" ADD CONSTRAINT "StudentHousingInfo_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
