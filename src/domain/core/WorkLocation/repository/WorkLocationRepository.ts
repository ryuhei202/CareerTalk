import type { Result } from "@/util/result";
import type { WorkLocation } from "../WorkLocation";

export type FindWorkLocationResult = Result<WorkLocation | undefined, never>;
export interface WorkLocationRepository {
	findById(workLocationId: number): Promise<FindWorkLocationResult>;
}
