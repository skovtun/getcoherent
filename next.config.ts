import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com', pathname: '/**' },
    ],
  },
  // Force-bundle the design-system manifest + component sources into the
  // serverless API function bundle. Without this, Vercel's automatic file
  // tracing misses .tsx source files (they're imported as compiled JS, not
  // raw text) and shared-components/[id] returns 404 in production.
  outputFileTracingIncludes: {
    '/api/design-system/shared-components/[id]': [
      './coherent.components.json',
      './components/**/*.tsx',
    ],
    '/api/design-system/shared-components': [
      './coherent.components.json',
    ],
    '/api/design-system/config': [
      './design-system.config.ts',
    ],
    '/api/design-system/changes': [
      './coherent.changes.json',
    ],
  },
};

export default nextConfig;
