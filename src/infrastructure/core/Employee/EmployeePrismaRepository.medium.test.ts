import { describe, expect, test, beforeAll, afterAll, beforeEach } from "vitest";
import { PrismaClient } from "@prisma/client";
import { EmployeePrismaRepository } from "./EmployeePrismaRepository";
import { Employee } from "@/domain/core/Employee/Employee";
import { EmployeeId } from "@/domain/core/Employee/EmployeeId/EmployeeId";
import { UserId } from "@/domain/core/User/UserId/UserId";
import { CompanyId } from "@/domain/core/Company/CompanyId/CompanyId";
import { Gender, GenderEnum } from "@/domain/core/Employee/Gender/Gender";
import { Birthday } from "@/domain/core/Employee/Birthday/Birthday";
import { OccupationId } from "@/domain/core/Occupation/OccupationId/OccupationId";
import { WorkLocationId } from "@/domain/core/Employee/WorkLocationId/WorkLocationId";
import { JoiningDate } from "@/domain/core/Employee/JoiningDate/JoiningDate";
import { HiringType, HiringTypeEnum } from "@/domain/core/Employee/HiringType/HiringType";
import { MeetingMethod, MeetingMethodEnum } from "@/domain/core/Employee/MeetingMethod/MeetingMethod";
import { SelfIntroduction } from "@/domain/core/Employee/SelfIntroduction/SelfIntroduction";
import { TalkableTopics } from "@/domain/core/Employee/TalkableTopics/TalkableTopics";
import { Status, StatusEnum } from "@/domain/core/shared/Status/Status";
import { prisma } from "@/lib/prisma";
import { createId } from "@paralleldrive/cuid2";
import { createSuccess } from "@/util/result";
import { employeeDummy } from "@/domain/core/Employee/Employee.dummy";
import { UserPrismaRepository } from "../User/UserPrismaRepository";
import { userDummy } from "@/domain/core/User/User.dummy";
import { OccupationPrismaRepository } from "../Occupation/OccupationPrismaRepository";
import { occupationDummy } from "@/domain/core/Occupation/Occupation.dummy";
import { companyDummy } from "@/domain/core/Company/Company.dummy";
import { CompanyPrismaRepository } from "../Company/CompanyPrismaRepository";

beforeEach(async () => {
  await prisma.employee.deleteMany({
    where: { id: employeeDummy.id.value },
  });
  await prisma.user.deleteMany({
    where: { id: userDummy.id.value },
  });
  await prisma.occupation.deleteMany({
    where: { id: occupationDummy.id.value },
  });
  await prisma.company.deleteMany({
    where: { id: companyDummy.id.value },
  });
});

afterAll(async () => {
  await prisma.employee.deleteMany({
    where: { id: employeeDummy.id.value },
  });
  await prisma.user.deleteMany({
    where: { id: userDummy.id.value },
  });
  await prisma.occupation.deleteMany({
    where: { id: occupationDummy.id.value },
  });
  await prisma.company.deleteMany({
    where: { id: companyDummy.id.value },
  });
});

describe("EmployeePrismaRepository", () => {
  let employeeRepository: EmployeePrismaRepository;
  let userRepository: UserPrismaRepository;
  let companyRepository: CompanyPrismaRepository;
  let occupationRepository: OccupationPrismaRepository;

  beforeAll(async () => {
    employeeRepository = new EmployeePrismaRepository(prisma);
    userRepository = new UserPrismaRepository(prisma);
    companyRepository = new CompanyPrismaRepository(prisma);
    occupationRepository = new OccupationPrismaRepository(prisma);
  });

  describe("findById", () => {
    test("テーブルが空の場合、undefined を返す", async () => {
    const id = createId();
    
    const result = await employeeRepository.findById(id);

    expect(result).toStrictEqual(createSuccess(undefined));
  });

  test("取得対象の現場社員が存在しない場合、undefined を返す", async () => {
    // 取得対象でない現場社員を保存する
    const id = createId();
    await userRepository.save(userDummy);
    await companyRepository.save(companyDummy);
    await occupationRepository.save(occupationDummy);

    const employee = employeeDummy
    await employeeRepository.save(employee);

    // 取得対象の現場社員を取得
    const result = await employeeRepository.findById(id);

    // 存在しないことを確認
    expect(result).toStrictEqual(createSuccess(undefined));
    });
  });
});
