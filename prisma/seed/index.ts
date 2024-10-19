import { PrismaClient } from "@prisma/client";
import { occupation } from "./occupation";
import { user } from "./user";
import { company } from "./company";

export const prisma = new PrismaClient();

const main = async () => {
  console.log(`Start seeding ...`);
  await prisma.$transaction([
    ...occupation(),
    ...user(),
    ...company(),
  ]);
  console.log(`Seeding finished.`);
};

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
