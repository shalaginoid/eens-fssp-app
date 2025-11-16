<template>
  <UDashboardGroup unit="rem">
    <UDashboardSidebar
      id="default"
      collapsible
      class="bg-elevated/25"
      :ui="{ footer: 'lg:border-t lg:border-default' }"
    >
      <template #header="{ collapsed }">
        <NuxtLink to="/">
          <img src="/images/eens.svg" width="36" height="36" />
        </NuxtLink>

        <div v-if="!collapsed" class="ms-auto flex items-center gap-1.5">
          <UDashboardSidebarCollapse size="md" class="text-neutral-300" />
        </div>
      </template>

      <template #default="{ collapsed }">
        <div v-if="collapsed">
          <UDashboardSidebarCollapse size="md" class="text-neutral-300" />
        </div>

        <div v-if="!collapsed" class="text-muted rounded px-3 py-1.5 text-sm">
          {{ appName }}
        </div>

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

      <template #footer="{ collapsed }">
        <UserMenu :collapsed="collapsed" />
      </template>
    </UDashboardSidebar>

    <slot></slot>
  </UDashboardGroup>
</template>

<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui';

const appName = useRuntimeConfig().public.appName;

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
