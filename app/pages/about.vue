<template>
  <UDashboardPanel id="about">
    <template #header>
      <UDashboardNavbar title="О сервисе" />
    </template>

    <template #body>
      <div class="mx-auto flex w-full flex-col space-y-4 lg:max-w-xl">
        <UCard variant="subtle">
          <h2 class="text-dimmed mb-4">Стек технологий</h2>

          <ul class="list-disc px-5">
            <li>
              <AppLink to="https://nodejs.org/en">NodeJS</AppLink>
            </li>
            <li>
              <AppLink to="https://nuxt.com">Nuxt</AppLink>
            </li>
            <li>
              <AppLink to="https://www.typescriptlang.org">Typescript</AppLink>
            </li>
            <li>
              <AppLink to="https://tailwindcss.com">Tailwind CSS</AppLink>
            </li>
            <li>
              <AppLink to="https://www.npmjs.com/package/mssql">MSSQL</AppLink>
            </li>
          </ul>
        </UCard>

        <UCard variant="subtle">
          <h2 class="text-dimmed mb-4">Разработка</h2>

          <UUser
            :avatar="{
              src: `${baseUrl}api/photo/Шалагинов%20Константин%20Александрович`,
              icon: 'i-lucide-image',
            }"
            to="mailto:shalaginovka@eens.ru"
            name="Шалагинов К. А."
            description="Инженер"
          />
        </UCard>
      </div>
    </template>
  </UDashboardPanel>
</template>

<script lang="ts" setup>
useHead({ title: 'О сервисе' });

const baseUrl = useRuntimeConfig().app.baseURL;
</script>
