import { Occupation } from "@/domain/core/Occupation/Occupation";
import { FindOccupationResult, OccupationRepository, SaveOccupationResult } from "@/domain/core/Occupation/OccupationRepository";
import { createSuccess } from "@/util/result";
import { PrismaClient } from "@prisma/client";
import { OccupationId } from "@/domain/core/Occupation/OccupationId/OccupationId";
import { OccupationName } from "@/domain/core/Occupation/OccupationName/OccupationName";

export class OccupationPrismaRepository implements OccupationRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async findById(occupationId: number): Promise<FindOccupationResult> {
    const occupation = await this.prisma.occupation.findUnique({
      where: { id: occupationId },
    });
    if (occupation == null) {
      return createSuccess(undefined);
    }

    const occupationData = Occupation.reconstruct({
      id: new OccupationId(occupation.id),
      name: new OccupationName(occupation.name),
    });

    return createSuccess(occupationData);
  }

  async save(occupation: Occupation): Promise<SaveOccupationResult> {
    await this.prisma.occupation.create({
      data: {
        id: occupation.id.value,
        name: occupation.name.value,
      },
    });

    return createSuccess(undefined);
  }
  
}
