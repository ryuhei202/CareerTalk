import ErrorPage from "@/app/_components/page/ErrorPage";
import { LogOutButton } from "@/app/_components/parts/Button/LogOutButton";
import { Button } from "@/app/_components/ui/button";
import { getApplicantUserId, getServerSession } from "@/lib/auth";
import { getApplicantDetailUseCase } from "@/usecase/getApplicantDetail/getApplicantDetailUseCase";
import * as Avatar from "@radix-ui/react-avatar";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function ApplicantMyPage() {
  const session = await getServerSession();
  if (!session) {
    redirect("/signin");
  }
  const userId = await getApplicantUserId();
  if (!userId) {
    redirect("/applicant/create_profile");
  }

  const applicant = await getApplicantDetailUseCase({
    applicantUserId: session.user.id,
  });

  if (!applicant.success) {
    return <ErrorPage message={applicant.message} data={applicant.data} />;
  }

  return (
    <>
      <div className="grid grid-cols-12 gap-8 container mt-16 mx-auto mb-12">
        <div className="col-span-4">
          <div className="flex flex-col items-center shadow rounded-xl py-4 px-8  bg-background-accent">
            <div className="flex items-center gap-4">
              <Avatar.Root className="w-44 h-44 rounded-full">
                {applicant.data.imageUrl && (
                  <Avatar.Image
                    className="w-full h-full rounded-full"
                    src={applicant.data.imageUrl}
                    alt={applicant.data.name}
                  />
                )}
                <Avatar.Fallback>{applicant.data.name[0]}</Avatar.Fallback>
              </Avatar.Root>
            </div>
            <div className="w-full">
              <div className="my-5">
                <div className="flex items-center">
                  <div className="text-2xl font-bold">
                    {applicant.data.name}
                  </div>
                  <div className="text-gray-600 ms-2">
                    {applicant.data.gender}
                  </div>
                </div>
                <div className="text-gray-600 mb-4">{session.user.email}</div>
              </div>
              <div className="my-5 flex flex-col items-start">
                <div className="bg-white p-2 rounded-md">会社名</div>
                <span className="ms-4 mt-2">
                  {applicant.data.company
                    ? applicant.data.company
                    : "入力がありません"}
                </span>
              </div>
              <div className="my-5 flex flex-col items-start">
                <div className="bg-white p-2 rounded-md">職種</div>
                <span className="ms-4 mt-2">
                  {applicant.data.occupation
                    ? applicant.data.occupation?.name
                    : "選択されていません"}
                </span>
              </div>
              <div className="my-5 flex flex-col items-start">
                <div className="bg-white p-2 rounded-md">社会人歴</div>
                <div className="ms-4 mt-2">
                  {applicant.data.yearsOfExperience}年
                </div>
              </div>
              <div className="mt-12  mb-5 flex justify-center">
                <LogOutButton />
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-8">
          <div className="flex justify-end">
            <Link href="/applicant/my_page/edit">
              <Button variant="outline">編集</Button>
            </Link>
          </div>
          <div className="mt-6">
            <h2 className="text-gray-700 text-3xl font-bold mb-3 border-b pb-3 border-gray-400">
              自己紹介
            </h2>
            <div className="mb-14 whitespace-pre-line">
              {applicant.data.selfIntroduction}
            </div>
          </div>
          <div className="mt-6">
            <h2 className="text-gray-700 text-3xl font-bold mb-3 border-b pb-3 border-gray-400">
              職務経歴
            </h2>
            <div className="mb-14 whitespace-pre-line">
              {applicant.data.workHistory}
            </div>
          </div>
          <div className="mt-6">
            <h2 className="text-gray-700 text-3xl font-bold mb-3 border-b pb-3 border-gray-400">
              学歴
            </h2>
            <div className="mb-14 whitespace-pre-line">
              {applicant.data.education}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
