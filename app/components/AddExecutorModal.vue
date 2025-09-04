<template>
  <UModal :close="{ onClick: () => emit('close', false) }">
    <template #title>Добавление исполнителя</template>
    <template #description></template>
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

    <!-- <template #footer>
      <div class="flex gap-2">
        <UButton
          color="neutral"
          label="Dismiss"
          @click="emit('close', false)"
        />
        <UButton label="Success" @click="emit('close', true)" />
      </div>
    </template> -->
  </UModal>
</template>

<script setup lang="ts">
import type { FormSubmitEvent } from '@nuxt/ui';
import type { AddExecutorSchema } from '~~/shared/utils/schemas';

const toast = useToast();

// defineProps<{
//   data: any;
// }>();

const emit = defineEmits<{ close: [boolean] }>();

const state = reactive<Partial<AddExecutorSchema>>({
  fullname: 'Иванов И.И.',
});

async function addExecutor(event: FormSubmitEvent<AddExecutorSchema>) {
  const data = toRaw(event.data);

  const insertedData = {
    id: 41,
    executor: data.fullname,
  };

  // executors.value.push(insertedData);

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
</script>
