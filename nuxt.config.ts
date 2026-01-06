import config from './config';
import pkg from './package.json';

export default defineNuxtConfig({
  compatibilityDate: '2025-10-02',
  devtools: { enabled: false },
  app: {
    baseURL: `/${pkg.name}/`,
    head: {
      htmlAttrs: {
        lang: 'ru',
      },
      titleTemplate: `%s - ${pkg.description}`,
      link: [
        {
          rel: 'stylesheet',
          href: `/${pkg.name}/fonts/font.css`,
        },
      ],
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
    fonts: false,
    colorMode: false,
  },
  css: ['~/assets/css/main.css'],
  runtimeConfig: {
    mssql: config.mssql,
    public: {
      appName: pkg.description,
    },
  },
});
