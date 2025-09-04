<template>
  <UModal :close="{ onClick: () => emit('close', false) }">
    <template #title>Назначение исполнителя</template>

    <template #description></template>

    <template #body>
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
            placeholder="Исполнитель"
          />
        </UFormField>

        <UFormField label="Статус" name="statusId">
          <USelect
            v-model="state.statusId"
            :items="props.statuses"
            placeholder="Статус"
          />
        </UFormField>

        <UButton type="submit">Добавить</UButton>
      </UForm>
    </template>
  </UModal>
</template>

<script setup lang="ts">
import type { FormSubmitEvent } from '@nuxt/ui';
import type { SetStatusSchema } from '~~/shared/utils/schemas';

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

type Status = {
  label: string;
  value: number;
};

type Executor = {
  label: string;
  value: number;
};

const props = defineProps<{
  message: Message;
  statuses: Array<Status>;
  executors: Array<Executor>;
}>();

console.log();

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
