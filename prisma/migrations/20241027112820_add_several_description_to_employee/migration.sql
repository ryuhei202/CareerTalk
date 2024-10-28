/*
  Warnings:

  - Made the column `name` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Employee" ADD COLUMN     "careerDescription" TEXT DEFAULT '',
ADD COLUMN     "jobDescription" TEXT DEFAULT '',
ADD COLUMN     "joiningDescription" TEXT DEFAULT '',
ADD COLUMN     "otherDescription" TEXT DEFAULT '';

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "name" SET NOT NULL;
