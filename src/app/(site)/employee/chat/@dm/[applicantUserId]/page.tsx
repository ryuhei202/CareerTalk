export const dynamic = "force-dynamic";
import ErrorPage from "@/app/_components/page/ErrorPage";
import Chat from "@/app/_components/parts/Chat/Chat";
import { getEmployeeUserId } from "@/lib/auth";
import { getConversationMessagesUseCase } from "@/usecase/getConversationMessages/getConversationMessagesUseCase";
import { redirect } from "next/navigation";

export default async function EmployeeDMPage({
  params,
}: {
  params: { applicantUserId: string };
}) {
  const employeeUserId = await getEmployeeUserId();

  if (!employeeUserId) {
    redirect("/employee/create_profile");
  }
  const applicantUserId = params.applicantUserId;

  const result = await getConversationMessagesUseCase({
    userId: employeeUserId,
    partnerUserId: applicantUserId,
  });

  if (!result.data) {
    return <ErrorPage message={result.message} data={result.data} />;
  }

  return (
    <div className="container w-2/3">
      <main>
        <Chat
          userId={employeeUserId}
          messages={result.data.messages}
          conversationId={result.data.conversationId}
          partnerUser={result.data.partnerUser}
          isApplicant={false}
        />
      </main>
    </div>
  );
}
