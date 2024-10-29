import { GenderEnum } from "@/domain/shared/Gender";
import { HiringTypeEnum } from "@/domain/shared/HiringType";
import { MeetingMethodEnum } from "@/domain/shared/MeetingMethod";
import { StatusEnum } from "@/domain/shared/Status";
import { Employee, type EmployeeParams } from "../Employee";

/**
 * Employeeのダミーデータ
 */
const employeeId = "employeeId000000000000000";
const name = "テスト太郎";
const imageUrl = "https://example.com/image.png";
const userId = "userId0000000000000000000";
const companyId = 1;
const occupationId = 1;
const gender = GenderEnum.MALE;
const joiningDate = new Date("2020-01-01");
const status = StatusEnum.PENDING;
const birthday = new Date("1990-01-01");
const workLocationId = 1;
const hiringType = HiringTypeEnum.NEW_GRADUATE;
const meetingMethod = MeetingMethodEnum.ONLINE;
const selfIntroduction = "自己紹介";
const talkableTopics = "働き方について";
const careerDescription =
	"現在はSI事業部デジタルコマースユニットで旅行会社の予約サイト運用保守を行なっております。";
const jobDescription = "フロントエンド開発を行なっております。";
const joiningDescription =
	"前職でアプリの運用保守を行なっていましたが、マネジメントに興味がありました。";
const otherDescription = "その他";

export const employeeDummyParams: EmployeeParams = {
	id: employeeId,
	name: name,
	imageUrl: imageUrl,
	userId: userId,
	companyId: companyId,
	occupationId: occupationId,
	gender: gender,
	birthday: birthday,
	joiningDate: joiningDate,
	workLocationId: workLocationId,
	hiringType: hiringType,
	meetingMethod: meetingMethod,
	selfIntroduction: selfIntroduction,
	talkableTopics: talkableTopics,
	status: status,
	careerDescription: careerDescription,
	jobDescription: jobDescription,
	joiningDescription: joiningDescription,
	otherDescription: otherDescription,
};
export const employeeDummy = Employee.create(employeeDummyParams);
