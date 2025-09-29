import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // Allow images from your domain and subdomains
      {
        protocol: 'https',
        hostname: '**.orignx.dev',
        pathname: '/assets/images/**',
      },
      // Allow Google user profile images (for OAuth)
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        pathname: '/**',
      },
      // You might want to add other common image CDNs:
      // {
      //   protocol: 'https',
      //   hostname: 'images.unsplash.com',
      //   pathname: '/**',
      // },
    ],
    // Optional: Configure image formats and sizes
    formats: ['image/webp', 'image/avif'],
    // Optional: Set device sizes for responsive images
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
  },
};

export default nextConfig;
