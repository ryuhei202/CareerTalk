import ErrorPage from "@/app/_components/page/ErrorPage";
import { getApplicantUserId } from "@/lib/auth";
import { getConversationMessagesUseCase } from "@/usecase/getConversationMessages/getConversationMessagesUseCase";
import dynamic from "next/dynamic";
import { redirect } from "next/navigation";

const Chat = dynamic(() => import("@/app/_components/parts/Chat/Chat"), {
  ssr: false,
});
export default async function ApplicantDMPage({
  params,
}: {
  params: { conversationId: string };
}) {
  const applicantUserId = await getApplicantUserId();
  if (!applicantUserId) {
    redirect("/applicant/create_profile");
  }
  const conversationId = params.conversationId;

  // ここでチャットのデータを取得するユースケースを呼び出す
  const result = await getConversationMessagesUseCase({
    conversationId,
  });

  if (!result.data) {
    return <ErrorPage message={result.message} data={result.data} />;
  }
  return (
    <div className="container h-[calc(100vh-120px)]">
      <main>
        <Chat userId={applicantUserId} messages={result.data} />
      </main>
    </div>
  );
}
