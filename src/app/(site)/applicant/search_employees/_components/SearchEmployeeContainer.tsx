"use client";

import type { FilteredEmployee } from "@/usecase/getFilteredEmployee/getFilteredEmployeesUseCase";
import { useCallback } from "react";
import { useSearchParamsUpdate } from "../_util/useSearchParamsUpdate";
import type { Company, Occupation } from "../page";
import SearchEmployeeBox from "./SearchEmployeeBox";
import SearchEmployeeList from "./SearchEmployeeList";

export default function SearchEmployeeContainer({
  totalCount,
  employees,
  occupations,
  companies,
}: {
  totalCount: number;
  employees: FilteredEmployee[];
  occupations: Occupation[];
  companies: Company[];
}) {
  const { updateSearchParams, handleChangePage, currentParams, currentPage } =
    useSearchParamsUpdate();

  const totalPages = Math.ceil(totalCount / 10);

  const handleChangeCompany = useCallback(
    (company: string) => {
      updateSearchParams("company", company);
    },
    [updateSearchParams]
  );

  const handleChangeOccupation = useCallback(
    (occupation: string) => {
      updateSearchParams("occupation", occupation);
    },
    [updateSearchParams]
  );

  const handleChangeExperienceOfYears = useCallback(
    (experience: string) => {
      updateSearchParams("experience", experience);
    },
    [updateSearchParams]
  );

  const handleChangeHiringType = useCallback(
    (hiringType: string) => {
      updateSearchParams("hiringType", hiringType);
    },
    [updateSearchParams]
  );

  const handleChangeMeetingMethod = useCallback(
    (meetingMethod: string) => {
      updateSearchParams("meetingMethod", meetingMethod);
    },
    [updateSearchParams]
  );

  return (
    <div className="grid grid-cols-12">
      {/* Left Sidebar */}
      <div className="p-4 col-span-6 lg:col-span-4">
        <SearchEmployeeBox
          occupations={occupations}
          companies={companies}
          onChangeParamsMethods={{
            onChangeCompany: handleChangeCompany,
            onChangeOccupation: handleChangeOccupation,
            onChangeExperienceOfYears: handleChangeExperienceOfYears,
            onChangeHiringType: handleChangeHiringType,
            onChangeMeetingMethod: handleChangeMeetingMethod,
          }}
          currentParams={currentParams}
        />
      </div>

      {/* Main Content */}
      <div className="col-span-4 sm:col-span-6 md:col-span-6 lg:col-span-8">
        <SearchEmployeeList
          employees={employees}
          currentPage={currentPage}
          totalPages={totalPages}
          totalCount={totalCount}
          onPageChange={handleChangePage}
        />
      </div>
    </div>
  );
}
