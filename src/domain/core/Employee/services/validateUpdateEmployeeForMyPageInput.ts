import type { UpdateEmployeeForMyPageParams } from "@/app/(site)/employee/my_page/edit/_actions/updateEmployeeForMyPageAction";
import type { GenderEnum } from "@/domain/shared/Gender";
import type { HiringTypeEnum } from "@/domain/shared/HiringType";
import type { MeetingMethodEnum } from "@/domain/shared/MeetingMethod";
import { StatusEnum } from "@/domain/shared/Status";
import { prisma } from "@/lib/prisma";
import { NamedError } from "@/util/error";
import { Employee } from "../Employee";

export class InvalidUpdateEmployeeForMyPageInputError extends NamedError {
	readonly name = "InvalidUpdateEmployeeForMyPageInputError";
}

export const validateUpdateEmployeeForMyPageInput = async (
	params: UpdateEmployeeForMyPageParams,
): Promise<Employee> => {
	// 全てのクエリを並列実行
	const [employee, occupation, workLocation] = await Promise.all([
		prisma.employee.findUnique({
			where: { userId: params.userId },
			include: {
				user: true,
			},
		}),
		prisma.occupation.findUnique({
			where: { id: params.occupationId },
		}),
		params.workLocationId
			? prisma.workLocation.findUnique({
					where: { id: params.workLocationId },
				})
			: Promise.resolve(null),
	]);
	if (!employee) {
		throw new InvalidUpdateEmployeeForMyPageInputError("不正なユーザーIDです");
	}
	if (!occupation) {
		throw new InvalidUpdateEmployeeForMyPageInputError("不正な職種です");
	}
	if (params.workLocationId && !workLocation) {
		throw new InvalidUpdateEmployeeForMyPageInputError("不正な勤務地です");
	}

	// Employeeインスタンスの作成
	const employeeEntity = Employee.create({
		id: employee.id,
		name: employee.user.name,
		userId: employee.userId,
		occupationId: occupation.id,
		gender: employee.gender as GenderEnum,
		joiningDate: employee.joiningDate,
		status: StatusEnum.PENDING,
		// imageUrl: employee.imageUrl ?? undefined,
		workLocationId: employee.workLocationId ?? undefined,
		hiringType: (employee.hiringType as HiringTypeEnum) ?? undefined,
		meetingMethod: (employee.meetingMethod as MeetingMethodEnum) ?? undefined,
		talkableTopics: employee.talkableTopics ?? undefined,
		barkerMessage: employee.barkerMessage ?? undefined,
		companyId: employee.companyId, // companyIdを追加
	});
	employeeEntity.changeName(params.name);
	employeeEntity.changeOccupationId(params.occupationId);
	employeeEntity.changeHiringType(
		(params.hiringType as HiringTypeEnum) ?? undefined,
	);
	if (params.workLocationId)
		employeeEntity.changeWorkLocationId(params.workLocationId);
	employeeEntity.changeMeetingMethod(
		(params.meetingMethod as MeetingMethodEnum) ?? undefined,
	);
	if (params.talkableTopics)
		employeeEntity.changeTalkableTopics(params.talkableTopics);
	if (params.careerDescription)
		employeeEntity.changeCareerDescription(params.careerDescription);
	if (params.jobDescription)
		employeeEntity.changeJobDescription(params.jobDescription);
	if (params.joiningDescription)
		employeeEntity.changeJoiningDescription(params.joiningDescription);
	if (params.otherDescription)
		employeeEntity.changeOtherDescription(params.otherDescription);
	if (params.barkerMessage)
		employeeEntity.changeBarkerMessage(params.barkerMessage);

	return employeeEntity;
};
