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
              <CustomLink to="https://nodejs.org/en" target="_blank">
                NodeJS
              </CustomLink>
            </li>
            <li>
              <CustomLink to="https://nuxt.com" target="_blank">
                Nuxt
              </CustomLink>
            </li>
            <li>
              <CustomLink to="https://www.typescriptlang.org" target="_blank">
                Typescript
              </CustomLink>
            </li>
            <li>
              <CustomLink to="https://tailwindcss.com" target="_blank">
                Tailwind CSS
              </CustomLink>
            </li>
            <li>
              <CustomLink
                to="https://www.npmjs.com/package/mssql"
                target="_blank"
              >
                MSSQL
              </CustomLink>
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
