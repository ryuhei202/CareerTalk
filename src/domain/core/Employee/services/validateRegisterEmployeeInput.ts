import type { RegisterEmployeeParams } from "@/application/usecase/registerEmployee";
import { NamedError } from "@/util/error";
import { createId } from "@paralleldrive/cuid2";
import type { CompanyRepository } from "../../Company/repository/CompanyRepository";
import type { OccupationRepository } from "../../Occupation/repository/OccupationRepository";
import type { UserRepository } from "../../User/repository/UserRepository";
import type { WorkLocation } from "../../WorkLocation/WorkLocation";
import type { WorkLocationRepository } from "../../WorkLocation/repository/WorkLocationRepository";
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

export type ValidateRegisterEmployeeInputResult = EmployeeCommand;

export type ValidateRegisterEmployeeInput = (
	params: RegisterEmployeeParams,
) => Promise<ValidateRegisterEmployeeInputResult>;

export const buildValidateRegisterEmployeeInput =
	({
		userRepository,
		companyRepository,
		occupationRepository,
		workLocationRepository,
	}: {
		userRepository: UserRepository;
		companyRepository: CompanyRepository;
		occupationRepository: OccupationRepository;
		workLocationRepository: WorkLocationRepository;
	}): ValidateRegisterEmployeeInput =>
	async (params: RegisterEmployeeParams) => {
		// ユーザーが存在しない場合はエラー
		const { data: User } = await userRepository.findById(params.userId);
		if (User == null) {
			throw new InvalidRegisterEmployeeInputError("ユーザーが存在しません");
		}

		// 登録済み現場社員がすでに存在する場合はエラー
		if (User?.employee != null) {
			throw new InvalidRegisterEmployeeInputError(
				"登録済み現場社員がすでに存在します",
			);
		}

		// 登録ずみ転職希望者が既に存在する場合はエラー
		if (User?.jobSeeker != null) {
			throw new InvalidRegisterEmployeeInputError(
				"登録済み転職希望者がすでに存在します",
			);
		}

		// 企業コードから企業の存在確認
		const { data: company } = await companyRepository.findByCode(
			params.companyCode,
		);
		if (company == null) {
			throw new InvalidRegisterEmployeeInputError("不正な企業です");
		}

		// 職種の存在確認
		const { data: occupation } = await occupationRepository.findById(
			params.occupationId,
		);
		if (occupation == null) {
			throw new InvalidRegisterEmployeeInputError("不正な職種です");
		}

		// 勤務地の存在確認
		let workLocation: WorkLocation | undefined;
		console.log("params.workLocationId != null", params.workLocationId != null);

		if (params.workLocationId != null) {
			const workLocation = await workLocationRepository.findById(
				params.workLocationId,
			);
			if (workLocation == null) {
				throw new InvalidRegisterEmployeeInputError("不正な勤務地です");
			}
		}

		// 全ての条件を満たした場合はEmployeeCommandを返す。
		return {
			id: createId(),
			userId: params.userId,
			company: company,
			occupation: occupation,
			gender: params.gender as GenderEnum,
			birthday: params.birthday,
			joiningDate: params.joiningDate,
			status: StatusEnum.PENDING, // 初期値はPENDING
			workLocation: workLocation,
			hiringType: (params.hiringType as HiringTypeEnum) ?? undefined,
			meetingMethod: (params.meetingMethod as MeetingMethodEnum) ?? undefined,
			selfIntroduction: params.selfIntroduction ?? undefined,
			talkableTopics: params.talkableTopics ?? undefined,
		};
	};
