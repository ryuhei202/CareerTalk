import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

// TODO: Next15以降、next/formの<Form />コンポーネントに置き換える
// @see https://nextjs.org/docs/app/api-reference/components/form
// @see https://nextjs.org/blog/next-15#form-component
export const useSearchParamsUpdate = () => {
	const router = useRouter();
	const searchParams = useSearchParams();

	const currentPage = Number(searchParams.get("page")) || 1;
	const currentParams = {
		company: searchParams.get("company") || "all",
		occupation: searchParams.get("occupation") || "all",
		experience: searchParams.get("experience") || "all",
		hiringType: searchParams.get("hiringType") || "BOTH",
		meetingMethod: searchParams.get("meetingMethod") || "BOTH",
	};

	const updateSearchParams = useCallback(
		(key: string, value: string) => {
			const params = new URLSearchParams(searchParams.toString());
			if (value === "all" || value === "BOTH") {
				params.delete(key);
			} else {
				params.set(key, value);
			}
			params.set("page", "1"); // ページを1にリセット
			router.push(`/applicant/search_employees?${params.toString()}`);
		},
		[router, searchParams],
	);

	const handleChangePage = useCallback(
		(newPage: number) => {
			const params = new URLSearchParams(searchParams.toString());
			params.set("page", newPage.toString());
			router.push(`/applicant/search_employees?${params.toString()}`);
		},
		[router, searchParams],
	);

	return {
		currentPage,
		currentParams,
		updateSearchParams,
		handleChangePage,
	};
};
