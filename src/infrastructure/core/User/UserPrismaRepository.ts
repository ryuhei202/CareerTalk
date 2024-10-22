import { Employee } from "@/domain/core/Employee/Employee";
import { User } from "@/domain/core/User/User";
import { FindUserResult, UpdateUserResult, UserRepository } from "@/domain/core/User/UserRepository";
import { createSuccess } from "@/util/result";
import { PrismaClient } from "@prisma/client";
import { toGenderEnum, toHiringTypeEnum, toMeetingMethodEnum, toStatusEnum } from "../Employee/toEntityEnumFunctions";

export class UserPrismaRepository implements UserRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async findById(userId: string): Promise<FindUserResult> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: {
        employee: true,
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
      employee: !!user.employee ? Employee.create({
        id: user.employee.id,
        userId: user.employee.userId,
        companyId: user.employee.companyId,
        occupationId: user.employee.occupationId,
        gender: toGenderEnum(user.employee.gender),
        joiningDate: user.employee.joiningDate,
        status: toStatusEnum(user.employee.status),
        birthday: user.employee.birthday ?? undefined,
        workLocationId: user.employee.workLocationId ?? undefined,
        hiringType: user.employee.hiringType ? toHiringTypeEnum(user.employee.hiringType) : undefined,
        meetingMethod: user.employee.meetingMethod ? toMeetingMethodEnum(user.employee.meetingMethod) : undefined,
        selfIntroduction: user.employee.selfIntroduction ?? undefined,
        talkableTopics: user.employee.talkableTopics ?? undefined,
      }) : undefined,
      jobSeeker: !!user.jobSeeker ? user.jobSeeker : undefined, //　実装待ち
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
