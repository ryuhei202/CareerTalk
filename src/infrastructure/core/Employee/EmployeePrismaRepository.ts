import { CompanyId } from "@/domain/core/Company/CompanyId/CompanyId";
import { Birthday } from "@/domain/core/Employee/Birthday/Birthday";
import { Employee } from "@/domain/core/Employee/Employee";
import { EmployeeId } from "@/domain/core/Employee/EmployeeId/EmployeeId";
import { EmployeeRepository, FindEmployeeResult, SaveEmployeeResult, UpdateEmployeeResult } from "@/domain/core/Employee/EmployeeRepository";
import { Gender, GenderEnum } from "@/domain/core/Employee/Gender/Gender";
import { HiringType, HiringTypeEnum } from "@/domain/core/Employee/HiringType/HiringType";
import { JoiningDate } from "@/domain/core/Employee/JoiningDate/JoiningDate";
import { MeetingMethod, MeetingMethodEnum } from "@/domain/core/Employee/MeetingMethod/MeetingMethod";
import { SelfIntroduction } from "@/domain/core/Employee/SelfIntroduction/SelfIntroduction";
import { TalkableTopics } from "@/domain/core/Employee/TalkableTopics/TalkableTopics";
import { WorkLocationId } from "@/domain/core/Employee/WorkLocationId/WorkLocationId";
import { OccupationId } from "@/domain/core/Occupation/OccupationId/OccupationId";
import { Status, StatusEnum } from "@/domain/core/shared/Status/Status";
import { UserId } from "@/domain/core/User/UserId/UserId";
import { createSuccess } from "@/util/result";
import { $Enums, PrismaClient } from "@prisma/client";

export class EmployeePrismaRepository implements EmployeeRepository {
  constructor(
    private readonly prisma: PrismaClient,
  ) {}

  private fromGenderEntity(
    gender: GenderEnum
  ): $Enums.Gender | null {
    switch (gender) {
      case GenderEnum.OTHER:
        return 'OTHER';
      case GenderEnum.MALE:
        return 'MALE';
      case GenderEnum.FEMALE:
        return 'FEMALE';
      case GenderEnum.PREFER_NOT_TO_SAY:
        return 'PREFER_NOT_TO_SAY';
      default:
        return null;
    }
  }
  private toGenderEntity(gender: $Enums.Gender | null): Gender {
    switch (gender) {
      case 'OTHER':
        return new Gender(GenderEnum.OTHER);
      case 'MALE':
        return new Gender(GenderEnum.MALE);
      case 'FEMALE':
        return new Gender(GenderEnum.FEMALE);
      case 'PREFER_NOT_TO_SAY':
        return new Gender(GenderEnum.PREFER_NOT_TO_SAY);
      default:
        return new Gender(undefined);
    }
  }

  private toHiringEntity(hiringType: $Enums.HiringType | null): HiringType {
    switch (hiringType) {
      case "NEW_GRADUATE":
        return new HiringType(HiringTypeEnum.NEW_GRADUATE);
      case "MID_CAREER":
        return new HiringType(HiringTypeEnum.MID_CAREER);
      default:
        return new HiringType(undefined);
    }
  }

  private toMeetingMethodEntity(meetingMethod: $Enums.MeetingMethod | null): MeetingMethod {
    switch (meetingMethod) {
      case "ONLINE":
        return new MeetingMethod(MeetingMethodEnum.ONLINE);
      case "OFFLINE":
        return new MeetingMethod(MeetingMethodEnum.OFFLINE);
      case "BOTH":
        return new MeetingMethod(MeetingMethodEnum.BOTH);
      default:
        return new MeetingMethod(undefined);
    }
  }

  private toStatusEntity(status: $Enums.EmployeeStatus | null): Status {
    switch (status) {
      case "PENDING":
        return new Status(StatusEnum.PENDING);
      case "APPROVED":
        return new Status(StatusEnum.APPROVED);
      case "REJECTED":
        return new Status(StatusEnum.REJECTED);
      default:
        return new Status(undefined);
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
      id: new EmployeeId(employee.id),
      userId: new UserId(employee.userId),
      companyId: new CompanyId(employee.companyId),
      gender: this.toGenderEntity(employee.gender),
      birthday: new Birthday(employee.birthday ?? undefined),
      joiningDate: new JoiningDate(employee.joiningDate),
      occupationId: new OccupationId(employee.occupationId),
      workLocationId: new WorkLocationId(employee.workLocationId ?? undefined),
      hiringType: this.toHiringEntity(employee.hiringType),
      meetingMethod: this.toMeetingMethodEntity(employee.meetingMethod),
      selfIntroduction: new SelfIntroduction(employee.selfIntroduction),
      talkableTopics: new TalkableTopics(employee.talkableTopics),
      status: this.toStatusEntity(employee.status),
    });

    return createSuccess(employeeData);
  }

  async save(employee: Employee): Promise<SaveEmployeeResult> {
    await this.prisma.employee.create({
      data: {
        id: employee.id.value,
        userId: employee.userId.value,
        companyId: employee.companyId.value,
        gender: employee.gender.value,
        birthday: employee.birthday.value,
        joiningDate: employee.joiningDate.value,
        occupationId: employee.occupationId.value,
        workLocationId: employee.workLocationId.value,
        hiringType: employee.hiringType.value,
        meetingMethod: employee.meetingMethod.value,
        selfIntroduction: employee.selfIntroduction.value,
        talkableTopics: employee.talkableTopics.value,
        status: employee.status.value,
      },
    });

    return createSuccess(undefined);
  }

  async update(employee: Employee): Promise<UpdateEmployeeResult> {
    await this.prisma.employee.update({
      where: { id: employee.id.value },
      data: {
        userId: employee.userId.value,
        companyId: employee.companyId.value,
        gender: employee.gender.value,
        birthday: employee.birthday.value,
        joiningDate: employee.joiningDate.value,
        occupationId: employee.occupationId.value,
        workLocationId: employee.workLocationId.value,
        hiringType: employee.hiringType.value,
        meetingMethod: employee.meetingMethod.value,
        selfIntroduction: employee.selfIntroduction.value,
        talkableTopics: employee.talkableTopics.value,
        status: employee.status.value,
      },
    });

    return createSuccess(undefined);
  }
}
