import { User } from "@/domain/core/User/User";
import { UserId } from "@/domain/core/User/UserId/UserId";
import { UserName } from "@/domain/core/User/UserName/UserName";
import { FindUserResult, IUserRepository, SaveUserResult, UpdateUserResult } from "@/domain/core/User/UserRepository";
import { Image } from "@/domain/core/User/Image/Image";
import { createSuccess } from "@/util/result";
import { PrismaClient } from "@prisma/client";

export class UserPrismaRepository implements IUserRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async findById(userId: string): Promise<FindUserResult> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });
    if (user == null) {
      return createSuccess(undefined);
    }

    const userData = User.reconstruct({
      id: new UserId(user.id),
      name: new UserName(user.name ?? undefined),
      image: new Image(user.image ?? undefined),
    });

    return createSuccess(userData);
  }

  async save(user: User): Promise<SaveUserResult> {
    await this.prisma.user.create({
      data: {
        id: user.id.value,
        name: user.name.value,
        image: user.image.value,
      },
    });

    return createSuccess(undefined);
  }

  async update(user: User): Promise<UpdateUserResult> {
    await this.prisma.user.update({
      where: { id: user.id.value },
      data: {
        name: user.name.value,
        image: user.image.value,
      },
    });

    return createSuccess(undefined);
  }
}
