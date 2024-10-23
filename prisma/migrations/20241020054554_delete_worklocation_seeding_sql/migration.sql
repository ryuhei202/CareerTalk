/*
  Warnings:

  - Made the column `gender` on table `Employee` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Employee" ALTER COLUMN "gender" SET NOT NULL,
ALTER COLUMN "selfIntroduction" DROP NOT NULL,
ALTER COLUMN "talkableTopics" DROP NOT NULL;
