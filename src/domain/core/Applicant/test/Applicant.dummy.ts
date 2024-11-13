import { GenderEnum } from "@/domain/shared/Gender";
import { StatusEnum } from "@/domain/shared/Status";
import { Applicant, type ApplicantParams } from "../Applicant";

/**
 * Applicantのダミーデータ
 */
const applicantId = "applicantId00000000000000";
const name = "テスト太郎";
const userId = "userId0000000000000000000";
const occupationId = 1;
const gender = GenderEnum.MALE;
const joiningDate = new Date("2020-01-01");
const status = StatusEnum.PENDING;
const imageUrl = "https://example.com/image.png";
const birthday = new Date("1990-01-01");
const selfIntroduction = "自己紹介";
const company = "テストカンパニー";
const workHistory = "職務経歴";
const education = "東大卒";

export const applicantDummyParams: ApplicantParams = {
	id: applicantId,
	name,
	userId,
	occupationId,
	gender,
	joiningDate,
	status,
	imageUrl,
	birthday,
	selfIntroduction,
	company,
	workHistory,
	education,
};
export const applicantDummy = Applicant.create(applicantDummyParams);
