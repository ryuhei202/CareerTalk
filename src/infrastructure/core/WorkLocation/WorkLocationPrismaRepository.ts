import { FindWorkLocationResult, WorkLocationRepository } from "@/domain/core/WorkLocation/repository/WorkLocationRepository";
import { WorkLocation } from "@/domain/core/WorkLocation/WorkLocation";
import { createSuccess } from "@/util/result";
import { PrismaClient } from "@prisma/client";

export class WorkLocationPrismaRepository implements WorkLocationRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async findById(workLocationId: number): Promise<FindWorkLocationResult> {
    const workLocation = await this.prisma.workLocation.findUnique({
      where: { id: workLocationId },
    });
    if (workLocation == null) {
      return createSuccess(undefined);
    }

    const workLocationData = WorkLocation.create({
      id: workLocation.id,
      name: workLocation.name,
    });
    return createSuccess(workLocationData);
  }
}
