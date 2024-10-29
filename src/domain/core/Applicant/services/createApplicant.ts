import { prisma } from "@/lib/prisma";
import { ApplicantDTO } from "@/usecase/dto/Applicant/ApplicantDTO";
import type { Applicant } from "../Applicant";

export const createApplicant = async (
	applicant: Applicant,
): Promise<ApplicantDTO> => {
	// 現場社員登録（トランザクション内で実行）
	await prisma.$transaction(async (tx) => {
		await tx.applicant.create({
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
	});

	return new ApplicantDTO(applicant);
};
