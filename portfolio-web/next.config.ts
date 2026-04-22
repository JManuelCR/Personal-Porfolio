import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  transpilePackages: ['lenis', 'framer-motion', 'next-intl'],
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol:'https',
        hostname: 'vmikdkdnsivhxtkczvtr.supabase.co',
        pathname: '/storage/v1/object/**'
      }
    ],
  },
};

export default withNextIntl(nextConfig);
