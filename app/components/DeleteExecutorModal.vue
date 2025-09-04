<template>
  <UModal :close="{ onClick: () => emit('close', false) }">
    <template #title>Удаление исполнителя</template>

    <template #description>
      Вы уверены, что хотите удалить исполнителя?
    </template>

    <template #body>
      <UAlert
        v-if="errorMessage"
        class="mb-4"
        color="error"
        variant="soft"
        :description="errorMessage"
      ></UAlert>

      <UButton
        label="Удалить"
        color="error"
        variant="soft"
        class="me-2"
        @click="submitDeleteItem"
      />

      <UButton
        label="Отмена"
        color="primary"
        variant="soft"
        @click="emit('close', false)"
      />
    </template>
  </UModal>
</template>

<script setup lang="ts">
const emit = defineEmits<{ close: any }>();

type Executor = {
  id: number;
  executor: string;
};

const props = defineProps<{
  data: Executor;
}>();

const errorMessage = ref(null);

async function submitDeleteItem() {
  errorMessage.value = null;

  try {
    const body = {
      id: toRaw(props.data).id,
    };

    const response = await $fetch.raw('api/executors', {
      method: 'DELETE',
      body,
    });

    if (response.status === 204) {
      emit('close', props.data);
    }
  } catch (error: any) {
    errorMessage.value = error.message;
  }
}
</script>
