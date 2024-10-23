import { employeeDummy } from "../../Employee/test/Employee.dummy";
import { User } from "../User";

/**
 * Userのダミーデータ
 */
export const userId = "userId000000000000000000";
const userName = "テストユーザー";
const userImage = "https://example.com/image.png";

export const userDummyParams = {
	id: userId,
	name: userName,
	image: userImage,
};

export const userDummy = User.create(userDummyParams);
export const userDummyWithEmployee = User.create({
	...userDummyParams,
	employee: employeeDummy,
});
