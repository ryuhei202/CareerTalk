import type { IStorageRepository } from "@/domain/external/Storage/StorageRepository";
import { s3 } from "@/lib/s3";
import { Upload } from "@aws-sdk/lib-storage";

export const createStorageRepository = ({
	bucketName,
}: {
	bucketName: string;
}): IStorageRepository => {
	return {
		saveImage: async ({
			userId,
			imageData,
		}: { userId: string; imageData: string }) => {
			// Base64文字列からバイナリデータを抽出
			const base64Data = imageData.replace(/^data:image\/\w+;base64,/, "");
			const buffer = Buffer.from(base64Data, "base64");

			const upload = new Upload({
				client: s3,
				params: {
					Bucket: bucketName,
					Key: `${userId}.jpg`,
					Body: buffer,
					ContentType: "image/jpeg",
				},
			});

			await upload.done();
		},
	};
};
