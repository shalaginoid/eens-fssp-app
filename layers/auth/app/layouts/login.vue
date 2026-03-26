<template>
  <UApp>
    <div
      class="light:bg-elevated flex h-screen flex-col justify-between overflow-hidden"
    >
      <ColorModeButton class="absolute top-4 right-4" />

      <div class="flex flex-1 flex-col items-center px-6 py-12 lg:px-8">
        <div class="mb-8 pt-12">
          <img src="/images/eens.svg" width="50" height="50" />
        </div>

        <UPageCard variant="soft" class="light:bg-white max-w-72">
          <slot></slot>
        </UPageCard>
      </div>

      <div class="flex-none p-6 text-center text-sm text-gray-400">
        &copy; {{ new Date().getFullYear() }} АО «ЕЭНС»
      </div>
    </div>
  </UApp>
</template>
