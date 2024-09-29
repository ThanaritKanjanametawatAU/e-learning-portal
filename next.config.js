/** @type {import('next').NextConfig} */
const nextConfig = {
  // ... other configurations

  // Disable TypeScript type checking during build
  typescript: {
    ignoreBuildErrors: true,
  },
}

module.exports = nextConfig