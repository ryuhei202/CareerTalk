/** @type {import('next').NextConfig} */

const cloudFrontUrlWithoutHttps = process.env.CLOUDFRONT_URL.replace("https://", "");
const employeeImageUrl = process.env.EMPLOYEE_IMAGE_CLOUDFRONT_URL.replace("https://", "");
// 外部画像のドメイン許可設定
// @see https://dev.classmethod.jp/articles/tsnote-cognito-change-password-error/
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'profile.line-scdn.net',
      },
      {
        protocol: "https",
        hostname: "example.com",
      },
      {
        protocol: "https",
        hostname: cloudFrontUrlWithoutHttps,
      },
      {
        protocol: "https",
        hostname: employeeImageUrl,
      },
    ],
  },
};

export default nextConfig;
