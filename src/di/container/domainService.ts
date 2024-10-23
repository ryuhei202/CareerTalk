import { buildValidateRegisterEmployeeInput } from "@/domain/core/Employee/services/validateRegisterEmployeeInput";
import { Container } from "inversify";
import { COMPANY_REPOSITORY, EMPLOYEE_REPOSITORY, OCCUPATION_REPOSITORY, USER_REPOSITORY, WORK_LOCATION_REPOSITORY } from "./repository";
import { CompanyRepository } from "@/domain/core/Company/repository/CompanyRepository";
import { buildCreateEmployee } from "@/domain/core/Employee/services/createEmployee";
import { EmployeeRepository } from "@/domain/core/Employee/repository/EmployeeRepository";
import { UserRepository } from "@/domain/core/User/repository/UserRepository";
import { OccupationRepository } from "@/domain/core/Occupation/repository/OccupationRepository";
import { WorkLocationRepository } from "@/domain/core/WorkLocation/repository/WorkLocationRepository";

// Employee
export const VALIDATE_EMPLOYEE = 'VALIDATE_EMPLOYEE' as const;
export const CREATE_EMPLOYEE = 'CREATE_EMPLOYEE' as const;

export const registerDomainServices = (container: Container): void => {
  // Employee
  container
    .bind(VALIDATE_EMPLOYEE)
    .toDynamicValue((ctx) =>
      buildValidateRegisterEmployeeInput({
        userRepository: ctx.container.get<UserRepository>(USER_REPOSITORY),
        companyRepository: ctx.container.get<CompanyRepository>(
          COMPANY_REPOSITORY
        ),
        occupationRepository: ctx.container.get<OccupationRepository>(
          OCCUPATION_REPOSITORY
        ),
        workLocationRepository: ctx.container.get<WorkLocationRepository>(
          WORK_LOCATION_REPOSITORY
        ),
      })
    )
    .inSingletonScope();

  container
    .bind(CREATE_EMPLOYEE)
    .toDynamicValue((ctx) =>
      buildCreateEmployee({
        employeeRepository: ctx.container.get<EmployeeRepository>(
          EMPLOYEE_REPOSITORY
        ),
      })
    )
    .inSingletonScope();
};
