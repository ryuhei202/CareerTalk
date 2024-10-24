import { employeeDummy } from "@/domain/core/Employee/test/Employee.dummy";
import { occupationDummy2 } from "@/domain/core/Occupation/test/Occupation.dummy";
import { prisma } from "@/lib/prisma";
import { createSuccess } from "@/util/result";
import {
	afterAll,
	beforeAll,
	beforeEach,
	describe,
	expect,
	test,
} from "vitest";
import { EmployeePrismaRepository } from "./EmployeePrismaRepository";

let employeeRepository: EmployeePrismaRepository;
beforeAll(async () => {
	employeeRepository = new EmployeePrismaRepository(prisma);
});

beforeEach(async () => {
	await prisma.employee.deleteMany({
		where: { id: employeeDummy.id },
	});
});

afterAll(async () => {
	await prisma.employee.deleteMany({
		where: { id: employeeDummy.id },
	});
});

describe("EmployeePrismaRepository", () => {
	describe("findById", () => {
		test("取得対象の現場社員が存在しない場合、undefined を返す", async () => {
			const result = await employeeRepository.findById(employeeDummy.id);
			expect(result).toStrictEqual(createSuccess(undefined));
		});

		test("取得対象の現場社員が存在する場合、その現場社員を返す", async () => {
			await employeeRepository.save(employeeDummy);
			const result = await employeeRepository.findById(employeeDummy.id);
			expect(result).toStrictEqual(createSuccess(employeeDummy));
		});
	});

	describe("save", () => {
		test("現場社員を保存できる", async () => {
			const employee = await employeeRepository.findById(employeeDummy.id);
			// 初めはいないことを確認する
			expect(employee).toStrictEqual(createSuccess(undefined));
			await employeeRepository.save(employeeDummy);

			const savedEmployee = await employeeRepository.findById(employeeDummy.id);
			expect(savedEmployee).toStrictEqual(createSuccess(employeeDummy));
		});
	});

	describe("update", () => {
		test("現場社員を更新できる", async () => {
			await employeeRepository.save(employeeDummy);
			const employee = await employeeRepository.findById(employeeDummy.id);
			expect(employee).toStrictEqual(createSuccess(employeeDummy));

			employeeDummy.changeOccupation(occupationDummy2);
			await employeeRepository.update(employeeDummy);

			const result = await employeeRepository.findById(employeeDummy.id);
			expect(result).toStrictEqual(createSuccess(employeeDummy));
		});
	});
});
