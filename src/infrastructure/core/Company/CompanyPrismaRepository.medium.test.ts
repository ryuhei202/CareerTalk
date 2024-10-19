import { describe, test, expect, beforeAll } from "vitest";
import { prisma } from "@/lib/prisma";
import { CompanyPrismaRepository } from "./CompanyPrismaRepository";
import { createSuccess } from "@/util/result";
import { companyDummy } from "@/domain/core/Company/Company.dummy";
import { beforeEach, afterAll } from "vitest";

let repository: CompanyPrismaRepository;
beforeAll(async () => {
  repository = new CompanyPrismaRepository(prisma);
});

beforeEach(async () => {
  await prisma.company.deleteMany({
    where: { id: companyDummy.id.value },
  });
});

afterAll(async () => {
  await prisma.company.deleteMany({
    where: { id: companyDummy.id.value },
  });
});

describe("CompanyPrismaRepository", () => {

  describe("findById", () => {
    test("テーブルが空の場合、undefined を返す", async () => {
      const id = 1
      const result = await repository.findById(id);

      expect(result).toStrictEqual(createSuccess(undefined));
    });

    test("取得対象の企業が存在しない場合、undefined を返す", async () => {
      const id = 2;
      await repository.save(companyDummy);

      const result = await repository.findById(id);
      expect(result).toStrictEqual(createSuccess(undefined));
    });

    test("企業が存在する場合、企業を返す", async () => {
      const id = 1;
      await repository.save(companyDummy);

      const result = await repository.findById(id);
      expect(result).toStrictEqual(createSuccess(companyDummy));
    });
  });

  describe("save", () => {
    test("企業を保存する", async () => {
      const result = await repository.save(companyDummy);
      expect(result).toStrictEqual(createSuccess(undefined));

      const { data: savedCompany } = await repository.findById(companyDummy.id.value);
      expect(savedCompany).toStrictEqual(companyDummy);
    });
  });
});

