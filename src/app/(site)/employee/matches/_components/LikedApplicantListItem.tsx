import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/_components/ui/card";
import type { LikedApplicant } from "@/usecase/getLikedApplicants/getLikedApplicantsUseCase";
import { Briefcase, MapPin, PhoneCall, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { GrGroup } from "react-icons/gr";

export default function LikedApplicantListItem({
  applicant,
}: {
  applicant: LikedApplicant;
}) {
  return (
    <Link href={`/employee/matches/detail/${applicant.userId}`}>
      <Card key={applicant.userId} className="relative overflow-hidden border-none">
        <CardContent className="px-0 py-2">
          <div className="flex justify-between items-start">
            <div className="flex-grow">
              <div className="ps-6 font-bold text-lg border-b border-gray-300">{applicant.company}</div>
              <div className="ps-6 py-2">
                <div className="tracking-widest text-lg">{applicant.name}</div>
                <div className="ps-2 pt-1 list-none space-y-1">
                  <div className="text-sm flex items-center">
                    <GrGroup className="mr-2" size={16} />
                    <span>{applicant.occupationName}</span>
                  </div>
                  <div className="text-sm flex items-center">
                    <Briefcase className="mr-2" size={16} />
                    <span>社会人{applicant.yearsOfExperience}年目</span>
                  </div>
                  {/* <div className="text-sm flex items-center">
                    <Users className="mr-2" size={16} />
                    <span>{applicant.hiringType}</span>
                  </div>
                  <div className="text-sm flex items-center">
                    <PhoneCall className="mr-2" size={16} />
                    <span>{applicant.meetingMethod}</span>
                  </div>
                  {applicant.workLocation &&
                    <div className="text-sm flex items-center">
                      <MapPin className="mr-2" size={16} />
                      <span>{applicant.workLocation.name}</span>
                    </div>
                  } */}
                </div>
              </div>
            </div>
            <div className="pe-6">
              <Image
                src={applicant.imageUrl ?? ""}
                alt=""
                className="w-24 h-24 rounded-full mr-4"
                width={64}
                height={64}
              />
            </div>
          </div>
          <div className="py-2 px-4">
            <div className="px-2 py-4 rounded  whitespace-pre-wrap border border-primary">
              {applicant.selfIntroduction}
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
