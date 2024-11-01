import type { SearchEmployeeParams } from "@/app/(site)/applicant/search_employees/page";
import type { GenderEnum } from "@/domain/shared/Gender";
import type { HiringTypeEnum } from "@/domain/shared/HiringType";
import type { MeetingMethodEnum } from "@/domain/shared/MeetingMethod";
import type { StatusEnum } from "@/domain/shared/Status";
import { prisma } from "@/lib/prisma";
import { EmployeeDTO } from "@/usecase/dto/Employee/EmployeeDTO";
import type { SearchEmployeeResponse } from "@/usecase/getFilteredEmployees";
import { getExperienceYearsAgo } from "@/util/date";
import { NamedError } from "@/util/error";
import { Employee } from "../Employee";

export class FilterEmployeeError extends NamedError {
	readonly name = "FilterEmployeeError";
}

export const filterEmployees = async (
	params: SearchEmployeeParams,
): Promise<SearchEmployeeResponse> => {
	const page = params.page ?? 1;
	const limit = 10;
	const offset = (page - 1) * limit;
	const {
		companyId,
		occupationId,
		yearsOfExperience,
		hiringType,
		meetingMethod,
	} = params.filter;

	const { minJoiningDate, maxJoiningDate } = yearsOfExperience
		? getExperienceYearsAgo(yearsOfExperience)
		: { minJoiningDate: undefined, maxJoiningDate: undefined };

	// すでにリクエストを送信した転職希望者は除外
	const existingConversations = await prisma.conversation.findMany({
		where: { applicantUserId: params.applicantUserId },
		include: {
			employee: true,
		},
	});
	const existingEmployeeUserIds = existingConversations.map(
		(c) => c.employee.userId,
	);
	const whereCondition = {
		companyId,
		occupationId,
		joiningDate: {
			gte: minJoiningDate,
			lte: maxJoiningDate,
		},
		hiringType,
		meetingMethod,
		NOT: {
			userId: { in: existingEmployeeUserIds },
		},
	};

	const [totalCount, employees] = await Promise.all([
		prisma.employee.count({
			where: whereCondition,
		}),
		prisma.employee.findMany({
			where: whereCondition,
			include: {
				user: true,
				company: true,
				occupation: true,
				workLocation: true,
			},
			skip: offset,
			take: limit,
		}),
	]);

	const result = employees.map((employee) => {
		const employeeEntity = Employee.create({
			id: employee.id,
			name: employee.user.name,
			userId: employee.userId,
			companyId: employee.companyId,
			occupationId: employee.occupationId,
			gender: employee.gender as GenderEnum,
			status: employee.status as StatusEnum,
			joiningDate: employee.joiningDate,
			birthday: employee.birthday ?? undefined,
			imageUrl: employee.user.image ?? undefined,
			workLocationId: employee.workLocationId ?? undefined,
			hiringType: (employee.hiringType as HiringTypeEnum) ?? undefined,
			meetingMethod: (employee.meetingMethod as MeetingMethodEnum) ?? undefined,
			selfIntroduction: employee.selfIntroduction ?? undefined,
			talkableTopics: employee.talkableTopics ?? undefined,
		});

		return new EmployeeDTO({
			employee: employeeEntity,
			company: employee.company,
			occupation: employee.occupation,
			workLocation: employee.workLocation ?? undefined,
		}).toJson();
	});

	return {
		totalCount,
		employees: result,
	};
};
