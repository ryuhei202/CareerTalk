import ErrorPage from "@/app/_components/page/ErrorPage";
import ConversationList from "@/app/_components/parts/Conversation/ConversationList";
import { getEmployeeUserId } from "@/lib/auth";
import { getConversationUseCase } from "@/usecase/getConversations/getConversationUseCase";
import { redirect } from "next/navigation";

export default async function ConversationsPage() {
  const employeeUserId = await getEmployeeUserId();
  if (!employeeUserId) {
    redirect("/employee/create_profile");
  }
  const result = await getConversationUseCase({
    userId: employeeUserId,
  });

  if (!result.success) {
    return <ErrorPage message={result.message} data={result.data} />;
  }
  return <ConversationList conversations={result.data} isApplicant={false} />;
}
