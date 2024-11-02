import Pagenation from "@/app/_components/parts/Pagenation";
import type { FilteredEmployee } from "@/usecase/getFilteredEmployees";
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
      <h1 className="text-2xl font-bold mb-6">
        現場社員一覧（{totalCount}件）
      </h1>
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
