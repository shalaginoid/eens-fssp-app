<template>
  <UContainer class="my-8">
    <UCard>
      <h1 class="mb-4 text-2xl font-bold">Исполнители</h1>

      <UTable
        :data="executors"
        :columns="columns"
        class="mb-4"
        empty="Нет данных"
        :ui="{
          th: 'p-3',
          td: 'whitespace-normal py-3 ',
        }"
      >
        <template #actions-cell="{ row }">
          <div class="flex gap-4">
            <UButton
              @click="openEditExecutorModal(row.original)"
              size="md"
              icon="i-lucide-settings"
              variant="link"
              color="neutral"
              class="flex p-0"
            />

            <UButton
              v-if="user?.department === 'УСПО_ОИСиИС'"
              @click="openDeleteExecutorModal(row.original)"
              icon="i-lucide-trash-2"
              variant="link"
              color="neutral"
              class="flex p-0"
            />
          </div>
        </template>
      </UTable>

      <UButton label="Добавить" @click="openAddExecutorModal" />
    </UCard>
  </UContainer>
</template>

<script lang="ts" setup>
import type { TableColumn } from '@nuxt/ui';
import AddExecutorModal from '@/components/AddExecutorModal.vue';
import EditExecutorModal from '@/components/EditExecutorModal.vue';
import DeleteExecutorModal from '@/components/DeleteExecutorModal.vue';

definePageMeta({
  middleware: ['authenticated'],
});

useSeoMeta({
  title: 'Исполнители',
});

const { user } = useUserSession();

const toast = useToast();
const overlay = useOverlay();

type Executor = {
  id: number;
  executor: string;
};

const executors = ref();

onMounted(async () => {
  try {
    executors.value = await $fetch<Executor[]>('/api/executors');
  } catch (error: any) {
    console.log(error.message);
  }
});

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
    accessorKey: 'actions',
    header: 'Действия',
  },
];

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
