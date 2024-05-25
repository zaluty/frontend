/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};
 const YOUTUBE_API_KEY= {
  env: {
    YOUTUBE_API_KEY: process.env.YOUTUBE_API_KEY,
  },
};

  eslint: {
    ignoreDuringBuilds: true
  }

export default nextConfig;
