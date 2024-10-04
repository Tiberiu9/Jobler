/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    // API_URL: process.env.API_URL
    API_URL: "http://localhost:8000"
  }
};

export default nextConfig;
