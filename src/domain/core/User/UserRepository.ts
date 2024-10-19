import { Result } from "@/util/result";
import { User, UserId } from "./User";

export type FindUserResult = Result<User | undefined, never>;
export type UpdateUserResult = Result<void, never>;

/**
 * UserRepository
 */
export interface IUserRepository {
  findById(userId: UserId): Promise<FindUserResult>;
  update(user: User): Promise<UpdateUserResult>;
}
