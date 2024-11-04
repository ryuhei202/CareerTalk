import { getApplicantUserId } from "@/lib/auth";
import dynamic from "next/dynamic";
import { redirect } from "next/navigation";
const Chat = dynamic(() => import("./_components/Chat"), {
  ssr: false,
});

export default async function Home() {
  const applicantUserId = await getApplicantUserId();
  if (!applicantUserId) {
    redirect("/applicant/create_profile");
  }
  return (
    <div className="container h-[calc(100vh-120px)]">
      <main>
        <Chat applicantUserId={applicantUserId} />
      </main>
    </div>
  );
}
