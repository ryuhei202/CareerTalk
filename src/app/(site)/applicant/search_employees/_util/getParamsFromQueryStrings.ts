import type { HiringTypeEnum } from "@/domain/shared/HiringType";
import type { MeetingMethodEnum } from "@/domain/shared/MeetingMethod";
import type { SearchParams } from "../page";

const YEARS_OF_EXPERIENCE = [
	{
		id: 1,
		range: {
			min: 0,
			max: 5,
		},
	},
	{
		id: 2,
		range: {
			min: 5,
			max: 10,
		},
	},
	{
		id: 3,
		range: {
			min: 10,
			max: 100,
		},
	},
];

export const getParamsFromQueryStrings = (searchParams: SearchParams) => {
	const currentPage = searchParams.page ? Number(searchParams.page) : 1;
	const currentCompanyId = searchParams.company
		? Number(searchParams.company)
		: undefined;

	const currentOccupationId = searchParams.occupation
		? Number(searchParams.occupation)
		: undefined;

	const experienceId = searchParams.experience
		? Number(searchParams.experience)
		: undefined;
	const currentYearsOfExperience =
		experienceId && experienceId <= 3 && experienceId >= 0
			? {
					min: YEARS_OF_EXPERIENCE[experienceId - 1].range.min,
					max: YEARS_OF_EXPERIENCE[experienceId - 1].range.max,
				}
			: undefined;

	return {
		currentPage,
		currentCompanyId,
		currentOccupationId,
		currentYearsOfExperience,
		currentHiringType: searchParams.hiringType as HiringTypeEnum | undefined,
		currentMeetingMethod: searchParams.meetingMethod as
			| MeetingMethodEnum
			| undefined,
	};
};
