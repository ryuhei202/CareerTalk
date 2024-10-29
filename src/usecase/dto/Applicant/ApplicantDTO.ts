import type { CreatedApplicantResponse } from "@/app/(site)/applicant/create_profile/_actions/registerApplicantAction";
import type { Applicant } from "@/domain/core/Applicant/Applicant";
import type { GenderLabel } from "@/domain/shared/Gender";
import type { StatusLabel } from "@/domain/shared/Status";

export class ApplicantDTO {
	public readonly id: string;
	public readonly name: string;
	public readonly userId: string;
	public readonly occupationId: number;
	public readonly gender: GenderLabel;
	public readonly yearsOfExperience: number;
	public readonly status: StatusLabel;
	public readonly age?: number;
	public readonly imageUrl?: string;
	public readonly selfIntroduction?: string;

	constructor(applicant: Applicant) {
		this.id = applicant.id;
		this.name = applicant.name;
		this.userId = applicant.userId;
		this.occupationId = applicant.occupationId;
		this.gender = applicant.toGenderLabel();
		this.yearsOfExperience = applicant.toYearsOfExperience();
		this.status = applicant.toStatusLabel();
		this.age = applicant.getAge();
		this.imageUrl = applicant.imageUrl;
		this.selfIntroduction = applicant.selfIntroduction;
	}

	toJson(): CreatedApplicantResponse {
		return {
			id: this.id,
			name: this.name,
			userId: this.userId,
			occupationId: this.occupationId,
			gender: this.gender,
			yearsOfExperience: this.yearsOfExperience,
			status: this.status,
			age: this.age,
			imageUrl: this.imageUrl,
			selfIntroduction: this.selfIntroduction,
		};
	}
}
