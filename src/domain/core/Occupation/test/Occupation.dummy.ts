import { Occupation } from "../Occupation";

/**
 * Occupationのダミーデータ
 */
const occupationId = 1;
const occupationName = "エンジニア";

export const occupationDummyParams = {
	id: occupationId,
	name: occupationName,
};
export const occupationDummy = Occupation.create(occupationDummyParams);

export const occupationDummy2 = Occupation.create({
	id: 2,
	name: "デザイナー",
});
