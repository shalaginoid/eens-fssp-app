<template>
  <UDashboardPanel id="executors">
    <template #header>
      <UDashboardNavbar title="Исполнители" />
    </template>

    <template #body>
      <div
        class="mx-auto flex w-full flex-col gap-4 sm:gap-6 lg:max-w-3xl lg:gap-12"
      >
        <UPageCard>
          <UTable :data="executors" :columns="columns" empty="Нет данных" />

          <div>
            <UButton label="Добавить" @click="openAddExecutorModal" />
          </div>
        </UPageCard>
      </div>
    </template>
  </UDashboardPanel>
</template>

<script lang="ts" setup>
import type { TableColumn } from '@nuxt/ui';
import type { Row } from '@tanstack/table-core';
import AddExecutorModal from '@/components/AddExecutorModal.vue';
import EditExecutorModal from '@/components/EditExecutorModal.vue';
import DeleteExecutorModal from '@/components/DeleteExecutorModal.vue';

useHead({
  title: 'Исполнители',
});

const { user } = useUserSession();

const toast = useToast();
const overlay = useOverlay();

const executors = ref();

const { data } = await useFetch<Executor[]>('/api/executors');

if (data.value) {
  executors.value = data.value;
}

const UDropdownMenu = resolveComponent('UDropdownMenu');
const UButton = resolveComponent('UButton');

const columns: TableColumn<Executor>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
  },
  {
    accessorKey: 'executor',
    header: 'Исполнитель',
  },
  {
    id: 'actions',
    header: 'Действия',
    meta: {
      class: {
        th: 'text-center',
        td: 'text-center',
      },
    },
    cell: ({ row }) => {
      return h(
        'div',
        { class: '' },
        h(
          UDropdownMenu,
          {
            content: {
              align: 'end',
            },
            items: getRowItems(row),
          },
          () =>
            h(UButton, {
              icon: 'i-lucide-ellipsis-vertical',
              color: 'neutral',
              variant: 'ghost',
            }),
        ),
      );
    },
  },
];

function getRowItems(row: Row<Executor>) {
  return [
    {
      label: 'Изменить',
      icon: 'i-lucide-pen',
      onSelect() {
        openEditExecutorModal(row.original);
      },
    },
    {
      label: 'Удалить',
      icon: 'i-lucide-trash',
      color: 'error',
      disabled: user?.value?.department !== 'УСПО_ОИСиИС',
      onSelect() {
        openDeleteExecutorModal(row.original);
      },
    },
  ];
}

// Добавление исполнителя
const addExecutorModal = overlay.create(AddExecutorModal);

async function openAddExecutorModal() {
  const executor = await addExecutorModal.open();

  if (executor) {
    executors.value.push(executor);
    toast.add({
      description: 'Исполнитель успешно добавлен',
      color: 'success',
    });
  }
}

// Редактирование исполнителя
const editExecutorModal = overlay.create(EditExecutorModal);

async function openEditExecutorModal(data: Executor) {
  const executor: Executor = await editExecutorModal.open({
    data,
  });

  if (executor) {
    const find = executors.value.find((item: any) => item.id === executor.id);
    find.executor = executor.executor;

    toast.add({
      description: 'Исполнитель успешно изменен',
      color: 'success',
    });
  }
}

// Удаление исполнителя
const deleteExecutorModal = overlay.create(DeleteExecutorModal);

async function openDeleteExecutorModal(data: Executor) {
  const executor: Executor = await deleteExecutorModal.open({
    data,
  });

  if (executor) {
    const index = executors.value.indexOf(toRaw(executor));

    if (index !== -1) {
      executors.value.splice(index, 1);

      toast.add({
        description: 'Исполнитель успешно удален',
        color: 'success',
      });
    }
  }
}
</script>
