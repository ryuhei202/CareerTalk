import { Result } from "@/util/result";
import { Occupation } from "./Occupation";

export type FindAllOccupationResult = Result<Occupation[], never>;
export type FindOccupationResult = Result<Occupation | undefined, never>;
export interface OccupationRepository {
  findAll(): Promise<FindAllOccupationResult>;
  findById(occupationId: number): Promise<FindOccupationResult>;
}
