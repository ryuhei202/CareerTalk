import type { GetLikedApplicantDetailParams } from "@/app/(site)/employee/detail/[applicantUserId]/page";
import type { GenderEnum } from "@/domain/shared/Gender";
import type { StatusEnum } from "@/domain/shared/Status";
import { prisma } from "@/lib/prisma";
import { LikedApplicantDetailDTO } from "@/usecase/dto/Applicant/LIkedApplicantDetailDOT";
import type { ApplicantDetailResponse } from "@/usecase/getLikedApplicantDetail";
import { NamedError } from "@/util/error";
import { Conversation } from "../../Conversation/Conversation";
import {
	type ConversationPurposeEnum,
	ConversationStatusEnum,
} from "../../Conversation/ConversationEnum";
import { Message } from "../../Conversation/Message/Message";
import { Applicant } from "../Applicant";

export class GetLikedApplicantDetailError extends NamedError {
	readonly name = "GetLikedApplicantDetailError";
}

export const getLikedApplicantDetail = async (
	params: GetLikedApplicantDetailParams,
): Promise<ApplicantDetailResponse> => {
	const applicantUserId = params.applicantUserId;
	const employeeUserId = params.employeeUserId;

	const [applicant, conversation] = await Promise.all([
		prisma.applicant.findUnique({
			where: {
				userId: applicantUserId,
			},
			include: {
				user: true,
				occupation: true,
			},
		}),
		prisma.conversation.findFirst({
			where: {
				applicantUserId,
				employeeUserId,
				status: ConversationStatusEnum.PENDING,
			},
			include: {
				messages: true,
			},
		}),
	]);

	if (applicant == null) {
		throw new GetLikedApplicantDetailError("転職希望者が見つかりません。");
	}

	if (conversation == null) {
		throw new GetLikedApplicantDetailError(
			"このユーザーからはいいねをもらっていません。",
		);
	}

	const applicantEntity = Applicant.create({
		id: applicant.id,
		userId: applicant.userId,
		name: applicant.user.name,
		occupationId: applicant.occupationId,
		gender: applicant.gender as GenderEnum,
		joiningDate: applicant.joiningDate,
		status: applicant.status as StatusEnum,
		imageUrl: applicant.user.image ?? undefined,
		birthday: applicant.birthday ?? undefined,
		selfIntroduction: applicant.selfIntroduction ?? undefined,
	});

	const firstMessageEntity = Message.create({
		id: conversation.messages[0].id,
		conversationId: conversation.id,
		senderId: conversation.messages[0].senderId,
		content: conversation.messages[0].content,
		isRead: conversation.messages[0].isRead,
	});

	const conversationEntity = Conversation.create({
		id: conversation.id,
		applicantUserId: conversation.applicantUserId,
		employeeUserId: conversation.employeeUserId,
		purpose: conversation.purpose as ConversationPurposeEnum,
		status: conversation.status as ConversationStatusEnum,
		messages: [firstMessageEntity],
	});

	return new LikedApplicantDetailDTO({
		applicant: applicantEntity,
		occupation: applicant.occupation,
		conversation: conversationEntity,
	}).toJson();
};
