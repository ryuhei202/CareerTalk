import { prisma } from "..";
import fixture from "./fixture.json";
import type { PrismaPromise, WorkLocation } from "@prisma/client";

export const workLocation = () => {
  const res: PrismaPromise<WorkLocation>[] = [];
  fixture.forEach((data) => {
    const row = prisma.workLocation.upsert({
      where: { id: data.id },
      update: data,
      create: data,
    });
    res.push(row);
  });
  return res;
};
