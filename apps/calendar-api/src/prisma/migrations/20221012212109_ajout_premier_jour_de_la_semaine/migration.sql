-- CreateEnum
CREATE TYPE "WEEK_STARTING_DAY" AS ENUM ('MONDAY', 'SUNDAY');

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "week_start_day" "WEEK_STARTING_DAY" NOT NULL DEFAULT 'MONDAY';
