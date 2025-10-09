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
          variant="pill"
          color="secondary"
          class="w-full"
          content-orientation="vertical"
          highlightColor="error"
        ></UNavigationMenu>

        <ClientOnly fallback-tag="div">
          <template #fallback>
            <Spinner />
          </template>

          <UserMenu />
        </ClientOnly>
      </UContainer>
    </header>

    <main class="flex-1">
      <slot></slot>
    </main>

    <Visitors />
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
