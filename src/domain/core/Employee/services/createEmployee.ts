import { EmployeeDTO } from "@/application/dto/Employee/EmployeeDTO";
import { prisma } from "@/lib/prisma";
import type { Employee } from "../Employee";

export const createEmployee = async (
	employee: Employee,
): Promise<EmployeeDTO> => {
	// 現場社員登録（トランザクション内で実行）
	await prisma.$transaction(async (tx) => {
		await tx.employee.create({
			data: {
				id: employee.id,
				userId: employee.userId,
				companyId: employee.companyId,
				occupationId: employee.occupationId,
				gender: employee.gender,
				joiningDate: employee.joiningDate,
				status: employee.status,
				workLocationId: employee.workLocationId,
				hiringType: employee.hiringType,
				meetingMethod: employee.meetingMethod,
				selfIntroduction: employee.selfIntroduction,
				talkableTopics: employee.talkableTopics,
				birthday: employee.birthday,
			},
		});

		// ユーザー情報更新
		await tx.user.update({
			where: {
				id: employee.userId,
			},
			data: {
				name: employee.name,
				image: employee.imageUrl,
			},
		});
	});

	return new EmployeeDTO(employee);
};
