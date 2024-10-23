import type { CreatedEmployeeResponse } from "@/app/(site)/employee/create_profile/_actions/registerEmployeeAction";
import type {
	Employee,
	GenderLabel,
	HiringTypeLabel,
	MeetingMethodLabel,
	StatusLabel,
} from "@/domain/core/Employee/Employee";

export class EmployeeDTO {
	public readonly id: string;
	public readonly userId: string;
	public readonly company: {
		id: number;
		name: string;
	};
	public readonly occupation: {
		id: number;
		name: string;
	};
	public readonly gender: GenderLabel;
	public readonly yearsOfExperience: number;
	public readonly status: StatusLabel;
	public readonly age?: number;
	public readonly workLocation?: {
		id: number;
		name: string;
	};
	public readonly hiringType?: HiringTypeLabel;
	public readonly meetingMethod?: MeetingMethodLabel;
	public readonly selfIntroduction?: string;
	public readonly talkableTopics?: string;

	constructor(employee: Employee) {
		this.id = employee.id;
		this.userId = employee.userId;
		this.company = employee.company;
		this.occupation = employee.occupation;
		this.gender = employee.toGenderLabel();
		this.yearsOfExperience = employee.toYearsOfExperience();
		this.status = employee.toStatusLabel();
		this.age = employee.getAge();
		this.workLocation = employee.workLocation;
		this.hiringType = employee.toHiringTypeLabel();
		this.meetingMethod = employee.toMeetingMethodLabel();
		this.selfIntroduction = employee.selfIntroduction;
		this.talkableTopics = employee.talkableTopics;
	}

	toJson(): CreatedEmployeeResponse {
		return {
			id: this.id,
			userId: this.userId,
			company: {
				id: this.company.id,
				name: this.company.name,
			},
			occupation: {
				id: this.occupation.id,
				name: this.occupation.name,
			},
			gender: this.gender,
			yearsOfExperience: this.yearsOfExperience,
			status: this.status,
			age: this.age,
			workLocation: this.workLocation,
			hiringType: this.hiringType,
			meetingMethod: this.meetingMethod,
			selfIntroduction: this.selfIntroduction,
			talkableTopics: this.talkableTopics,
		};
	}
}
