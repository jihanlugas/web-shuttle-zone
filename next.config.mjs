/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    APP_NAME: process.env.APP_NAME,
    COOKIE_NAME: process.env.COOKIE_NAME,
    API_END_POINT: process.env.API_END_POINT,
  },
};

export default nextConfig;
