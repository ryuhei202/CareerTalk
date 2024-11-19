import { handleUserView } from "@/lib/auth";

export default async function ApplicantChatPage() {
  await handleUserView({ isApplicantPage: true });
  return null;
}
