import type { GenderEnum } from "@/domain/shared/Gender";
import type { HiringTypeEnum } from "@/domain/shared/HiringType";
import type { MeetingMethodEnum } from "@/domain/shared/MeetingMethod";
import { StatusEnum } from "@/domain/shared/Status";
import { createId } from "@/lib/cuid";
import { prisma } from "@/lib/prisma";
import type { RegisterEmployeeParams } from "@/usecase/registerEmployee";
import { NamedError } from "@/util/error";
import { Employee } from "../Employee";

export class InvalidRegisterEmployeeInputError extends NamedError {
	readonly name = "InvalidRegisterEmployeeInputError";
}

export type ValidateRegisterEmployeeInput = (
	params: RegisterEmployeeParams,
) => Promise<Employee>;

export const validateRegisterEmployeeInput = async (
	params: RegisterEmployeeParams,
): Promise<Employee> => {
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
		throw new InvalidRegisterEmployeeInputError("ユーザーが存在しません");
	}

	// 登録済み現場社員がすでに存在する場合はエラー
	if (user?.employee != null) {
		throw new InvalidRegisterEmployeeInputError(
			"登録済み現場社員がすでに存在します",
		);
	}

	// 登録ずみ転職希望者が既に存在する場合はエラー
	if (user?.applicant != null) {
		throw new InvalidRegisterEmployeeInputError(
			"登録済み転職希望者がすでに存在します",
		);
	}

	// 企業コードから企業の存在確認
	const company = await prisma.company.findUnique({
		where: {
			code: params.companyCode,
		},
	});
	if (company == null) {
		throw new InvalidRegisterEmployeeInputError("不正な企業です");
	}

	// 職種の存在確認
	const occupation = await prisma.occupation.findUnique({
		where: {
			id: params.occupationId,
		},
	});
	if (occupation == null) {
		throw new InvalidRegisterEmployeeInputError("不正な職種です");
	}

	// 勤務地の存在確認
	if (params.workLocationId != null) {
		const workLocation = await prisma.workLocation.findUnique({
			where: {
				id: params.workLocationId,
			},
		});
		if (workLocation == null) {
			throw new InvalidRegisterEmployeeInputError("不正な勤務地です");
		}
	}

	// 全ての条件を満たした場合はEmployeeインスタンスを返す。
	const employee = Employee.create({
		id: createId(),
		name: params.name,
		userId: params.userId,
		companyId: company.id,
		occupationId: occupation.id,
		gender: params.gender as GenderEnum,
		birthday: params.birthday,
		joiningDate: params.joiningDate,
		status: StatusEnum.PENDING, // 初期値はPENDING
		imageUrl: params.imageUrl ?? undefined,
		workLocationId: params.workLocationId ?? undefined,
		hiringType: (params.hiringType as HiringTypeEnum) ?? undefined,
		meetingMethod: (params.meetingMethod as MeetingMethodEnum) ?? undefined,
		selfIntroduction: params.selfIntroduction ?? undefined,
		talkableTopics: params.talkableTopics ?? undefined,
	});
	return employee;
};
