import ErrorPage from "@/app/_components/page/ErrorPage";
import { LogOutButton } from "@/app/_components/parts/Button/LogOutButton";
import { Button } from "@/app/_components/ui/button";
import { handleUserView } from "@/lib/auth";
import { getEmployeeDetailUseCase } from "@/usecase/getEmployeeDetail/getEmployeeDetailUseCase";
import * as Avatar from "@radix-ui/react-avatar";

import Link from "next/link";

export default async function MyPage() {
  const { user } = await handleUserView({
    isApplicantPage: false,
  });

  const employee = await getEmployeeDetailUseCase({
    employeeUserId: user.id,
  });

  if (!employee.success) {
    return <ErrorPage message={employee.message} data={employee.data} />;
  }

  return (
    <>
      <div className="grid grid-cols-12 gap-8 container mt-16 mx-auto mb-12">
        <div className="col-span-4">
          <div className="flex flex-col items-center shadow rounded-xl py-4 px-8 bg-background-accent">
            <div className="flex items-center gap-4">
              <Avatar.Root className="w-44 h-44 rounded-full">
                {employee.data.imageUrl && (
                  <Avatar.Image
                    className="w-full h-full rounded-full"
                    src={employee.data.imageUrl}
                    alt={employee.data.name}
                  />
                )}
                <Avatar.Fallback>{employee.data.name[0]}</Avatar.Fallback>
              </Avatar.Root>
            </div>
            <div className="w-full">
              <div className="my-5">
                <div className="flex items-center">
                  <div className="text-2xl font-bold">{employee.data.name}</div>
                  <div className="text-gray-600 ms-2">
                    {employee.data.gender}
                  </div>
                </div>
                <div className="text-gray-600 mb-4">{user.email}</div>
              </div>
              <div className="my-5">
                <span>{employee.data.companyName}</span>
              </div>
              <div className="my-5 flex flex-col items-start">
                <div className="bg-white p-2 rounded-md">職種</div>
                <span className="ms-4 mt-2">
                  {employee.data.occupation
                    ? employee.data.occupation?.name
                    : "選択されていません"}
                </span>
              </div>
              <div className="my-5 flex flex-col items-start">
                <div className="bg-white p-2 rounded-md">入社歴</div>
                <span className="ms-4 mt-2">
                  {employee.data.yearsOfExperience}年目
                </span>
              </div>
              <div className="my-5 flex flex-col items-start">
                <div className="bg-white p-2 rounded-md">勤務地</div>
                <div className="ms-4 mt-2">
                  {employee.data.workLocation
                    ? employee.data.workLocation.name
                    : "選択されていません"}
                </div>
              </div>
              <div className="my-5 flex flex-col items-start">
                <div className="bg-white p-2 rounded-md">面談方法</div>
                <div className="ms-4 mt-2">
                  {employee.data.meetingMethod
                    ? employee.data.meetingMethod
                    : "選択されていません"}
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
            <Link href="/employee/my_page/edit">
              <Button>編集</Button>
            </Link>
          </div>
          <div className="mt-6">
            <h2 className="text-gray-700 text-3xl font-bold mb-3 border-b border-gray-400 pb-3">
              話せる内容を一言で！
            </h2>
            <div className="mb-14 whitespace-pre-line">
              {employee.data.barkerMessage}
            </div>
          </div>
          <div className="mt-6">
            <h2 className="text-gray-700 text-3xl font-bold mb-3">
              話せる内容（詳細）
            </h2>
            <div className="mb-4 border-b border-gray-400"> </div>
            <div className="mb-14 whitespace-pre-line">
              {employee.data.talkableTopics}
            </div>
          </div>
          <div className="mt-6">
            <h2 className="text-gray-700 text-3xl font-bold mb-3">
              所属・経歴
            </h2>
            <div className="mb-4 border-b border-gray-400"> </div>
            <div className="mb-14 whitespace-pre-line">
              {employee.data.careerDescription}
            </div>
          </div>
          <div className="mt-6">
            <h2 className="text-gray-700 text-3xl font-bold mb-3">業務内容</h2>
            <div className="mb-4 border-b border-gray-400"> </div>
            <div className="mb-14 whitespace-pre-line">
              {employee.data.jobDescription}
            </div>
          </div>
          <div className="mt-6">
            <h2 className="text-gray-700 text-3xl font-bold mb-3">入社経緯</h2>
            <div className="mb-4 border-b border-gray-400"> </div>
            <div className="mb-14 whitespace-pre-line">
              {employee.data.joiningDescription}
            </div>
          </div>
          <div className="mt-6">
            <h2 className="text-gray-700 text-3xl font-bold mb-3">その他</h2>
            <div className="mb-4 border-b border-gray-400"> </div>
            <div className="mb-14 whitespace-pre-line">
              {employee.data.otherDescription}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
