/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['image.tmdb.org'],
  },
  // Remove 'appDir' key completely if using Next.js 14+ as it's enabled by default or managed differently
};

module.exports = nextConfig;
