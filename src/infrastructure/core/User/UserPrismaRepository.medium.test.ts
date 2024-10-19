import { beforeAll, describe, test, expect, beforeEach, afterAll } from "vitest";
import { prisma } from "@/lib/prisma";
import { UserPrismaRepository } from "./UserPrismaRepository";
import { createId } from "@paralleldrive/cuid2";
import { createSuccess } from "@/util/result";
import { userDummy } from "@/domain/core/User/User.dummy";
  
beforeEach(async () => {
  await prisma.user.deleteMany({
    where: { id: userDummy.id.value },
  });
});

afterAll(async () => {
  await prisma.user.deleteMany({
    where: { id: userDummy.id.value },
  });
});

describe("UserPrismaRepository", () => {
  let repository: UserPrismaRepository;
  beforeAll(async () => {
    repository = new UserPrismaRepository(prisma);
  });

  describe("findById", () => {
    test("テーブルが空の場合、undefinedを返す", async () => {
      const id = createId();
      const result = await repository.findById(id);
      expect(result).toStrictEqual(createSuccess(undefined));
    });

    test("取得対象のユーザーが存在しない場合、undefinedを返す", async () => {
      const id = createId();
      // 取得対象でないユーザーを保存する
      await repository.save(userDummy);

      const result = await repository.findById(id);
      expect(result).toStrictEqual(createSuccess(undefined));
    });

    test("取得対象のユーザーが存在する場合、当該ユーザーを返す", async () => {
      // 取得対象のユーザーを保存する
      await repository.save(userDummy);

      const result = await repository.findById(userDummy.id.value);
      expect(result).toStrictEqual(createSuccess(userDummy));
    });
  });

  describe("save", () => {
    test("ユーザーを保存する", async () => {
      const result = await repository.save(userDummy);
      expect(result).toStrictEqual(createSuccess(undefined));

       // 保存されていることを確認
    const { data: savedUser } = await repository.findById(userDummy.id.value);
    expect(savedUser).toStrictEqual(userDummy);
    })
  });
});
