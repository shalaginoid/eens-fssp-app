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
