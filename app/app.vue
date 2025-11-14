<template>
  <UApp>
    <NuxtLoadingIndicator color="#f78e1e" />

    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </UApp>
</template>

<script setup lang="ts">
const { app } = useRuntimeConfig();

useHead({
  link: [{ rel: 'icon', href: `${app.baseURL}favicon.ico` }],
});
</script>
