-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'TRANSLATOR', 'ADMIN');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'USER';
