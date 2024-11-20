"use client";

import LikeReasonCard from "@/app/(site)/employee/matches/detail/[applicantUserId]/_components/LikeReasonCard";
import CardCommentBox from "@/app/_components/parts/CardCommentBox";
import { Button } from "@/app/_components/ui/button";
import { Card, CardContent, CardHeader } from "@/app/_components/ui/card";
import selfIntroductionIcon from "@/assets/images/icons/selfIntroduction.svg"
import type { ApplicantDetailResponse as Applicant } from "@/usecase/getApplicantDetail/getApplicantDetailUseCase";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function ApplicantCard({
  applicant,
  likedApplicantContent,
}: {
  applicant: Applicant;
  likedApplicantContent?: {
    likeReason: string;
    likeMessage?: string;
    action: (payload: FormData) => void;
  };
}) {
  const router = useRouter();


  return (
    <Card className="w-full mx-auto overflow-y-auto">
      <CardHeader className="flex flex-col items-start pb-2">
        <Button
          variant="outline"
          className="border-0 shadow-none"
          onClick={() => router.back()}
        >
          <ArrowLeft className="h-4 w-4" />
          <span className="">戻る</span>
        </Button>
        <h2 className="text-primary text-2xl font-bold text-center w-full">いいねされました！</h2>
      </CardHeader>
      <CardContent className="pb-6">
        <div className="px-12">
          <div className="flex items-start gap-6 mt-4">
            <div className="">
              <div className="w-32 h-32 rounded-full bg-blue-100 flex items-center justify-center overflow-hidden">
                <Image
                  src={applicant.imageUrl}
                  alt="Profile"
                  className="w-full h-full object-cover"
                  width={200}
                  height={200}
                />
              </div>
            </div>
            <div className="flex-grow">
              <h2 className="text-foreground text-2xl tracking-widest font-bold border-b border-gray-200 pb-2">
                {applicant?.company ? applicant.company : ""}
              </h2>
              <h3 className="text-2xl font-bold mt-1 tracking-widest text-foreground">{applicant.name}</h3>
              <ul className="mt-1 space-y-0.5 text-xs">
                <li className="relative before:content-[''] before:absolute before:top-[50%] before:left-0 before:-translate-y-[50%] before:w-1 before:h-1 before:bg-gray-600 before:rounded-full pl-3 text-gray-600 text-base">
                  {applicant.gender}
                </li>
                <li className="relative before:content-[''] before:absolute before:top-[50%] before:left-0 before:-translate-y-[50%] before:w-1 before:h-1 before:bg-gray-600 before:rounded-full pl-3 text-gray-600 text-base">
                  {applicant.occupation?.name}
                </li>
                <li className="relative before:content-[''] before:absolute before:top-[50%] before:left-0 before:-translate-y-[50%] before:w-1 before:h-1 before:bg-gray-600 before:rounded-full pl-3 text-gray-600 text-base">
                  入社{applicant.yearsOfExperience}年目
                </li>
              </ul>
            </div>
          </div>
          {likedApplicantContent &&
            <LikeReasonCard
              reason={likedApplicantContent.likeReason}
              message={likedApplicantContent.likeMessage}
              className="mt-4"
            />
          }
          <div className="space-y-8 mt-6">
            <CardCommentBox
              imageSrc={selfIntroductionIcon}
              imageAlt="selfIntroductionIcon"
              title="自己紹介"
              comment={applicant.selfIntroduction} />
            <CardCommentBox
              title="職務経歴"
              comment={applicant.workHistory}
              imageSrc={selfIntroductionIcon}
              imageAlt="workHistory"
            />
            <CardCommentBox
              title="学歴"
              comment={applicant.education}
              imageSrc={selfIntroductionIcon}
              imageAlt="education"
            />
          </div>
        </div>
      </CardContent>
      {likedApplicantContent && (
        <div className="flex justify-center items-center gap-4 p-4">
          <form action={likedApplicantContent.action}>
            <input type="hidden" name="isApprove" value="false" />
            <Button
              type="submit"
              variant="destructive"
            >
              申請を拒否する
            </Button>
          </form>
          <form action={likedApplicantContent.action}>
            <input type="hidden" name="isApprove" value="true" />
            <Button
              type="submit"
              className="w-full"
            >
              申請を許可する
            </Button>
          </form>
        </div>
      )}
    </Card>
  );
}
