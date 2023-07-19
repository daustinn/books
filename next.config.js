/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images-na.ssl-images-amazon.com'
      },
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com'
      }
    ]
  }
}

module.exports = nextConfig
