<template>
  <UContainer class="my-8">
    <UCard>
      <h1 class="mb-4 text-2xl font-bold">Исполнители</h1>

      <UTable
        :data="executors"
        :columns="columns"
        class="mb-4"
        empty="Нет данных"
      >
        <template #actions-cell="{ row }">
          <UButton
            @click="openEditExecutorModal(row.original)"
            icon="i-lucide-settings"
            variant="link"
            color="neutral"
          />
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

definePageMeta({
  middleware: ['authenticated'],
});

useSeoMeta({
  title: 'Исполнители',
});

const toast = useToast();
const overlay = useOverlay();

type Executor = {
  id: number;
  executor: string;
};

const executors = ref();

onMounted(async () => {
  executors.value = await $fetch<Executor[]>('/api/executors');
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
  await editExecutorModal.open({
    data,
  });
}
</script>
