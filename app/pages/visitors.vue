<template>
  <UContainer class="my-8">
    <UCard v-if="filteredVisitors && filteredVisitors.length > 0">
      <UTable :data="filteredVisitors" :columns="columns" empty="Нет данных" />
    </UCard>
  </UContainer>
</template>

<script setup lang="ts">
import type { TableColumn } from '@nuxt/ui';
import type { UserSession, User } from '#auth-utils';

useSeoMeta({
  title: 'Кто онлайн',
});

definePageMeta({
  middleware: ['authenticated'],
});

const visitors = useVisitors();

const filteredVisitors = computed(() =>
  visitors.value.filter((item) => item?.user?.mail != null),
);

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
