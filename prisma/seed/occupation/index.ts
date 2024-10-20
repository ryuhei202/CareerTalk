import { prisma } from "..";
import fixture from "./fixture.json";
import type { PrismaPromise, Occupation } from "@prisma/client";

export const occupation = () => {
  const res: PrismaPromise<Occupation>[] = [];
  fixture.forEach((data) => {
    const row = prisma.occupation.upsert({
      where: { id: data.id },
      update: data,
      create: data,
    });
    res.push(row);
  });
  return res;
};
