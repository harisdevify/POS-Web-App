/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'pos.mianhardware.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
