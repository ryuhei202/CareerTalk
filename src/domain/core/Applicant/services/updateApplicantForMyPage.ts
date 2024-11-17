import { prisma } from "@/lib/prisma";
import type { Applicant as PrismaApplicant } from "@prisma/client";
import type { Applicant } from "../Applicant";

export const updateApplicantForMyPage = async (
	applicant: Applicant,
): Promise<PrismaApplicant> => {
	// 現場社員更新（トランザクション内で実行）
	const updatedApplicant = await prisma.$transaction(async (tx) => {
		const result = await tx.applicant.update({
			where: {
				id: applicant.id,
			},
			data: {
				occupationId: applicant.occupationId,
				selfIntroduction: applicant.selfIntroduction,
				joiningDate: applicant.joiningDate,
				workHistory: applicant.workHistory,
				company: applicant.company,
				education: applicant.education,
			},
		});

		// ユーザー情報更新
		await tx.user.update({
			where: {
				id: applicant.userId,
			},
			data: {
				image: applicant.imageUrl,
			},
		});
		return result;
	});
	return updatedApplicant;
};
