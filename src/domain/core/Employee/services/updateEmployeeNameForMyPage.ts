import { prisma } from "@/lib/prisma";
import type { User } from "@prisma/client";
import type { Employee } from "../Employee";

export const updateEmployeeNameForMyPage = async (
	employee: Employee,
): Promise<User> => {
	// 現場社員更新（トランザクション内で実行）
	const updatedUser = await prisma.$transaction(async (tx) => {
		const result = await tx.user.update({
			where: {
				id: employee.userId,
			},
			data: {
				name: employee.name,
			},
		});
		return result;
	});
	return updatedUser;
};
