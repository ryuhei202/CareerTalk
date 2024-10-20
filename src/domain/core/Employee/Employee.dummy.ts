import { Employee } from "./Employee";
import { companyDummy } from "@/domain/core/Company/Company.dummy";
import { occupationDummy } from "@/domain/core/Occupation/Occupation.dummy";
import { createId } from "@paralleldrive/cuid2";
import { GenderEnum, HiringTypeEnum, MeetingMethodEnum, StatusEnum } from "./Employee";
import { userDummy } from "../User/User.dummy";

/**
 * Employeeのダミーデータ
 */
const employeeId = createId();
const userId = userDummy.id;
const companyId = companyDummy.id;
const occupationId = occupationDummy.id;
const gender = GenderEnum.MALE;
const birthday = new Date("1990-01-01");
const joiningDate = new Date("2020-01-01");
const workLocationId = 1;
const hiringType = HiringTypeEnum.NEW_GRADUATE;
const meetingMethod = MeetingMethodEnum.ONLINE;
const selfIntroduction = "自己紹介";
const talkableTopics = "働き方について";
const status = StatusEnum.PENDING;



export const employeeDummy =  Employee.create({
  id: employeeId,
  userId: userId,
  companyId: companyId,
  gender: gender,
  birthday: birthday,
  joiningDate: joiningDate,
  occupationId: occupationId,
  workLocationId: workLocationId,
  hiringType: hiringType,
  meetingMethod: meetingMethod,
  selfIntroduction: selfIntroduction,
  talkableTopics: talkableTopics,
  status: status,
});
