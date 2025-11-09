<template>
  <ClientOnly>
    <UDropdownMenu
      :items="items"
      :content="{ align: 'center', collisionPadding: 12 }"
      :ui="{
        content: collapsed ? 'w-48' : 'w-(--reka-dropdown-menu-trigger-width)',
      }"
    >
      <UButton
        v-bind="{
          ...user,
          label: collapsed ? undefined : user?.name,
          trailingIcon: collapsed ? undefined : 'i-lucide-chevrons-up-down',
        }"
        class="data-[state=open]:bg-elevated"
        color="neutral"
        variant="ghost"
        block
        :square="collapsed"
        :size="size"
        :ui="{
          trailingIcon: 'text-dimmed',
        }"
      />
    </UDropdownMenu>

    <template #fallback>
      <div v-if="!collapsed" class="flex w-full items-center gap-1.5 px-3 py-2">
        <div class="flex-none">
          <USkeleton class="h-5 w-5 rounded-full" />
        </div>

        <div class="w-full">
          <USkeleton class="h-5 w-full" />
        </div>
      </div>

      <div v-else class="flex w-full items-center justify-center py-2">
        <USkeleton class="h-5 w-5 rounded-full" />
      </div>
    </template>
  </ClientOnly>
</template>

<script setup lang="ts">
import type { DropdownMenuItem } from '@nuxt/ui';

defineProps<{
  collapsed?: boolean;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | undefined;
}>();

const { loggedIn, user: currentUser, clear: clearSession } = useUserSession();

const avatar = computed(() => {
  if (loggedIn.value && currentUser.value?.fullname) {
    return `http://portal.eksbyt.ru/docum/DocLib1/${currentUser.value.fullname}.jpg`;
  }
});

const user = ref({
  name: currentUser.value?.shortname,
  avatar: {
    src: avatar.value,
    alt: currentUser.value?.shortname,
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
