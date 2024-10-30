/*
  Warnings:

  - The primary key for the `ConversationPurpose` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `ConversationPurpose` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `purposeId` on the `Conversation` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "Conversation" DROP CONSTRAINT "Conversation_purposeId_fkey";

-- AlterTable
ALTER TABLE "Conversation" DROP COLUMN "purposeId",
ADD COLUMN     "purposeId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "ConversationPurpose" DROP CONSTRAINT "ConversationPurpose_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "ConversationPurpose_pkey" PRIMARY KEY ("id");

-- AddForeignKey
ALTER TABLE "Conversation" ADD CONSTRAINT "Conversation_purposeId_fkey" FOREIGN KEY ("purposeId") REFERENCES "ConversationPurpose"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
