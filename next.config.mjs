/** @type {import('next').NextConfig} */
const nextConfig = {
  // Fully static export: `out/` is served by Cloudflare Workers static assets,
  // exactly like the previous Astro build's `dist/`. No server code anywhere.
  output: 'export',
  trailingSlash: true,
  images: { unoptimized: true },
  devIndicators: false,
};

export default nextConfig;
