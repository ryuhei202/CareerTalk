
import { Employee } from "@/domain/core/Employee/Employee";;
import { createSuccess } from "@/util/result";
import { PrismaClient } from "@prisma/client";
import { toGenderEnum, toHiringTypeEnum, toMeetingMethodEnum, toStatusEnum } from "./toEntityEnumFunctions";
import { EmployeeRepository, FindEmployeeResult, SaveEmployeeResult, UpdateEmployeeResult } from "@/domain/core/Employee/repository/EmployeeRepository";

export class EmployeePrismaRepository implements EmployeeRepository {
  constructor(
    private readonly prisma: PrismaClient,
  ) {}

  

  async findById(employeeId: string): Promise<FindEmployeeResult> {
    const employee = await this.prisma.employee.findUnique({
      where: { id: employeeId },
    });

    if (employee == null) {
      return createSuccess(undefined);
    }

    const employeeData = Employee.create({
      id: employee.id,
      userId: employee.userId,
      companyId: employee.companyId,
      occupationId: employee.occupationId,
      gender: toGenderEnum(employee.gender),
      joiningDate: employee.joiningDate,
      status: toStatusEnum(employee.status),
      birthday: employee.birthday ?? undefined,
      workLocationId: employee.workLocationId ?? undefined,
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
