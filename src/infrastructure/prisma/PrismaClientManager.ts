import { prisma } from "@/lib/prisma";
import type { Prisma, PrismaClient } from "@prisma/client";
import type { IDataAccessClientManager } from "../shared/IDataAccessClientManager";

type Client = PrismaClient | Prisma.TransactionClient;
export class PrismaClientManager implements IDataAccessClientManager<Client> {
	private client: Client = prisma;

	setClient(client: Client): void {
		this.client = client;
	}

	getClient() {
		return this.client;
	}
}
