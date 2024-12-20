import type { UpdateApplicantForMyPageParams } from "@/app/(site)/applicant/my_page/edit/_actions/updateEmployeeForMyPageAction";
import type { GenderEnum } from "@/domain/shared/Gender";
import { StatusEnum } from "@/domain/shared/Status";
import { prisma } from "@/lib/prisma";
import { NamedError } from "@/util/error";
import { Applicant } from "../Applicant";

export class InvalidUpdateApplicantForMyPageInputError extends NamedError {
	readonly name = "InvalidUpdateApplicantForMyPageInputError";
}

export const validateUpdateApplicantForMyPageInput = async (
	params: UpdateApplicantForMyPageParams,
): Promise<Applicant> => {
	// 全てのクエリを並列実行
	const [applicant, occupation] = await Promise.all([
		prisma.applicant.findUnique({
			where: { userId: params.userId },
			include: {
				user: true,
			},
		}),
		prisma.occupation.findUnique({
			where: { id: params.occupationId },
		}),
	]);
	if (!applicant) {
		throw new InvalidUpdateApplicantForMyPageInputError("不正なユーザーIDです");
	}
	if (!occupation) {
		throw new InvalidUpdateApplicantForMyPageInputError("不正な職種です");
	}

	const applicantEntity = Applicant.create({
		id: applicant.id,
		name: applicant.user.name,
		userId: applicant.userId,
		occupationId: occupation.id,
		gender: applicant.gender as GenderEnum,
		birthday: applicant.birthday ?? undefined, // nullからundefinedに変更
		joiningDate: applicant.joiningDate ?? undefined,
		status: StatusEnum.PENDING,
		imageUrl: applicant.user.image ?? undefined,
		selfIntroduction: applicant.selfIntroduction ?? undefined,
		workHistory: applicant.workHistory ?? undefined,
		company: applicant.company ?? undefined,
		education: applicant.education ?? undefined,
	});

	applicantEntity.changeOccupationId(params.occupationId);
	if (params.selfIntroduction)
		applicantEntity.changeSelfIntroduction(params.selfIntroduction);
	if (params.joiningDate) applicantEntity.changeJoiningDate(params.joiningDate);
	if (params.workHistory) applicantEntity.changeWorkHistory(params.workHistory);
	if (params.company) applicantEntity.changeCompany(params.company);
	if (params.education) applicantEntity.changeEducation(params.education);

	return applicantEntity;
};
