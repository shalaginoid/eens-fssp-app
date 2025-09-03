<template>
  <UContainer class="my-8">
    <UCard>
      <h1 class="mb-4 text-2xl font-bold">
        <span class="me-2">Пользователи сервиса</span>

        <UBadge class="align-middle font-bold" color="secondary">
          {{ users?.length }}
        </UBadge>
      </h1>

      <table class="table">
        <tbody>
          <tr v-for="user in online">
            <td class="flex items-center">
              <UPopover mode="hover">
                <UButton
                  icon="i-lucide-info"
                  color="neutral"
                  variant="link"
                  size="xs"
                  class="me-3 p-0"
                />

                <template #content>
                  <div class="p-3 text-xs">
                    {{ user.department }}
                    <br />
                    {{ user.jobTitle }}
                  </div>
                </template>
              </UPopover>

              <span>{{ user.fullname }}</span>
            </td>

            <td>
              <div v-if="user.peerId && user.sessionId" class="text-success">
                онлайн
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </UCard>
  </UContainer>
</template>

<script lang="ts" setup>
useSeoMeta({
  title: 'Пользователи сервиса',
});

definePageMeta({
  middleware: ['authenticated'],
});

const visitors = useVisitors();

const { data: users } = await useFetch('/api/users');

const online = computed(() => {
  if (users.value) {
    const mergedArray = users.value.map((item1) => {
      const matchingItem2 = toRaw(visitors.value).find(
        (item2) => item2.user?.mail === item1.mail,
      );

      return { ...item1, ...matchingItem2 };
    });

    return mergedArray;
  }
});
</script>
