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
    API_URL:
      process.env.NODE_ENV === 'production' || process.env.MODE === 'real'
        ? 'https://sp-0.sweet-potato.workers.dev'
        : 'https://stoplight.io/mocks/sonolus-core/servers/36101371',
    API_URL_LEGACY: 'https://sp-0.sweet-potato.workers.dev',
  },
};

module.exports = nextConfig;
