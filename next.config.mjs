/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },
  env: {
    DATABASE_URL: process.env.DATABASE_URL,
  },
};
export default nextConfig;
