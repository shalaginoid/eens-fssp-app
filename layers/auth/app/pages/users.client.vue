<template>
  <UDashboardPanel id="users">
    <template #header>
      <UDashboardNavbar :ui="{ right: 'gap-3' }">
        <template #title>
          <span>Пользователи сервиса ({{ $users?.length }})</span>
        </template>
      </UDashboardNavbar>
    </template>

    <template #body>
      <div
        class="mx-auto flex w-full flex-col gap-4 sm:gap-6 lg:max-w-3xl lg:gap-12"
      >
        <UPageCard>
          <UTable :data="online" :columns="columns" empty="Нет данных"></UTable>
        </UPageCard>
      </div>
    </template>
  </UDashboardPanel>
</template>

<script lang="ts" setup>
import type { TableColumn } from '@nuxt/ui';
import type { User } from '#auth-utils';

useSeoMeta({
  title: 'Пользователи сервиса',
});

const UAvatar = resolveComponent('UAvatar');

const { $visitors } = useNuxtApp();

const { $users } = useNuxtApp();

const online = computed<any>(() => {
  if ($users) {
    const mergedArray = $users.map((item1) => {
      const matchingItem2 = toRaw($visitors.value).find(
        (item2) => item2.user?.mail === item1.mail,
      );

      return { ...item1, status: matchingItem2 ? 'В сети' : 'Не в сети' };
    });

    return mergedArray;
  }
});

const columns: TableColumn<User>[] = [
  {
    accessorKey: 'fullname',
    header: 'Пользователь',
    cell: ({ row }) => {
      const status = row.original.status;

      const colorMap = {
        'В сети': 'text-success',
        'Не в сети': 'text-secondary',
      };

      return h('div', { class: 'flex items-center gap-3' }, [
        h(UAvatar, {
          src: `http://portal.eksbyt.ru/docum/DocLib1/${row.original.fullname}.jpg`,
          alt: row.original.fullname,
          size: 'lg',
          chip:
            row.original.status === 'В сети'
              ? {
                  color: 'success',
                }
              : false,
        }),
        h('div', undefined, [
          h(
            'p',
            { class: 'font-medium text-highlighted' },
            row.original.fullname,
          ),
          h('p', { class: '' }, row.original.mail),
          h(
            'span',
            {
              class: `${colorMap[status as keyof typeof colorMap]}`,
            },
            status as string,
          ),
        ]),
      ]);
    },
  },
  {
    accessorKey: 'department',
    header: 'Отдел',
    cell: ({ row }) => row.getValue('department'),
  },
  {
    accessorKey: 'jobTitle',
    header: 'Должность',
    cell: ({ row }) => row.getValue('jobTitle'),
  },
];
</script>
