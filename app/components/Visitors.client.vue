<template>
  <div></div>
</template>

<script setup lang="ts">
import { useWebSocket } from '@vueuse/core';

const { app } = useRuntimeConfig();

const visitors = useVisitors();

useWebSocket(`${app.baseURL}api/visitors`, {
  async onMessage(ws, event) {
    visitors.value = JSON.parse(event.data);
  },
});
</script>
