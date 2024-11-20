import ErrorPage from "@/app/_components/page/ErrorPage";
import { handleUserView } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getApplicantDetailUseCase } from "@/usecase/getApplicantDetail/getApplicantDetailUseCase";
import { EditMyPageFormContent } from "./_components/EditMyPageFormContent";

export default async function MyPageEdit() {
  const { user } = await handleUserView({ isApplicantPage: true });
  const applicant = await getApplicantDetailUseCase({
    applicantUserId: user.id,
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
