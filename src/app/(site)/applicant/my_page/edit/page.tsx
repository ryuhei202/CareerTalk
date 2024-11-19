import ErrorPage from "@/app/_components/page/ErrorPage";
import { getServerSession, handleUserView } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getApplicantDetailUseCase } from "@/usecase/getApplicantDetail/getApplicantDetailUseCase";
import { redirect } from "next/navigation";
import { EditMyPageFormContent } from "./_components/EditMyPageFormContent";

export default async function MyPageEdit() {
  const { applicantUserId, user } = await handleUserView({
    isApplicantPage: true,
  });
  const applicant = await getApplicantDetailUseCase({
    applicantUserId: applicantUserId as string,
  });

  if (!applicant.success) {
    return <ErrorPage message={applicant.message} data={applicant.data} />;
  }

  const [occupations] = await Promise.all([prisma.occupation.findMany()]);

  return (
    <>
      <EditMyPageFormContent
        applicant={applicant.data}
        user={user}
        occupations={occupations}
      />
    </>
  );
}
