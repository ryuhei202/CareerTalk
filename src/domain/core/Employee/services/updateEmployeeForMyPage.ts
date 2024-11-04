import { prisma } from "@/lib/prisma";
import type { Employee as PrismaEmployee } from "@prisma/client";
import type { Employee } from "../Employee";

export const updateEmployeeForMyPage = async (
	employee: Employee,
): Promise<PrismaEmployee> => {
	// 現場社員更新（トランザクション内で実行）
	const updatedEmployee = await prisma.$transaction(async (tx) => {
		const result = await tx.employee.update({
			where: {
				id: employee.id,
			},
			data: {
				occupationId: employee.occupationId,
				workLocationId: employee.workLocationId,
				hiringType: employee.hiringType,
				meetingMethod: employee.meetingMethod,
				selfIntroduction: employee.selfIntroduction,
				talkableTopics: employee.talkableTopics,
				otherDescription: employee.otherDescription,
				careerDescription: employee.careerDescription,
				jobDescription: employee.jobDescription,
				joiningDescription: employee.joiningDescription,
			},
		});
		return result;
	});
	return updatedEmployee;
};
