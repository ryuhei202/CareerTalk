import { Result } from "@/util/result";
import { User } from "./User";

export type FindUserResult = Result<User | undefined, never>;
export type SaveUserResult = Result<void, never>;
export type UpdateUserResult = Result<void, never>;

export interface IUserRepository {
  save(user: User): Promise<SaveUserResult>;
  findById(userId: string): Promise<FindUserResult>;
  update(user: User): Promise<UpdateUserResult>;
}
