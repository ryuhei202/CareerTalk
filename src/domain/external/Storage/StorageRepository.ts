export interface IStorageRepository {
	saveImage({
		userId,
		imageData,
	}: { userId: string; imageData: string }): Promise<void>;
}
