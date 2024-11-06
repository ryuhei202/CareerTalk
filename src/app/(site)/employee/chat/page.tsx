import { getEmployeeUserId } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function ChatPage() {
  const employeeUserId = await getEmployeeUserId();
  if (!employeeUserId) {
    redirect("/employee/create_profile");
  }
  return null;
}
