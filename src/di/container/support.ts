import { PrismaClientManager } from "@/infrastructure/prisma/PrismaClientManager";
import { PrismaTransactionManager } from "@/infrastructure/prisma/PrismaTransactionManager";
import { prisma } from "@/lib/prisma";
import { Container } from "inversify";

// Prisma
export const PRISMA_CLIENT = 'PRISMA_CLIENT' as const;
export const TRANSACTION_MANAGER = 'TRANSACTION_MANAGER' as const;

export const registerSupports = (container: Container): void => {
  // Prisma
  container.bind(PRISMA_CLIENT).toDynamicValue(() => prisma).inSingletonScope();
  // TransactionManager
  container.bind(TRANSACTION_MANAGER).toDynamicValue(
    () => new PrismaTransactionManager(
      new PrismaClientManager()
    )
  ).inSingletonScope();
};
