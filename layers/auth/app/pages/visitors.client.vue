<template>
  <UDashboardPanel id="sessions">
    <template #header>
      <UDashboardNavbar title="Сессии пользователей" :ui="{ right: 'gap-3' }" />
    </template>

    <template #body>
      <div class="mx-auto flex w-full flex-col lg:max-w-xl">
        <UPageCard
          variant="subtle"
          :ui="{
            container: 'p-0 sm:p-0 gap-y-0',
            wrapper: 'items-stretch',
            header: 'p-4 mb-0 border-b border-default',
          }"
        >
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
