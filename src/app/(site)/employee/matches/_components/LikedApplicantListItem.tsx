import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/_components/ui/card";
import type { LikedApplicant } from "@/usecase/getLikedApplicants/getLikedApplicantsUseCase";
import { Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function LikedApplicantListItem({
  applicant,
}: {
  applicant: LikedApplicant;
}) {
  return (
    <Link href={`/employee/matches/detail/${applicant.userId}`}>
      <Card key={applicant.userId} className="relative overflow-hidden">
        <div className="absolute top-0 right-0 bg-blue-500 text-white px-2 py-1 text-xs">
          話してみたい
        </div>
        <CardHeader className="flex items-center pb-2">
          <Image
            src={applicant.imageUrl ?? ""}
            alt=""
            className="w-16 h-16 rounded-full mr-4"
            width={64}
            height={64}
          />
          <div>
            <CardTitle className="text-lg">{applicant.name}</CardTitle>
            <div className="">
              {/* TODO: applicant.companyNameを取得できるようにする */}
              <p>会社名：{"テストカンパニー"}</p>
              <p>{applicant.occupationName}</p>
              <p className="text-sm text-gray-600">
                社会人{applicant.yearsOfExperience}年目 {applicant.gender}
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-1 text-sm">
            <p className="flex items-center">
              <Users className="mr-2" size={16} />
              {applicant.selfIntroduction}
            </p>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
