<template>
  <NuxtLayout>
    <UContainer class="my-8">
      <UAlert color="error" variant="soft">
        <template #title>
          <h1>{{ props.error?.statusCode }}</h1>
        </template>

        <template #description>
          {{ props.error?.message }}
        </template>
      </UAlert>
    </UContainer>
  </NuxtLayout>
</template>

<script setup lang="ts">
import type { NuxtError } from '#app';

const props = defineProps({
  error: Object as () => NuxtError,
});
</script>
