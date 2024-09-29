/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    instrumentationHook: true
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
      };
    }
    return config;
  },
  // Add this line to disable TypeScript type checking
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
