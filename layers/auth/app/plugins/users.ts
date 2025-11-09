export default defineNuxtPlugin({
  name: 'users',
  parallel: true,
  async setup() {
    // const { loggedIn } = useUserSession();
    // const route = useRoute();

    const users = await $fetch('/api/users');

    return {
      provide: {
        users,
      },
    };
  },
});
