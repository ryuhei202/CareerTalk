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

		const employeeImageBucket = new s3.Bucket(this, "employee-image-bucket", {
			bucketName: "high-career-talk-employee-images-bucket",
			removalPolicy: cdk.RemovalPolicy.RETAIN,
			versioned: true,
			encryption: s3.BucketEncryption.S3_MANAGED,
			cors: [
				{
					allowedMethods: [s3.HttpMethods.GET],
					allowedOrigins: ["*"],
					allowedHeaders: ["*"],
				},
			],
		});

		// CloudFront ディストリビューションの作成
		new cloudfront.Distribution(this, "Distribution", {
			defaultRootObject: "index.html",
			defaultBehavior: {
				origin:
					cloudfront_origins.S3BucketOrigin.withOriginAccessControl(
						userImageBucket,
					),
			},
		});

		new cloudfront.Distribution(this, "EmployeeImageDistribution", {
			defaultRootObject: "index.html",
			defaultBehavior: {
				origin:
					cloudfront_origins.S3BucketOrigin.withOriginAccessControl(
						employeeImageBucket,
					),
			},
		});
	}
}
