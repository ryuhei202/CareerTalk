import { Employee } from "./Employee";
import { userDummy } from "@/domain/core/User/User.dummy";
import { companyDummy } from "@/domain/core/Company/Company.dummy";
import { occupationDummy } from "@/domain/core/Occupation/Occupation.dummy";
import { brand } from "@/util/brand";
import { createId } from "@paralleldrive/cuid2";
import { GenderEnum, HiringTypeEnum, MeetingMethodEnum, StatusEnum } from "./Employee";

/**
 * Employeeのダミーデータ
 */
const employeeId = brand<string, "EmployeeId">(createId());
const userId = brand<string, "UserId">(userDummy.id);
const companyId = brand<number, "CompanyId">(companyDummy.id);
const occupationId = brand<number, "OccupationId">(occupationDummy.id);
const gender = brand<GenderEnum, "Gender">(GenderEnum.MALE);
const birthday = brand<Date, "Birthday">(new Date("1990-01-01"));
const joiningDate = brand<Date, "JoiningDate">(new Date("2020-01-01"));
const workLocationId = brand<number, "WorkLocationId">(1);
const hiringType = brand<HiringTypeEnum, "HiringType">(HiringTypeEnum.NEW_GRADUATE);
const meetingMethod = brand<MeetingMethodEnum, "MeetingMethod">(MeetingMethodEnum.ONLINE);
const selfIntroduction = brand<string, "SelfIntroduction">("自己紹介");
const talkableTopics = brand<string, "TalkableTopics">("働き方について");
const status = brand<StatusEnum, "Status">(StatusEnum.PENDING);

export const employeeDummy =  Employee.reconstruct({
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
