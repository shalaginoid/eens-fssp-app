<template>
  <UContainer class="my-8">
    <UCard class="relative overflow-visible">
      <div class="mb-4 flex">
        <ClientOnly>
          <UAvatar
            :src="avatar"
            icon="i-mdi-account"
            size="3xl"
            class="h-20 w-20 rounded bg-neutral-200 p-0.5"
          />
        </ClientOnly>

        <h1 class="ms-4 flex items-center text-2xl font-bold">
          {{ user?.fullname }}
        </h1>
      </div>

      <table class="table">
        <tbody>
          <tr>
            <td>Почта</td>
            <td>
              {{ user?.mail }}
            </td>
          </tr>

          <tr>
            <td>Отдел</td>
            <td>
              {{ user?.department }}
            </td>
          </tr>

          <tr>
            <td>Должность</td>
            <td>
              {{ user?.jobTitle }}
            </td>
          </tr>

          <tr>
            <td>Телефон</td>
            <td>
              {{ user?.telephoneNumber }}
            </td>
          </tr>
        </tbody>
      </table>
    </UCard>
  </UContainer>
</template>

<script lang="ts" setup>
const { user, loggedIn } = useUserSession();

useSeoMeta({
  title: 'Профиль',
});

definePageMeta({
  middleware: ['authenticated'],
});

const avatar = computed(() => {
  if (loggedIn.value && user.value?.fullname) {
    return `http://portal.eksbyt.ru/docum/DocLib1/${user.value.fullname}.jpg`;
  }
});
</script>
