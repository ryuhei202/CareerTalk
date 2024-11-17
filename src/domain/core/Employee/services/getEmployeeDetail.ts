import type { GetEmployeeDetailParams } from "@/app/(site)/applicant/search_employees/detail/[employeeUserId]/page";
import type { GenderEnum } from "@/domain/shared/Gender";
import type { HiringTypeEnum } from "@/domain/shared/HiringType";
import type { MeetingMethodEnum } from "@/domain/shared/MeetingMethod";
import type { StatusEnum } from "@/domain/shared/Status";
import { prisma } from "@/lib/prisma";
import { EmployeeDetailDto } from "@/usecase/getEmployeeDetail/EmployeeDetailDTO";
import type { EmployeeDetailResponse } from "@/usecase/getEmployeeDetail/getEmployeeDetailUseCase";
import { NamedError } from "@/util/error";
import { Employee } from "../Employee";

export class GetEmployeeDetailError extends NamedError {
	readonly name = "GetEmployeeDetailError";
}

export const getEmployeeDetail = async (
	params: GetEmployeeDetailParams,
): Promise<EmployeeDetailResponse> => {
	const employeeUserId = params.employeeUserId;

	const employee = await prisma.employee.findUnique({
		where: {
			userId: employeeUserId,
		},
		include: {
			user: true,
			company: true,
			occupation: true,
			workLocation: true,
		},
	});

	if (!employee) {
		throw new GetEmployeeDetailError("選択した現場社員が見つかりません");
	}

	const employeeEntity = Employee.create({
		id: employee.id,
		name: employee.user.name,
		userId: employee.userId,
		occupationId: employee.occupationId,
		companyId: employee.companyId,
		gender: employee.gender as GenderEnum,
		joiningDate: employee.joiningDate,
		status: employee.status as StatusEnum,
		imageUrl: employee.user.image ?? undefined,
		barkerMessage: employee.barkerMessage ?? undefined,
		workLocationId: employee.workLocationId ?? undefined,
		hiringType: (employee.hiringType as HiringTypeEnum) ?? undefined,
		meetingMethod: (employee.meetingMethod as MeetingMethodEnum) ?? undefined,
		selfIntroduction: employee.selfIntroduction ?? undefined,
		talkableTopics: employee.talkableTopics ?? undefined,
		careerDescription: employee.careerDescription ?? undefined,
		jobDescription: employee.jobDescription ?? undefined,
		joiningDescription: employee.joiningDescription ?? undefined,
		otherDescription: employee.otherDescription ?? undefined,
	});

	return new EmployeeDetailDto({
		employee: employeeEntity,
		company: employee.company,
		occupation: employee.occupation,
		workLocation: employee.workLocation ?? undefined,
	}).toJson();
};
