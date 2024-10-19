import { describe, expect, test, beforeAll, afterAll, beforeEach } from "vitest";
import { EmployeePrismaRepository } from "./EmployeePrismaRepository";
import { prisma } from "@/lib/prisma";
import { createSuccess } from "@/util/result";
import { employeeDummy } from "@/domain/core/Employee/Employee.dummy";
import { brand } from "@/util/brand";
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
      const result = await employeeRepository.findById(employeeDummy.id)
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

      employeeDummy.changeOccupationId(brand<number, "OccupationId">(2));

      await employeeRepository.update(employeeDummy);
      const result = await employeeRepository.findById(employeeDummy.id);
      expect(result).toStrictEqual(createSuccess(employeeDummy));
    });
  });

});
