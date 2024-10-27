import type { YearsOfExperience } from "@/app/(site)/applicant/search_employees/page";

export function getCurrentDate(): Date {
	return new Date();
}
export const getExperienceYearsAgo = (
	yearsOfExperience: YearsOfExperience,
): { minJoiningDate: Date; maxJoiningDate: Date } => {
	const today = new Date();

	const minYearsAgo = new Date(today.getTime());
	minYearsAgo.setFullYear(minYearsAgo.getFullYear() - yearsOfExperience.min);

	const maxYearsAgo = new Date(today.getTime());
	maxYearsAgo.setFullYear(maxYearsAgo.getFullYear() - yearsOfExperience.max);

	const minJoiningDate = new Date(maxYearsAgo);
	const maxJoiningDate = new Date(minYearsAgo);

	return { minJoiningDate, maxJoiningDate };
};
