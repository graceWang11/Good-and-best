/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config, { isServer }) => {
    config.ignoreWarnings = [
      { module: /node_modules\/node-fetch\/lib\/index\.js/ },
      { module: /node_modules\/punycode\/punycode\.js/ },
      { message: /Source map reading/ },
      { message: /Failed to parse source map/ },
    ];
    return config;
  },
  images: {
    domains: ['cheerful-osprey-14.convex.cloud'], // Add your Convex storage domain
  },
}

module.exports = nextConfig 