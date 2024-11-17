import * as cdk from "aws-cdk-lib";
import * as cloudfront from "aws-cdk-lib/aws-cloudfront";
import * as cloudfront_origins from "aws-cdk-lib/aws-cloudfront-origins";
import * as s3 from "aws-cdk-lib/aws-s3";
import type { Construct } from "constructs";

export class S3CloudFrontStack extends cdk.Stack {
	constructor(scope: Construct, id: string) {
		super(scope, id);

		const userImageBucket = new s3.Bucket(this, "user-image-bucket", {
			bucketName: "high-career-talk-user-images-bucket",
			removalPolicy: cdk.RemovalPolicy.RETAIN,
			versioned: true,
			encryption: s3.BucketEncryption.S3_MANAGED,
			cors: [
				{
					allowedMethods: [
						s3.HttpMethods.GET,
						s3.HttpMethods.POST,
						s3.HttpMethods.PUT,
					],
					allowedOrigins: ["*"],
					allowedHeaders: ["*"],
				},
			],
			blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
		});

		// バケット名を出力
		new cdk.CfnOutput(this, "AvatarBucketName", {
			value: userImageBucket.bucketName,
		});

		// CloudFront ディストリビューションの作成
		const distribution = new cloudfront.Distribution(this, "Distribution", {
			defaultRootObject: "index.html",
			defaultBehavior: {
				origin:
					cloudfront_origins.S3BucketOrigin.withOriginAccessControl(
						userImageBucket,
					),
			},
		});

		// CloudFront Distribution の URL を出力
		new cdk.CfnOutput(this, "DistributionUrl", {
			value: `https://${distribution.distributionDomainName}`,
		});
	}
}
