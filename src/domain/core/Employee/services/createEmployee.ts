import { Employee } from "../Employee";
import { EmployeeRepository } from "../repository/EmployeeRepository";
import { EmployeeCommand } from "./validateRegisterEmployeeInput";

export type CreateEmployee = (
  employeeCommand: EmployeeCommand
) => Promise<Employee>;

export const buildCreateEmployee = ({
  employeeRepository,
}: {
  employeeRepository: EmployeeRepository;
  }): CreateEmployee => async (employeeCommand) => {
  const employee = Employee.create(employeeCommand);
  await employeeRepository.save(employee);
  return employee;
}