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

      <!-- <UModal
        v-model:open="showAddExrcutorModal"
        title="Добавление исполнителя"
      >
        <UButton label="Добавить" />

        <template #description>
          Исполнителя можно будет назначить в разделе "Уведомления"
        </template>

        <template #body>
          <UForm
            :schema="addExecutorSchema"
            :state="state"
            class="space-y-4"
            @submit="addExecutor"
          >
            <UFormField
              label="Фамилия и инициалы"
              description="Например, Иванов И.И."
              name="fullname"
            >
              <UInput v-model="state.fullname" />
            </UFormField>

            <UButton type="submit">Добавить</UButton>
          </UForm>
        </template>
      </UModal> -->
    </UCard>
  </UContainer>
</template>

<script lang="ts" setup>
import type { TableColumn } from '@nuxt/ui';
import type { FormSubmitEvent } from '@nuxt/ui';
import type { AddExecutorSchema } from '~~/shared/utils/schemas';
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

const state = reactive<Partial<AddExecutorSchema>>({
  fullname: 'Иванов И.И.',
});

const showAddExrcutorModal = ref(false);
const showEditExrcutorModal = ref(false);

async function addExecutor(event: FormSubmitEvent<AddExecutorSchema>) {
  const data = toRaw(event.data);

  showAddExrcutorModal.value = false;

  const insertedData = {
    id: 41,
    executor: data.fullname,
  };

  executors.value.push(insertedData);

  toast.add({
    description: 'Исполнитель успешно добавлен',
    color: 'success',
  });

  // try {
  //   const response = await $fetch.raw('api/executors', {
  //     method: 'POST',
  //     body: JSON.stringify({ executor: data.fullname }),
  //   });

  //   if (response.status === 201) {
  //     const insertedData = {
  //       id: JSON.parse(response.statusText).id,
  //       executor: data.fullname,
  //     }
  //   }
  // } catch (error: any) {
  //   console.log(error.message);
  // }
}

// Редактирование исполнителя
const editExecutorModal = overlay.create(EditExecutorModal);

async function openEditExecutorModal(data: Executor) {
  await editExecutorModal.open({
    data,
  });
}
</script>
