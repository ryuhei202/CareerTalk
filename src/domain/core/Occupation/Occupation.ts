import { OccupationId } from "./OccupationId/OccupationId";
import { OccupationName } from "./OccupationName/OccupationName";

/**
 * Occupationエンティティ
 */
export class Occupation {
  private constructor(
    private readonly _id: OccupationId,
    private readonly _name: OccupationName,
  ) {}

  static create(params: {
    id: OccupationId;
    name: OccupationName;
  }): Occupation {
    return new Occupation(
      params.id,
      params.name,
    );
  }

  static reconstruct(params: {
    id: OccupationId;
    name: OccupationName;
  }): Occupation {
    return new Occupation(
      params.id,
      params.name,
    );
  }

  get id(): OccupationId {
    return this._id;
  }

  get name(): OccupationName {
    return this._name;
  }
}
