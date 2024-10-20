import { beforeAll, describe, test, expect, afterAll, beforeEach } from "vitest";
import { prisma } from "@/lib/prisma";
import { UserPrismaRepository } from "./UserPrismaRepository";
import { createId } from "@paralleldrive/cuid2";
import { createSuccess } from "@/util/result";
import { userDummy } from "@/domain/core/User/User.dummy";
import { employeeDummy } from "@/domain/core/Employee/Employee.dummy";

let userRepository: UserPrismaRepository;
beforeAll(async () => {
  userRepository = new UserPrismaRepository(prisma);
});

beforeEach(async () => {
  await prisma.employee.deleteMany({
    where: {
      userId: employeeDummy.userId
    }
  });
});

afterAll(async () => {
  await prisma.employee.deleteMany({
    where: {
      userId: employeeDummy.userId
    }
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
      const id = userDummy.id
      const result = await userRepository.findById(id);
    
      expect(result).toStrictEqual(createSuccess(userDummy));
    });

    // 詰まったので後でやる。
    // test("ユーザーが現場社員として登録している場合、現場社員を取得できる", async () => {
    //   console.log(userDummy);
    //   await employeeRepository.save(employeeDummy)
    //   const result = await userRepository.findById(userDummy.id);
    
    //   console.log(result.data);
      
    //   expect(result).toStrictEqual(createSuccess(userDummyWithEmployee));
    // });
  });
});
