import { employeeDummy } from "@/domain/core/Employee/test/Employee.dummy";
import { describe, expect, test } from "vitest";
import { FilteredEmployeeDTO } from "./FilteredEmployeeDTO";

describe("FilteredEmployeeDTO", () => {
	const employee = employeeDummy;
	const company = {
		id: 1,
		name: "テストカンパニー1",
		code: "12345678",
	};
	const occupation = {
		id: 1,
		name: "営業職",
	};
	const workLocation = {
		id: 1,
		name: "北海道",
	};
	test("EmployeeDTOが正常に作成される", () => {
		const employeeDTO = new FilteredEmployeeDTO({
			employee,
			company,
			occupation,
			workLocation,
		});

		expect(employeeDTO).toBeDefined();
		expect(employeeDTO.name).toBe(employee.name);
		expect(employeeDTO.userId).toBe(employee.userId);
		expect(employeeDTO.company).toBe(company);
		expect(employeeDTO.occupation).toBe(occupation);
		expect(employeeDTO.gender).toBe(employee.toGenderLabel());
		expect(employeeDTO.yearsOfExperience).toBe(employee.toYearsOfExperience());
		expect(employeeDTO.age).toBe(employee.getAge());
		expect(employeeDTO.imageUrl).toBe(employee.imageUrl);
		expect(employeeDTO.workLocation).toBe(workLocation);
		expect(employeeDTO.hiringType).toBe(employee.toHiringTypeLabel());
		expect(employeeDTO.meetingMethod).toBe(employee.toMeetingMethodLabel());
		expect(employeeDTO.selfIntroduction).toBe(employee.selfIntroduction);
		expect(employeeDTO.talkableTopics).toBe(employee.talkableTopics);
	});

	test("toJson", () => {
		const employeeDTO = new FilteredEmployeeDTO({
			employee,
			company,
			occupation,
			workLocation,
		});

		const employeeJson = employeeDTO.toJson();

		expect(employeeJson).toBeDefined();
		expect(employeeJson.name).toBe(employee.name);
		expect(employeeJson.userId).toBe(employee.userId);
		expect(employeeJson.company).toBe(company);
		expect(employeeJson.occupation).toBe(occupation);
		expect(employeeJson.gender).toBe(employee.toGenderLabel());
		expect(employeeJson.yearsOfExperience).toBe(employee.toYearsOfExperience());
		expect(employeeJson.age).toBe(employee.getAge());
		expect(employeeJson.workLocation).toBe(workLocation);
		expect(employeeJson.imageUrl).toBe(employee.imageUrl);
	});
});
