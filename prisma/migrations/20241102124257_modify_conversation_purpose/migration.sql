/*
  Warnings:

  - You are about to drop the `ConversationPurpose` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `purpose` to the `Conversation` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ConversationPurposeEnum" AS ENUM ('INTERESTED_IN_RECRUITMENT', 'INTERESTED_IN_PERSON', 'INTERESTED_IN_COMPANY', 'OTHER');

-- DropForeignKey
ALTER TABLE "Conversation" DROP CONSTRAINT "Conversation_purposeId_fkey";

-- AlterTable
ALTER TABLE "Conversation" ADD COLUMN     "purpose" "ConversationPurposeEnum" NOT NULL;

-- AlterTable
ALTER TABLE "Employee" ADD COLUMN     "barkerMessage" TEXT DEFAULT '';

-- DropTable
DROP TABLE "ConversationPurpose";
