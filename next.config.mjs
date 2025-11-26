/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'api.bakumia.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
