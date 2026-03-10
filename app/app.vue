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

onMounted(() => {
  document.fonts.ready.then(() => {
    document.documentElement.classList.add('fonts-loaded');
  });
});
</script>

<style>
html::before {
  content: '';
  display: inline-block;
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 36px;
  height: 36px;
  background-image: url('/images/loading.gif');
  background-size: cover;
  background-repeat: no-repeat;
}

body {
  opacity: 0;
}

.fonts-loaded body {
  opacity: 1;
}

.fonts-loaded::before {
  display: none;
}
</style>
