import type { Applicant } from "@/domain/core/Applicant/Applicant";
import type { Conversation } from "@/domain/core/Conversation/Conversation";
import type { ConversationStatusEnum } from "@/domain/core/Conversation/ConversationEnum";
import type { GenderLabel } from "@/domain/shared/Gender";
import type { Occupation } from "@prisma/client";
import type { LikedApplicantDetailResponse } from "./getLikedApplicantDetailUseCase";

export class LikedApplicantDetailDTO {
	public readonly userId: string;
	public readonly name: string;
	public readonly occupation: Occupation | undefined;
	public readonly gender: GenderLabel;
	public readonly imageUrl: string | undefined;
	public readonly age: number | undefined;
	public readonly selfIntroduction?: string;
	public readonly yearsOfExperience: number | undefined;
	public readonly joiningDate: Date | undefined;
	public readonly company: string | undefined;
	public readonly workHistory: string | undefined;
	public readonly education: string | undefined;
	public readonly likeReason: string;
	public readonly likeMessage?: string;
	public readonly conversationStatus: ConversationStatusEnum;
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
		this.occupation = occupation;
		this.gender = applicant.toGenderLabel();
		this.imageUrl = applicant.imageUrl;
		this.age = applicant.getAge();
		this.selfIntroduction = applicant.selfIntroduction;
		this.yearsOfExperience = applicant.toYearsOfExperience();
		this.joiningDate = applicant.joiningDate;
		this.company = applicant.company;
		this.workHistory = applicant.workHistory;
		this.education = applicant.education;
		this.likeReason = conversation.toPurposeLabel();
		this.likeMessage = conversation.getLatestMessageContent();
		this.conversationStatus = conversation.status;
	}

	toJson(): LikedApplicantDetailResponse {
		return {
			applicant: {
				userId: this.userId,
				name: this.name,
				occupation: this.occupation,
				gender: this.gender,
				imageUrl: this.imageUrl ?? "",
				age: this.age,
				selfIntroduction: this.selfIntroduction ?? "",
				yearsOfExperience: this.yearsOfExperience,
				joiningDate: this.joiningDate,
				company: this.company ?? "",
				workHistory: this.workHistory ?? "",
				education: this.education ?? "",
				conversationStatus: this.conversationStatus,
			},
			likeReason: this.likeReason,
			likeMessage: this.likeMessage,
		};
	}
}
