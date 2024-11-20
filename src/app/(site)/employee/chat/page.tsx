import { handleUserView } from "@/lib/auth";

export default async function EmployeeChatPage() {
  await handleUserView({
    isApplicantPage: false,
  });
  return null;
}
