import config from './config';
import pkg from './package.json';

export default defineNuxtConfig({
  compatibilityDate: '2026-03-25',
  devtools: { enabled: false },
  ssr: false,
  app: {
    baseURL: `/${pkg.name}/`,
    head: {
      htmlAttrs: {
        lang: 'ru',
      },
      link: [
        {
          rel: 'icon',
          href: `/${pkg.name}/favicon.ico`,
        },
        {
          rel: 'stylesheet',
          href: `/${pkg.name}/fonts/style.css`,
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
    colorMode: true,
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
  vite: {
    optimizeDeps: {
      include: [
        '@vueuse/core',
        'moment',
        'moment/dist/locale/ru',
        'vue-chartjs',
        'chart.js',
        'zod',
        'zod/locales',
        '@tanstack/vue-table',
        'vue-json-excel3',
      ],
    },
  },
});
