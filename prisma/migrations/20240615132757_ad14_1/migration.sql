-- CreateEnum
CREATE TYPE "public"."Verify" AS ENUM ('UNKNOWN', 'ADOPTED', 'FAILED');

-- AlterTable
ALTER TABLE "public"."Advertise" ADD COLUMN     "verify" "public"."Verify" NOT NULL DEFAULT 'UNKNOWN';

-- AlterTable
ALTER TABLE "public"."Board" ADD COLUMN     "verify" "public"."Verify" NOT NULL DEFAULT 'UNKNOWN';
