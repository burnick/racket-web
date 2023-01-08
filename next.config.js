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
  env: {
    API_URL: process.env.API_URL,
    APP_SECRET: process.env.APP_SECRET,
    NEXT_RECAPTCHA_KEY: process.env.NEXT_RECAPTCHA_KEY,
    PORT: process.env.PORT,
  },
};

module.exports = nextConfig;
