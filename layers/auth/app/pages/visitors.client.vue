<template>
  <UDashboardPanel id="sessions">
    <template #header>
      <UDashboardNavbar title="Сессии пользователей" :ui="{ right: 'gap-3' }" />
    </template>

    <template #body>
      <div
        class="mx-auto flex w-full flex-col gap-4 sm:gap-6 lg:max-w-3xl lg:gap-12"
      >
        <UPageCard>
          <UTable :data="$visitors" :columns="columns" empty="Нет данных" />
        </UPageCard>
      </div>
    </template>
  </UDashboardPanel>
</template>

<script setup lang="ts">
import type { TableColumn } from '@nuxt/ui';
import type { UserSession, User } from '#auth-utils';

useHead({
  title: 'Сессии пользователей',
});

const { $visitors } = useNuxtApp();

const columns: TableColumn<UserSession>[] = [
  {
    accessorKey: 'user',
    header: 'E-mail',
    cell: ({ row }) => row.getValue<User>('user')?.mail,
  },
  {
    accessorKey: 'peerId',
    header: 'Peer ID',
    cell: ({ row }) => row.getValue('peerId'),
  },
  {
    accessorKey: 'sessionId',
    header: 'Session ID',
    cell: ({ row }) => row.getValue('sessionId'),
  },
];
</script>
