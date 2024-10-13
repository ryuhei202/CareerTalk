/*
  Warnings:

  - You are about to drop the column `jobSeekerId` on the `Account` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `JobSeeker` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `JobSeeker` table. All the data in the column will be lost.
  - You are about to drop the column `jobSeekerId` on the `JobSeekerProfile` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[job_seeker_id]` on the table `Account` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[job_seeker_id]` on the table `JobSeekerProfile` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `job_seeker_id` to the `Account` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `JobSeeker` table without a default value. This is not possible if the table is not empty.
  - Added the required column `job_seeker_id` to the `JobSeekerProfile` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Account" DROP CONSTRAINT "Account_jobSeekerId_fkey";

-- DropForeignKey
ALTER TABLE "JobSeekerProfile" DROP CONSTRAINT "JobSeekerProfile_jobSeekerId_fkey";

-- DropIndex
DROP INDEX "Account_jobSeekerId_key";

-- DropIndex
DROP INDEX "JobSeekerProfile_jobSeekerId_key";

-- AlterTable
ALTER TABLE "Account" DROP COLUMN "jobSeekerId",
ADD COLUMN     "job_seeker_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "JobSeeker" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "JobSeekerProfile" DROP COLUMN "jobSeekerId",
ADD COLUMN     "job_seeker_id" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Account_job_seeker_id_key" ON "Account"("job_seeker_id");

-- CreateIndex
CREATE UNIQUE INDEX "JobSeekerProfile_job_seeker_id_key" ON "JobSeekerProfile"("job_seeker_id");

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_job_seeker_id_fkey" FOREIGN KEY ("job_seeker_id") REFERENCES "JobSeeker"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JobSeekerProfile" ADD CONSTRAINT "JobSeekerProfile_job_seeker_id_fkey" FOREIGN KEY ("job_seeker_id") REFERENCES "JobSeeker"("id") ON DELETE CASCADE ON UPDATE CASCADE;
