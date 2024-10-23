import { CompanyPrismaRepository } from "@/infrastructure/core/Company/CompanyPrismaRepository";
import { EmployeePrismaRepository } from "@/infrastructure/core/Employee/test/EmployeePrismaRepository";
import { OccupationPrismaRepository } from "@/infrastructure/core/Occupation/OccupationPrismaRepository";
import { UserPrismaRepository } from "@/infrastructure/core/User/UserPrismaRepository";
import { PrismaClient } from "@prisma/client";
import { Container } from "inversify";
import { PRISMA_CLIENT } from "./support";
import { WorkLocationPrismaRepository } from "@/infrastructure/core/WorkLocation/WorkLocationPrismaRepository";

// User
export const USER_REPOSITORY = 'USER_REPOSITORY' as const;

// Employee
export const EMPLOYEE_REPOSITORY = 'EMPLOYEE_REPOSITORY' as const;

// Company
export const COMPANY_REPOSITORY = 'COMPANY_REPOSITORY' as const;

// Occupation
export const OCCUPATION_REPOSITORY = 'OCCUPATION_REPOSITORY' as const;

// WorkLocation
export const WORK_LOCATION_REPOSITORY = 'WORK_LOCATION_REPOSITORY' as const;

export const registerRepositories = (container: Container): void => {
  // User
  container.bind(USER_REPOSITORY).toDynamicValue((ctx) => 
    new UserPrismaRepository(
      ctx.container.get<PrismaClient>(PRISMA_CLIENT),
    )
  ).inSingletonScope();

  // Employee
  container.bind(EMPLOYEE_REPOSITORY).toDynamicValue((ctx) => 
    new EmployeePrismaRepository(
      ctx.container.get<PrismaClient>(PRISMA_CLIENT),
    )
  ).inSingletonScope();

  // Company
  container.bind(COMPANY_REPOSITORY).toDynamicValue((ctx) => 
    new CompanyPrismaRepository(
      ctx.container.get<PrismaClient>(PRISMA_CLIENT),
    )
  ).inSingletonScope();

  // Occupation
  container.bind(OCCUPATION_REPOSITORY).toDynamicValue((ctx) => 
    new OccupationPrismaRepository(
      ctx.container.get<PrismaClient>(PRISMA_CLIENT),
    )
  ).inSingletonScope();

  // WorkLocation
  container.bind(WORK_LOCATION_REPOSITORY).toDynamicValue((ctx) => 
    new WorkLocationPrismaRepository(
      ctx.container.get<PrismaClient>(PRISMA_CLIENT),
    )
  ).inSingletonScope();
};
