/*
  Warnings:

  - You are about to drop the column `age` on the `Employee` table. All the data in the column will be lost.
  - You are about to drop the column `jobTitle` on the `Employee` table. All the data in the column will be lost.
  - You are about to drop the column `yearsOfExperience` on the `Employee` table. All the data in the column will be lost.
  - Added the required column `joiningDate` to the `Employee` table without a default value. This is not possible if the table is not empty.
  - Added the required column `occupationId` to the `Employee` table without a default value. This is not possible if the table is not empty.
  - Made the column `selfIntroduction` on table `Employee` required. This step will fail if there are existing NULL values in that column.
  - Made the column `talkableTopics` on table `Employee` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
CREATE SEQUENCE company_id_seq;
ALTER TABLE "Company" ALTER COLUMN "id" SET DEFAULT nextval('company_id_seq');
ALTER SEQUENCE company_id_seq OWNED BY "Company"."id";

-- AlterTable
ALTER TABLE "Employee" DROP COLUMN "age",
DROP COLUMN "jobTitle",
DROP COLUMN "yearsOfExperience",
ADD COLUMN     "birthday" TIMESTAMP(3),
ADD COLUMN     "joiningDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "occupationId" INTEGER NOT NULL,
ALTER COLUMN "selfIntroduction" SET NOT NULL,
ALTER COLUMN "selfIntroduction" SET DEFAULT '',
ALTER COLUMN "talkableTopics" SET NOT NULL,
ALTER COLUMN "talkableTopics" SET DEFAULT '';

-- CreateTable
CREATE TABLE "Occupation" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Occupation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Occupation_name_key" ON "Occupation"("name");

-- AddForeignKey
ALTER TABLE "Employee" ADD CONSTRAINT "Employee_occupationId_fkey" FOREIGN KEY ("occupationId") REFERENCES "Occupation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
