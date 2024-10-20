import { CreateEmployee } from "@/domain/core/Employee/services/createEmployee";
import {  InvalidRegisterEmployeeInputError, ValidateRegisterEmployeeInput } from "@/domain/core/Employee/services/validateRegisterEmployeeInput";
import { createFailure, createSuccess, Result } from "@/util/result";
import { ITransactionManager } from "../shared/TransactionManager";
import { Employee } from "@/domain/core/Employee/Employee";

export interface RegisterEmployeeParams {
  userId: string;
  name: string;
  companyCode: string;
  occupationId: number;
  gender: string;
  birthday: Date;
  joiningDate: Date;
  workLocationId?: number;
  hiringType?: string;
  meetingMethod?: string;
  selfIntroduction?: string;
  profileImage?: string;
  talkableTopics?: string;
}
type RegisterEmployeeUseCaseResult = Result<Employee | undefined, InvalidRegisterEmployeeInputError>;

export type RegisterEmployeeUseCase = (
  params: RegisterEmployeeParams
) => Promise<RegisterEmployeeUseCaseResult>;

export const buildRegisterEmployeeUseCase = ({
  validateRegisterEmployeeInput,
  createEmployee,
  transactionManager,
}: {
  validateRegisterEmployeeInput: ValidateRegisterEmployeeInput;
  createEmployee: CreateEmployee;
  transactionManager: ITransactionManager;
}): RegisterEmployeeUseCase => async (
  params: RegisterEmployeeParams
) => {
  try {
    // 現場社員登録パラメータのバリデーション
    const employeeCommand = await validateRegisterEmployeeInput(params);
    // 現場社員の登録（トランザクション実行）
    const createdEmployee = await transactionManager.begin(async () => {
      return await createEmployee(employeeCommand);
    });

    return createSuccess(createdEmployee);
  } catch (error) {
    return createFailure(error as InvalidRegisterEmployeeInputError);
  }
}
