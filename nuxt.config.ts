import db from './db';
import pkg from './package.json';

export default defineNuxtConfig({
  app: {
    baseURL: `/${pkg.name}/`,
    head: {
      htmlAttrs: {
        lang: 'ru',
      },
      titleTemplate: `%s - ${pkg.description}`,
      link: [
        {
          rel: 'preconnect',
          href: 'https://fonts.googleapis.com',
        },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100..900;1,100..900&display=swap',
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
    dbConnectionString: db.connectString,
    public: {
      appName: pkg.description,
    },
  },
  nitro: {
    output: {
      dir: pkg.name,
    },
  },
  compatibilityDate: '2025-10-02',
  devtools: { enabled: false },
});
