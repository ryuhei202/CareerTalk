import ErrorPage from "@/app/_components/page/ErrorPage";
import ConversationList from "@/app/_components/parts/Conversation/ConversationList";
import { handleUserView } from "@/lib/auth";
import { getConversationUseCase } from "@/usecase/getConversations/getConversationUseCase";

export default async function ConversationsPage() {
  const { user } = await handleUserView({
    isApplicantPage: false,
  });
  const result = await getConversationUseCase({
    userId: user.id,
  });

  if (!result.success) {
    return <ErrorPage message={result.message} data={result.data} />;
  }
  return <ConversationList conversations={result.data} isApplicant={false} />;
}
