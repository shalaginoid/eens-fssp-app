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

<style>
@reference "@/assets/css/main.css";

.custom-link span {
  @apply text-secondary border-secondary/30 group-hover:text-secondary/70 group-hover:border-b-secondary/15 border-b transition-colors;
}
</style>
