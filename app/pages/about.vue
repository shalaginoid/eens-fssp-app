<template>
  <UDashboardPanel id="about">
    <template #header>
      <UDashboardNavbar title="О сервисе" />
    </template>

    <template #body>
      <div
        class="mx-auto flex w-full flex-col gap-4 sm:gap-6 lg:max-w-2xl lg:gap-12"
      >
        <div class="space-y-2">
          <h2 class="font-bold">Стек технологий:</h2>

          <ul class="mb-5 list-disc px-5">
            <li>NodeJS</li>
            <li>Nuxt</li>
            <li>Tailwind CSS</li>
            <li>MSSQL</li>
          </ul>

          <h2 class="font-bold">Разработчик:</h2>
          <p>Отдел сопровождения информационных систем (Шалагинов К. А.)</p>
        </div>
      </div>
    </template>
  </UDashboardPanel>
</template>

<script lang="ts" setup>
useHead({ title: 'О сервисе' });
</script>
