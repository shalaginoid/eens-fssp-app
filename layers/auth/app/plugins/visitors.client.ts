import { useWebSocket } from '@vueuse/core';
import type { UserSession } from '#auth-utils';

export default defineNuxtPlugin({
  name: 'visitors-plugin',
  setup() {
    const { loggedIn } = useUserSession();
    const { app } = useRuntimeConfig();

    const visitors = useState<UserSession[]>('visitors', () => []);

    const { open, close } = useWebSocket(`${app.baseURL}api/visitors`, {
      immediate: false,
      async onMessage(ws, event) {
        visitors.value = JSON.parse(event.data);
      },
    });

    if (loggedIn.value) {
      open();
    }

    watch(loggedIn, (value) => {
      if (value) {
        open();
      } else {
        close();
      }
    });

    return {
      provide: {
        visitors,
      },
    };
  },
});
