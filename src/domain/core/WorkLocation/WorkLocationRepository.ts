import { WorkLocation } from "./WorkLocation";
import { Result } from "@/util/result";

export type FindAllWorkLocationResult = Result<WorkLocation[], never>;
export type FindWorkLocationResult = Result<WorkLocation | undefined, never>;
export interface WorkLocationRepository {
  findAll(): Promise<FindAllWorkLocationResult>;
  findById(workLocationId: number): Promise<FindWorkLocationResult>;
}
