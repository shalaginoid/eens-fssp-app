import { useWebSocket } from '@vueuse/core';
import type { UserSession } from '#auth-utils';

export default defineNuxtPlugin(() => {
  const { app } = useRuntimeConfig();

  const visitors = useState<UserSession[]>('visitors', () => []);

  const { open, close } = useWebSocket(`${app.baseURL}api/visitors`, {
    immediate: false,
    async onMessage(ws, event) {
      visitors.value = JSON.parse(event.data);
    },
  });

  const route = useRoute();
  const { loggedIn } = useUserSession();

  if (loggedIn && route.name !== 'login') {
    open();
  }

  watch(
    () => route.name,
    (newValue, oldValue) => {
      if (oldValue === 'login') {
        open();
      }

      if (newValue === 'login') {
        close();
      }
    },
  );

  return {
    provide: {
      visitors: visitors,
    },
  };
});
