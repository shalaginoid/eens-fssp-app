<template>
  <UNavigationMenu
    :collapsed="collapsed"
    :items="links[0]"
    orientation="vertical"
    color="secondary"
    tooltip
  />

  <UNavigationMenu
    :collapsed="collapsed"
    :items="links[1]"
    orientation="vertical"
    color="secondary"
    class="mt-auto"
    tooltip
  />
</template>

<script lang="ts" setup>
import type { NavigationMenuItem } from '@nuxt/ui';

defineProps<{
  collapsed?: boolean;
}>();

const links = [
  [
    {
      label: 'Уведомления',
      icon: 'i-lucide-bell-ring',
      to: '/',
    },
    {
      label: 'Исполнители',
      icon: 'i-lucide-users-round',
      to: '/executors',
    },
    {
      label: 'Статистика',
      icon: 'i-lucide-chart-area',
      to: '/statistic',
    },
  ],
  [
    {
      label: 'О сервисе',
      icon: 'i-lucide-info',
      to: '/about',
    },
  ],
] satisfies NavigationMenuItem[][];
</script>
