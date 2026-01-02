<template>
  <UForm
    :schema="loginSchema"
    :state="state"
    class="space-y-4"
    @submit="onSubmit"
  >
    <h1 class="mb-2 font-bold">{{ appName }}</h1>

    <p class="text-muted text-sm">
      Для предоставления доступа необходимо
      <CustomLink
        to="http://portal.eksbyt.ru/openv/Lists/openview/NewLNA4.aspx"
        target="_blank"
      >
        <span>подать заявку</span>
      </CustomLink>
      в отдел сетевой инфраструктуры для включения в доменную группу «{{
        appName
      }}»
    </p>

    <UAlert
      v-if="errorMessage"
      :description="errorMessage"
      class="mb-4"
      color="error"
      variant="soft"
    ></UAlert>

    <UFormField name="email">
      <UInput
        class="w-full"
        v-model="state.email"
        icon="i-lucide-at-sign"
        placeholder="Эл. почта"
        size="lg"
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
        size="lg"
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

    <UButton :loading="loading" type="submit" size="lg" block>Войти</UButton>
  </UForm>
</template>

<script setup lang="ts">
import type { FormSubmitEvent } from '@nuxt/ui';

definePageMeta({ layout: 'login' });

useHead({ title: 'Авторизация' });

const {
  public: { appName },
} = useRuntimeConfig();

const show = ref(false);
const loading = ref(false);
const errorMessage = ref(null);

const state = reactive<Partial<LoginSchema>>({
  email: '',
  password: '',
});

const { fetch: refreshSession } = useUserSession();

async function onSubmit(event: FormSubmitEvent<LoginSchema>) {
  loading.value = true;
  errorMessage.value = null;

  try {
    await $fetch('/api/login', {
      method: 'POST',
      body: event.data,
    });

    await refreshSession();
    await navigateTo('/');
  } catch (error: any) {
    errorMessage.value = translate(error.data.statusMessage);
    loading.value = false;
  }
}

function translate(errorMessage: string) {
  const errors: any = {
    Unauthorized: 'Неверный e-mail или пароль',
    Forbidden: 'Доступ запрещен',
    ECONNREFUSED: 'Ошибка сети',
  };

  return errors[errorMessage] || errorMessage;
}
</script>

<style>
::-ms-reveal {
  display: none;
}
</style>
