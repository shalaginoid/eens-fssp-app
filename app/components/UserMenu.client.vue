<template>
  <UDropdownMenu :items="items">
    <UButton
      v-bind="{
        ...user,
        trailingIcon: 'i-lucide-chevron-down',
      }"
      :ui="{
        trailingIcon: 'text-dimmed',
      }"
      class="data-[state=open]:bg-elevated"
      color="neutral"
      variant="ghost"
    />
  </UDropdownMenu>
</template>

<script setup lang="ts">
import type { DropdownMenuItem } from '@nuxt/ui';

const { loggedIn, user: currentUser, clear: clearSession } = useUserSession();

const username = computed(() => {
  if (loggedIn.value && currentUser.value?.fullname) {
    return currentUser.value.fullname
      .split(/\s+/)
      .map((w: string, i: any) =>
        i ? w.substring(0, 1).toUpperCase() + '.' : w,
      )
      .join(' ');
  }
});

const avatar = computed(() => {
  if (loggedIn.value && currentUser.value?.fullname) {
    return `http://portal.eksbyt.ru/docum/DocLib1/${currentUser.value.fullname}.jpg`;
  }
});

const user = ref({
  name: username.value,
  avatar: {
    src: avatar.value,
    alt: username.value,
  },
});

const items = computed<DropdownMenuItem[][]>(() => [
  [
    {
      type: 'label',
      label: user.value.name,
      avatar: user.value.avatar,
    },
  ],
  [
    {
      label: 'Пользователи',
      icon: 'i-lucide-users',
      to: '/users',
    },
    {
      label: 'Сессии',
      icon: 'i-lucide-monitor-dot',
      to: '/visitors',
    },
  ],
  [
    {
      label: 'Выйти',
      icon: 'i-lucide-log-out',
      onSelect: logout,
    },
  ],
]);

async function logout() {
  await clearSession();
  await navigateTo('/login');
}
</script>
