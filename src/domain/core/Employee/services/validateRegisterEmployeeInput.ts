import type { RegisterEmployeeParams } from "@/application/usecase/registerEmployee";
import { createId } from "@/lib/cuid";
import { prisma } from "@/lib/prisma";
import { NamedError } from "@/util/error";
import type { WorkLocation } from "@prisma/client";
import {
	type EmployeeParams,
	type GenderEnum,
	type HiringTypeEnum,
	type MeetingMethodEnum,
	StatusEnum,
} from "../Employee";

export type EmployeeCommand = EmployeeParams;

export class InvalidRegisterEmployeeInputError extends NamedError {
	readonly name = "InvalidRegisterEmployeeInputError";
}

export type ValidateRegisterEmployeeInput = (
	params: RegisterEmployeeParams,
) => Promise<EmployeeCommand>;

export const validateRegisterEmployeeInput = async (
	params: RegisterEmployeeParams,
): Promise<EmployeeCommand> => {
	// ユーザーが存在しない場合はエラー
	const user = await prisma.user.findUnique({
		where: {
			id: params.userId,
		},
		include: {
			employee: true,
			jobSeeker: true,
		},
	});

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
	if (user?.jobSeeker != null) {
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
	let workLocation: WorkLocation | undefined;
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

	// 全ての条件を満たした場合はEmployeeCommandを返す。
	return {
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
		workLocationId: workLocation?.id ?? undefined,
		hiringType: (params.hiringType as HiringTypeEnum) ?? undefined,
		meetingMethod: (params.meetingMethod as MeetingMethodEnum) ?? undefined,
		selfIntroduction: params.selfIntroduction ?? undefined,
		talkableTopics: params.talkableTopics ?? undefined,
	};
};
