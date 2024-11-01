import { Button } from "@/app/_components/ui/button";
import { Input } from "@/app/_components/ui/input";
import { Textarea } from "@/app/_components/ui/textarea";
import { getEmployeeDetail } from "@/domain/core/Employee/services/getEmployeeDetail";
import { getEmployeeId, getServerSession } from "@/lib/auth";
import * as Avatar from "@radix-ui/react-avatar";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function MyPageEdit() {
  const session = await getServerSession();
  if (!session) {
    redirect("/signin");
  }
  const employeeId = await getEmployeeId()
  console.log(employeeId);
  if (!employeeId) {
    redirect("/signin");
  }
  const employee = await getEmployeeDetail({ employeeId })
  if (!employee) {
    redirect("/signin")
  }


  return (
    <>
      <div className="grid grid-cols-12 gap-8 container mt-16 mx-auto mb-12">
        <div className="col-span-4">
          <div className="flex flex-col items-center shadow rounded-xl py-4 px-8">
            <div className="flex items-center gap-4">
              <Avatar.Root className="w-44 h-44 rounded-full">
                {employee.imageUrl &&
                  <Avatar.Image className="w-full h-full rounded-full" src={employee.imageUrl} alt={employee.name} />}
                <Avatar.Fallback>{employee.name[0]}</Avatar.Fallback>
              </Avatar.Root>
            </div>
            <div className="w-full">
              <div className="my-5">
                <div className="flex items-center">
                  <div className="text-2xl font-bold">{employee.name}</div>
                  <div className="text-gray-600 ms-2">{employee.gender}</div>
                </div>
                <div className="text-gray-600 mb-4">{session.user.email}</div>
              </div>
              <div className="my-5">
                <span>{employee.companyName}</span>
              </div>
              <div className="my-5">
                <span>{employee.yearsOfExperience}</span>
              </div>
              <div className="my-5">
                <div>{employee.occupationName}</div>
              </div>
              <div className="my-5 flex flex-col items-start">
                <div className="bg-gray-100 p-2 rounded-md">勤務地</div>
                <Input className="ms-4 mt-2" value={employee.workLocationName} />
              </div>
              <div className="my-5 flex flex-col items-start">
                <div className="bg-gray-100 p-2 rounded-md">面談方法</div>
                <Input className="ms-4 mt-2" value={employee.meetingMethodName} />
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-8">

          <div className="flex justify-end">
            <Link href={"/employee/my_page"}>
              <Button variant={"secondary"}>
                戻る
              </Button>
            </Link>
          </div>
          <div className="mt-6">
            <h2 className="text-gray-700 text-3xl font-bold mb-3 border-b pb-3">話せる内容</h2>
            <Textarea className="h-44 mb-14" value={employee.talkableTopics} />
          </div>
          <div className="mt-6">
            <h2 className="text-gray-700 text-3xl font-bold mb-3 border-b pb-3">所属・経歴</h2>
            <Textarea className="h-44 mb-14" value={employee.careerDescription} />
          </div>
          <div className="mt-6">
            <h2 className="text-gray-700 text-3xl font-bold mb-3 border-b pb-3">業務内容</h2>
            <Textarea className="h-44 mb-14" value={employee.jobDescription} />
          </div>
          <div className="mt-6">
            <h2 className="text-gray-700 text-3xl font-bold mb-3 border-b pb-3">入社経緯</h2>
            <Textarea className="h-44 mb-14" value={employee.joiningDescription} />
          </div>
          <div className="mt-6">
            <h2 className="text-gray-700 text-3xl font-bold mb-3 border-b pb-3">その他</h2>
            <Textarea className="h-44 mb-14" value={employee.otherDescription} />
          </div>
          <div className="flex justify-end">
            <Button>保存</Button>
          </div>
        </div >
      </div >
    </>
  );
}