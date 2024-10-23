import { WorkLocation } from "../WorkLocation";
import { Result } from "@/util/result";

export type FindWorkLocationResult = Result<WorkLocation | undefined, never>;
export interface WorkLocationRepository {
  findById(workLocationId: number): Promise<FindWorkLocationResult>;
}
