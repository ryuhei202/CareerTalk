import type { GenderEnum } from "@/domain/shared/Gender";
import { StatusEnum } from "@/domain/shared/Status";
import { createId } from "@/lib/cuid";
import { prisma } from "@/lib/prisma";
import type { RegisterApplicantParams } from "@/usecase/registerApplicant";
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
	const user = await prisma.user.findUnique({
		where: {
			id: params.userId,
		},
		include: {
			employee: true,
			applicant: true,
		},
	});

	// ユーザーが存在しない場合はエラー
	if (user == null) {
		throw new InvalidRegisterApplicantInputError("ユーザーが存在しません");
	}

	// 登録済み現場社員がすでに存在する場合はエラー
	if (user?.employee != null) {
		throw new InvalidRegisterApplicantInputError(
			"登録済み現場社員がすでに存在します",
		);
	}

	// 登録ずみ転職希望者が既に存在する場合はエラー
	if (user?.applicant != null) {
		throw new InvalidRegisterApplicantInputError(
			"登録済み転職希望者がすでに存在します",
		);
	}

	// 職種の存在確認
	const occupation = await prisma.occupation.findUnique({
		where: {
			id: params.occupationId,
		},
	});
	if (occupation == null) {
		throw new InvalidRegisterApplicantInputError("不正な職種です");
	}

	// 全ての条件を満たした場合はApplicantインスタンスを返す。
	const applicant = Applicant.create({
		id: createId(),
		name: params.name,
		userId: params.userId,
		occupationId: occupation.id,
		gender: params.gender as GenderEnum,
		birthday: params.birthday,
		joiningDate: params.joiningDate,
		status: StatusEnum.PENDING, // 初期値はPENDING
		imageUrl: params.imageUrl ?? undefined,
		selfIntroduction: params.selfIntroduction ?? undefined,
	});
	return applicant;
};
