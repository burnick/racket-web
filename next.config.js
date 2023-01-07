/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    forceSwcTransforms: false,
  },
  compiler: {
    styledComponents: {
      ssr: true,
      displayName: true,
    },
  },
  images: { unoptimized: true },
  env: {
    API_URL: process.env.API_URL,
    APP_SECRET: process.env.APP_SECRET,
  },
};

module.exports = nextConfig;
