import ErrorPage from "@/app/_components/page/ErrorPage";
import type { GenderLabel } from "@/domain/shared/Gender";
import type {
  HiringTypeEnum,
  HiringTypeLabel,
} from "@/domain/shared/HiringType";
import type {
  MeetingMethodEnum,
  MeetingMethodLabel,
} from "@/domain/shared/MeetingMethod";
import { prisma } from "@/lib/prisma";
import {
  type SearchEmployeeUseCaseResult,
  getFilteredEmployeesUseCase,
} from "@/usecase/getFilteredEmployees";
import { getZodErrorMessages } from "@/util/error";
import { ZodError } from "zod";
import SearchEmployeeContainer from "./_components/SearchEmployeeContainer";
import { getParamsFromQueryStrings } from "./_util/getParamsFromQueryStrings";
import { validateFilteredEmployeeUseCaseParams } from "./_util/validateFilteredEmployeeUseCaseParams";

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

export type FilteredEmployee = {
  id: string;
  name: string;
  company: Company;
  occupation: Occupation;
  gender: GenderLabel;
  yearsOfExperience: number;
  age?: number;
  imageUrl?: string;
  workLocation?: WorkLocation;
  hiringType?: HiringTypeLabel;
  meetingMethod?: MeetingMethodLabel;
  selfIntroduction?: string;
  talkableTopics?: string;
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
};

export default async function SearchEmployeePage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
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
  };

  try {
    validateFilteredEmployeeUseCaseParams(getFilteredEmployeesUseCaseParams);
  } catch (error) {
    if (error instanceof ZodError) {
      return (
        <ErrorPage
          message={getZodErrorMessages(error)}
          data={getFilteredEmployeesUseCaseParams}
        />
      );
    }
  }

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
