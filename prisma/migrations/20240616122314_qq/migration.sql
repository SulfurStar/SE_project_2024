-- AlterTable
ALTER TABLE "public"."AdPhoto" ALTER COLUMN "pic" DROP NOT NULL,
ALTER COLUMN "pic" SET DATA TYPE TEXT;
