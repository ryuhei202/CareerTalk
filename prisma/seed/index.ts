import { PrismaClient } from "@prisma/client";
import { employeeImage } from "./EmployeeImage";
import { company } from "./company";
import { employee } from "./employee";
import { occupation } from "./occupation";
import { user } from "./user";
import { workLocation } from "./worklocation";
export const prisma = new PrismaClient();

const main = async () => {
	console.log("Start seeding ...");

	// 基本データは常に実行
	const baseOperations = [
		...occupation(),
		...company(),
		...workLocation(),
		...employeeImage(),
	];

	// 開発環境の場合のみユーザーと従業員データを追加
	const operations =
		process.env.NODE_ENV === "development"
			? [...baseOperations, ...user(), ...employee()]
			: baseOperations;

	await prisma.$transaction(operations);

	console.log("Seeding finished.");
};

main()
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
