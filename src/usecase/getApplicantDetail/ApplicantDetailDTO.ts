import type { Applicant } from "@/domain/core/Applicant/Applicant";
import type { GenderLabel } from "@/domain/shared/Gender";
import type { Occupation } from "@prisma/client";
import type { ApplicantDetailResponse } from "./getApplicantDetailUseCase";

export class ApplicantDetailDto {
	public readonly userId: string;
	public readonly name: string;
	public readonly occupation: Occupation;
	public readonly yearsOfExperience: number | undefined;
	public readonly gender: GenderLabel;
	public readonly selfIntroduction: string;
	public readonly joiningDate: Date | undefined;
	public readonly imageUrl: string;
	public readonly company: string;
	public readonly workHistory: string;
	public readonly education: string;
	public readonly age: number | undefined;
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
		this.joiningDate = applicant.joiningDate ?? undefined;
		this.imageUrl = applicant.imageUrl ?? "";
		this.company = applicant.company ?? "";
		this.workHistory = applicant.workHistory ?? "";
		this.education = applicant.education ?? "";
		this.age = applicant.getAge() ?? undefined;
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
			age: this.age,
			selfIntroduction: this.selfIntroduction,
			joiningDate: this.joiningDate,
			company: this.company,
			workHistory: this.workHistory,
			education: this.education,
		};
	}
}
