/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    forceSwcTransforms: true,
  },
  compiler: {
    styledComponents: {
      ssr: true,
      displayName: true,
    },
  },
  env: {
    API_URL: process.env.API_URL,
    APP_SECRET: process.env.APP_SECRET,
  },
}

module.exports = nextConfig
