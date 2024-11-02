import type { Employee } from "@/domain/core/Employee/Employee";
import type { GenderLabel } from "@/domain/shared/Gender";
import type { HiringTypeLabel } from "@/domain/shared/HiringType";
import type { Company, Occupation, WorkLocation } from "@prisma/client";
import type { EmployeeDetailResponse } from "./getEmployeeDetailUseCase";

export class EmployeeDetailDTO {
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
	public readonly workLocationName: string;
	public readonly imageUrl: string;

	constructor({
		employee,
		company,
		occupation,
		workLocation,
	}: {
		employee: Employee;
		company: Company;
		occupation: Occupation;
		workLocation?: WorkLocation;
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
		this.workLocationName = workLocation?.name ?? "";
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
			workLocationName: this.workLocationName,
			imageUrl: this.imageUrl,
		};
	}
}
