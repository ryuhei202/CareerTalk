import type { EmployeeImage, PrismaPromise } from "@prisma/client";
import { prisma } from "..";

const rootUrl = process.env.EMPLOYEE_IMAGE_CLOUDFRONT_URL;
const fixture = [
	{
		id: 1,
		url: `${rootUrl}/man/IMG_1043 (1).jpg`,
	},
	{
		id: 2,
		url: `${rootUrl}/man/IMG_1043.jpg`,
	},
	{
		id: 3,
		url: `${rootUrl}/man/IMG_1044.jpg`,
	},
	{
		id: 4,
		url: `${rootUrl}/man/IMG_1045.jpg`,
	},
	{
		id: 5,
		url: `${rootUrl}/woman/IMG_1038.jpg`,
	},
	{
		id: 6,
		url: `${rootUrl}/woman/IMG_1040.jpg`,
	},
	{
		id: 7,
		url: `${rootUrl}/woman/IMG_1041.jpg`,
	},
	{
		id: 8,
		url: `${rootUrl}/woman/IMG_1042.jpg`,
	},
];

export const employeeImage = () => {
	const res: PrismaPromise<EmployeeImage>[] = [];
	for (const data of fixture) {
		const row = prisma.employeeImage.upsert({
			where: { id: data.id },
			update: {
				url: data.url,
			},
			create: {
				id: data.id,
				url: data.url,
			},
		});
		res.push(row);
	}
	return res;
};
