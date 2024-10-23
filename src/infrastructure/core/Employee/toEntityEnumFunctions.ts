import { GenderEnum, HiringTypeEnum, MeetingMethodEnum, StatusEnum } from "@/domain/core/Employee/Employee";
import { $Enums } from "@prisma/client";

export const toGenderEnum = (gender: $Enums.Gender): GenderEnum => {
  switch (gender) {
    case 'OTHER':
      return GenderEnum.OTHER;
    case 'MALE':
      return GenderEnum.MALE;
    case 'FEMALE':
      return GenderEnum.FEMALE;
    case 'PREFER_NOT_TO_SAY':
      return GenderEnum.PREFER_NOT_TO_SAY;
  }
}

export const toHiringTypeEnum = (hiringType: $Enums.HiringType ): HiringTypeEnum => {
  switch (hiringType) {
    case "NEW_GRADUATE":
      return HiringTypeEnum.NEW_GRADUATE;
    case "MID_CAREER":
      return HiringTypeEnum.MID_CAREER;
  }
}

export const toMeetingMethodEnum = (meetingMethod: $Enums.MeetingMethod): MeetingMethodEnum => {
  switch (meetingMethod) {
    case "ONLINE":
      return MeetingMethodEnum.ONLINE;
    case "OFFLINE":
      return MeetingMethodEnum.OFFLINE;
    case "BOTH":
      return MeetingMethodEnum.BOTH;
  }
}

export const toStatusEnum = (status: $Enums.EmployeeStatus): StatusEnum => {
  switch (status) {
    case "PENDING":
      return StatusEnum.PENDING;
    case "APPROVED":
      return StatusEnum.APPROVED;
    case "REJECTED":
      return StatusEnum.REJECTED;
  }
}
