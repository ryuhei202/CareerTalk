import { prisma } from "..";
import fixture from "./fixture.json";
import type { PrismaPromise, Company } from "@prisma/client";

export const company = () => {
  const res: PrismaPromise<Company>[] = [];
  fixture.forEach((data) => {
    const row = prisma.company.upsert({
      where: { id: data.id },
      update: data,
      create: data,
    });
    res.push(row);
  });
  return res;
};
