import type { Result } from "@/util/result";
import type { User } from "../User";

export type FindUserResult = Result<User | undefined, never>;
export type UpdateUserResult = Result<void, never>;

/**
 * UserRepository
 */
export interface UserRepository {
	findById(userId: string): Promise<FindUserResult>;
	update(user: User): Promise<UpdateUserResult>;
}
