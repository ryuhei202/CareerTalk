import CardCommentBox from "@/app/_components/parts/CardCommentBox";
import { Button } from "@/app/_components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/app/_components/ui/card";
import bakerBackGround from "@/assets/images/baker-background.png"
import careerDescriptionIcon from "@/assets/images/icons/careerDescription.svg"
import jobDescriptionIcon from "@/assets/images/icons/jobDescription.svg"
import joiningDescriptionIcon from "@/assets/images/icons/joiningDescription.svg"
import otherDescriptionIcon from "@/assets/images/icons/otherDescription.svg"
import talkableTopicsIcon from "@/assets/images/icons/talkableTopics.svg"
import type { EmployeeDetailResponse } from "@/usecase/getEmployeeDetail/getEmployeeDetailUseCase";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";

export default function EmployeeCard({
  employee,
  onClickBack,
  onClickOpenDMRequest,
}: {
  employee: EmployeeDetailResponse;
  onClickBack?: () => void;
  onClickOpenDMRequest?: () => void;
}) {
  return (
    <Card className="w-full mx-auto border-0 my-4 overflow-auto">
      <CardHeader className=" text-white p-0 relative top-0 z-10 flex justify-center items-center overflow-hidden">
        <div className="w-full h-full absolute overflow-hidden">
          <Image src={bakerBackGround} alt="bakerBackGround" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black opacity-60 w-full h-full"> </div>
        </div>
        <h2 className="text-2xl font-bold relative z-10 w-3/4 m-0 py-12 leading-relaxed">
          {employee.barkerMessage}
        </h2>
      </CardHeader>
      <CardContent className="py-6">
        <div className="flex justify-between">
          {onClickBack && (
            <div className="flex justify-between items-center">
              <Button
                variant="outline"
                className="border-0 shadow-none"
                onClick={onClickBack}
              >
                <ArrowLeft className="h-4 w-4" />
                <span className="">戻る</span>
              </Button>
            </div>
          )}
          <Button variant="outline" className="rounded-full border-2 text-lg py-6 px-8" onClick={onClickOpenDMRequest}>この社員とトークする</Button>
        </div>

        <div className="px-12">
          <div className="flex items-start gap-6 mt-4">
            <div className="">
              <div className="w-32 h-32 rounded-full bg-blue-100 flex items-center justify-center overflow-hidden">
                <Image
                  src={employee.imageUrl}
                  alt="Profile"
                  className="w-full h-full object-cover"
                  width={200}
                  height={200}
                />
              </div>
            </div>
            <div className="flex-grow">
              <h2 className="text-foreground text-3xl tracking-widest font-bold border-b border-gray-200 pb-2">
                {employee.companyName}
              </h2>
              <h3 className="text-2xl font-bold mt-1 tracking-widest text-foreground">{employee.name}</h3>
              <ul className="mt-1 space-y-0.5 text-xs">
                <li className="relative before:content-[''] before:absolute before:top-[50%] before:left-0 before:-translate-y-[50%] before:w-1 before:h-1 before:bg-gray-600 before:rounded-full pl-3 text-gray-600 text-base">{employee.occupation?.name}</li>
                <li className="relative before:content-[''] before:absolute before:top-[50%] before:left-0 before:-translate-y-[50%] before:w-1 before:h-1 before:bg-gray-600 before:rounded-full pl-3 text-gray-600 text-base">
                  入社{employee.yearsOfExperience}年目({employee.hiringType})
                </li>
                <li className="relative before:content-[''] before:absolute before:top-[50%] before:left-0 before:-translate-y-[50%] before:w-1 before:h-1 before:bg-gray-600 before:rounded-full pl-3 text-gray-600 text-base">{employee.gender}</li>
                {employee.workLocation?.name && (
                  <li className="relative before:content-[''] before:absolute before:top-[50%] before:left-0 before:-translate-y-[50%] before:w-1 before:h-1 before:bg-gray-600 before:rounded-full pl-3 text-gray-600 text-base">{employee.workLocation?.name}</li>
                )}
              </ul>
            </div>
          </div>
          <div className="space-y-8 mt-6">
            <CardCommentBox
              imageSrc={talkableTopicsIcon}
              imageAlt="talkableTopics"
              title="話せること"
              comment={employee.talkableTopics} />
            <CardCommentBox
              title="所属・経歴"
              comment={employee.careerDescription}
              imageSrc={careerDescriptionIcon}
              imageAlt="careerDescriptionIcon"
            />
            <CardCommentBox
              title="業務内容"
              comment={employee.jobDescription}
              imageSrc={jobDescriptionIcon}
              imageAlt="jobDescriptionIcon"
            />
            <CardCommentBox
              title="入社経緯"
              comment={employee.joiningDescription}
              imageSrc={joiningDescriptionIcon}
              imageAlt="joiningDescriptionIcon"
            />
            <CardCommentBox
              title="その他"
              comment={employee.otherDescription}
              imageSrc={otherDescriptionIcon}
              imageAlt="otherDescriptionIcon"
            />
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-center">
        {onClickOpenDMRequest && (
          <div className="sticky bottom-0 bg-white p-4">
            <Button
              type="button"
              variant="outline"
              className="rounded-full border-2 text-lg py-6 px-8"
              onClick={onClickOpenDMRequest}
            >
              この社員とトークする
            </Button>
          </div>
        )}
      </CardFooter >
    </Card>
  );
}
