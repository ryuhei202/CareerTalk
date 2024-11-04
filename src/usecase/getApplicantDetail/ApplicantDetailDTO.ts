import type { Applicant } from "@/domain/core/Applicant/Applicant";
import type { GenderLabel } from "@/domain/shared/Gender";
import type { Occupation } from "@prisma/client";

export type ApplicantDetailResponse = {
	userId: string;
	name: string;
	occupation: Occupation;
	yearsOfExperience: number;
	gender: GenderLabel;
	imageUrl: string;
	selfIntroduction: string;
};

export class ApplicantDetailDto {
	public readonly userId: string;
	public readonly name: string;
	public readonly occupation: Occupation;
	public readonly yearsOfExperience: number;
	public readonly gender: GenderLabel;
	public readonly selfIntroduction: string;
	public readonly imageUrl: string;

	constructor({
		applicant,
		occupation,
	}: {
		applicant: Applicant;
		occupation: Occupation;
	}) {
		this.userId = applicant.userId;
		this.name = applicant.name;
		this.occupation = occupation;
		this.yearsOfExperience = applicant.toYearsOfExperience();
		this.gender = applicant.toGenderLabel();
		this.selfIntroduction = applicant.selfIntroduction ?? "";
		this.imageUrl = applicant.imageUrl ?? "";
	}

	// あえてわかりやすいように分割代入はしない
	toJson(): ApplicantDetailResponse {
		return {
			userId: this.userId,
			name: this.name,
			occupation: this.occupation,
			yearsOfExperience: this.yearsOfExperience,
			gender: this.gender,
			imageUrl: this.imageUrl,
			selfIntroduction: this.selfIntroduction,
		};
	}
}
