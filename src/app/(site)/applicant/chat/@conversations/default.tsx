import ErrorPage from "@/app/_components/page/ErrorPage";
import ConversationList from "@/app/_components/parts/Conversation/ConversationList";
import { getApplicantUserId } from "@/lib/auth";
import { getConversationUseCase } from "@/usecase/getConversations/getConversationUseCase";
import { redirect } from "next/navigation";

export default async function ConversationsPage() {
  const applicantUserId = await getApplicantUserId();
  if (!applicantUserId) {
    redirect("/applicant/create_profile");
  }
  const result = await getConversationUseCase({
    userId: applicantUserId,
  });

  if (!result.success) {
    return <ErrorPage message={result.message} data={result.data} />;
  }
  return <ConversationList conversations={result.data} isApplicant={true} />;
}
