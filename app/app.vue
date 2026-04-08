<template>
  <UApp :locale="ru">
    <NuxtLoadingIndicator color="#f78e1e" />

    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </UApp>
</template>

<script lang="ts" setup>
import { ru } from '@nuxt/ui/locale';

onMounted(() => {
  document.fonts.ready.then(() => {
    document.documentElement.classList.add('fonts-loaded');
  });
});
</script>
