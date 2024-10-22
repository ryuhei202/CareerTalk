import { prisma } from "..";
import fixture from "./fixture.json";
import type { PrismaPromise, User } from "@prisma/client";

export const user = () => {
  const res: PrismaPromise<User>[] = [];
  fixture.forEach((data) => {
    const row = prisma.user.upsert({
      where: { id: data.id },
      update: data,
      create: data,
    });
    res.push(row);
  });
  return res;
};
