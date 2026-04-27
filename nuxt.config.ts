import config from './config';

export default defineNuxtConfig({
  extends: ['../eens-base-layer'],

  modules: ['@nuxt/ui'],

  css: ['~/assets/css/main.css'],

  runtimeConfig: {
    mssql: config.mssql,
  },

  vite: {
    optimizeDeps: {
      include: ['zod', 'zod/locales', 'moment', 'moment/dist/locale/ru', 'vue-chartjs', 'chart.js', 'vue-json-excel3'],
    },
  },
});
