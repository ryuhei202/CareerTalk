import type { RegisterEmployeeParams } from "@/app/(site)/employee/create_profile/_actions/registerEmployeeAction";
import type { GenderEnum } from "@/domain/shared/Gender";
import type { HiringTypeEnum } from "@/domain/shared/HiringType";
import type { MeetingMethodEnum } from "@/domain/shared/MeetingMethod";
import { StatusEnum } from "@/domain/shared/Status";
import { createId } from "@/lib/cuid";
import { prisma } from "@/lib/prisma";
import { NamedError } from "@/util/error";
import { Employee } from "../Employee";

export class InvalidRegisterEmployeeInputError extends NamedError {
	readonly name = "InvalidRegisterEmployeeInputError";
}

export const validateRegisterEmployeeInput = async (
	params: RegisterEmployeeParams,
): Promise<Employee> => {
	// 全てのクエリを並列実行
	const [user, company, occupation, workLocation, employeeImage] =
		await Promise.all([
			prisma.user.findUnique({
				where: { id: params.userId },
				include: { employee: true, applicant: true },
			}),
			prisma.company.findUnique({
				where: { code: params.companyCode },
			}),
			prisma.occupation.findUnique({
				where: { id: params.occupationId },
			}),
			params.workLocationId
				? prisma.workLocation.findUnique({
						where: { id: params.workLocationId },
					})
				: Promise.resolve(null),
			prisma.employeeImage.findUnique({
				where: { id: params.imageId },
			}),
		]);

	// バリデーションチェック
	if (!user) {
		throw new InvalidRegisterEmployeeInputError(
			"ユーザーが見つかりません。再度ホームからログインしてください。",
		);
	}
	if (user.employee) {
		throw new InvalidRegisterEmployeeInputError(
			"このアカウントは既に現場社員として登録済みです。",
		);
	}
	if (user.applicant) {
		throw new InvalidRegisterEmployeeInputError(
			"このアカウントは既に転職希望者として登録済みです。",
		);
	}
	if (!company) {
		throw new InvalidRegisterEmployeeInputError("企業コードが不正です");
	}
	if (!occupation) {
		throw new InvalidRegisterEmployeeInputError("不正な職種です");
	}
	if (params.workLocationId && !workLocation) {
		throw new InvalidRegisterEmployeeInputError("不正な勤務地です");
	}
	if (!employeeImage) {
		throw new InvalidRegisterEmployeeInputError("不正な画像です");
	}

	const imageUrl = employeeImage.url;

	// Employeeインスタンスの作成
	return Employee.create({
		id: createId(),
		name: params.name,
		userId: params.userId,
		companyId: company.id,
		occupationId: occupation.id,
		gender: params.gender as GenderEnum,
		joiningDate: params.joiningDate,
		status: StatusEnum.PENDING,
		imageUrl: imageUrl,
		workLocationId: params.workLocationId ?? undefined,
		hiringType: (params.hiringType as HiringTypeEnum) ?? undefined,
		meetingMethod: (params.meetingMethod as MeetingMethodEnum) ?? undefined,
		selfIntroduction: params.selfIntroduction ?? undefined,
		talkableTopics: params.talkableTopics ?? undefined,
	});
};
