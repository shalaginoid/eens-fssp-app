import db from './db.js';

export default defineNuxtConfig({
  future: {
    compatibilityVersion: 4,
  },
  app: {
    baseURL: '/eens-fssp/',
    head: {
      titleTemplate: '%s | Госпочта (ФССП)',
      htmlAttrs: {
        lang: 'ru',
      },
      link: [
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100..900;1,100..900&display=swap',
        },
      ],
    },
  },
  ui: {
    fonts: false,
    colorMode: false,
  },
  modules: ['@nuxt/ui', 'nuxt-auth-utils'],
  runtimeConfig: {
    dbConnectionString: db.connectString,
    ldap: {
      username: 'tfsiis',
      password: 'Dem@Gandu42!HH7',
    },
    session: {
      name: 'eens-fssp-app-session',
      password: '801945b8c6c84388bqwe08768afe17f6',
      cookie: {
        sameSite: 'lax',
        secure: false,
      },
    },
  },
  css: ['~/assets/css/main.css'],
  nitro: {
    experimental: {
      websocket: true,
    },
    output: {
      dir: 'eens-fssp',
    },
    iis: {
      mergeConfig: true,
      overrideConfig: false,
    },
  },

  compatibilityDate: '2025-07-15',
  devtools: { enabled: false },
});
