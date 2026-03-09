import type { NextConfig } from "next";

const backendPort = process.env.NEXT_PUBLIC_BACKEND_PORT ?? "7878";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'images.pexels.com' },
      { protocol: 'https', hostname: 'cdn.pixabay.com' },
      { protocol: 'https', hostname: 'img.icons8.com' },
      { protocol: 'https', hostname: 'payos.vn' },
      { protocol: 'http', hostname: 'localhost', port: backendPort },
      { protocol: 'https', hostname: 'localhost', port: backendPort },
    ],
  },
};

export default nextConfig;
