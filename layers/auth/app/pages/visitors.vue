<template>
  <UDashboardPanel id="sessions">
    <template #header>
      <UDashboardNavbar title="Сессии пользователей" :ui="{ right: 'gap-3' }" />
    </template>

    <template #body>
      <div class="mx-auto flex w-full flex-col lg:max-w-xl">
        <ClientOnly>
          <UPageCard
            variant="subtle"
            :ui="{
              container: 'p-0 sm:p-0 gap-y-0 overflow-hidden',
              wrapper: 'items-stretch',
              header: 'p-4 mb-0 border-b border-default',
            }"
          >
            <UTable :data="$visitors" :columns="columns" empty="Нет данных" />
          </UPageCard>

          <template #fallback>
            <UButton label="Загрузка" color="neutral" variant="link" loading />
          </template>
        </ClientOnly>
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
    header: 'Логин',
    cell: ({ row }) => row.getValue<User>('user')?.login,
  },
  {
    accessorKey: 'peerId',
    header: 'ID однорангового узла',
    cell: ({ row }) => row.getValue('peerId'),
  },
  {
    accessorKey: 'sessionId',
    header: 'ID сессии',
    cell: ({ row }) => row.getValue('sessionId'),
  },
];
</script>
