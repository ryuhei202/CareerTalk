import type { GetEmployeeDetailParams } from "@/app/(site)/applicant/detail/[employeeId]/page";
import type { GenderEnum } from "@/domain/shared/Gender";
import type { HiringTypeEnum } from "@/domain/shared/HiringType";
import type { MeetingMethodEnum } from "@/domain/shared/MeetingMethod";
import type { StatusEnum } from "@/domain/shared/Status";
import { prisma } from "@/lib/prisma";
import {
	EmployeeDetailDto,
	type EmployeeDetailResponse,
} from "@/usecase/dto/Employee/EmployeeDetailDto";
import { NamedError } from "@/util/error";
import { Employee } from "../Employee";

export class GetEmployeeDetailError extends NamedError {
	readonly name = "GetEmployeeDetailError";
}

export const getEmployeeDetail = async (
	params: GetEmployeeDetailParams,
): Promise<EmployeeDetailResponse> => {
	const employeeId = params.employeeId;

	const employee = await prisma.employee.findUnique({
		where: {
			id: employeeId,
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
		birthday: employee.birthday ?? undefined,
		workLocationId: employee.workLocationId ?? undefined,
		hiringType: employee.hiringType as HiringTypeEnum,
		meetingMethod: employee.meetingMethod as MeetingMethodEnum,
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
