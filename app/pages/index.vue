<template>
  <UDashboardPanel id="notify">
    <template #header>
      <UDashboardNavbar title="Уведомления" />

      <UDashboardToolbar class="bg-elevated/50 py-3">
        <template #left>
          <div class="grid grid-cols-6 gap-2">
            <USelect v-model="date" :items="months" :loading="pending" />
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
        loading-color="secondary"
        empty="Нет данных"
      />
    </template>
  </UDashboardPanel>
</template>

<script setup lang="ts">
import type { TableColumn } from '@nuxt/ui';

useHead({
  title: 'Уведомления',
});

const months = useGetMonths();
const date = ref(months[0]?.value);

const { data: messages, pending } = await useFetch<Message[]>('/api/messages', {
  lazy: true,
  query: {
    date,
  },
});

const columns: TableColumn<Message>[] = [
  {
    accessorKey: 'status',
    header: 'Статус',
  },
  // {
  //   accessorKey: 'notifyId',
  //   header: 'ID уведомления',
  // },
  // {
  //   accessorKey: 'messageId',
  //   header: 'ID сообщения',
  // },
  {
    accessorKey: 'executor',
    header: 'Исполнитель',
  },
  {
    accessorKey: 'notifyDate',
    header: 'Дата уведомления',
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
  //   accessorKey: 'fssp:IdCrdrName',
  //   header: 'Взыскатель',
  // },
];
</script>
