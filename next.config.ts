import type { NextConfig } from 'next';

/**
 * Static export to GitHub Pages at the apex of grantkee.com.
 *
 * No `basePath` or `assetPrefix`: the site is served from the domain root, not
 * from /<repo>/. Setting either would break every asset URL.
 *
 * No `headers()`, `redirects()` or `rewrites()`: `output: 'export'` writes plain
 * files, so those are silently ignored. Security headers come from Cloudflare in
 * front of Pages -- see README.
 */
const nextConfig: NextConfig = {
  output: 'export',
  reactStrictMode: true,
  images: {
    // No Image Optimization API exists in a static export.
    unoptimized: true,
  },
};

export default nextConfig;
