import { useWebSocket } from '@vueuse/core';
import type { UserSession } from '#auth-utils';

export default defineNuxtPlugin(() => {
  const { app } = useRuntimeConfig();

  const visitors = useState<UserSession[]>('visitors', () => []);

  const route = useRoute();

  const { open } = useWebSocket(`${app.baseURL}api/visitors`, {
    immediate: false,
    async onMessage(ws, event) {
      visitors.value = JSON.parse(event.data);
    },
  });

  open();

  watch(
    () => route.name,
    () => {
      open();
    },
  );

  return {
    provide: {
      visitors,
    },
  };
});
