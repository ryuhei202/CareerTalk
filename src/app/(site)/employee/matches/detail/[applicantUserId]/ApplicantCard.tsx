import CardCommentBox from "@/app/_components/parts/CardCommentBox";
import { Button } from "@/app/_components/ui/button";
import { Card, CardContent, CardHeader } from "@/app/_components/ui/card";
import type { LikedApplicant } from "@/usecase/getLikedApplicants/getLikedApplicantsUseCase";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import LikeReasonCard from "./_components/LikeReasonCard";

export default function ApplicantCard({
  applicant,
  likeReason,
  likeMessage,
  onClickBack,
}: {
  applicant: LikedApplicant;
  likeReason: string;
  likeMessage?: string;
  onClickBack: () => void;
}) {
  return (
    <Card className="w-full max-w-md mx-auto h-[calc(100vh-80px)] overflow-y-auto my-4">
      <CardHeader className="bg-blue-500 text-white p-3 sticky top-0 z-10">
        <h2 className="text-sm font-medium">いいねされました！</h2>
      </CardHeader>
      <CardContent className="p-4">
        <div className="flex justify-between items-center">
          <Button
            variant="ghost"
            size="sm"
            className="text-blue-600 hover:text-white hover:bg-blue-600 p-1"
            onClick={onClickBack}
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">戻る</span>
          </Button>
        </div>

        <div className="flex items-start space-x-3 mt-4">
          <div className="flex-shrink-0">
            <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center overflow-hidden">
              <Image
                src={applicant.imageUrl ?? ""}
                alt="Profile"
                className="w-full h-full object-cover"
                width={64}
                height={64}
              />
            </div>
          </div>
          <div className="flex-grow">
            <h2 className="text-sm font-bold border-b border-gray-200 pb-1">
              会社名：{"テストカンパニー"}
            </h2>
            <h3 className="text-lg font-bold mt-1">{applicant.name}</h3>
            <ul className="mt-1 space-y-0.5 text-xs">
              <li>・{applicant.occupationName}</li>
              <li>・{applicant.yearsOfExperience}年目</li>
            </ul>
          </div>
        </div>

        <div className="space-y-4 mt-6">
          <LikeReasonCard reason={likeReason ?? ""} message={likeMessage} />
          <CardCommentBox
            title="自己紹介"
            comment={applicant.selfIntroduction ?? ""}
          />
        </div>
      </CardContent>
      <div className="sticky bottom-0 bg-white p-4 border-t">
        <Button
          type="button"
          className="w-full bg-blue-600 text-white hover:bg-blue-700 rounded-full py-3 text-sm font-medium"
        >
          この転職希望者の申請を許可する
        </Button>
      </div>
    </Card>
  );
}