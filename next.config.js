/** @type {import("next").NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Needed for Docker
  output: "standalone",
};

module.exports = nextConfig;
