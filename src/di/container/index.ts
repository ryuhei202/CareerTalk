import { Container } from "inversify";
import { registerDomainServices } from "./domainService";
import { registerRepositories } from "./repository";
import { registerSupports } from "./support";
import { registerUseCases } from "./usecase";

/**
 * DIコンテナに値を登録し、そのDIコンテナを返す
 *
 * @returns DIコンテナ
 */
export const registerContainer = (): Container => {
	const container = new Container();

	registerSupports(container);
	registerRepositories(container);
	registerDomainServices(container);
	registerUseCases(container);

	return container;
};
