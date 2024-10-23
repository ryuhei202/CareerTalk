import { Employee, EmployeeParams } from "../Employee";
import { companyDummy } from "@/domain/core/Company/test/Company.dummy";
import { occupationDummy } from "@/domain/core/Occupation/test/Occupation.dummy";
import { GenderEnum, HiringTypeEnum, MeetingMethodEnum, StatusEnum } from "../Employee";
import { workLocationDummy } from "../../WorkLocation/test/WorkLocation.Dummy";

/**
 * Employeeのダミーデータ
 */
const employeeId = "employeeId00000000000000";
const userId = "userId000000000000000000";
const company = companyDummy;
const occupation = occupationDummy;
const gender = GenderEnum.MALE;
const joiningDate = new Date("2020-01-01");
const status = StatusEnum.PENDING;
const birthday = new Date("1990-01-01");
const workLocation = workLocationDummy;
const hiringType = HiringTypeEnum.NEW_GRADUATE;
const meetingMethod = MeetingMethodEnum.ONLINE;
const selfIntroduction = "自己紹介";
const talkableTopics = "働き方について";

export const employeeDummyParams: EmployeeParams = {
  id: employeeId,
  userId: userId,
  company: company,
  gender: gender,
  birthday: birthday,
  joiningDate: joiningDate,
  occupation: occupation,
  workLocation: workLocation,
  hiringType: hiringType,
  meetingMethod: meetingMethod,
  selfIntroduction: selfIntroduction,
  talkableTopics: talkableTopics,
  status: status,
}
export const employeeDummy =  Employee.create(employeeDummyParams);
