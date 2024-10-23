import { describe, expect, test } from "vitest";
import { EmployeeDTO } from "./EmployeeDTO";
import { employeeDummy } from "@/domain/core/Employee/test/Employee.dummy";

describe("EmployeeDTO", () => {
  test("EmployeeDTOが正常に作成される", () => {
    const employee = employeeDummy;
    const employeeDTO = new EmployeeDTO(employee);

    expect(employeeDTO).toBeDefined();
    expect(employeeDTO.id).toBe(employee.id);
    expect(employeeDTO.userId).toBe(employee.userId);
    expect(employeeDTO.company.id).toBe(employee.company.id);
    expect(employeeDTO.company.name).toBe(employee.company.name);
    expect(employeeDTO.occupation.id).toBe(employee.occupation.id);
    expect(employeeDTO.occupation.name).toBe(employee.occupation.name);
    expect(employeeDTO.gender).toBe(employee.toGenderLabel());
    expect(employeeDTO.yearsOfExperience).toBe(employee.toYearsOfExperience());
    expect(employeeDTO.status).toBe(employee.toStatusLabel());
    expect(employeeDTO.age).toBe(employee.getAge());
    expect(employeeDTO.workLocation?.id).toBe(employee.workLocation?.id);
    expect(employeeDTO.workLocation?.name).toBe(employee.workLocation?.name);
    expect(employeeDTO.hiringType).toBe(employee.toHiringTypeLabel());
    expect(employeeDTO.meetingMethod).toBe(employee.toMeetingMethodLabel());
    expect(employeeDTO.selfIntroduction).toBe(employee.selfIntroduction);
    expect(employeeDTO.talkableTopics).toBe(employee.talkableTopics);
  });

  test("toJson", () => {
    const employee = employeeDummy;
    const employeeDTO = new EmployeeDTO(employee);
    const employeeJson = employeeDTO.toJson();

    expect(employeeJson).toBeDefined();
    expect(employeeJson.id).toBe(employee.id);
    expect(employeeJson.userId).toBe(employee.userId);
    expect(employeeJson.company.id).toBe(employee.company.id);
    expect(employeeJson.company.name).toBe(employee.company.name);
    expect(employeeJson.occupation.id).toBe(employee.occupation.id);
    expect(employeeJson.occupation.name).toBe(employee.occupation.name);
    expect(employeeJson.gender).toBe(employee.toGenderLabel());
    expect(employeeJson.yearsOfExperience).toBe(employee.toYearsOfExperience());
    expect(employeeJson.status).toBe(employee.toStatusLabel());
    expect(employeeJson.age).toBe(employee.getAge());
    expect(employeeJson.workLocation?.id).toBe(employee.workLocation?.id);
    expect(employeeJson.workLocation?.name).toBe(employee.workLocation?.name);
  });
});
