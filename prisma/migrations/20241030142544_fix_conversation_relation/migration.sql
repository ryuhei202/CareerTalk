-- DropForeignKey
ALTER TABLE "Conversation" DROP CONSTRAINT "Conversation_employeeUserId_fkey";

-- AddForeignKey
ALTER TABLE "Conversation" ADD CONSTRAINT "Conversation_employeeUserId_fkey" FOREIGN KEY ("employeeUserId") REFERENCES "Employee"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;
