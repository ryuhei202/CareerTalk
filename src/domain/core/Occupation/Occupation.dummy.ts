import { Occupation } from "./Occupation";
import { brand } from "@/util/brand";


/**
 * Occupationのダミーデータ
 */
const occupationId = brand<number, "OccupationId">(1);
const occupationName = brand<string, "OccupationName">("エンジニア");

export const occupationDummy = Occupation.reconstruct({
  id: occupationId,
  name: occupationName,
});


