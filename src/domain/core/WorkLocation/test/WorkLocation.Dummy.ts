import { WorkLocation } from "../WorkLocation";

/**
 * WorkLocationのダミーデータ
 */
const workLocationId = 1;
const workLocationName = "北海道";

export const workLocationDummyParams = {
	id: workLocationId,
	name: workLocationName,
};
export const workLocationDummy = WorkLocation.create(workLocationDummyParams);

export const workLocationDummy2 = WorkLocation.create({
	id: 2,
	name: "青森県",
});
