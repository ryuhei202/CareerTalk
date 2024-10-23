
import { Employee } from "@/domain/core/Employee/Employee";;
import { createSuccess } from "@/util/result";
import { PrismaClient } from "@prisma/client";
import { toGenderEnum, toHiringTypeEnum, toMeetingMethodEnum, toStatusEnum } from "./toEntityEnumFunctions";
import { EmployeeRepository, FindEmployeeResult, SaveEmployeeResult, UpdateEmployeeResult } from "@/domain/core/Employee/repository/EmployeeRepository";
import { Company } from "@/domain/core/Company/Company";
import { Occupation } from "@/domain/core/Occupation/Occupation";
import { WorkLocation } from "@/domain/core/WorkLocation/WorkLocation";

export class EmployeePrismaRepository implements EmployeeRepository {
  constructor(
    private readonly prisma: PrismaClient,
  ) {}

  async findById(employeeId: string): Promise<FindEmployeeResult> {
    const employee = await this.prisma.employee.findUnique({
      where: { id: employeeId },
      include: {
        company: true,
        occupation: true,
        workLocation: true,
      },
    });

    if (employee == null) {
      return createSuccess(undefined);
    }

    const employeeData = Employee.create({
      id: employee.id,
      userId: employee.userId,
      company: Company.create({
        id: employee.company.id,
        name: employee.company.name,
        code: employee.company.code,
      }),
      occupation: Occupation.create({
        id: employee.occupation.id,
        name: employee.occupation.name,
      }),
      gender: toGenderEnum(employee.gender),
      joiningDate: employee.joiningDate,
      status: toStatusEnum(employee.status),
      birthday: employee.birthday ?? undefined,
      workLocation: employee.workLocation ? WorkLocation.create({
        id: employee.workLocation.id,
        name: employee.workLocation.name,
      }) : undefined,
      hiringType: employee.hiringType ? toHiringTypeEnum(employee.hiringType) : undefined,
      meetingMethod: employee.meetingMethod ? toMeetingMethodEnum(employee.meetingMethod) : undefined,
      selfIntroduction: employee.selfIntroduction ?? undefined,
      talkableTopics: employee.talkableTopics ?? undefined,
    });

    return createSuccess(employeeData);
  }

  async save(employee: Employee): Promise<SaveEmployeeResult> {
    await this.prisma.employee.create({
      data: {
        id: employee.id,
        userId: employee.userId,
        companyId: employee.company.id,
        gender: employee.gender,
        birthday: employee.birthday,
        joiningDate: employee.joiningDate,
        occupationId: employee.occupation.id,
        workLocationId: employee.workLocation?.id,
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
        companyId: employee.company.id,
        gender: employee.gender,
        birthday: employee.birthday,
        joiningDate: employee.joiningDate,
        occupationId: employee.occupation.id,
        workLocationId: employee.workLocation?.id,
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
