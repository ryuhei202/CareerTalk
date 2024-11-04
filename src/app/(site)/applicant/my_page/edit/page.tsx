import ErrorPage from "@/app/_components/page/ErrorPage";
import { getApplicantUserId, getServerSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getApplicantDetailUseCase } from "@/usecase/getApplicantDetail/getApplicantDetailUseCase";
import { redirect } from "next/navigation";
import { EditMyPageFormContent } from "./_components/EditMyPageFormContent";

export default async function MyPageEdit() {
  const session = await getServerSession();
  if (!session) {
    redirect("/signin");
  }
  const userId = getApplicantUserId();
  if (!userId) {
    redirect("/applicant/create_profile");
  }
  const applicant = await getApplicantDetailUseCase({
    applicantUserId: session.user.id,
  });

  if (!applicant.success) {
    return <ErrorPage message={applicant.message} data={applicant.data} />;
  }

  const [occupations] = await Promise.all([prisma.occupation.findMany()]);

  return (
    <>
      <EditMyPageFormContent
        applicant={applicant.data}
        user={session.user}
        occupations={occupations}
      />
    </>
  );
}
