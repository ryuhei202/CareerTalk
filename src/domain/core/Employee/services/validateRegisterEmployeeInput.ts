import { RegisterEmployeeParams } from "@/application/usecase/registerEmployee";
import { EmployeeParams, GenderEnum, HiringTypeEnum, MeetingMethodEnum, StatusEnum } from "../Employee";
import { UserRepository } from "../../User/UserRepository";
import { CompanyRepository } from "../../Company/repository/CompanyRepository";
import { OccupationRepository } from "../../Occupation/OccupationRepository";
import { WorkLocationRepository } from "../../WorkLocation/WorkLocationRepository";
import { createId } from "@paralleldrive/cuid2";
import { NamedError } from "@/util/error";

export type EmployeeCommand = EmployeeParams

export class InvalidRegisterEmployeeInputError extends NamedError {
  readonly name = 'InvalidRegisterEmployeeInputError';
  constructor(message: string) {
    super(message);
  }
}
export type ValidateRegisterEmployeeInputResult = EmployeeCommand

export type ValidateRegisterEmployeeInput = (
  params: RegisterEmployeeParams
) => Promise<ValidateRegisterEmployeeInputResult>;

export const buildValidateRegisterEmployeeInput = ({
  userRepository,
  companyRepository,
  occupationRepository,
  workLocationRepository,
}: {
  userRepository: UserRepository;
  companyRepository: CompanyRepository;
  occupationRepository: OccupationRepository;
  workLocationRepository: WorkLocationRepository;
}): ValidateRegisterEmployeeInput => async (
  params: RegisterEmployeeParams
) => {

  // ユーザーが存在しない場合はエラー
  const { data: User } = await userRepository.findById(params.userId);
  if (User == null) {
    throw new InvalidRegisterEmployeeInputError('ユーザーが存在しません');
  }

  // 登録済み現場社員がすでに存在する場合はエラー
  if (User?.employee != null) {
    throw new InvalidRegisterEmployeeInputError('登録済み現場社員がすでに存在します');
  }

  // 登録ずみ転職希望者が既に存在する場合はエラー
  if (User?.jobSeeker != null) {
    throw new InvalidRegisterEmployeeInputError('登録済み転職希望者がすでに存在します');
  }

  // 企業コードから企業の存在確認
  const { data: company } = await companyRepository.findByCode(params.companyCode);
  if (company == null) {
    throw new InvalidRegisterEmployeeInputError('企業が存在しません');
  }

  // 職種の存在確認
  const { data: occupation } = await occupationRepository.findById(params.occupationId);
  if (occupation == null) {
    throw new InvalidRegisterEmployeeInputError('職種が存在しません');
  }

  // 勤務地の存在確認
  if (params.workLocationId != null) {
    const { data: workLocation } = await workLocationRepository.findById(params.workLocationId);
    if (workLocation == null) {
      throw new InvalidRegisterEmployeeInputError('勤務地が存在しません');
    }
  }


  // 全ての条件を満たした場合はEmployeeCommandを返す。
  return ({
    id: createId(),
    userId: params.userId,
    companyId: company.id,
    occupationId: params.occupationId,
    gender: params.gender as GenderEnum,
    birthday: params.birthday,
    joiningDate: params.joiningDate,
    status: StatusEnum.PENDING, // 初期値はPENDING
    workLocationId: params.workLocationId ?? undefined,
    hiringType: params.hiringType as HiringTypeEnum ?? undefined,
    meetingMethod: params.meetingMethod as MeetingMethodEnum ?? undefined,
    selfIntroduction: params.selfIntroduction ?? undefined,
    talkableTopics: params.talkableTopics ?? undefined,
  })
};
