import { getEmployeeUserId } from "@/lib/auth";
import dynamic from "next/dynamic";
import { redirect } from "next/navigation";
const Chat = dynamic(() => import("@/app/_components/parts/Chat/Chat"), {
  ssr: false,
});
export default async function Home() {
  const employeeUserId = await getEmployeeUserId();
  if (!employeeUserId) {
    redirect("/employee/create_profile");
  }
  return (
    <div className="container h-[calc(100vh-120px)]">
      <main>
        <Chat userId={employeeUserId} />
      </main>
    </div>
  );
}
