import { beforeAll, describe, test, expect } from "vitest";
import { prisma } from "@/lib/prisma";
import { UserPrismaRepository } from "./UserPrismaRepository";
import { createId } from "@paralleldrive/cuid2";
import { createSuccess } from "@/util/result";
import { userDummy } from "@/domain/core/User/User.dummy";

let repository: UserPrismaRepository;
beforeAll(async () => {
  repository = new UserPrismaRepository(prisma);
  
});

describe("UserPrismaRepository", () => {
  describe("findById", () => {
    test("取得対象のユーザーが存在しない場合、undefinedを返す", async () => {
      const id = createId();
      const result = await repository.findById(id);

      expect(result).toStrictEqual(createSuccess(undefined));
    });

    test("取得対象のユーザーが存在する場合、当該ユーザーを返す", async () => {
      const id = userDummy.id
      const result = await repository.findById(id);
    
      expect(result).toStrictEqual(createSuccess(userDummy));
    });
  });
});

