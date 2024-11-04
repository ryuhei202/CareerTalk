import type { GenderEnum } from "@/domain/shared/Gender";
import type { StatusEnum } from "@/domain/shared/Status";
import { prisma } from "@/lib/prisma";
import { ApplicantDetailDto } from "@/usecase/getApplicantDetail/ApplicantDetailDTO";
import type { ApplicantDetailResponse } from "@/usecase/getApplicantDetail/getApplicantDetailUseCase";
import type { GetApplicantDetailParams } from "@/usecase/getApplicantDetail/validateGetApplicantDetailUseCaseParams";

import { NamedError } from "@/util/error";
import { Applicant } from "../Applicant";

export class GetApplicantDetailError extends NamedError {
	readonly name = "GetApplicantDetailError";
}

export const getApplicantDetail = async (
	params: GetApplicantDetailParams,
): Promise<ApplicantDetailResponse> => {
	const applicantUserId = params.applicantUserId;

	const applicant = await prisma.applicant.findUnique({
		where: {
			userId: applicantUserId,
		},
		include: {
			user: true,
			occupation: true,
		},
	});

	if (!applicant) {
		throw new GetApplicantDetailError("選択した現場社員が見つかりません");
	}

	const applicantEntity = Applicant.create({
		id: applicant.id,
		name: applicant.user.name,
		userId: applicant.userId,
		occupationId: applicant.occupationId,
		gender: applicant.gender as GenderEnum,
		joiningDate: applicant.joiningDate,
		status: applicant.status as StatusEnum,
		imageUrl: applicant.user.image ?? undefined,
		birthday: applicant.birthday ?? undefined,
		selfIntroduction: applicant.selfIntroduction ?? undefined,
	});

	return new ApplicantDetailDto({
		applicant: applicantEntity,
		occupation: applicant.occupation,
	}).toJson();
};
