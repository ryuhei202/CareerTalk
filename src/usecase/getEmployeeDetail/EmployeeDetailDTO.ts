import type { Employee } from "@/domain/core/Employee/Employee";
import type { GenderLabel } from "@/domain/shared/Gender";
import type { HiringTypeLabel } from "@/domain/shared/HiringType";

export type Occupation = {
	id: number;
	name: string;
};

export type Company = {
	id: number;
	name: string;
};

export type WorkLocation = {
	id: number;
	name: string;
};

export type EmployeeDetailResponse = {
	userId: string;
	name: string;
	companyName: string;
	occupationName: string;
	yearsOfExperience: number;
	gender: GenderLabel;
	talkableTopics: string;
	careerDescription: string;
	jobDescription: string;
	joiningDescription: string;
	otherDescription: string;
	hiringType: HiringTypeLabel | "";
	workLocation: WorkLocation | undefined;
	imageUrl: string;
	meetingMethod: string;
};

export class EmployeeDetailDto {
	public readonly userId: string;
	public readonly name: string;
	public readonly companyName: string;
	public readonly occupationName: string;
	public readonly yearsOfExperience: number;
	public readonly gender: GenderLabel;
	public readonly talkableTopics: string;
	public readonly careerDescription: string;
	public readonly jobDescription: string;
	public readonly joiningDescription: string;
	public readonly otherDescription: string;
	public readonly hiringType: HiringTypeLabel | "";
	public readonly workLocation: WorkLocation | undefined;
	public readonly imageUrl: string;
	public readonly meetingMethod: string;

	constructor({
		employee,
		company,
		occupation,
		workLocation,
	}: {
		employee: Employee;
		company: Company;
		occupation: Occupation;
		workLocation: WorkLocation | undefined;
	}) {
		this.userId = employee.userId;
		this.name = employee.name;
		this.companyName = company.name;
		this.occupationName = occupation.name;
		this.yearsOfExperience = employee.toYearsOfExperience();
		this.gender = employee.toGenderLabel();
		this.talkableTopics = employee.talkableTopics ?? "";
		this.careerDescription = employee.careerDescription ?? "";
		this.jobDescription = employee.jobDescription ?? "";
		this.joiningDescription = employee.joiningDescription ?? "";
		this.otherDescription = employee.otherDescription ?? "";
		this.hiringType = employee.toHiringTypeLabel() ?? "";
		this.workLocation = workLocation;
		this.meetingMethod = employee.toMeetingMethodLabel() ?? "";
		this.imageUrl = employee.imageUrl ?? "";
	}

	// あえてわかりやすいように分割代入はしない
	toJson(): EmployeeDetailResponse {
		return {
			userId: this.userId,
			name: this.name,
			companyName: this.companyName,
			occupationName: this.occupationName,
			yearsOfExperience: this.yearsOfExperience,
			gender: this.gender,
			talkableTopics: this.talkableTopics,
			careerDescription: this.careerDescription,
			jobDescription: this.jobDescription,
			joiningDescription: this.joiningDescription,
			otherDescription: this.otherDescription,
			hiringType: this.hiringType,
			workLocation: this.workLocation,
			meetingMethod: this.meetingMethod,
			imageUrl: this.imageUrl,
		};
	}
}
