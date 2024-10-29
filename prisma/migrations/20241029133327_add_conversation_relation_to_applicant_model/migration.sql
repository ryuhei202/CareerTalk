/*
  Warnings:

  - Added the required column `gender` to the `Applicant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `joiningDate` to the `Applicant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `occupationId` to the `Applicant` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Applicant" ADD COLUMN     "birthday" TIMESTAMP(3),
ADD COLUMN     "gender" "Gender" NOT NULL,
ADD COLUMN     "joiningDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "occupationId" INTEGER NOT NULL,
ADD COLUMN     "selfIntroduction" TEXT DEFAULT '';

-- AddForeignKey
ALTER TABLE "Applicant" ADD CONSTRAINT "Applicant_occupationId_fkey" FOREIGN KEY ("occupationId") REFERENCES "Occupation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
