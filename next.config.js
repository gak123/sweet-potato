/** @type {import('next').NextConfig} */

const nextConfig = {
  distDir: 'build',
  reactStrictMode: true,
  poweredByHeader: false,
  i18n: {
    locales: ['en', 'ja', 'zh', 'kr'],
    defaultLocale: 'ja',
  },
  env: {
    API:
      process.env.NODE_ENV === 'production'
        ? 'https://api.sweet-potato.dev'
        : 'http://localhost:8080',
    SONOLUS_API:
      process.env.MODE === 'mock'
        ? 'https://stoplight.io/mocks/sonolus-core/servers/36101371'
        : 'https://sp-0.sweet-potato.workers.dev',
  },
};

module.exports = nextConfig;
