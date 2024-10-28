"use client";

import { Button } from "@/app/_components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/app/_components/ui/card";
import type { EmployeeDetailResponse } from "@/usecase/dto/Employee/EmployeeDetailDto";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import EmployeeComment from "./EmployeeComment";

export default function EmployeeCard({
  employee,
}: {
  employee: EmployeeDetailResponse;
}) {
  const router = useRouter();
  return (
    <Card className="w-full max-w-md mx-auto h-[calc(100vh-80px)] overflow-y-auto my-4">
      <CardHeader className="bg-blue-500 text-white p-3 sticky top-0 z-10">
        <h2 className="text-sm font-medium">
          若手なら下記の視点でお話できます！ お気軽にDMください。
        </h2>
      </CardHeader>
      <CardContent className="p-4">
        <div className="flex justify-between items-center">
          <Button
            variant="ghost"
            size="sm"
            className="text-blue-600 hover:text-white hover:bg-blue-600 p-1"
            onClick={() => router.back()}
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">戻る</span>
          </Button>
          <Button
            size="sm"
            className="bg-white text-blue-600 hover:bg-blue-50 rounded-full text-xs"
          >
            この社員とトークする
          </Button>
        </div>

        <div className="flex items-start space-x-3 mt-4">
          <div className="flex-shrink-0">
            <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center overflow-hidden">
              <Image
                src={employee.imageUrl}
                alt="Profile"
                className="w-full h-full object-cover"
                width={64}
                height={64}
              />
            </div>
          </div>
          <div className="flex-grow">
            <h2 className="text-sm font-bold border-b border-gray-200 pb-1">
              {employee.companyName}
            </h2>
            <h3 className="text-lg font-bold mt-1">{employee.name}</h3>
            <ul className="mt-1 space-y-0.5 text-xs">
              <li>・{employee.occupationName}</li>
              <li>
                ・入社{employee.yearsOfExperience}年目({employee.hiringType})
              </li>
              <li>・{employee.gender}</li>
              {employee.workLocationName && (
                <li>・{employee.workLocationName}</li>
              )}
            </ul>
          </div>
        </div>

        <div className="space-y-4 mt-6">
          <EmployeeComment title="ひとこと" comment={employee.talkableTopics} />
          <EmployeeComment
            title="所属・経歴"
            comment={employee.careerDescription}
          />
          <EmployeeComment title="業務内容" comment={employee.jobDescription} />
          <EmployeeComment
            title="入社経緯"
            comment={employee.joiningDescription}
          />
          <EmployeeComment title="その他" comment={employee.otherDescription} />
        </div>
      </CardContent>
      <div className="sticky bottom-0 bg-white p-4 border-t">
        <Button className="w-full bg-blue-600 text-white hover:bg-blue-700 rounded-full py-3 text-sm font-medium">
          この社員とトークする
        </Button>
      </div>
    </Card>
  );
}
