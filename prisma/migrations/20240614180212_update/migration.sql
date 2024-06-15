/*
  Warnings:

  - You are about to drop the column `sexsual` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."User" DROP COLUMN "sexsual",
ADD COLUMN     "sexual" TEXT;
