/*
  Warnings:

  - You are about to drop the column `applicantId` on the `Conversation` table. All the data in the column will be lost.
  - You are about to drop the column `employeeId` on the `Conversation` table. All the data in the column will be lost.
  - You are about to drop the column `applicantId` on the `Message` table. All the data in the column will be lost.
  - You are about to drop the column `employeeId` on the `Message` table. All the data in the column will be lost.
  - Added the required column `applicantUserId` to the `Conversation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `employeeUserId` to the `Conversation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `senderId` to the `Message` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Conversation" DROP CONSTRAINT "Conversation_applicantId_fkey";

-- DropForeignKey
ALTER TABLE "Conversation" DROP CONSTRAINT "Conversation_employeeId_fkey";

-- DropForeignKey
ALTER TABLE "Message" DROP CONSTRAINT "Message_applicantId_fkey";

-- DropForeignKey
ALTER TABLE "Message" DROP CONSTRAINT "Message_employeeId_fkey";

-- AlterTable
ALTER TABLE "Conversation" DROP COLUMN "applicantId",
DROP COLUMN "employeeId",
ADD COLUMN     "applicantUserId" TEXT NOT NULL,
ADD COLUMN     "employeeUserId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Message" DROP COLUMN "applicantId",
DROP COLUMN "employeeId",
ADD COLUMN     "senderId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Conversation" ADD CONSTRAINT "Conversation_applicantUserId_fkey" FOREIGN KEY ("applicantUserId") REFERENCES "Applicant"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Conversation" ADD CONSTRAINT "Conversation_employeeUserId_fkey" FOREIGN KEY ("employeeUserId") REFERENCES "Employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
