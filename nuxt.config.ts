import config from './config';
import pkg from './package.json';

export default defineNuxtConfig({
  compatibilityDate: '2026-02-20',
  devtools: { enabled: false },
  ssr: false,
  app: {
    baseURL: `/${pkg.name}/`,
    head: {
      htmlAttrs: {
        lang: 'ru',
      },
      titleTemplate: `%s - ${pkg.description}`,
      script: [
        {
          nomodule: true,
          innerHTML: `window.location.href = '/${pkg.name}/browser-not-supported.html'`,
        },
      ],
    },
  },
  modules: ['@nuxt/ui'],
  ui: {
    fonts: true,
    colorMode: false,
  },
  fonts: {
    devtools: false,
    families: [{ name: 'Roboto', provider: 'bunny', weights: ['100 900'] }],
  },
  icon: {
    provider: 'server',
  },
  css: ['~/assets/css/main.css'],
  runtimeConfig: {
    mssql: config.mssql,
    public: {
      appName: pkg.description,
    },
  },
});
