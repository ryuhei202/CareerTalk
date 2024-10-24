import { EmployeeDTO } from "@/application/dto/Employee/EmployeeDTO";
import { Employee } from "../Employee";
import type { EmployeeRepository } from "../repository/EmployeeRepository";
import type { EmployeeCommand } from "./validateRegisterEmployeeInput";

export type CreateEmployee = (
	employeeCommand: EmployeeCommand,
) => Promise<EmployeeDTO>;

export const buildCreateEmployee =
	({
		employeeRepository,
	}: {
		employeeRepository: EmployeeRepository;
	}): CreateEmployee =>
	async (employeeCommand) => {
		const employee = Employee.create(employeeCommand);
		await employeeRepository.save(employee);
		return new EmployeeDTO(employee);
	};
