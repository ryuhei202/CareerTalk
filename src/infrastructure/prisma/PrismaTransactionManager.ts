import type { ITransactionManager } from "@/application/shared/TransactionManager";
import { prisma } from "@/lib/prisma";
import type { PrismaClientManager } from "./PrismaClientManager";

export class PrismaTransactionManager implements ITransactionManager {
	constructor(private clientManager: PrismaClientManager) {}

	async begin<T>(callback: () => Promise<T>): Promise<T | undefined> {
		return await prisma.$transaction(async (transaction) => {
			this.clientManager.setClient(transaction);

			const res = await callback();
			// リセット
			this.clientManager.setClient(prisma);

			return res;
		});
	}
}
