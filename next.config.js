/** @type {import('next').NextConfig} */
const nextConfig = {
  // reactStrictMode: true,
  // swcMinify: true,
  //experimental: { granularChunks: true },
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
    FIREBASE_API_KEY: process.env.FIREBASE_API_KEY,
    FIREBASE_AUTHDOMAIN: process.env.FIREBASE_AUTHDOMAIN,
    FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID,
    FIREBASE_STORAGE_BUCKET: process.env.FIREBASE_STORAGE_BUCKET,
    FIREBASE_MESSAGE_SENDER_ID: process.env.FIREBASE_MESSAGE_SENDER_ID,
    FIREBASE_APP_ID: process.env.FIREBASE_APP_ID,
  },
};

module.exports = nextConfig;
