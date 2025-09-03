<template>
  <UContainer class="my-8">
    <UAlert color="error" variant="soft" description="Страница не найдена" />
  </UContainer>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: 'authenticated',
});

useSeoMeta({
  title: 'Страница не найдена',
});
</script>
