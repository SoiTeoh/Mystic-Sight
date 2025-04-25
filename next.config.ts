import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'fates.cc',
        port: '',
        pathname: '/waite/images/cards/**',
      },
      {
        protocol: 'https',
        hostname: 'fates.cc',
        port: '',
        pathname: '/waite/images/forms/**',
      },
    ],
  },
};

export default nextConfig;
