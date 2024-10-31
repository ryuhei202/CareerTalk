import type { RegisterApplicantParams } from "@/app/(site)/applicant/create_profile/_actions/registerApplicantAction";
import type { GenderEnum } from "@/domain/shared/Gender";
import { StatusEnum } from "@/domain/shared/Status";
import { createId } from "@/lib/cuid";
import { prisma } from "@/lib/prisma";
import { NamedError } from "@/util/error";
import { Applicant } from "../Applicant";

export class InvalidRegisterApplicantInputError extends NamedError {
	readonly name = "InvalidRegisterApplicantInputError";
}

export type ValidateRegisterApplicantInput = (
	params: RegisterApplicantParams,
) => Promise<Applicant>;

export const validateRegisterApplicantInput = async (
	params: RegisterApplicantParams,
): Promise<Applicant> => {
	// 全てのクエリを並列実行
	const [user, occupation] = await Promise.all([
		prisma.user.findUnique({
			where: { id: params.userId },
			include: { employee: true, applicant: true },
		}),
		prisma.occupation.findUnique({
			where: { id: params.occupationId },
		}),
	]);

	// バリデーションチェック
	if (!user) {
		throw new InvalidRegisterApplicantInputError(
			"ユーザーが存在しません。再度ホームからログインしてください。",
		);
	}
	if (user.employee) {
		throw new InvalidRegisterApplicantInputError(
			"このアカウントは既に現場社員として登録済みです。",
		);
	}
	if (user.applicant) {
		throw new InvalidRegisterApplicantInputError(
			"このアカウントは既に転職希望者として登録済みです。",
		);
	}
	if (!occupation) {
		throw new InvalidRegisterApplicantInputError("不正な職種です");
	}

	// Applicantインスタンスの作成
	return Applicant.create({
		id: createId(),
		name: params.name,
		userId: params.userId,
		occupationId: occupation.id,
		gender: params.gender as GenderEnum,
		birthday: params.birthday,
		joiningDate: params.joiningDate,
		status: StatusEnum.PENDING,
		imageUrl: params.imageUrl ?? undefined,
		selfIntroduction: params.selfIntroduction ?? undefined,
	});
};
