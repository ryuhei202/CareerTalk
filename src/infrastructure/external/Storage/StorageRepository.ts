import fs from "node:fs";
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
			const base64Data = imageData.replace(
				/^data:image\/(svg\+xml|[\w-]+);base64,/,
				"",
			);
			const buffer = Buffer.from(base64Data, "base64");
			const now = new Date();
			const formattedDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}:${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}:${String(now.getSeconds()).padStart(2, "0")}`;
			const mimeType =
				imageData
					.match(/^data:image\/(svg\+xml|[\w-]+);base64,/)?.[0]
					?.replace(/^data:|\;base64,$/g, "") || "image/jpeg";
			const uploadKey = `user:${userId}/${formattedDate}.${getExtension(mimeType)}`;
			const upload = new Upload({
				client: s3,
				params: {
					Bucket: bucketName,
					Key: uploadKey,
					Body: buffer,
					ContentType: mimeType,
					Metadata: {
						URL: `${process.env.CLOUDFRONT_URL}/${uploadKey}`,
					},
				},
			});

			await upload.done();

			return uploadKey;
		},
	};
};

const getExtension = (mimeType: string): string => {
	const extensions: Record<string, string> = {
		"image/jpeg": "jpg",
		"image/png": "png",
		"image/gif": "gif",
		"image/webp": "webp",
		"image/svg+xml": "svg",
	};
	return extensions[mimeType] || "jpg";
};
