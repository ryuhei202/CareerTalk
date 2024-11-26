import type { Employee } from "@/domain/core/Employee/Employee";
import type { GenderLabel } from "@/domain/shared/Gender";
import type { HiringTypeLabel } from "@/domain/shared/HiringType";
import type { MeetingMethodLabel } from "@/domain/shared/MeetingMethod";
import type { Company, Occupation, WorkLocation } from "@prisma/client";
import type { FilteredEmployee } from "./getFilteredEmployeesUseCase";

export class FilteredEmployeeDTO {
	public readonly name: string;
	public readonly userId: string;
	public readonly company: Company;
	public readonly occupation: Occupation;
	public readonly gender: GenderLabel;
	public readonly yearsOfExperience: number;
	public readonly age?: number;
	public readonly imageUrl?: string;
	public readonly workLocation?: WorkLocation;
	public readonly hiringType?: HiringTypeLabel;
	public readonly meetingMethod?: MeetingMethodLabel;
	public readonly talkableTopics?: string;
	public readonly barkerMessage?: string;

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
		this.name = employee.name;
		this.userId = employee.userId;
		this.company = company;
		this.occupation = occupation;
		this.gender = employee.toGenderLabel();
		this.yearsOfExperience = employee.toYearsOfExperience();
		this.age = employee.getAge();
		this.imageUrl = employee.imageUrl;
		this.workLocation = workLocation;
		this.hiringType = employee.toHiringTypeLabel();
		this.meetingMethod = employee.toMeetingMethodLabel();
		this.talkableTopics = employee.talkableTopics;
		this.barkerMessage = employee.barkerMessage;
	}

	toJson(): FilteredEmployee {
		return {
			userId: this.userId,
			name: this.name,
			company: this.company,
			occupation: this.occupation,
			gender: this.gender,
			yearsOfExperience: this.yearsOfExperience,
			age: this.age,
			imageUrl: this.imageUrl,
			workLocation: this.workLocation,
			hiringType: this.hiringType,
			meetingMethod: this.meetingMethod,
			talkableTopics: this.talkableTopics,
			bakerMessage: this.barkerMessage,
		};
	}
}
