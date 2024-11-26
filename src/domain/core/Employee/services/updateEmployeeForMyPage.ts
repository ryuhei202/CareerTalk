import { prisma } from "@/lib/prisma";
import type { Employee } from "../Employee";

export const updateEmployeeForMyPage = async (
	employee: Employee,
): Promise<Employee> => {
	// 現場社員更新（トランザクション内で実行）
	await prisma.$transaction(async (tx) => {
		await tx.employee.update({
			where: {
				id: employee.id,
			},
			data: {
				occupationId: employee.occupationId,
				workLocationId: employee.workLocationId,
				hiringType: employee.hiringType,
				meetingMethod: employee.meetingMethod,
				talkableTopics: employee.talkableTopics,
				otherDescription: employee.otherDescription,
				careerDescription: employee.careerDescription,
				jobDescription: employee.jobDescription,
				joiningDescription: employee.joiningDescription,
				barkerMessage: employee.barkerMessage,
			},
		});

		await tx.user.update({
			where: {
				id: employee.userId,
			},
			data: {
				name: employee.name,
			},
		});
	});
	return employee;
};
