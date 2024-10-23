import { Employee } from "@/domain/core/Employee/Employee";
import { User } from "@/domain/core/User/User";
import { createSuccess } from "@/util/result";
import { PrismaClient } from "@prisma/client";
import { toGenderEnum, toHiringTypeEnum, toMeetingMethodEnum, toStatusEnum } from "../Employee/toEntityEnumFunctions";
import { FindUserResult, UpdateUserResult, UserRepository } from "@/domain/core/User/repository/UserRepository";
import { Company } from "@/domain/core/Company/Company";
import { Occupation } from "@/domain/core/Occupation/Occupation";
import { WorkLocation } from "@/domain/core/WorkLocation/WorkLocation";

export class UserPrismaRepository implements UserRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async findById(userId: string): Promise<FindUserResult> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: {
        employee: {
          include: {
            company: true,
            occupation: true,
            workLocation: true,
          },
        },
        jobSeeker: true,
      },

    });
  
    if (user == null) {
      return createSuccess(undefined);
    }

    const userData = User.create({
      id: user.id,
      name: user.name ?? undefined,
      image: user.image ?? undefined,
      employee: user.employee ? Employee.create({
        id: user.employee.id,
        userId: user.employee.userId,
        company: Company.create({
          id: user.employee.company.id,
          name: user.employee.company.name,
          code: user.employee.company.code,
        }),
        occupation: Occupation.create({
          id: user.employee.occupation.id,
          name: user.employee.occupation.name,
        }),
        gender: toGenderEnum(user.employee.gender),
        joiningDate: user.employee.joiningDate,
        status: toStatusEnum(user.employee.status),
        birthday: user.employee.birthday ?? undefined,
        workLocation: user.employee.workLocation ? WorkLocation.create({
          id: user.employee.workLocation.id,
          name: user.employee.workLocation.name,
        }) : undefined,
        hiringType: user.employee.hiringType ? toHiringTypeEnum(user.employee.hiringType) : undefined,
        meetingMethod: user.employee.meetingMethod ? toMeetingMethodEnum(user.employee.meetingMethod) : undefined,
        selfIntroduction: user.employee.selfIntroduction ?? undefined,
        talkableTopics: user.employee.talkableTopics ?? undefined,
      }) : undefined,
      jobSeeker: user.jobSeeker ? user.jobSeeker : undefined, //　実装待ち
    });

    return createSuccess(userData);
  }

  async update(user: User): Promise<UpdateUserResult> {
    await this.prisma.user.update({
      where: { id: user.id},
      data: {
        name: user.name,
        image: user.image
      },
    });

    return createSuccess(undefined);
  }
}
