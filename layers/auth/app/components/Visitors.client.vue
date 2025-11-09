<template>
  <UTable :data="$visitors" :columns="columns" empty="Нет данных" />
</template>

<script setup lang="ts">
import type { TableColumn } from '@nuxt/ui';
import type { UserSession, User } from '#auth-utils';

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
