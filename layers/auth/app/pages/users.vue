<template>
  <UDashboardPanel id="users">
    <template #header>
      <UDashboardNavbar>
        <template #title>
          <span>Пользователи сервиса ({{ users?.length }})</span>
        </template>
      </UDashboardNavbar>
    </template>

    <template #body>
      <div class="mx-auto flex w-full flex-col lg:max-w-xl">
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

        <ClientOnly>
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
              :ui="{ thead: 'hidden', tr: 'data-[expanded=true]:bg-elevated' }"
              empty="Нет данных"
            >
              <template #expanded="{ row }">
                <div>{{ row.original.department }}</div>
                <div>{{ row.original.jobTitle }}</div>
              </template>
            </UTable>
          </UPageCard>

          <template #fallback>
            <UButton label="Загрузка" color="neutral" variant="link" loading />
          </template>
        </ClientOnly>
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

const { data: users } = await useFetch('/api/users');

const appName = useRuntimeConfig().public.appName;

const UAvatar = resolveComponent('UAvatar');
const UButton = resolveComponent('UButton');

const { $visitors } = useNuxtApp();

const online = computed<any>(() => {
  if (users.value && $visitors) {
    const mergedArray = users.value.map((item1) => {
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
          // h(
          //   'span',
          //   {
          //     class: `${colorMap[status as keyof typeof colorMap]}`,
          //   },
          //   status as string,
          // ),
        ]),
      ]);
    },
  },
  {
    accessorKey: 'status',
    header: 'Статус',
    cell: ({ row }) => {
      const status = row.getValue('status');

      const colorMap = {
        'В сети': 'text-success',
        'Не в сети': 'text-secondary',
      };

      return h(
        'span',
        { class: colorMap[status as keyof typeof colorMap] },
        status as string,
      );
    },
  },
  // {
  //   accessorKey: 'department',
  //   header: 'Отдел',
  //   cell: ({ row }) => row.getValue('department'),
  // },
  // {
  //   accessorKey: 'jobTitle',
  //   header: 'Должность',
  //   cell: ({ row }) => row.getValue('jobTitle'),
  // },
  {
    id: 'expand',
    cell: ({ row }) =>
      h(UButton, {
        color: 'neutral',
        variant: 'ghost',
        icon: 'i-lucide-chevron-down',
        square: true,
        'aria-label': 'Expand',
        ui: {
          leadingIcon: [
            'transition-transform',
            row.getIsExpanded() ? 'duration-200 rotate-180' : '',
          ],
        },
        onClick: () => row.toggleExpanded(),
      }),
  },
];
</script>
