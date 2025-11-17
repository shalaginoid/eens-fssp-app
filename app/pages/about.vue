<template>
  <UDashboardPanel id="about">
    <template #header>
      <UDashboardNavbar title="О сервисе" />
    </template>

    <template #body>
      <div class="mx-auto flex w-full flex-col space-y-4 lg:max-w-xl">
        <h2 class="font-bold">Стек технологий:</h2>

        <ul class="mb-4 list-disc px-5">
          <li>NodeJS</li>
          <li>Nuxt</li>
          <li>Typescript</li>
          <li>Tailwind CSS</li>
          <li>MSSQL</li>
        </ul>

        <h2 class="font-bold">Разработчик:</h2>
        <p>Отдел сопровождения информационных систем (Шалагинов К. А.)</p>
      </div>
    </template>
  </UDashboardPanel>
</template>

<script lang="ts" setup>
useHead({ title: 'О сервисе' });
</script>
