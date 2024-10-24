import { employeeDummy } from "@/domain/core/Employee/test/Employee.dummy";
import { describe, expect, test } from "vitest";
import { EmployeeDTO } from "./EmployeeDTO";

describe("EmployeeDTO", () => {
	test("EmployeeDTOが正常に作成される", () => {
		const employee = employeeDummy;
		const employeeDTO = new EmployeeDTO(employee);

		expect(employeeDTO).toBeDefined();
		expect(employeeDTO.name).toBe(employee.name);
		expect(employeeDTO.id).toBe(employee.id);
		expect(employeeDTO.userId).toBe(employee.userId);
		expect(employeeDTO.companyId).toBe(employee.companyId);
		expect(employeeDTO.occupationId).toBe(employee.occupationId);
		expect(employeeDTO.gender).toBe(employee.toGenderLabel());
		expect(employeeDTO.yearsOfExperience).toBe(employee.toYearsOfExperience());
		expect(employeeDTO.status).toBe(employee.toStatusLabel());
		expect(employeeDTO.age).toBe(employee.getAge());
		expect(employeeDTO.imageUrl).toBe(employee.imageUrl);
		expect(employeeDTO.workLocationId).toBe(employee.workLocationId);
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
		expect(employeeJson.name).toBe(employee.name);
		expect(employeeJson.id).toBe(employee.id);
		expect(employeeJson.userId).toBe(employee.userId);
		expect(employeeJson.companyId).toBe(employee.companyId);
		expect(employeeJson.occupationId).toBe(employee.occupationId);
		expect(employeeJson.gender).toBe(employee.toGenderLabel());
		expect(employeeJson.yearsOfExperience).toBe(employee.toYearsOfExperience());
		expect(employeeJson.status).toBe(employee.toStatusLabel());
		expect(employeeJson.age).toBe(employee.getAge());
		expect(employeeJson.workLocationId).toBe(employee.workLocationId);
		expect(employeeJson.imageUrl).toBe(employee.imageUrl);
	});
});
