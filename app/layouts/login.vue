<template>
  <div class="flex h-screen flex-col justify-between">
    <div class="flex flex-1 flex-col items-center px-6 py-12 lg:px-8">
      <div class="mb-8 pt-12">
        <img src="~/assets/images/eens.svg" width="50" height="50" />
      </div>

      <div class="mx-auto w-72 rounded bg-white p-6">
        <slot></slot>
      </div>
    </div>

    <div class="flex-none p-6 text-center text-sm text-gray-400">
      &copy; {{ new Date().getFullYear() }} АО «ЕЭНС»
    </div>
  </div>
</template>
