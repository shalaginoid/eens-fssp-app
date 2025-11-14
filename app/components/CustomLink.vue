<template>
  <ULink class="custom-link group" :to="to" :target="target">
    <span>
      <slot></slot>
    </span>

    <Icon
      v-if="target === '_blank'"
      name="i-lucide:arrow-up-right"
      class="size-3 align-top"
    />
  </ULink>
</template>

<script lang="ts" setup>
defineProps<{
  to: string;
  target?: '_blank' | '_parent' | '_self' | '_top' | (string & {}) | null;
}>();
</script>
