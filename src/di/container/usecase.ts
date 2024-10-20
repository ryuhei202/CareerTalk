import { Container } from "inversify";
import { VALIDATE_EMPLOYEE, CREATE_EMPLOYEE } from "./domainService";
import { buildRegisterEmployeeUseCase } from "@/application/usecase/registerEmployee";
import { ValidateRegisterEmployeeInput } from "@/domain/core/Employee/services/validateRegisterEmployeeInput";
import { CreateEmployee } from "@/domain/core/Employee/services/createEmployee";
import { ITransactionManager } from "@/application/shared/TransactionManager";
import { TRANSACTION_MANAGER } from "./support";

export const REGISTER_EMPLOYEE_USE_CASE = 'REGISTER_EMPLOYEE_USE_CASE' as const;

export const registerUseCases = (container: Container): void => {
  // Employee
  container
    .bind(REGISTER_EMPLOYEE_USE_CASE)
    .toDynamicValue((ctx) =>
      buildRegisterEmployeeUseCase({
        validateRegisterEmployeeInput: ctx.container.get<ValidateRegisterEmployeeInput>(VALIDATE_EMPLOYEE),
        createEmployee: ctx.container.get<CreateEmployee>(CREATE_EMPLOYEE),
        transactionManager: ctx.container.get<ITransactionManager>(TRANSACTION_MANAGER),
      })
    )
    .inSingletonScope();
};
