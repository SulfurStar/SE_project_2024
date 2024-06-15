-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "auth";

-- CreateEnum
CREATE TYPE "public"."Status" AS ENUM ('NORMAL', 'REPORTED', 'REMOVED');

-- CreateEnum
CREATE TYPE "public"."Role" AS ENUM ('TEACHER', 'STUDENT', 'LANDLORD', 'ADMIN');

-- CreateTable
CREATE TABLE "public"."User" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "role" "public"."Role" NOT NULL,
    "sexual" TEXT,
    "phone" TEXT,
    "homeAddress" TEXT,
    "homeTel" TEXT,
    "emergencyContact" TEXT,
    "emergencyContactNumber" TEXT,
    "studentID" TEXT,
    "grade" INTEGER,
    "teacher" INTEGER,
    "jobTitle" TEXT,
    "officeTel" TEXT,
    "officeAddress" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

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

-- CreateTable
CREATE TABLE "public"."Post" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "content" TEXT NOT NULL,
    "imageUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "authorId" INTEGER NOT NULL,
    "status" "public"."Status" NOT NULL DEFAULT 'NORMAL',

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Comment" (
    "id" SERIAL NOT NULL,
    "content" TEXT NOT NULL,
    "imageUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "postId" INTEGER NOT NULL,
    "authorId" INTEGER NOT NULL,
    "status" "public"."Status" NOT NULL DEFAULT 'NORMAL',

    CONSTRAINT "Comment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Advertise" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "authorId" INTEGER NOT NULL,
    "phone" INTEGER NOT NULL,
    "noroom" BOOLEAN NOT NULL,
    "reserve" BOOLEAN NOT NULL,
    "rental_rm" TEXT NOT NULL,
    "buildtype" TEXT NOT NULL,
    "rm_type" TEXT NOT NULL,
    "rent_low" INTEGER NOT NULL,
    "rent_high" INTEGER NOT NULL,
    "deposit" TEXT NOT NULL,
    "other_fee" TEXT,
    "floor" TEXT,
    "indp_mete" TEXT NOT NULL,
    "part_mate" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "Smoke_fre" TEXT NOT NULL,
    "identity" TEXT,
    "telev" BOOLEAN NOT NULL,
    "fridge" BOOLEAN NOT NULL,
    "aircond" BOOLEAN NOT NULL,
    "washmch" BOOLEAN NOT NULL,
    "clothdry" BOOLEAN NOT NULL,
    "waterdisp" BOOLEAN NOT NULL,
    "wardrobe" BOOLEAN NOT NULL,
    "singlebed" BOOLEAN NOT NULL,
    "doublebea" BOOLEAN NOT NULL,
    "desk" BOOLEAN NOT NULL,
    "internet" BOOLEAN NOT NULL,
    "pub_equi" TEXT,
    "condition" TEXT,
    "heater" TEXT,
    "safe_faci" TEXT,
    "certified" TEXT,
    "houseAge" TEXT,
    "endAt" TIMESTAMP(3),

    CONSTRAINT "Advertise_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."AdPhoto" (
    "id" SERIAL NOT NULL,
    "authorId" INTEGER NOT NULL,
    "advertiseId" INTEGER NOT NULL,
    "pic" BYTEA NOT NULL,

    CONSTRAINT "AdPhoto_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."PostPhoto" (
    "id" SERIAL NOT NULL,
    "authorId" INTEGER NOT NULL,
    "postId" INTEGER NOT NULL,
    "pic" BYTEA NOT NULL,

    CONSTRAINT "PostPhoto_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Board" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "authorId" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT,

    CONSTRAINT "Board_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Visit_table" (
    "id" SERIAL NOT NULL,
    "studentId" INTEGER NOT NULL,
    "teacherId" INTEGER NOT NULL,
    "visit_date" TIMESTAMP(3),
    "visit_address" TEXT,
    "checked" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Visit_table_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Visit_record" (
    "id" SERIAL NOT NULL,
    "studentId" INTEGER NOT NULL,
    "teacherId" INTEGER NOT NULL,
    "info_teacher" TEXT,
    "info_student" TEXT,
    "date_create" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "date_update" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Visit_record_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "public"."User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "StudentHousingInfo_userId_key" ON "public"."StudentHousingInfo"("userId");

-- CreateIndex
CREATE INDEX "Post_authorId_idx" ON "public"."Post"("authorId");

-- CreateIndex
CREATE INDEX "Comment_postId_idx" ON "public"."Comment"("postId");

-- CreateIndex
CREATE INDEX "Comment_authorId_idx" ON "public"."Comment"("authorId");

-- AddForeignKey
ALTER TABLE "public"."StudentHousingInfo" ADD CONSTRAINT "StudentHousingInfo_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Post" ADD CONSTRAINT "Post_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Comment" ADD CONSTRAINT "Comment_postId_fkey" FOREIGN KEY ("postId") REFERENCES "public"."Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Comment" ADD CONSTRAINT "Comment_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Advertise" ADD CONSTRAINT "Advertise_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."AdPhoto" ADD CONSTRAINT "AdPhoto_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."AdPhoto" ADD CONSTRAINT "AdPhoto_advertiseId_fkey" FOREIGN KEY ("advertiseId") REFERENCES "public"."Advertise"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."PostPhoto" ADD CONSTRAINT "PostPhoto_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."PostPhoto" ADD CONSTRAINT "PostPhoto_postId_fkey" FOREIGN KEY ("postId") REFERENCES "public"."Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Board" ADD CONSTRAINT "Board_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Visit_table" ADD CONSTRAINT "Visit_table_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Visit_table" ADD CONSTRAINT "Visit_table_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Visit_record" ADD CONSTRAINT "Visit_record_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Visit_record" ADD CONSTRAINT "Visit_record_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
