import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/_components/ui/card";
import type { FilteredEmployee } from "@/usecase/getFilteredEmployees";
import { Briefcase, MapPin, PhoneCall, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

// TODO: プロフィールカードをデザイン通りにする
export default function SearchEmployeeListItem({
  employee,
}: {
  employee: FilteredEmployee;
}) {
  return (
    <Link href={`/applicant/search_employees/detail/${employee.userId}`}>
      <Card key={employee.userId} className="relative overflow-hidden">
        <div className="absolute top-0 right-0 bg-blue-500 text-white px-2 py-1 text-xs">
          企業公開
        </div>
        <CardHeader className="flex items-center pb-2">
          <Image
            src={employee.imageUrl ?? ""}
            alt=""
            className="w-16 h-16 rounded-full mr-4"
            width={64}
            height={64}
          />
          <div>
            <CardTitle className="text-lg">{employee.name}</CardTitle>
            <div className="">
              <p className="text-sm text-gray-600">{employee.company.name}</p>
              <p className="text-sm text-gray-600">
                社会人{employee.yearsOfExperience}年目 {employee.gender}
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-1 text-sm">
            <p className="flex items-center">
              <Users className="mr-2" size={16} />
              {employee.hiringType}
            </p>
            <p className="flex items-center">
              <Briefcase className="mr-2" size={16} />
              {employee.occupation.name}
            </p>
            {employee.workLocation && (
              <p className="flex items-center">
                <MapPin className="mr-2" size={16} />
                {employee.workLocation.name}
              </p>
            )}
            {employee.meetingMethod && (
              <p className="flex items-center">
                <PhoneCall className="mr-2" size={16} />
                {employee.meetingMethod}
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
