import { Result } from "@/util/result";
import { Employee } from "./Employee";

export type FindEmployeeResult = Result<Employee | undefined, never>;
export type SaveEmployeeResult = Result<void, never>;
export type UpdateEmployeeResult = Result<void, never>;

export interface EmployeeRepository {
  findById(employeeId: string): Promise<FindEmployeeResult>;
  save(employee: Employee): Promise<SaveEmployeeResult>;
  update(employee: Employee): Promise<UpdateEmployeeResult>;
}
