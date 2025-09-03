<template>
  <UForm
    :schema="loginSchema"
    :state="state"
    class="space-y-4"
    @submit="onSubmit"
  >
    <h1 class="mb-2 font-bold">Госпочта (ФССП)</h1>

    <UAlert
      v-if="errorMessage"
      class="mb-4"
      color="error"
      variant="soft"
      :description="errorMessage"
    ></UAlert>

    <p class="text-muted text-sm">
      Для предоставления доступа необходимо
      <a
        href="http://portal.eksbyt.ru/openv/Lists/openview/NewLNA4.aspx"
        class="link"
        target="_blank"
      >
        подать заявку
      </a>
      в отдел сетевой инфраструктуры для включения в доменную группу «Госпочта
      ФССП»
    </p>

    <UFormField name="email">
      <UInput
        class="w-full"
        v-model="state.email"
        icon="i-lucide-at-sign"
        placeholder="Эл. почта"
      />
    </UFormField>

    <UFormField name="password">
      <UInput
        class="w-full"
        v-model="state.password"
        icon="i-lucide-key-round"
        :type="show ? 'text' : 'password'"
        :ui="{ trailing: 'pe-1' }"
        placeholder="Пароль"
      >
        <template #trailing>
          <UButton
            color="neutral"
            variant="link"
            :icon="show ? 'i-lucide-eye-off' : 'i-lucide-eye'"
            :aria-label="show ? 'Hide password' : 'Show password'"
            :aria-pressed="show"
            aria-controls="password"
            @click="show = !show"
          />
        </template>
      </UInput>
    </UFormField>

    <UButton :loading="loading" :disabled="!isMounted" type="submit" block>
      Войти
    </UButton>
  </UForm>
</template>

<script setup lang="ts">
import { useMounted } from '@vueuse/core';
import type { FormSubmitEvent } from '@nuxt/ui';
import type { LoginSchema } from '~~/shared/utils/schemas';

const { fetch: refreshSession } = useUserSession();

const isMounted = useMounted();

const show = ref(false);

definePageMeta({
  layout: 'login',
});

useSeoMeta({
  title: 'Авторизация',
});

const loading = ref(false);
const errorMessage = ref(null);

const state = reactive<Partial<LoginSchema>>({
  email: '',
  password: '',
});

async function onSubmit(event: FormSubmitEvent<LoginSchema>) {
  const data = toRaw(event.data);
  loading.value = true;
  errorMessage.value = null;

  try {
    await $fetch('/api/login', {
      method: 'POST',
      body: data,
    });

    await refreshSession();
    await navigateTo('/');
  } catch (error: any) {
    loading.value = false;
    errorMessage.value = useTranslationErrors(error.data.statusMessage);
  }
}
</script>

<style>
::-ms-reveal {
  display: none;
}
</style>
