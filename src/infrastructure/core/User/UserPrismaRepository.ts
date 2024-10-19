import { User } from "@/domain/core/User/User";
import { FindUserResult, IUserRepository, UpdateUserResult } from "@/domain/core/User/UserRepository";
import { brand } from "@/util/brand";
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
      id: brand<string, "UserId">(user.id),
      name: !!user.name ? brand<string, "UserName">(user.name) : undefined,
      image: !!user.image ? brand<string, "UserImage">(user.image) : undefined,
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
