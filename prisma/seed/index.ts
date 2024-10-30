import { PrismaClient } from "@prisma/client";
import { company } from "./company";
import { conversationPurpose } from "./conversationPurpose";
import { occupation } from "./occupation";
// import { employee } from "./employee";
// import { user } from "./user";
import { workLocation } from "./worklocation";
export const prisma = new PrismaClient();

const main = async () => {
	console.log("Start seeding ...");
	await prisma.$transaction([
		...occupation(),
		...company(),
		...workLocation(),
		...conversationPurpose(),
		// ...user(),  // テストデータを入れたい時だけコメントアウトをはずしてください
		// ...employee(),
	]);
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
