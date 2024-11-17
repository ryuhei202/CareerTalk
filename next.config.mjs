/** @type {import('next').NextConfig} */


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
        hostname: process.env.NEXT_PUBLIC_CLOUDFRONT_URL,
      },
    ],
  },
};

export default nextConfig;
