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
          :description="`Для предоставления доступа необходимо подать заявку в отдел сетевой инфраструктуры для включения в доменную группу «${appName}»`"
          variant="naked"
          orientation="horizontal"
          class="mb-4"
        >
          <UButton
            label="Подать заявку"
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
            container: 'p-0 sm:p-0 gap-y-0 overflow-hidden',
            wrapper: 'items-stretch',
            header: 'p-4 mb-0 border-b border-default',
          }"
        >
          <UTable
            v-if="status === 'success'"
            :data="usersWithStatuses"
            :columns="columns"
            :ui="{ thead: 'hidden', tr: 'data-[expanded=true]:bg-elevated' }"
            empty="Нет данных"
          >
            <template #fullname-cell="{ row }">
              <div class="flex items-center gap-3">
                <ULink
                  :to="row.original.photo + '?timestamp=' + timestamp"
                  target="_blank"
                >
                  <div class="group relative inline-block">
                    <UAvatar
                      :src="`${baseUrl}api/photo/${row.original.fullname}`"
                      :alt="row.original.fullname"
                      :chip="
                        row.original.status === 'В сети'
                          ? {
                              color: 'success',
                            }
                          : false
                      "
                      icon="i-lucide-image"
                      class="transition-opacity duration-300 group-hover:opacity-0"
                      size="xl"
                      to="/"
                    />

                    <div
                      class="bg-elevated absolute inset-0 flex items-center justify-center rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    >
                      <UIcon
                        name="i-mdi-open-in-new"
                        class="text-muted size-5"
                        title="Открыть фото"
                      />
                    </div>
                  </div>
                </ULink>

                <div>
                  <p class="text-highlighted font-medium">
                    {{ row.original.fullname }}
                  </p>

                  <p>
                    <NuxtLink :to="`mailto:${row.original.mail}`">{{
                      row.original.mail
                    }}</NuxtLink>
                  </p>
                </div>
              </div>
            </template>

            <template #expanded="{ row }">
              <div>{{ row.original.department }}</div>
              <div>{{ row.original.jobTitle }}</div>
            </template>
          </UTable>

          <UButton
            v-else
            label="Загрузка"
            color="neutral"
            variant="link"
            class="m-4"
            loading
          />
        </UPageCard>
      </div>
    </template>
  </UDashboardPanel>
</template>

<script lang="ts" setup>
import type { TableColumn } from '@nuxt/ui';
import type { User } from '#auth-utils';
import moment from 'moment';

const ULink = resolveComponent('ULink');
const UAvatar = resolveComponent('UAvatar');
const UButton = resolveComponent('UButton');

useHead({
  title: 'Пользователи сервиса',
});

const baseUrl = useRuntimeConfig().app.baseURL;
const appName = useRuntimeConfig().public.appName;

const timestamp = ref();

onMounted(() => {
  timestamp.value = moment().unix();
});

const { $visitors } = useNuxtApp();

const { data: users, status } = await useFetch('/api/users', {
  server: false,
  lazy: true,
});

const usersWithStatuses = computed<any>(() => {
  if (users.value && $visitors) {
    return users.value.map((item1) => {
      const matchingItem2 = $visitors.value.find(
        (item2) => item2.user?.mail === item1.mail,
      );

      return { ...item1, status: matchingItem2 ? 'В сети' : 'Не в сети' };
    });
  }
});

const columns: TableColumn<User>[] = [
  {
    accessorKey: 'fullname',
    header: 'Пользователь',
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
