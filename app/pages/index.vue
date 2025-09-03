<template>
  <div class="h-full">
    <div class="h-full bg-white">
      <div class="bg-elevated mb-4 grid grid-cols-6 gap-2 p-2">
        <USelect
          @change="changeDate(selectedDate.value)"
          size="md"
          v-model="selectedDate.value"
          :items="useGetMonths()"
          :loading="loading"
        />

        <USelect
          size="md"
          :items="subjectTypesValues"
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
        />

        <USelect
          size="md"
          :items="statusesValues"
          :model-value="
            table?.tableApi?.getColumn('status')?.getFilterValue() as string
          "
          placeholder="Статус"
          @update:model-value="
            table?.tableApi?.getColumn('status')?.setFilterValue($event)
          "
        />

        <USelect
          size="md"
          :items="executors"
          :model-value="
            table?.tableApi?.getColumn('executor')?.getFilterValue() as string
          "
          placeholder="Исполнитель"
          @update:model-value="
            table?.tableApi?.getColumn('executor')?.setFilterValue($event)
          "
        />

        <UInput
          size="md"
          :model-value="
            table?.tableApi
              ?.getColumn('fssp:DocName')
              ?.getFilterValue() as string
          "
          placeholder="Наименование документа"
          @update:model-value="
            table?.tableApi?.getColumn('fssp:DocName')?.setFilterValue($event)
          "
        />

        <UInput
          size="md"
          :model-value="
            table?.tableApi
              ?.getColumn('fssp:DbtrName')
              ?.getFilterValue() as string
          "
          placeholder="Наименование должника"
          @update:model-value="
            table?.tableApi?.getColumn('fssp:DbtrName')?.setFilterValue($event)
          "
        />

        <UInput
          size="md"
          :model-value="
            table?.tableApi?.getColumn('fssp:IpNo')?.getFilterValue() as string
          "
          placeholder="Номер исп. производства"
          @update:model-value="
            table?.tableApi?.getColumn('fssp:IpNo')?.setFilterValue($event)
          "
        />

        <UInput
          size="md"
          :model-value="
            table?.tableApi
              ?.getColumn('fssp:IpRiseDate')
              ?.getFilterValue() as string
          "
          placeholder="Дата документа"
          @update:model-value="
            table?.tableApi
              ?.getColumn('fssp:IpRiseDate')
              ?.setFilterValue($event)
          "
        />

        <UInput
          size="md"
          :model-value="
            table?.tableApi
              ?.getColumn('fssp:IdDocNo')
              ?.getFilterValue() as string
          "
          placeholder="Номер исп. листа"
          @update:model-value="
            table?.tableApi?.getColumn('fssp:IdDocNo')?.setFilterValue($event)
          "
        />

        <UInput
          size="md"
          :model-value="
            table?.tableApi
              ?.getColumn('fssp:IdDeloNo')
              ?.getFilterValue() as string
          "
          placeholder="Номер дела"
          @update:model-value="
            table?.tableApi?.getColumn('fssp:IdDeloNo')?.setFilterValue($event)
          "
        />

        <UInput
          size="md"
          :model-value="
            table?.tableApi?.getColumn('fssp:Spi')?.getFilterValue() as string
          "
          placeholder="ФИО пристава"
          @update:model-value="
            table?.tableApi?.getColumn('fssp:Spi')?.setFilterValue($event)
          "
        />

        <UInput
          size="md"
          :model-value="
            table?.tableApi
              ?.getColumn('fssp:IdCrdrName')
              ?.getFilterValue() as string
          "
          placeholder="Взыскатель"
          @update:model-value="
            table?.tableApi
              ?.getColumn('fssp:IdCrdrName')
              ?.setFilterValue($event)
          "
        />
      </div>

      <UCard>
        <div class="h-full">
          <UTable
            class="flex-1"
            ref="table"
            empty="Нет данных"
            loading-color="secondary"
            v-model:pagination="pagination"
            v-model:column-filters="columnFilters"
            :pagination-options="{
              getPaginationRowModel: getPaginationRowModel(),
            }"
            :data="data"
            :columns="columns"
            :loading="loading"
            :ui="{
              base: 'min-w-full overflow-auto',
              th: 'text-xs py-1 px-1.5',
              td: 'whitespace-normal py-1 px-1.5 text-xs',
            }"
          >
            <!-- Статус -->
            <template #status-cell="{ row }">
              <UTooltip
                v-if="row.original.status === 'Завершено'"
                :delay-duration="0"
                text="Завершено"
              >
                <UButton
                  color="success"
                  variant="link"
                  icon="i-mdi-circle-medium"
                />
              </UTooltip>

              <UTooltip
                v-else-if="row.original.status === 'В работе'"
                :delay-duration="0"
                text="В работе"
              >
                <UButton
                  color="secondary"
                  variant="link"
                  icon="i-mdi-circle-medium"
                />
              </UTooltip>

              <UTooltip v-else :delay-duration="0" text="Принято">
                <UButton
                  color="neutral"
                  variant="link"
                  icon="i-mdi-circle-medium"
                />
              </UTooltip>
            </template>

            <!-- Исполнитель -->
            <template #executor-cell="{ row }">
              <UModal title="Исполнитель">
                <UButton
                  :label="row.original.executor ?? 'Не назначен'"
                  color="neutral"
                  variant="link"
                  size="xs"
                />

                <template #body>
                  <pre>{{ row.original }}</pre>
                </template>

                <template #description></template>
              </UModal>
            </template>

            <!-- Дата уведомления -->
            <template #notifyDate-cell="{ row }">
              {{ moment(row.original.notifyDate).format('DD.MM.YYYY HH:mm') }}
            </template>

            <!-- Скачать файл -->
            <template #download-cell="{ row }">
              <UButton
                @click.prevent="fetchDocs(row.original.messageId)"
                variant="link"
                icon="i-lucide-file-text"
                color="neutral"
                size="xs"
              />
            </template>
          </UTable>
        </div>

        <!-- Пагинация -->
        <div class="border-default flex justify-center border-t pt-4">
          <UPagination
            size="sm"
            :default-page="
              (table?.tableApi?.getState().pagination.pageIndex || 0) + 1
            "
            :items-per-page="table?.tableApi?.getState().pagination.pageSize"
            :total="table?.tableApi?.getFilteredRowModel().rows.length"
            @update:page="(p) => table?.tableApi?.setPageIndex(p - 1)"
          />
        </div>
      </UCard>
    </div>
  </div>
</template>

<script setup lang="ts">
import moment from 'moment';
import 'moment/dist/locale/ru';
import { getPaginationRowModel } from '@tanstack/vue-table';
import type { TableColumn } from '@nuxt/ui';

useSeoMeta({
  title: 'Уведомления',
});

definePageMeta({
  middleware: ['authenticated'],
});

const table = useTemplateRef('table');

const columnFilters = ref([
  {
    id: 'fssp:DebtorType',
    value: '',
  },
  // {
  //   id: 'status',
  //   value: null,
  // },
  // {
  //   id: 'executor',
  //   value: undefined,
  // },
  {
    id: 'fssp:DocName',
    value: '',
  },
  {
    id: 'fssp:DbtrName',
    value: '',
  },
  {
    id: 'fssp:IpNo',
    value: '',
  },
  {
    id: 'fssp:IpRiseDate',
    value: '',
  },
  {
    id: 'fssp:IdDocNo',
    value: '',
  },
  {
    id: 'fssp:IdDeloNo',
    value: '',
  },
  {
    id: 'fssp:Spi',
    value: '',
  },
  {
    id: 'fssp:IdCrdrName',
    value: '',
  },
]);

const pagination = ref({
  pageIndex: 0,
  pageSize: 25,
});

const data = ref();
const loading = ref(false);
const selectedDate: any = ref(useGetMonths()[0]);
const subjectTypesValues = ref(['ЮЛ', 'ФЛ', 'ИП']);
const statuses = ref();
const statusesValues = ref();
const executors = ref();

type Message = {
  messageId: number;
  notifyDate: string;
  executorId: string;
  executor: string;
  statusId: string;
  status: string;
  'fssp:Id': number | null;
  'fssp:DebtorType': number | null;
  'fssp:DbtrName': string | null;
  'fssp:DocName': string | null;
  'fssp:IpNo': string | null;
  'fssp:IpRiseDate': string | null;
  'fssp:TotalArrestDebtSum': string | null;
  'fssp:IdDocNo': string | null;
  'fssp:IdDocDate': string | null;
  'fssp:IdDeloNo': string | null;
  'fssp:IdDeloDate': string | null;
  'fssp:Spi': string | null;
  'fssp:IdCrdrNam': string | null;
  'fssp:IdDebtSum': string | null;
};

const fetchDocs = async (messageId: any) => {
  const file: any = await $fetch(`/api/files/${messageId}`);

  downloadPDF(file[0].attachment, file[0].fileName, file[0].mimeType);
};

function downloadPDF(pdf: any, fileName: any, mimeType: any) {
  const linkSource = `data:${mimeType};base64,${pdf}`;
  const downloadLink = document.createElement('a');

  downloadLink.href = linkSource;
  downloadLink.download = fileName;
  downloadLink.click();
}

const columns: TableColumn<Message>[] = [
  {
    accessorKey: 'status',
    header: 'Статус',
  },
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
    accessorKey: 'fssp:IpRiseDate',
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
  {
    accessorKey: 'fssp:IdCrdrName',
    header: 'Взыскатель',
  },
];

async function getMessages(date: string | undefined) {
  try {
    loading.value = true;
    const response = await $fetch<Message[]>(`/api/messages/${date}`);
    data.value = response.filter((value: any) => value != null);
  } catch (error: any) {
    console.log(error.message);
  } finally {
    loading.value = false;
  }
}

async function changeDate(date: string | undefined) {
  await getMessages(date);
}

function useGetMonths() {
  const monthCurrent: any = moment().startOf('month').format('MM');
  const monthsQuantityOfYear = 24 - (12 - monthCurrent);
  const months = [];

  for (let i = 0; i < monthsQuantityOfYear; i++) {
    const title = moment().subtract(i, 'month').format('MMMM YYYY');
    const value = moment().subtract(i, 'month').format('YYYY-MM');

    const result = {
      label: title[0]?.toUpperCase() + title.substring(1),
      value,
    };

    months.push(result);
  }

  return months;
}

async function getExecutors() {
  const users = await $fetch('/api/users');
  executors.value = users.map((item) => {
    return {
      label: item.fullname
        ?.toString()
        ?.split(/\s+/)
        .map((w: string, i: any) =>
          i ? w.substring(0, 1).toUpperCase() + '.' : w,
        )
        .join(' '),
      value: item.fullname
        ?.toString()
        ?.split(/\s+/)
        .map((w: string, i: any) =>
          i ? w.substring(0, 1).toUpperCase() + '.' : w,
        )
        .join(' '),
    };
  });
}

async function getStatuses() {
  const response = await $fetch('/api/statuses');

  statusesValues.value = response.map((item) => item.status);

  statuses.value = response.map((item) => {
    return {
      label: item.status,
      value: item.id,
    };
  });
}

onMounted(async () => {
  await getMessages(useGetMonths()[0]?.value);
  await getExecutors();
  await getStatuses();
});
</script>
