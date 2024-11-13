export const dynamic = "force-dynamic";
import ErrorPage from "@/app/_components/page/ErrorPage";
import Chat from "@/app/_components/parts/Chat/Chat";
import { getApplicantUserId } from "@/lib/auth";
import { getConversationMessagesUseCase } from "@/usecase/getConversationMessages/getConversationMessagesUseCase";
import { redirect } from "next/navigation";
export default async function ApplicantDMPage({
  params,
}: {
  params: { employeeUserId: string };
}) {
  const applicantUserId = await getApplicantUserId();
  if (!applicantUserId) {
    redirect("/applicant/create_profile");
  }
  const employeeUserId = params.employeeUserId;

  const result = await getConversationMessagesUseCase({
    userId: applicantUserId,
    partnerUserId: employeeUserId,
  });

  if (!result.success) {
    return <ErrorPage message={result.message} data={result.data} />;
  }
  return (
    <div className="container w-2/3">
      <main>
        <Chat
          userId={applicantUserId}
          messages={result.data.messages}
          conversationId={result.data.conversationId}
          partnerUser={result.data.partnerUser}
          isApplicant={true}
        />
      </main>
    </div>
  );
}
