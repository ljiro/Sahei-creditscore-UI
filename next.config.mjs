/** @type {import('next').NextConfig} */
const nextConfig = {
  // Required for static export to be hosted in a MAUI WebView
  output: 'export',

  // Your existing ESLint configuration
  eslint: {
    ignoreDuringBuilds: true,
  },

  // Your existing TypeScript configuration
  typescript: {
    ignoreBuildErrors: true,
  },

  // Image optimization settings for static export
  // 'unoptimized: true' is necessary when using 'output: "export"'
  // as Next.js's default Image component optimization relies on a server.
  images: {
    unoptimized: true,
  },

  // Add any other Next.js configurations here as needed.
  // For example, if you have rewrites, redirects, or other custom settings.
};

export default nextConfig;
