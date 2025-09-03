<template>
  <div class="flex h-screen flex-col justify-between">
    <header class="flex-none bg-white">
      <UContainer class="flex items-center gap-4 py-2">
        <UNavigationMenu
          :ui="{
            content: 'sm:w-auto',
            childList: 'sm:w-48',
          }"
          :items="mainMenu"
          :disableClickTrigger="true"
          variant="pill"
          color="secondary"
          class="w-full"
          content-orientation="vertical"
          highlightColor="error"
        ></UNavigationMenu>

        <ClientOnly fallback-tag="div">
          <template #fallback>
            <Spinner />
          </template>

          <UDropdownMenu
            mode="hover"
            :items="dropdownMenu"
            :ui="{
              content: 'w-48',
              label: 'font-normal text-muted',
            }"
          >
            <UAvatar
              :src="avatar"
              icon="i-mdi-account"
              size="sm"
              class="cursor-pointer border-1 border-neutral-100"
            />
          </UDropdownMenu>
        </ClientOnly>
      </UContainer>
    </header>

    <main class="flex-1">
      <slot></slot>
    </main>

    <Visitors />
  </div>
</template>

<script setup lang="ts">
import type { DropdownMenuItem } from '@nuxt/ui';

const { loggedIn, user, clear: clearSession } = useUserSession();

const username = computed(() => {
  if (loggedIn.value && user.value?.fullname) {
    return user.value.fullname
      .split(/\s+/)
      .map((w: string, i: any) =>
        i ? w.substring(0, 1).toUpperCase() + '.' : w,
      )
      .join(' ');
  }
});

const avatar = computed(() => {
  if (loggedIn.value && user.value?.fullname) {
    return `http://portal.eksbyt.ru/docum/DocLib1/${user.value.fullname}.jpg`;
  }
});

const mainMenu = computed(() => [
  {
    label: 'Уведомления',
    to: '/',
  },
  {
    label: 'Статистика',
    to: '/statistic',
  },
]);

const dropdownMenu = ref<DropdownMenuItem[][]>([
  [
    {
      label: username.value,
      icon: 'i-lucide-user-round',
      type: 'link',
      to: '/profile',
    },
  ],
  [
    {
      label: 'Пользователи',
      icon: 'i-lucide-users-round',
      to: '/users',
    },
    {
      label: 'Сессии',
      icon: 'i-lucide-monitor-dot',
      to: '/visitors',
    },
    {
      label: 'Выйти',
      icon: 'i-lucide-power',
      onSelect: logout,
    },
  ],
]);

async function logout() {
  await clearSession();
  await navigateTo('/login');
}
</script>
