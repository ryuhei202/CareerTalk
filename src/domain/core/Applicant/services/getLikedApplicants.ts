import type { GenderEnum } from "@/domain/shared/Gender";
import type { StatusEnum } from "@/domain/shared/Status";
import { prisma } from "@/lib/prisma";
import { LikedApplicantDTO } from "@/usecase/dto/Applicant/LikedApplicantDTO";
import type {
	GetLikedApplicantsUseCaseParams,
	LikedApplicantResponse,
} from "@/usecase/getLikedApplicants";
import { ConversationStatusEnum } from "../../Conversation/ConversationStatus";
import { Applicant } from "../Applicant";

export const getLikedApplicants = async (
	params: GetLikedApplicantsUseCaseParams,
): Promise<LikedApplicantResponse> => {
	const page = params.page ?? 1;
	const limit = 10;
	const offset = (page - 1) * limit;

	const whereCondition = {
		employeeUserId: params.employeeUserId,
		status: ConversationStatusEnum.PENDING,
	};

	const [totalCount, conversations] = await Promise.all([
		prisma.conversation.count({
			where: whereCondition,
		}),
		prisma.conversation.findMany({
			where: whereCondition,
			include: {
				applicant: {
					include: {
						user: true,
						occupation: true,
					},
				},
			},
			skip: offset,
			take: limit,
		}),
	]);

	const result = conversations.map((conversation) => {
		const applicantEntity = Applicant.create({
			id: conversation.applicant.id,
			userId: conversation.applicant.userId,
			name: conversation.applicant.user.name,
			occupationId: conversation.applicant.occupationId,
			gender: conversation.applicant.gender as GenderEnum,
			joiningDate: conversation.applicant.joiningDate,
			status: conversation.applicant.status as StatusEnum,
			imageUrl: conversation.applicant.user.image ?? undefined,
			birthday: conversation.applicant.birthday ?? undefined,
			selfIntroduction: conversation.applicant.selfIntroduction ?? undefined,
		});

		return new LikedApplicantDTO({
			applicant: applicantEntity,
			occupation: conversation.applicant.occupation,
		}).toJson();
	});

	console.log("result", result);

	return {
		totalCount,
		applicants: result,
	};
};