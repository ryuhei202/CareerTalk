import type { CreatedEmployeeResponse } from "@/app/(site)/employee/create_profile/_actions/registerEmployeeAction";
import type { Employee } from "@/domain/core/Employee/Employee";
import type { GenderLabel } from "@/domain/shared/Gender";
import type { HiringTypeLabel } from "@/domain/shared/HiringType";
import type { MeetingMethodLabel } from "@/domain/shared/MeetingMethod";
import type { StatusLabel } from "@/domain/shared/Status";

export class EmployeeDTO {
	public readonly id: string;
	public readonly name: string;
	public readonly userId: string;
	public readonly companyId: number;
	public readonly occupationId: number;
	public readonly gender: GenderLabel;
	public readonly yearsOfExperience: number;
	public readonly status: StatusLabel;
	public readonly age?: number;
	public readonly imageUrl?: string;
	public readonly workLocationId?: number;
	public readonly hiringType?: HiringTypeLabel;
	public readonly meetingMethod?: MeetingMethodLabel;
	public readonly selfIntroduction?: string;
	public readonly talkableTopics?: string;

	constructor(employee: Employee) {
		this.id = employee.id;
		this.name = employee.name;
		this.userId = employee.userId;
		this.companyId = employee.companyId;
		this.occupationId = employee.occupationId;
		this.gender = employee.toGenderLabel();
		this.yearsOfExperience = employee.toYearsOfExperience();
		this.status = employee.toStatusLabel();
		this.age = employee.getAge();
		this.imageUrl = employee.imageUrl;
		this.workLocationId = employee.workLocationId;
		this.hiringType = employee.toHiringTypeLabel();
		this.meetingMethod = employee.toMeetingMethodLabel();
		this.selfIntroduction = employee.selfIntroduction;
		this.talkableTopics = employee.talkableTopics;
	}

	toJson(): CreatedEmployeeResponse {
		return {
			id: this.id,
			name: this.name,
			userId: this.userId,
			companyId: this.companyId,
			occupationId: this.occupationId,
			gender: this.gender,
			yearsOfExperience: this.yearsOfExperience,
			status: this.status,
			age: this.age,
			imageUrl: this.imageUrl,
			workLocationId: this.workLocationId,
			hiringType: this.hiringType,
			meetingMethod: this.meetingMethod,
			selfIntroduction: this.selfIntroduction,
			talkableTopics: this.talkableTopics,
		};
	}
}
