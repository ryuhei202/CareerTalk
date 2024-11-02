import { prisma } from "@/lib/prisma";
import type { Applicant as PrismaApplicant } from "@prisma/client";
import type { Applicant } from "../Applicant";

export const createApplicant = async (
	applicant: Applicant,
): Promise<PrismaApplicant> => {
	// 現場社員登録（トランザクション内で実行）
	const createdApplicant = await prisma.$transaction(async (tx) => {
		const createdApplicant = await tx.applicant.create({
			data: {
				id: applicant.id,
				userId: applicant.userId,
				occupationId: applicant.occupationId,
				gender: applicant.gender,
				joiningDate: applicant.joiningDate,
				status: applicant.status,
				selfIntroduction: applicant.selfIntroduction,
				birthday: applicant.birthday,
			},
		});

		// ユーザー情報更新
		await tx.user.update({
			where: {
				id: applicant.userId,
			},
			data: {
				name: applicant.name,
				image: applicant.imageUrl,
			},
		});

		return createdApplicant;
	});

	return createdApplicant;
};
