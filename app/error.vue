<template>
  <NuxtLayout>
    <UContainer class="my-8">
      <h1 class="text-3xl font-bold">{{ error?.statusCode }}</h1>

      <div>{{ props.error?.message }}</div>

      <!-- <button @click="handleError">На главную</button> -->
    </UContainer>
  </NuxtLayout>
</template>

<script setup lang="ts">
import type { NuxtError } from '#app';

const props = defineProps({
  error: Object as () => NuxtError,
});

const handleError = () => clearError({ redirect: '/' });
</script>
