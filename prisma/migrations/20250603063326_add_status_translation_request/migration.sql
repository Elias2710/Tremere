-- CreateEnum
CREATE TYPE "TranslationRequestStatus" AS ENUM ('REQUESTING', 'COMPLETED');

-- AlterTable
ALTER TABLE "TranslationRequest" ADD COLUMN     "status" "TranslationRequestStatus" NOT NULL DEFAULT 'REQUESTING';
