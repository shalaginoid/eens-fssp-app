<template>
  <UModal :close="{ onClick: () => emit('close', false) }">
    <template #title>Исполнитель</template>

    <template #description>Назначение исполнителя и установка статуса</template>

    <template #body>
      <!-- <pre>{{ props }}</pre> -->

      <UForm
        :schema="setStatusSchema"
        :state="state"
        class="space-y-4"
        @submit="setStatus"
      >
        <UAlert
          v-if="errorMessage"
          class="mb-4"
          color="error"
          variant="soft"
          :description="errorMessage"
        ></UAlert>

        <UFormField label="Исполнитель" name="executorId">
          <USelect
            v-model="state.executorId"
            :items="props.executors"
            label-key="executor"
            value-key="id"
            placeholder="Исполнитель"
            class="min-w-48"
          />
        </UFormField>

        <UFormField label="Статус" name="statusId">
          <USelect
            v-model="state.statusId"
            :items="props.statuses"
            label-key="status"
            value-key="id"
            placeholder="Статус"
            class="min-w-36"
          />
        </UFormField>

        <UButton type="submit">Добавить</UButton>
      </UForm>
    </template>
  </UModal>
</template>

<script setup lang="ts">
import type { FormSubmitEvent } from '@nuxt/ui';

const props = defineProps<{
  message: Message;
  statuses: Status[];
  executors: Executor[];
}>();

const emit = defineEmits<{ close: any }>();

const state = reactive<Partial<SetStatusSchema>>({
  executorId: Number(toRaw(props.message).executorId) || undefined,
  statusId: Number(toRaw(props.message).statusId) || undefined,
});

const errorMessage = ref(null);

async function setStatus(event: FormSubmitEvent<SetStatusSchema>) {
  errorMessage.value = null;
  const data = toRaw(event.data);

  const body = {
    messageId: toRaw(props.message).messageId,
    statusId: data.statusId,
    executorId: data.executorId,
  };

  try {
    const response = await $fetch.raw('/api/relations', {
      method: 'POST',
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
