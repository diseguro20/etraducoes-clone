/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/agencia-de-traducao-em-curitiba',
        destination: '/agencia-de-traducao-em-sao-paulo',
        permanent: true,
      },
      {
        source: '/agencia-de-traducao-em-joinville',
        destination: '/agencia-de-traducao-em-sao-paulo',
        permanent: true,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'firebasestorage.googleapis.com',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
    ],
  },
  // Enable Edge Runtime support
  experimental: {
    serverActions: {
      allowedOrigins: ['localhost:3000'],
    },
  },
};

export default nextConfig;
