import { getApplicantUserId } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function ApplicantDMPage() {
  const applicantUserId = await getApplicantUserId();
  if (!applicantUserId) {
    redirect("/applicant/create_profile");
  }
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-4 text-center">
      <h2 className="text-2xl font-bold mb-2">メッセージを選択してください</h2>
      <p className="text-muted-foreground mb-6">
        Choose from your existing conversations, start a new one, or just keep
        swimming.
      </p>
    </div>
  );
}
