import { employeeDummy } from "@/domain/core/Employee/test/Employee.dummy";
import { describe, expect, test } from "vitest";
import { EmployeeDetailDTO } from "./EmployeeDetailDTO";

describe("EmployeeDetailDTO", () => {
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
	test("EmployeeDetailDTOが正常に作成される", () => {
		const employeeDetailDTO = new EmployeeDetailDTO({
			employee,
			company,
			occupation,
			workLocation,
		});

		expect(employeeDetailDTO).toBeDefined();
		expect(employeeDetailDTO.userId).toBe(employee.userId);
		expect(employeeDetailDTO.name).toBe(employee.name);
		expect(employeeDetailDTO.companyName).toBe(company.name);
		expect(employeeDetailDTO.occupation.name).toBe(occupation.name);
		expect(employeeDetailDTO.yearsOfExperience).toBe(
			employee.toYearsOfExperience(),
		);
		expect(employeeDetailDTO.gender).toBe(employee.toGenderLabel());
		expect(employeeDetailDTO.talkableTopics).toBe(employee.talkableTopics);
		expect(employeeDetailDTO.careerDescription).toBe(
			employee.careerDescription,
		);
		expect(employeeDetailDTO.jobDescription).toBe(employee.jobDescription);
		expect(employeeDetailDTO.joiningDescription).toBe(
			employee.joiningDescription,
		);
		expect(employeeDetailDTO.otherDescription).toBe(employee.otherDescription);
		expect(employeeDetailDTO.hiringType).toBe(employee.toHiringTypeLabel());
		expect(employeeDetailDTO.workLocation?.name).toBe(workLocation.name);
		expect(employeeDetailDTO.imageUrl).toBe(employee.imageUrl);
	});

	test("toJson が正常に動作する", () => {
		const employeeDetailDTO = new EmployeeDetailDTO({
			employee,
			company,
			occupation,
			workLocation,
		});

		const employeeDetailJson = employeeDetailDTO.toJson();

		expect(employeeDetailJson).toBeDefined();
		expect(employeeDetailJson.userId).toBe(employee.userId);
		expect(employeeDetailJson.name).toBe(employee.name);
		expect(employeeDetailJson.companyName).toBe(company.name);
		expect(employeeDetailJson.occupation?.name).toBe(occupation.name);
		expect(employeeDetailJson.yearsOfExperience).toBe(
			employee.toYearsOfExperience(),
		);
		expect(employeeDetailJson.gender).toBe(employee.toGenderLabel());
		expect(employeeDetailJson.talkableTopics).toBe(employee.talkableTopics);
		expect(employeeDetailJson.careerDescription).toBe(
			employee.careerDescription,
		);
		expect(employeeDetailJson.jobDescription).toBe(employee.jobDescription);
		expect(employeeDetailJson.joiningDescription).toBe(
			employee.joiningDescription,
		);
		expect(employeeDetailJson.otherDescription).toBe(employee.otherDescription);
		expect(employeeDetailJson.hiringType).toBe(employee.toHiringTypeLabel());
		expect(employeeDetailJson.workLocation?.name).toBe(workLocation.name);
		expect(employeeDetailJson.imageUrl).toBe(employee.imageUrl);
	});
});
