<template>
  <UApp :toaster="toaster">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </UApp>
</template>

<script setup lang="ts">
import type { ToasterProps } from '@nuxt/ui';
const { app } = useRuntimeConfig();

useHead({
  link: [{ rel: 'icon', href: `${app.baseURL}favicon.ico` }],
});

const toaster: ToasterProps = { position: 'bottom-right' };
</script>
