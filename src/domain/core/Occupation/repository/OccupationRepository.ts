import type { Result } from "@/util/result";
import type { Occupation } from "../Occupation";

export type FindOccupationResult = Result<Occupation | undefined, never>;
export interface OccupationRepository {
	findById(occupationId: number): Promise<FindOccupationResult>;
}
