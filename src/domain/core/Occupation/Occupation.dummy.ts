import { Occupation } from "./Occupation";
import { OccupationId } from "./OccupationId/OccupationId";
import { OccupationName } from "./OccupationName/OccupationName";

export const occupationDummy = Occupation.create({
  id: new OccupationId(1),
  name: new OccupationName("テスト職種"),
});
