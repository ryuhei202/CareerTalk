import { Employee, type EmployeeParams } from "../Employee";
import {
	GenderEnum,
	HiringTypeEnum,
	MeetingMethodEnum,
	StatusEnum,
} from "../Employee";

/**
 * Employeeのダミーデータ
 */
const employeeId = "employeeId000000000000000";
const name = "テスト太郎";
const imageUrl = "https://example.com/image.png";
const userId = "userId0000000000000000000";
const company_id = 1;
const occupation_id = 1;
const gender = GenderEnum.MALE;
const joiningDate = new Date("2020-01-01");
const status = StatusEnum.PENDING;
const birthday = new Date("1990-01-01");
const workLocation_id = 1;
const hiringType = HiringTypeEnum.NEW_GRADUATE;
const meetingMethod = MeetingMethodEnum.ONLINE;
const selfIntroduction = "自己紹介";
const talkableTopics = "働き方について";

export const employeeDummyParams: EmployeeParams = {
	id: employeeId,
	name: name,
	imageUrl: imageUrl,
	userId: userId,
	company_id: company_id,
	occupation_id: occupation_id,
	gender: gender,
	birthday: birthday,
	joiningDate: joiningDate,
	workLocation_id: workLocation_id,
	hiringType: hiringType,
	meetingMethod: meetingMethod,
	selfIntroduction: selfIntroduction,
	talkableTopics: talkableTopics,
	status: status,
};
export const employeeDummy = Employee.create(employeeDummyParams);
