import type { PrismaPromise, User } from "@prisma/client";
import { prisma } from "..";
import fixture from "./fixture.json";

const rootUrl = process.env.EMPLOYEE_IMAGE_CLOUDFRONT_URL;
const userImages = [
	`${rootUrl}/man/IMG_1043 (1).jpg`,
	`${rootUrl}/man/IMG_1043.jpg`,
	`${rootUrl}/man/IMG_1044.jpg`,
	`${rootUrl}/man/IMG_1045.jpg`,
	`${rootUrl}/woman/IMG_1038.jpg`,
	`${rootUrl}/woman/IMG_1040.jpg`,
	`${rootUrl}/woman/IMG_1041.jpg`,
	`${rootUrl}/woman/IMG_1042.jpg`,
];

const usersWithImage = fixture.map((user, index) => ({
	...user,
	image: userImages[index % userImages.length],
}));

export const user = () => {
	const res: PrismaPromise<User>[] = [];
	for (const data of usersWithImage) {
		const row = prisma.user.upsert({
			where: { id: data.id },
			update: data,
			create: data,
		});
		res.push(row);
	}
	return res;
};
