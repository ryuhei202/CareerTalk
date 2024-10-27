import type {
	Employee,
	EmployeeStatus,
	Gender,
	HiringType,
	MeetingMethod,
	PrismaPromise,
} from "@prisma/client";
import { prisma } from "..";
import fixture from "./fixture.json";

export const employee = () => {
	const res: PrismaPromise<Employee>[] = [];
	for (const data of fixture) {
		const row = prisma.employee.upsert({
			where: { id: data.id },
			update: {
				...data,
				gender: data.gender as Gender,
				hiringType: data.hiringType as HiringType,
				meetingMethod: data.meetingMethod as MeetingMethod,
				status: data.status as EmployeeStatus,
			},
			create: {
				...data,
				gender: data.gender as Gender,
				hiringType: data.hiringType as HiringType,
				meetingMethod: data.meetingMethod as MeetingMethod,
				status: data.status as EmployeeStatus,
			},
		});
		res.push(row);
	}
	return res;
};
