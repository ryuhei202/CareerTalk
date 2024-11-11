import Pagenation from "@/app/_components/parts/Pagenation";
import denkyu from "@/assets/images/denkyu.png";
import type { FilteredEmployee } from "@/usecase/getFilteredEmployee/getFilteredEmployeesUseCase";
import Image from "next/image";
import SearchEmployeeListItem from "./SearchEmployeeListItem";
export default function SearchEmployeeList({
  employees,
  currentPage,
  totalPages,
  totalCount,
  onPageChange,
}: {
  employees: FilteredEmployee[];
  currentPage: number;
  totalPages: number;
  totalCount: number;
  onPageChange: (page: number) => void;
}) {
  return (
    <div className="flex-1 p-6">
      <div className="relative mb-6">
        <div className="flex items-center">
          <div className="relative">
            <Image
              src={denkyu}
              alt="あなたにおすすめの現場社員"
              width={50}
              height={50}
            />
          </div>
          <h1 className="text-2xl border-b-2 border-gray-400 pb-2 flex-grow">
            あなたにおすすめの現場社員（{totalCount}件）
          </h1>
        </div>
      </div>
      {employees.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {employees.map((employee) => (
              <SearchEmployeeListItem
                key={employee.userId}
                employee={employee}
              />
            ))}
          </div>
          <Pagenation
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={onPageChange}
          />
        </>
      ) : (
        <div className="text-center py-10">
          <p className="text-xl font-semibold text-gray-600">
            該当する現場社員が見つかりませんでした
          </p>
          <p className="mt-2 text-gray-500">
            検索条件を変更して再度お試しください
          </p>
        </div>
      )}
    </div>
  );
}
