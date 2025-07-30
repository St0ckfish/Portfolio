/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['portfolio-backend-rxwc.onrender.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'portfolio-backend-rxwc.onrender.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
}

module.exports = nextConfig
