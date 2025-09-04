<template>
  <UModal :close="{ onClick: () => emit('close', false) }">
    <template #title>Назначение исполнителя</template>

    <template #description></template>

    <template #body>
      <pre>{{ props }}</pre>

      <UForm
        :schema="setStatusSchema"
        :state="state"
        class="space-y-4"
        @submit="setStatus"
      >
        <UFormField label="Исполнитель" name="executor">
          <UInput v-model="state.executor" />
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

const emit = defineEmits<{ close: any }>();

const state = reactive<Partial<SetStatusSchema>>({
  executor: '',
  status: '',
});

async function setStatus(event: FormSubmitEvent<SetStatusSchema>) {
  const data = toRaw(event.data);
}
</script>
