import { employeeDummy } from "@/domain/core/Employee/test/Employee.dummy";
import {
	userDummy,
	userDummyWithEmployee,
} from "@/domain/core/User/test/User.dummy";
import { prisma } from "@/lib/prisma";
import { createSuccess } from "@/util/result";
import { createId } from "@paralleldrive/cuid2";
import {
	afterAll,
	beforeAll,
	beforeEach,
	describe,
	expect,
	test,
} from "vitest";
import { EmployeePrismaRepository } from "../Employee/test/EmployeePrismaRepository";
import { UserPrismaRepository } from "./UserPrismaRepository";

let userRepository: UserPrismaRepository;
let employeeRepository: EmployeePrismaRepository;
beforeAll(async () => {
	userRepository = new UserPrismaRepository(prisma);
	employeeRepository = new EmployeePrismaRepository(prisma);
});

beforeEach(async () => {
	await prisma.employee.deleteMany({
		where: {
			userId: employeeDummy.userId,
		},
	});
});

afterAll(async () => {
	await prisma.employee.deleteMany({
		where: {
			userId: employeeDummy.userId,
		},
	});
});

describe("UserPrismaRepository", () => {
	describe("findById", () => {
		test("取得対象のユーザーが存在しない場合、undefinedを返す", async () => {
			const id = createId();
			const result = await userRepository.findById(id);

			expect(result).toStrictEqual(createSuccess(undefined));
		});

		test("取得対象のユーザーが存在する場合、当該ユーザーを返す", async () => {
			// 事前にテストユーザーを保存しておく
			// prisma/seed/user/fixture.json
			const id = userDummy.id;
			const result = await userRepository.findById(id);

			expect(result).toStrictEqual(createSuccess(userDummy));
		});

		test("ユーザーが現場社員として登録している場合、現場社員を取得できる", async () => {
			await employeeRepository.save(employeeDummy);
			const result = await userRepository.findById(userDummy.id);

			expect(result).toStrictEqual(createSuccess(userDummyWithEmployee));
		});
	});
});
