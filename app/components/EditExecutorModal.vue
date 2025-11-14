<template>
  <UModal :close="{ onClick: () => emit('close', false) }">
    <template #title>Редактирование исполнителя: {{ data.executor }}</template>

    <template #description>
      Исполнитель изменится также в разделе уведомлений
    </template>

    <template #body>
      <UForm
        :schema="addExecutorSchema"
        :state="state"
        class="space-y-4"
        @submit="editExecutor"
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

        <UButton type="submit">Сохранить</UButton>
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

const props = defineProps<{
  data: Executor;
}>();

const emit = defineEmits<{ close: any }>();

const state = reactive<Partial<AddExecutorSchema>>({
  fullname: toRaw(props.data).executor,
});

const errorMessage = ref(null);

async function editExecutor(event: FormSubmitEvent<AddExecutorSchema>) {
  errorMessage.value = null;
  const data = toRaw(event.data);

  try {
    const body = {
      id: toRaw(props.data).id,
      executor: data.fullname,
    };

    const response = await $fetch.raw('api/executors', {
      method: 'PUT',
      body,
    });

    if (response.status === 204) {
      emit('close', body);
    }
  } catch (error: any) {
    errorMessage.value = error.message;
  }
}
</script>
