import { Occupation } from "@/domain/core/Occupation/Occupation";
import { FindAllOccupationResult, FindOccupationResult, OccupationRepository } from "@/domain/core/Occupation/OccupationRepository";
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

    const occupationData = Occupation.create({
      id: occupation.id,
      name: occupation.name,
    });

    return createSuccess(occupationData);
  }  

  
  async findAll(): Promise<FindAllOccupationResult> {
    const occupations = await this.prisma.occupation.findMany();
    const occupationData = occupations.map((occupation) => {
      return Occupation.create({
        id: occupation.id,
        name: occupation.name,
      });
    });
    return createSuccess(occupationData);
  }

}