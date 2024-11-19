import type { Applicant } from "@/domain/core/Applicant/Applicant";
import type { GenderLabel } from "@/domain/shared/Gender";
import type { LikedApplicant } from "@/usecase/getLikedApplicants/getLikedApplicantsUseCase";
import type { Occupation } from "@prisma/client";

export class LikedApplicantDTO {
	public readonly userId: string;
	public readonly name: string;
	public readonly gender: GenderLabel;
	public readonly age?: number;
	public readonly yearsOfExperience: number | undefined;
	public readonly occupationName: string;
	public readonly selfIntroduction?: string;
	public readonly imageUrl?: string;
	public readonly company?: string;
	public readonly workHistory?: string;
	public readonly education?: string;

	constructor({
		applicant,
		occupation,
	}: {
		applicant: Applicant;
		occupation: Occupation;
	}) {
		this.userId = applicant.userId;
		this.name = applicant.name;
		this.gender = applicant.toGenderLabel();
		this.age = applicant.getAge();
		this.yearsOfExperience = applicant.toYearsOfExperience() ?? undefined;
		this.occupationName = occupation.name;
		this.selfIntroduction = applicant.selfIntroduction;
		this.imageUrl = applicant.imageUrl;
		this.company = applicant.company;
		this.workHistory = applicant.workHistory;
		this.education = applicant.education;
	}

	toJson(): LikedApplicant {
		return {
			userId: this.userId,
			name: this.name,
			gender: this.gender,
			age: this.age,
			yearsOfExperience: this.yearsOfExperience,
			occupationName: this.occupationName,
			selfIntroduction: this.selfIntroduction,
			imageUrl: this.imageUrl,
			company: this.company,
			workHistory: this.workHistory,
			education: this.education,
		};
	}
}
