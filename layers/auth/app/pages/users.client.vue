<template>
  <UDashboardPanel id="users" :ui="{ body: 'lg:py-12' }">
    <template #header>
      <UDashboardNavbar :ui="{ right: 'gap-3' }">
        <template #title>
          <span>Пользователи сервиса ({{ $users?.length }})</span>
        </template>
      </UDashboardNavbar>
    </template>

    <template #body>
      <div class="mx-auto flex w-full flex-col lg:max-w-3xl">
        <UPageCard
          title="Пользователи"
          :description="`Для предоставления доступа необходимо создать заявку в отдел сетевой инфраструктуры для включения в доменную группу «${appName}»`"
          variant="naked"
          orientation="horizontal"
          class="mb-4"
        >
          <UButton
            label="Создать заявку"
            to="http://portal.eksbyt.ru/openv/Lists/openview/NewLNA4.aspx?RootFolder="
            target="_blank"
            class="w-fit lg:ms-auto"
            trailing-icon="i-lucide-arrow-up-right"
            color="secondary"
            variant="soft"
          />
        </UPageCard>

        <UPageCard
          variant="subtle"
          :ui="{
            container: 'p-0 sm:p-0 gap-y-0',
            wrapper: 'items-stretch',
            header: 'p-4 mb-0 border-b border-default',
          }"
        >
          <UTable
            :data="online"
            :columns="columns"
            :ui="{ thead: 'hidden' }"
            empty="Нет данных"
          ></UTable>
        </UPageCard>
      </div>
    </template>
  </UDashboardPanel>
</template>

<script lang="ts" setup>
import type { TableColumn } from '@nuxt/ui';
import type { User } from '#auth-utils';

useHead({
  title: 'Пользователи сервиса',
});

const appName = useRuntimeConfig().public.appName;

const UAvatar = resolveComponent('UAvatar');

const { $visitors, $users } = useNuxtApp();

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
