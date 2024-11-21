import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/_components/ui/card";

import bakerBackGround from "@/assets/images/baker-background.png";
import type { FilteredEmployee } from "@/usecase/getFilteredEmployee/getFilteredEmployeesUseCase";
import { Briefcase, MapPin, PhoneCall, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { GrGroup } from "react-icons/gr";

// TODO: プロフィールカードをデザイン通りにする
export default function SearchEmployeeListItem({
  employee,
}: {
  employee: FilteredEmployee;
}) {
  return (
    <Link href={`/applicant/search_employees/detail/${employee.userId}`}>
      <Card
        key={employee.userId}
        className="relative overflow-hidden border-none"
      >
        <CardHeader className=" text-white p-0 relative top-0 z-10 flex justify-center items-center overflow-hidden">
          <div className="w-full h-full absolute overflow-hidden">
            <Image
              src={bakerBackGround}
              alt="bakerBackGround"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black opacity-60 w-full h-full">
              {" "}
            </div>
          </div>
          <CardTitle className="font-bold relative z-10 w-full m-0 px-6 py-4 leading-relaxed whitespace-pre-wrap">
            {employee.bakerMessage}
          </CardTitle>
        </CardHeader>
        <CardContent className="px-0 py-2">
          <div className="flex justify-between items-start">
            <div className="flex-grow">
              <div className="ps-6 font-bold text-lg border-b border-gray-300">
                {employee.company.name}
              </div>
              <div className="ps-6 py-2">
                <div className="tracking-widest text-lg">{employee.name}</div>
                <div className="ps-2 pt-1 list-none space-y-1">
                  <div className="text-sm flex items-center">
                    <GrGroup className="mr-2" size={16} />
                    <span>{employee.occupation.name}</span>
                  </div>
                  <div className="text-sm flex items-center">
                    <Briefcase className="mr-2" size={16} />
                    <span>社会人{employee.yearsOfExperience}年目</span>
                  </div>
                  <div className="text-sm flex items-center">
                    <Users className="mr-2" size={16} />
                    <span>{employee.hiringType}</span>
                  </div>
                  <div className="text-sm flex items-center">
                    <PhoneCall className="mr-2" size={16} />
                    <span>{employee.meetingMethod}</span>
                  </div>
                  {employee.workLocation && (
                    <div className="text-sm flex items-center">
                      <MapPin className="mr-2" size={16} />
                      <span>{employee.workLocation.name}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="pe-6">
              <Image
                src={employee.imageUrl ?? ""}
                alt=""
                className="w-24 h-24 rounded-full mr-4"
                width={64}
                height={64}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
