import { Occupation } from "@/domain/core/Occupation/Occupation";
import type {
	FindOccupationResult,
	OccupationRepository,
} from "@/domain/core/Occupation/repository/OccupationRepository";
import { createSuccess } from "@/util/result";
import type { PrismaClient } from "@prisma/client";

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
}
