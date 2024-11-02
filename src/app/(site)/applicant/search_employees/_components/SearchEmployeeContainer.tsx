"use client";

import type { FilteredEmployee } from "@/usecase/getFilteredEmployee/getFilteredEmployeesUseCase";
import { useCallback, useState } from "react";
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
  const [tags, setTags] = useState([
    "IT業界",
    "フレックスタイム制",
    "エンタメ業界",
  ]);
  const [keyword, setKeyword] = useState("");

  const removeTag = (tag: string) => {
    setTags(tags.filter((t) => t !== tag));
  };

  const addTag = (tag: string) => {
    if (tag) {
      setTags([...tags, tag]);
      setKeyword("");
    }
  };

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
    <div className="flex min-h-screen bg-gray-100">
      {/* Left Sidebar */}
      <div className="w-1/4 p-4 md:p-6 lg:p-8">
        <SearchEmployeeBox
          occupations={occupations}
          companies={companies}
          keyword={keyword}
          setKeyword={setKeyword}
          addTag={addTag}
          removeTag={removeTag}
          tags={tags}
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
      <SearchEmployeeList
        employees={employees}
        currentPage={currentPage}
        totalPages={totalPages}
        totalCount={totalCount}
        onPageChange={handleChangePage}
      />
    </div>
  );
}
