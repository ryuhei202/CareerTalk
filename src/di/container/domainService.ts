import type { CompanyRepository } from "@/domain/core/Company/repository/CompanyRepository";
import type { EmployeeRepository } from "@/domain/core/Employee/repository/EmployeeRepository";
import { buildCreateEmployee } from "@/domain/core/Employee/services/createEmployee";
import { buildValidateRegisterEmployeeInput } from "@/domain/core/Employee/services/validateRegisterEmployeeInput";
import type { OccupationRepository } from "@/domain/core/Occupation/repository/OccupationRepository";
import type { UserRepository } from "@/domain/core/User/repository/UserRepository";
import type { WorkLocationRepository } from "@/domain/core/WorkLocation/repository/WorkLocationRepository";
import type { Container } from "inversify";
import {
	COMPANY_REPOSITORY,
	EMPLOYEE_REPOSITORY,
	OCCUPATION_REPOSITORY,
	USER_REPOSITORY,
	WORK_LOCATION_REPOSITORY,
} from "./repository";

// Employee
export const VALIDATE_EMPLOYEE = "VALIDATE_EMPLOYEE" as const;
export const CREATE_EMPLOYEE = "CREATE_EMPLOYEE" as const;

export const registerDomainServices = (container: Container): void => {
	// Employee
	container
		.bind(VALIDATE_EMPLOYEE)
		.toDynamicValue((ctx) =>
			buildValidateRegisterEmployeeInput({
				userRepository: ctx.container.get<UserRepository>(USER_REPOSITORY),
				companyRepository:
					ctx.container.get<CompanyRepository>(COMPANY_REPOSITORY),
				occupationRepository: ctx.container.get<OccupationRepository>(
					OCCUPATION_REPOSITORY,
				),
				workLocationRepository: ctx.container.get<WorkLocationRepository>(
					WORK_LOCATION_REPOSITORY,
				),
			}),
		)
		.inSingletonScope();

	container
		.bind(CREATE_EMPLOYEE)
		.toDynamicValue((ctx) =>
			buildCreateEmployee({
				employeeRepository:
					ctx.container.get<EmployeeRepository>(EMPLOYEE_REPOSITORY),
			}),
		)
		.inSingletonScope();
};
