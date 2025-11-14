<template>
  <UModal :close="{ onClick: () => emit('close', false) }">
    <template #title>Добавление исполнителя</template>

    <template #description>
      Можно будет назначить в разделе уведомлений
    </template>

    <template #body>
      <UForm
        :schema="addExecutorSchema"
        :state="state"
        class="space-y-4"
        @submit="addExecutor"
      >
        <UAlert
          v-if="errorMessage"
          class="mb-4"
          color="error"
          variant="soft"
          :description="errorMessage"
        ></UAlert>

        <UFormField
          label="Фамилия и инициалы"
          description="Например, Иванов И. И."
          name="fullname"
        >
          <UInput v-model="state.fullname" />
        </UFormField>

        <UButton type="submit">Добавить</UButton>
      </UForm>
    </template>
  </UModal>
</template>

<script setup lang="ts">
import type { FormSubmitEvent } from '@nuxt/ui';
import type { AddExecutorSchema } from '~~/shared/utils/schemas';

type Executor = {
  id: number;
  executor: string;
};

const emit = defineEmits<{ close: any }>();

const state = reactive<Partial<AddExecutorSchema>>({
  fullname: '',
});

const errorMessage = ref(null);

async function addExecutor(event: FormSubmitEvent<AddExecutorSchema>) {
  errorMessage.value = null;
  const data = toRaw(event.data);

  try {
    const response = await $fetch.raw('/api/executors', {
      method: 'POST',
      body: JSON.stringify({ executor: data.fullname }),
    });

    if (response.status === 201) {
      const insertedData: Executor = {
        id: JSON.parse(response.statusText).id,
        executor: data.fullname,
      };

      emit('close', insertedData);
    }
  } catch (error: any) {
    errorMessage.value = error.message;
  }
}
</script>
