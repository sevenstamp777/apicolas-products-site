/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: ['localhost'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  // Removendo a linha experimental que estava causando problemas
  // experimental: {
  //   appDir: false,
  // },
}

module.exports = nextConfig
