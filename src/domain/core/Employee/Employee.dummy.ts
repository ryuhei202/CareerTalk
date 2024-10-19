import { EmployeeId } from "./EmployeeId/EmployeeId";
import { UserId } from "@/domain/core/User/UserId/UserId";
import { CompanyId } from "@/domain/core/Company/CompanyId/CompanyId";
import { Gender, GenderEnum } from "./Gender/Gender";
import { Birthday } from "./Birthday/Birthday";
import { JoiningDate } from "./JoiningDate/JoiningDate";
import { OccupationId } from "@/domain/core/Occupation/OccupationId/OccupationId";
import { WorkLocationId } from "./WorkLocationId/WorkLocationId";
import { HiringType, HiringTypeEnum } from "./HiringType/HiringType";
import { MeetingMethod, MeetingMethodEnum } from "./MeetingMethod/MeetingMethod";
import { SelfIntroduction } from "./SelfIntroduction/SelfIntroduction";
import { TalkableTopics } from "./TalkableTopics/TalkableTopics";
import { Status, StatusEnum } from "@/domain/core/shared/Status/Status";
import { Employee } from "./Employee";
import { userDummy } from "@/domain/core/User/User.dummy";
import { companyDummy } from "@/domain/core/Company/Company.dummy";
import { occupationDummy } from "@/domain/core/Occupation/Occupation.dummy";

export const employeeDummy =  Employee.create({
  id: new EmployeeId(),
  userId: new UserId(userDummy.id.value),
  companyId: new CompanyId(companyDummy.id.value),
  gender: new Gender(GenderEnum.MALE),
  birthday: new Birthday(new Date("1990-01-01")),
  joiningDate: new JoiningDate(new Date("2020-01-01")),
  occupationId: new OccupationId(occupationDummy.id.value),
  workLocationId: new WorkLocationId(1),
  hiringType: new HiringType(HiringTypeEnum.NEW_GRADUATE),
  meetingMethod: new MeetingMethod(MeetingMethodEnum.ONLINE),
  selfIntroduction: new SelfIntroduction("自己紹介"),
  talkableTopics: new TalkableTopics("働き方について"),
  status: new Status(StatusEnum.PENDING),
});
