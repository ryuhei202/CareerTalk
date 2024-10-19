
import { Employee, GenderEnum, HiringTypeEnum, MeetingMethodEnum, StatusEnum } from "@/domain/core/Employee/Employee";
import { EmployeeRepository, FindEmployeeResult, SaveEmployeeResult, UpdateEmployeeResult } from "@/domain/core/Employee/EmployeeRepository";
import { brand } from "@/util/brand";
import { createSuccess } from "@/util/result";
import { $Enums, PrismaClient } from "@prisma/client";

export class EmployeePrismaRepository implements EmployeeRepository {
  constructor(
    private readonly prisma: PrismaClient,
  ) {}

  private toGenderEnum(gender: $Enums.Gender): GenderEnum {
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

  private toHiringTypeEnum(hiringType: $Enums.HiringType ): HiringTypeEnum {
    switch (hiringType) {
      case "NEW_GRADUATE":
        return HiringTypeEnum.NEW_GRADUATE;
      case "MID_CAREER":
        return HiringTypeEnum.MID_CAREER;
    }
  }

  private toMeetingMethodEnum(meetingMethod: $Enums.MeetingMethod): MeetingMethodEnum {
    switch (meetingMethod) {
      case "ONLINE":
        return MeetingMethodEnum.ONLINE;
      case "OFFLINE":
        return MeetingMethodEnum.OFFLINE;
      case "BOTH":
        return MeetingMethodEnum.BOTH;
    }
  }

  private toStatusEnum(status: $Enums.EmployeeStatus): StatusEnum {
    switch (status) {
      case "PENDING":
        return StatusEnum.PENDING;
      case "APPROVED":
        return StatusEnum.APPROVED;
      case "REJECTED":
        return StatusEnum.REJECTED;
    }
  }


  async findById(employeeId: string): Promise<FindEmployeeResult> {
    const employee = await this.prisma.employee.findUnique({
      where: { id: employeeId },
    });

    if (employee == null) {
      return createSuccess(undefined);
    }

    const employeeData = Employee.reconstruct({
      id: brand<string, "EmployeeId">(employee.id),
      userId: brand<string, "UserId">(employee.userId),
      companyId: brand<number, "CompanyId">(employee.companyId),
      occupationId: brand<number, "OccupationId">(employee.occupationId),
      gender: brand<GenderEnum, "Gender">(this.toGenderEnum(employee.gender)),
      joiningDate: brand<Date, "JoiningDate">(employee.joiningDate),
      status: brand<StatusEnum, "Status">(this.toStatusEnum(employee.status)),
      birthday: employee.birthday ? brand<Date, "Birthday">(employee.birthday) : undefined,
      workLocationId: employee.workLocationId ? brand<number, "WorkLocationId">(employee.workLocationId) : undefined,
      hiringType: employee.hiringType ? brand<HiringTypeEnum, "HiringType">(this.toHiringTypeEnum(employee.hiringType)) : undefined,
      meetingMethod: employee.meetingMethod ? brand<MeetingMethodEnum, "MeetingMethod">(this.toMeetingMethodEnum(employee.meetingMethod)) : undefined,
      selfIntroduction: brand<string, "SelfIntroduction">(employee.selfIntroduction),
      talkableTopics: brand<string, "TalkableTopics">(employee.talkableTopics),
    });

    return createSuccess(employeeData);
  }

  async save(employee: Employee): Promise<SaveEmployeeResult> {
    await this.prisma.employee.create({
      data: {
        id: employee.id,
        userId: employee.userId,
        companyId: employee.companyId,
        gender: employee.gender,
        birthday: employee.birthday,
        joiningDate: employee.joiningDate,
        occupationId: employee.occupationId,
        workLocationId: employee.workLocationId,
        hiringType: employee.hiringType,
        meetingMethod: employee.meetingMethod,
        selfIntroduction: employee.selfIntroduction,
        talkableTopics: employee.talkableTopics,
        status: employee.status,
      },
    });

    return createSuccess(undefined);
  }

  async update(employee: Employee): Promise<UpdateEmployeeResult> {
    await this.prisma.employee.update({
      where: { id: employee.id },
      data: {
        userId: employee.userId,
        companyId: employee.companyId,
        gender: employee.gender,
        birthday: employee.birthday,
        joiningDate: employee.joiningDate,
        occupationId: employee.occupationId,
        workLocationId: employee.workLocationId,
        hiringType: employee.hiringType,
        meetingMethod: employee.meetingMethod,
        selfIntroduction: employee.selfIntroduction,
        talkableTopics: employee.talkableTopics,
        status: employee.status,
      },
    });

    return createSuccess(undefined);
  }
}
