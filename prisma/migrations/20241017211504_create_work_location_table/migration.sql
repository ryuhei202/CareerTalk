/*
  Warnings:

  - The values [AWAITING_APPROVAL] on the enum `EmployeeStatus` will be removed. If these variants are still used in the database, this will fail.
  - The values [AWAITING_APPROVAL] on the enum `JobSeekerStatus` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `created_at` on the `Employee` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `Employee` table. All the data in the column will be lost.
  - The `status` column on the `Employee` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `created_at` on the `JobSeeker` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `JobSeeker` table. All the data in the column will be lost.
  - Added the required column `companyId` to the `Employee` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Employee` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `JobSeeker` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('OTHER', 'MALE', 'FEMALE', 'PREFER_NOT_TO_SAY');

-- CreateEnum
CREATE TYPE "HiringType" AS ENUM ('NEW_GRADUATE', 'MID_CAREER');

-- CreateEnum
CREATE TYPE "MeetingMethod" AS ENUM ('ONLINE', 'OFFLINE', 'BOTH');

-- AlterEnum
BEGIN;
CREATE TYPE "EmployeeStatus_new" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');
ALTER TABLE "Employee" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "Employee" ALTER COLUMN "status" TYPE "EmployeeStatus_new" USING (
  CASE 
    WHEN "status" = 'AWAITING_APPROVAL' THEN 'PENDING'
    ELSE "status"::text
  END
)::"EmployeeStatus_new";
ALTER TABLE "Employee" ALTER COLUMN "status" SET DEFAULT 'PENDING'::"EmployeeStatus_new";
ALTER TYPE "EmployeeStatus" RENAME TO "EmployeeStatus_old";
ALTER TYPE "EmployeeStatus_new" RENAME TO "EmployeeStatus";
DROP TYPE "EmployeeStatus_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "JobSeekerStatus_new" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');
ALTER TABLE "JobSeeker" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "JobSeeker" ALTER COLUMN "status" TYPE "JobSeekerStatus_new" USING (
  CASE 
    WHEN "status" = 'AWAITING_APPROVAL' THEN 'PENDING'
    ELSE "status"::text
  END
)::"JobSeekerStatus_new";
ALTER TABLE "JobSeeker" ALTER COLUMN "status" SET DEFAULT 'PENDING'::"JobSeekerStatus_new";
ALTER TYPE "JobSeekerStatus" RENAME TO "JobSeekerStatus_old";
ALTER TYPE "JobSeekerStatus_new" RENAME TO "JobSeekerStatus";
DROP TYPE "JobSeekerStatus_old";
COMMIT;

-- AlterTable
ALTER TABLE "Employee" DROP COLUMN "created_at",
DROP COLUMN "updated_at",
ADD COLUMN     "age" INTEGER,
ADD COLUMN     "companyId" INTEGER NOT NULL,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "gender" "Gender",
ADD COLUMN     "hiringType" "HiringType",
ADD COLUMN     "jobTitle" TEXT,
ADD COLUMN     "meetingMethod" "MeetingMethod",
ADD COLUMN     "selfIntroduction" TEXT,
ADD COLUMN     "talkableTopics" TEXT,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "workLocationId" INTEGER,
ADD COLUMN     "yearsOfExperience" INTEGER,
DROP COLUMN "status",
ADD COLUMN     "status" "EmployeeStatus" NOT NULL DEFAULT 'PENDING';

-- AlterTable
ALTER TABLE "JobSeeker" DROP COLUMN "created_at",
DROP COLUMN "updated_at",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- CreateTable
CREATE TABLE "Company" (
    "id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL,

    CONSTRAINT "Company_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WorkLocation" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "WorkLocation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Company_name_key" ON "Company"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Company_code_key" ON "Company"("code");

-- CreateIndex
CREATE UNIQUE INDEX "WorkLocation_name_key" ON "WorkLocation"("name");

-- AddForeignKey
ALTER TABLE "Employee" ADD CONSTRAINT "Employee_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Employee" ADD CONSTRAINT "Employee_workLocationId_fkey" FOREIGN KEY ("workLocationId") REFERENCES "WorkLocation"("id") ON DELETE SET NULL ON UPDATE CASCADE;

INSERT INTO "WorkLocation" (name) VALUES
('北海道'), ('青森県'), ('岩手県'), ('宮城県'), ('秋田県'),
('山形県'), ('福島県'), ('茨城県'), ('栃木県'), ('群馬県'),
('埼玉県'), ('千葉県'), ('東京都'), ('神奈川県'), ('新潟県'),
('富山県'), ('石川県'), ('福井県'), ('山梨県'), ('長野県'),
('岐阜県'), ('静岡県'), ('愛知県'), ('三重県'), ('滋賀県'),
('京都府'), ('大阪府'), ('兵庫県'), ('奈良県'), ('和歌山県'),
('鳥取県'), ('島根県'), ('岡山県'), ('広島県'), ('山口県'),
('徳島県'), ('香川県'), ('愛媛県'), ('高知県'), ('福岡県'),
('佐賀県'), ('長崎県'), ('熊本県'), ('大分県'), ('宮崎県'),
('鹿児島県'), ('沖縄県'), ('海外');