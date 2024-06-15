/*
  Warnings:

  - Added the required column `address` to the `Advertise` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Advertise" ADD COLUMN     "address" TEXT NOT NULL;
