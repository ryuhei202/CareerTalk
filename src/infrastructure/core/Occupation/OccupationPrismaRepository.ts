import { Occupation } from "@/domain/core/Occupation/Occupation";
import { FindAllOccupationResult, FindOccupationResult, OccupationRepository } from "@/domain/core/Occupation/OccupationRepository";
import { brand } from "@/util/brand";
import { createSuccess } from "@/util/result";
import { PrismaClient } from "@prisma/client";

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
      id: brand<number, "OccupationId">(occupation.id),
      name: brand<string, "OccupationName">(occupation.name),
    });

    return createSuccess(occupationData);
  }  

  
  async findAll(): Promise<FindAllOccupationResult> {
    const occupations = await this.prisma.occupation.findMany();
    const occupationData = occupations.map((occupation) => {
      return Occupation.reconstruct({
        id: brand<number, "OccupationId">(occupation.id),
        name: brand<string, "OccupationName">(occupation.name),
      });
    });
    return createSuccess(occupationData);
  }

}
