<template>
  <div class="flex h-screen flex-col justify-between">
    <header class="flex-none bg-white">
      <UContainer class="flex items-center gap-4 py-2">
        <UNavigationMenu
          :ui="{
            content: 'sm:w-auto',
            childList: 'sm:w-48',
          }"
          :items="mainMenu"
          :disableClickTrigger="true"
          class="w-full"
          variant="pill"
          color="secondary"
          content-orientation="vertical"
          highlightColor="error"
        ></UNavigationMenu>

        <UserMenu collapsed class="max-w-8" size="md" />
      </UContainer>
    </header>

    <main class="flex-1">
      <slot></slot>
    </main>
  </div>
</template>

<script setup lang="ts">
const mainMenu = computed(() => [
  {
    label: 'Уведомления',
    to: '/',
  },
  {
    label: 'Исполнители',
    to: '/executors',
  },
  {
    label: 'Статистика',
    to: '/statistic',
  },
]);
</script>
