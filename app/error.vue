<template>
  <UError
    :ui="{ statusCode: 'text-[180px] font-black text-secondary/75' }"
    :error="{
      statusCode: error?.statusCode,
      message: error?.message,
    }"
    :clear="{
      color: 'primary',
      class: 'rounded-full px-8 py-4',
      label: 'Перейти на главную',
    }"
  />
</template>

<script setup lang="ts">
import type { NuxtError } from '#app';

const props = defineProps({
  error: Object as () => NuxtError,
});
</script>
