import type { Applicant } from "@/domain/core/Applicant/Applicant";
import type { Conversation } from "@/domain/core/Conversation/Conversation";
import type { GenderLabel } from "@/domain/shared/Gender";
import type { Occupation } from "@prisma/client";
import type { ApplicantDetailResponse } from "./getLikedApplicantDetailUseCase";

export class LikedApplicantDetailDTO {
	public readonly userId: string;
	public readonly name: string;
	public readonly gender: GenderLabel;
	public readonly age?: number;
	public readonly yearsOfExperience: number;
	public readonly occupationName: string;
	public readonly likeReason: string;
	public readonly selfIntroduction?: string;
	public readonly imageUrl?: string;
	public readonly likeMessage?: string;

	constructor({
		applicant,
		occupation,
		conversation,
	}: {
		applicant: Applicant;
		occupation: Occupation;
		conversation: Conversation;
	}) {
		this.userId = applicant.userId;
		this.name = applicant.name;
		this.gender = applicant.toGenderLabel();
		this.age = applicant.getAge();
		this.yearsOfExperience = applicant.toYearsOfExperience();
		this.occupationName = occupation.name;
		this.selfIntroduction = applicant.selfIntroduction;
		this.imageUrl = applicant.imageUrl;
		this.likeReason = conversation.toPurposeLabel();
		this.likeMessage = conversation.getLatestMessage()?.content;
	}

	toJson(): ApplicantDetailResponse {
		return {
			applicant: {
				userId: this.userId,
				name: this.name,
				gender: this.gender,
				age: this.age,
				yearsOfExperience: this.yearsOfExperience,
				occupationName: this.occupationName,
				selfIntroduction: this.selfIntroduction,
				imageUrl: this.imageUrl,
			},
			likeReason: this.likeReason,
			likeMessage: this.likeMessage,
		};
	}
}
