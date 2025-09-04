<template>
  <UModal :close="{ onClick: () => emit('close', false) }">
    <template #title>Редактирование исполнителя</template>
    <template #description></template>
    <template #body>{{ data }}</template>

    <template #footer>
      <div class="flex gap-2">
        <UButton
          color="neutral"
          label="Dismiss"
          @click="emit('close', false)"
        />
        <UButton label="Success" @click="emit('close', true)" />
      </div>
    </template>
  </UModal>
</template>

<script setup lang="ts">
defineProps<{
  data: any;
}>();

const emit = defineEmits<{ close: [boolean] }>();
</script>
