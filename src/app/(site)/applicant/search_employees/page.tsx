import ErrorPage from "@/app/_components/page/ErrorPage";
import type { HiringTypeEnum } from "@/domain/shared/HiringType";
import type { MeetingMethodEnum } from "@/domain/shared/MeetingMethod";
import { getApplicantUserId } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import {
  type SearchEmployeeUseCaseResult,
  getFilteredEmployeesUseCase,
} from "@/usecase/getFilteredEmployee/getFilteredEmployeesUseCase";
import { redirect } from "next/navigation";
import SearchEmployeeContainer from "./_components/SearchEmployeeContainer";
import { getParamsFromQueryStrings } from "./_util/getParamsFromQueryStrings";

export type Occupation = {
  id: number;
  name: string;
};

export type Company = {
  id: number;
  name: string;
};

export type YearsOfExperience = {
  min: number;
  max: number;
};

export type WorkLocation = {
  id: number;
  name: string;
};

export type SearchParams = {
  page?: string;
  occupation?: string;
  company?: string;
  experience?: string;
  hiringType?: string;
  meetingMethod?: string;
};

/**
 * 検索のRequest Paramsの型
 */
export type SearchEmployeeParams = {
  page?: number;
  filter: {
    companyId?: number;
    occupationId?: number;
    yearsOfExperience?: YearsOfExperience;
    hiringType?: HiringTypeEnum;
    meetingMethod?: MeetingMethodEnum;
  };
  applicantUserId: string;
};

export default async function SearchEmployeePage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const applicantUserId = await getApplicantUserId();
  if (!applicantUserId) {
    redirect("/applicant/create_profile");
  }

  const [occupation, company] = await Promise.all([
    prisma.occupation.findMany(),
    prisma.company.findMany(),
  ]);

  const {
    currentPage,
    currentCompanyId,
    currentOccupationId,
    currentYearsOfExperience,
    currentHiringType,
    currentMeetingMethod,
  } = getParamsFromQueryStrings(searchParams);

  const getFilteredEmployeesUseCaseParams: SearchEmployeeParams = {
    page: currentPage,
    filter: {
      companyId: currentCompanyId,
      occupationId: currentOccupationId,
      yearsOfExperience: currentYearsOfExperience,
      hiringType: currentHiringType,
      meetingMethod: currentMeetingMethod,
    },
    applicantUserId: applicantUserId,
  };

  const result: SearchEmployeeUseCaseResult = await getFilteredEmployeesUseCase(
    getFilteredEmployeesUseCaseParams
  );

  // RSCで予期されるエラーは特定のComponentを返却してあげる
  //@see https://nextjs.org/docs/app/building-your-application/routing/error-handling#handling-expected-errors-from-server-components
  if (!result.success) {
    return <ErrorPage message={result.message} data={result.data} />;
  }

  return (
    <SearchEmployeeContainer
      totalCount={result.data.totalCount}
      employees={result.data.employees}
      occupations={occupation}
      companies={company}
    />
  );
}
