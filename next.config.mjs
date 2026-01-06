/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    typedRoutes: true
  },
  // Fallback for systems where SWC binary fails to load
  swcMinify: true,
};

export default nextConfig;
