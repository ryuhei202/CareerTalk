import { Result } from "@/util/result";
import { Occupation } from "./Occupation";

export type FindOccupationResult = Result<Occupation | undefined, never>;
export type SaveOccupationResult = Result<void, never>;

export interface OccupationRepository {
  findById(occupationId: number): Promise<FindOccupationResult>;
}
