<template>
  <UDashboardPanel id="notify">
    <template #header>
      <UDashboardNavbar title="Уведомления" />

      <UDashboardToolbar class="bg-elevated/50 py-3">
        <template #left>
          <div class="grid w-full grid-cols-6 gap-2">
            <USelect v-model="date" :items="months" :loading="pending" />

            <!-- Тип должника -->
            <USelectMenu
              :items="subjectTypesValues"
              :searchInput="false"
              :model-value="
                table?.tableApi
                  ?.getColumn('fssp:DebtorType')
                  ?.getFilterValue() as string
              "
              placeholder="Тип должника"
              @update:model-value="
                table?.tableApi
                  ?.getColumn('fssp:DebtorType')
                  ?.setFilterValue($event)
              "
            >
              <template #empty>Нет данных</template>
              <template #trailing>
                <UIcon
                  v-if="
                    table?.tableApi
                      ?.getColumn('fssp:DebtorType')
                      ?.getFilterValue()
                  "
                  name="i-lucide-x"
                  class="text-muted size-4 cursor-pointer"
                  @click.stop="
                    table?.tableApi
                      ?.getColumn('fssp:DebtorType')
                      ?.setFilterValue(undefined)
                  "
                />
              </template>
            </USelectMenu>

            <!-- Статус -->
            <USelectMenu
              :items="statuses"
              :searchInput="false"
              label-key="status"
              value-key="status"
              placeholder="Статус"
              :model-value="
                table?.tableApi?.getColumn('status')?.getFilterValue() as string
              "
              @update:model-value="
                table?.tableApi?.getColumn('status')?.setFilterValue($event)
              "
            >
              <template #empty>Нет данных</template>
              <template #trailing>
                <UIcon
                  v-if="table?.tableApi?.getColumn('status')?.getFilterValue()"
                  name="i-lucide-x"
                  class="text-muted size-4 cursor-pointer"
                  @click.stop="
                    table?.tableApi
                      ?.getColumn('status')
                      ?.setFilterValue(undefined)
                  "
                />
              </template>
            </USelectMenu>

            <!-- Исполнитель -->
            <USelectMenu
              :items="executors"
              :searchInput="{ placeholder: 'Поиск...', variant: 'none' }"
              label-key="executor"
              value-key="executor"
              placeholder="Исполнитель"
              :model-value="
                table?.tableApi
                  ?.getColumn('executor')
                  ?.getFilterValue() as string
              "
              @update:model-value="
                table?.tableApi?.getColumn('executor')?.setFilterValue($event)
              "
            >
              <template #empty>Нет данных</template>
              <template #trailing>
                <UIcon
                  v-if="
                    table?.tableApi?.getColumn('executor')?.getFilterValue()
                  "
                  name="i-lucide-x"
                  class="text-muted size-4 cursor-pointer"
                  @click.stop="
                    table?.tableApi
                      ?.getColumn('executor')
                      ?.setFilterValue(undefined)
                  "
                />
              </template>
            </USelectMenu>

            <!-- Наименование документа -->
            <UInput
              :model-value="
                table?.tableApi
                  ?.getColumn('fssp:DocName')
                  ?.getFilterValue() as string
              "
              placeholder="Наименование документа"
              @update:model-value="
                table?.tableApi
                  ?.getColumn('fssp:DocName')
                  ?.setFilterValue($event)
              "
            />

            <!-- Наименование должника -->
            <UInput
              :model-value="
                table?.tableApi
                  ?.getColumn('fssp:DbtrName')
                  ?.getFilterValue() as string
              "
              placeholder="Наименование должника"
              @update:model-value="
                table?.tableApi
                  ?.getColumn('fssp:DbtrName')
                  ?.setFilterValue($event)
              "
            />

            <!-- Номер исп. производства -->
            <UInput
              :model-value="
                table?.tableApi
                  ?.getColumn('fssp:IpNo')
                  ?.getFilterValue() as string
              "
              placeholder="Номер исп. производства"
              @update:model-value="
                table?.tableApi?.getColumn('fssp:IpNo')?.setFilterValue($event)
              "
            />

            <!-- Дата документа -->
            <UInput
              :model-value="
                table?.tableApi
                  ?.getColumn('fssp:DocDate')
                  ?.getFilterValue() as string
              "
              placeholder="Дата документа"
              @update:model-value="
                table?.tableApi
                  ?.getColumn('fssp:DocDate')
                  ?.setFilterValue($event)
              "
            />

            <!-- Номер исп. листа -->
            <UInput
              :model-value="
                table?.tableApi
                  ?.getColumn('fssp:IdDocNo')
                  ?.getFilterValue() as string
              "
              placeholder="Номер исп. листа"
              @update:model-value="
                table?.tableApi
                  ?.getColumn('fssp:IdDocNo')
                  ?.setFilterValue($event)
              "
            />

            <!-- Номер дела -->
            <UInput
              :model-value="
                table?.tableApi
                  ?.getColumn('fssp:IdDeloNo')
                  ?.getFilterValue() as string
              "
              placeholder="Номер дела"
              @update:model-value="
                table?.tableApi
                  ?.getColumn('fssp:IdDeloNo')
                  ?.setFilterValue($event)
              "
            />

            <!-- ФИО пристава -->
            <UInput
              :model-value="
                table?.tableApi
                  ?.getColumn('fssp:Spi')
                  ?.getFilterValue() as string
              "
              placeholder="ФИО пристава"
              @update:model-value="
                table?.tableApi?.getColumn('fssp:Spi')?.setFilterValue($event)
              "
            />

            <Excel v-if="messages" :data="messages" />
          </div>
        </template>
      </UDashboardToolbar>
    </template>

    <template #body>
      <UTable
        :data="messages"
        :columns="columns"
        :loading="pending"
        :ui="{
          th: 'text-xs py-1 px-1.5',
          td: 'whitespace-normal py-1 px-1.5 text-xs',
        }"
        :pagination-options="{
          getPaginationRowModel: getPaginationRowModel(),
        }"
        v-model:pagination="pagination"
        ref="table"
        loading-color="secondary"
        empty="Нет данных"
        sticky
      />

      <div v-if="messages">
        <UPagination
          :key="key"
          :default-page="
            (table?.tableApi?.getState().pagination.pageIndex || 0) + 1
          "
          :items-per-page="table?.tableApi?.getState().pagination.pageSize"
          :total="table?.tableApi?.getFilteredRowModel().rows.length"
          @update:page="(p) => table?.tableApi?.setPageIndex(p - 1)"
          show-edges
        />
      </div>
    </template>
  </UDashboardPanel>
</template>

<script setup lang="ts">
import moment from 'moment';
import type { TableColumn } from '@nuxt/ui';
import SetStatusModal from '@/components/SetStatusModal.vue';
import { getPaginationRowModel } from '@tanstack/vue-table';

useHead({
  title: 'Уведомления',
});

const toast = useToast();
const overlay = useOverlay();
const table = useTemplateRef('table');
const months = useGetMonths();
const date = ref(months[0]?.value);
const messages = ref();
const pagination = ref({
  pageIndex: 0,
  pageSize: 25,
});

const subjectTypesValues = ref(['ЮЛ', 'ФЛ', 'ИП']);

const UButton = resolveComponent('UButton');
const UTooltip = resolveComponent('UTooltip');

const columns: TableColumn<Message>[] = [
  {
    accessorKey: 'status',
    header: 'Статус',
    meta: {
      class: {
        td: 'text-center',
      },
    },
    cell: ({ row }) => {
      const status = row.getValue('status');

      const color =
        status === 'Завершено'
          ? 'bg-success'
          : status === 'В работе'
            ? 'bg-secondary'
            : 'bg-neutral-400';

      return h(UTooltip, { text: status ?? 'Принято', delayDuration: 0 }, () =>
        h('div', {
          class: `w-1.5 h-1.5 rounded-full m-auto ${color}`,
        }),
      );
    },
  },
  {
    accessorKey: 'executor',
    header: 'Исполнитель',
    cell: ({ row }) =>
      h(UButton, {
        label: row.original.executor ?? 'Назначить',
        color: 'neutral',
        variant: 'soft',
        size: 'xs',
        onClick: () => openSetStatusModal(row.original),
      }),
  },
  {
    accessorKey: 'notifyDate',
    header: 'Дата уведомления',
    cell: ({ row }) => {
      const date = moment(row.getValue('notifyDate')).format(
        'DD.MM.YYYY HH:mm',
      );
      return date;
    },
  },
  {
    accessorKey: 'fssp:DebtorType',
    header: 'Тип должника',
  },
  {
    accessorKey: 'fssp:DbtrName',
    header: 'Наименование должника',
  },
  {
    accessorKey: 'download',
    header: 'Скачать документ',
    meta: {
      class: {
        td: 'text-center',
      },
    },
    cell: ({ row }) =>
      h(UButton, {
        color: 'neutral',
        variant: 'link',
        icon: 'i-lucide-file-text',
        size: 'xs',
        onClick: () => useFetchDoc(row.original.messageId),
      }),
  },
  {
    accessorKey: 'fssp:DocName',
    header: 'Наименование документа',
  },
  {
    accessorKey: 'fssp:IpNo',
    header: 'Номер исп. производства',
  },
  {
    accessorKey: 'fssp:DocDate',
    header: 'Дата документа',
  },
  {
    accessorKey: 'fssp:TotalArrestDebtSum',
    header: 'Сумма',
  },
  {
    accessorKey: 'fssp:IdDebtSum',
    header: 'Сумма (по сводному производству)',
  },
  {
    accessorKey: 'fssp:IdDocNo',
    header: 'Номер исп. листа',
  },
  {
    accessorKey: 'fssp:IdDocDate',
    header: 'Дата исп. листа',
  },
  {
    accessorKey: 'fssp:IdDeloNo',
    header: 'Номер дела',
  },
  {
    accessorKey: 'fssp:IdDeloDate',
    header: 'Дата дела',
  },
  {
    accessorKey: 'fssp:Spi',
    header: 'ФИО пристава',
  },
  // {
  //   accessorKey: 'notifyId',
  //   header: 'ID уведомления',
  // },
  // {
  //   accessorKey: 'messageId',
  //   header: 'ID сообщения',
  // },
  // {
  //   accessorKey: 'fssp:IdCrdrName',
  //   header: 'Взыскатель',
  // },
];

const { data: statuses } = await useFetch<Status[]>('/api/statuses');
const { data: executors } = await useFetch<Executor[]>('/api/executors');
const { data: messData, pending } = await useFetch<Message[]>('/api/messages', {
  lazy: true,
  query: {
    date,
  },
});

if (messData.value) {
  messages.value = messData.value;
}

const key = ref(0);

watch(messData, (messData) => {
  messages.value = messData;

  pagination.value.pageIndex = 0;
  table?.value?.tableApi?.setPageIndex(0);

  key.value++;
});

// Назначение статуса и исполнителя
const setStatusModal = overlay.create(SetStatusModal);

async function openSetStatusModal(message: Message) {
  if (messages.value && statuses.value && executors.value) {
    const result: any = await setStatusModal.open({
      message: message,
      statuses: statuses.value,
      executors: executors.value,
    });

    if (result) {
      const findMessage = messages.value.find(
        (item: Message) => item.messageId === result.messageId,
      );

      const executor = executors.value.find(
        (item: Executor) => item.id === result.executorId,
      );

      const status = toRaw(statuses.value).find(
        (item: Status) => item.id === result.statusId,
      );

      if (findMessage && executor && status) {
        findMessage.executorId = result.executorId;
        findMessage.statusId = result.statusId;
        findMessage.executor = executor.executor;
        findMessage.status = status.status;

        toast.add({
          description: 'Статус и исполнитель успешно установлены',
          color: 'success',
        });
      }
    }
  }
}
</script>
