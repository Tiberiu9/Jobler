/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    // API_URL: "https://jobler-django.fly.dev",
    // API_URL: process.env.API_URL
    API_URL: "http://localhost:8000"
  },
  output: "standalone"
};

export default nextConfig;
